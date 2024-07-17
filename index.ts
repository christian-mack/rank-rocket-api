const express = require("express");
const axios = require("axios");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

const openai = new OpenAI.OpenAI(process.env.OPENAI_API_KEY);

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/generate-content", async (req, res) => {
  const { theme, tone } = req.body;

  const prompt = `
    Act as a social media manager for MackMakesCoffee, a page dedicated to coffee enthusiasts. The primary goal is to build a community around coffee by sharing engaging and unique content. The tone should be ${tone}. Provide detailed content ideas under the theme '${theme}' for social media posts.

    Theme: ${theme}
    Tone: ${tone}
    Content Ideas:
    `;

  try {
    console.log("Requst body: ", theme, tone, prompt);

    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res
      .status(200)
      .json({ message: "Success", data: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
