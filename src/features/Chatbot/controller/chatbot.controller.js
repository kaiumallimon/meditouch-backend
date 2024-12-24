const LangflowService = require('../../../utils/LangflowService');

const applicationToken = process.env.Datastex_application_token;
const URL = process.env.Datastex_application_URL;
const langflowService = new LangflowService(URL, applicationToken);

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


module.exports = { runFlowController };