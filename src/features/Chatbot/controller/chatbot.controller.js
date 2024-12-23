// Import required modules
const fetch = require("node-fetch");
require("dotenv").config(); // Load environment variables from .env file

// Define the controller function
exports.processQuery = async (req, res) => {
  try {
    const { query } = req.body; // Expecting { query: "your input query" }

    if (!query) {
      return res.status(400).json({ error: "Query text is required" });
    }

    // Prepare the API URL and headers
    const apiUrl = process.env.API_URL;
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      "Content-Type": "application/json",
      "x-api-key": process.env.X_API_KEY,
    };

    // Prepare the request body
    const body = JSON.stringify({
      input_value: query,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-yjr8c": {},
        "ParseData-oMUcQ": {},
        "Prompt-OBKMH": {},
        "SplitText-b3vB5": {},
        "ChatOutput-b81IL": {},
        "AstraDB-o15LT": {},
        "AstraDB-kbe6f": {},
        "File-I6u8U": {},
        "NVIDIAEmbeddingsComponent-Xf5iS": {},
        "GroqModel-j8XJq": {},
        "NVIDIAEmbeddingsComponent-V6rCe": {},
      },
    });

    // Make the fetch call
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body,
    });

    // Parse the response
    const result = await response.json();

    // Extract the output text
    const outputs = result.outputs;
    if (outputs && outputs.length > 0) {
      const firstOutput = outputs[0].outputs; // Adjust according to your API's structure
      return res.status(200).json({ output: firstOutput });
    } else {
      return res.status(200).json({ message: "No outputs found." });
    }
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ error: error.message });
  }
};
