import { generateResponse } from "../utils/botLogic.js";

export const chatWithBot = (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = generateResponse(message);

    res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chat failed" });
  }
};

