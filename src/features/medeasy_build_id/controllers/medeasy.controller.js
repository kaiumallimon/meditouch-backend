// import axios
const axios = require('axios');

// export the function to get the build id

exports.getBuildId = async (req, res) => {
    const baseUrl =process.env.MEDEASY_API_BASE_URL;

    try {
        // Step 1: Fetch the HTML file
        const response = await axios.get(baseUrl);
        const html = response.data;

        // Step 2: Extract Build ID with Regex
        const buildIdMatch = html.match(/"\/_next\/static\/([\w\d]+)\/_buildManifest.js"/);

        if (buildIdMatch) {
            const buildId = buildIdMatch[1];
            res.json({ buildId });
        } else {
            res.status(404).json({ error: "Build ID not found!" });
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch build ID." });
    }
}