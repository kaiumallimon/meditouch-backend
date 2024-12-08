const Doctor = require("../../../models/doctor.model"); // Import the Doctor model

const doctorController = {
  // Get all doctors
  async getAllDoctors(req, res) {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific doctor by ID
  async getDoctorById(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a doctor's information
  async updateDoctor(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        phone,
        gender,
        dob,
        district,
        licenceId,
        speciality,
        visitingFee,
        education,
      } = req.body;
      const image = req.file ? req.file.path : null;

      const updatedDoctor = await Doctor.findByIdAndUpdate(
        id,
        {
          name,
          email,
          phone,
          gender,
          dob,
          district,
          image,
          licenceId,
          speciality,
          visitingFee,
          education,
        },
        { new: true }
      );

      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.status(200).json({
        message: "Doctor updated successfully",
        doctor: updatedDoctor,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a doctor
  async deleteDoctor(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByIdAndDelete(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a review to a doctor
  async addReview(req, res) {
    try {
      const { id } = req.params; // Doctor ID
      const { rating, message } = req.body;

      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      doctor.reviews.push({ rating, message });
      await doctor.save();

      res.status(200).json({ message: "Review added successfully", doctor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get time slots for a doctor
  async getTimeSlots(req, res) {
    try {
      const { id } = req.params; // Doctor ID
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.status(200).json({
        message: "Time slots retrieved successfully",
        timeSlots: doctor.all_timeslots,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a time slot for a doctor
  async addTimeSlot(req, res) {
    try {
      const { id } = req.params; // Doctor ID
      const { date, intervals, timePerInterval } = req.body; // New time slot data

      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      doctor.all_timeslots.push({ date, intervals, timePerInterval });
      await doctor.save();

      res.status(200).json({ message: "Time slot added successfully", doctor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a time slot for a doctor
  async updateTimeSlot(req, res) {
    try {
      const { id } = req.params; // Doctor ID
      const { date, intervals, timePerInterval } = req.body; // New time slot data

      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      // Find the index of the time slot by date
      const timeSlotIndex = doctor.all_timeslots.findIndex(
        (slot) => slot.date === date
      );
      if (timeSlotIndex === -1) {
        return res.status(404).json({ message: "Time slot not found" });
      }

      // Update the intervals while keeping the existing _id for each interval
      const updatedIntervals = intervals.map((interval, index) => {
        // Preserve the existing _id if the intervals are updated
        return {
          _id: doctor.all_timeslots[timeSlotIndex].intervals[index]?._id, // Retain the existing _id if it exists
          start: interval.start,
          end: interval.end,
        };
      });

      // Update the time slot with the new intervals and timePerInterval
      doctor.all_timeslots[timeSlotIndex] = {
        date,
        intervals: updatedIntervals,
        timePerInterval,
      };

      await doctor.save();
      res
        .status(200)
        .json({ message: "Time slot updated successfully", doctor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete all time slots for a date
  async deleteTimeSlot(req, res) {
    try {
      const { id } = req.params; // Doctor ID
      const { date } = req.body; // Date of the time slot to delete

      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      const timeSlotIndex = doctor.all_timeslots.findIndex(
        (slot) => slot.date === date
      );
      if (timeSlotIndex === -1) {
        return res.status(404).json({ message: "Time slot not found" });
      }

      doctor.all_timeslots.splice(timeSlotIndex, 1);
      await doctor.save();

      res
        .status(200)
        .json({ message: "Time slot deleted successfully", doctor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  // Delete a specific time slot under a specific date
  async deleteTimeSlot(req, res) {
    try {
      const { id } = req.params; // Doctor ID
      const { date, start, end } = req.body; // Date and time interval (start and end) to delete

      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      // Find the time slot by date
      const timeSlot = doctor.all_timeslots.find((slot) => slot.date === date);
      if (!timeSlot) {
        return res
          .status(404)
          .json({ message: "Time slot not found for the given date" });
      }

      // Find the index of the specific time interval (start and end time)
      const intervalIndex = timeSlot.intervals.findIndex(
        (interval) => interval.start === start && interval.end === end
      );
      if (intervalIndex === -1) {
        return res.status(404).json({ message: "Time interval not found" });
      }

      // Remove the specific time interval
      timeSlot.intervals.splice(intervalIndex, 1);

      // If no intervals remain for that date, you can remove the entire date slot, or leave it empty
      if (timeSlot.intervals.length === 0) {
        const dateIndex = doctor.all_timeslots.findIndex(
          (slot) => slot.date === date
        );
        doctor.all_timeslots.splice(dateIndex, 1); // Remove the date slot entirely if no intervals left
      }

      await doctor.save();
      res
        .status(200)
        .json({ message: "Time interval deleted successfully", doctor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Search for doctors
  async searchDoctors(req, res) {
    try {
      const { speciality, district, name } = req.query;

      const query = {};
      if (speciality) query.speciality = { $regex: speciality, $options: "i" };
      if (district) query.district = { $regex: district, $options: "i" };
      if (name) query.name = { $regex: name, $options: "i" };

      const doctors = await Doctor.find(query);
      res
        .status(200)
        .json({ message: "Doctors retrieved successfully", doctors });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = doctorController;
