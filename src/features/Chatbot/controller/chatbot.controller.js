const LangflowService = require('../../../utils/LangflowService');

const applicationToken = process.env.Datastex_application_token;
const URL = process.env.Datastex_application_URL;
const langflowService = new LangflowService(URL, applicationToken);
const Doctor = require('../../../models/doctor.model'); // Assuming you have a Doctor model


const runFlowController = async (req, res) => {
  const { flowId, langflowId, inputValue, inputType, outputType, stream, tweaks } = req.body;

  try {
      const response = await langflowService.runFlow(
          flowId,
          langflowId,
          inputValue,
          inputType || 'chat',
          outputType || 'chat',
          tweaks || {},
          stream || false,
          (data) => res.write(`data: ${JSON.stringify(data)}\n\n`), // onUpdate for streaming
          () => res.end(), // onClose for streaming
          (error) => {
              console.error("Stream Error:", error);
              res.status(500).send({ error });
          } // onError for streaming
      );

      if (!stream) {
          res.json(response); // Send response once for non-streaming mode
      }
  } catch (error) {
      console.error('Controller Error:', error.message);
      if (!res.headersSent) {
          res.status(500).send({ error: error.message }); // Ensure headers are not already sent
      }
  }
};


/* Controller to find a doctor by name and fetch their available time slots */

const findDoctorAndAvailableTimes = async (req, res) => {
    try {
        const { doctorName } = req.body;

        if (!doctorName) {
            return res.status(400).json({ error: 'Doctor name is required' });
        }

        // Fuzzy search for the doctor in the database
        const doctor = await Doctor.findOne({
            name: { $regex: doctorName, $options: 'i' } // Case-insensitive regex
        });

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Extract all timeslots from the doctor's data
        const availableTimes = doctor.all_timeslots.map((slot) => ({
            date: slot.date,
            intervals: slot.intervals,
            timePerInterval: slot.timePerInterval,
        }));

        // Return JSON response
        return res.status(200).json({
            success: true,
            message: 'Doctor found and available times fetched successfully',
            doctorName: doctor.name,
            availableTimes: availableTimes
        });
    } catch (error) {
        console.error('Error fetching doctor or available times:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { runFlowController, findDoctorAndAvailableTimes };