const express = require("express");
const authenticateToken = require("../middleware/auth");
const dotenv = require("dotenv");
const open_ai = require("openai");

dotenv.config();

const router = express.Router();

const openai = new open_ai.OpenAI(process.env.OPENAI_API_KEY);

router.post("/generate-content", authenticateToken, async (req, res) => {
  const { theme, tone } = req.body;

  const prompt = `
    Act as a social media manager for MackMakesCoffee, a page dedicated to coffee enthusiasts. The primary goal is to build a community around coffee by sharing engaging and unique content. The tone should be ${tone}. Provide detailed content ideas under the theme '${theme}' for social media posts.

    Theme: ${theme}
    Tone: ${tone}
    Content Ideas:
    `;

  try {
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

module.exports = router;
