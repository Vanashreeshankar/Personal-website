import Message from "../models/message.js";
import { sendEmailNotification } from "../utils/sendEmail.js";

export const sendMessage = async (req, res) => {
  try {
    let { name, email, message, service, jobType } = req.body;

    const normalize = (val) => val?.toLowerCase().trim();
    service = normalize(service);
    jobType = normalize(jobType);

    if (!name || !email || !message || !service || !jobType) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Save to DB
    const newMessage = new Message({
      name,
      email,
      message,
      service,
      jobType,
    });

    await newMessage.save();

     // SAFE EMAIL (this is where you add it)
     try {
      await sendEmailNotification({
        name,
        email,
        message,
        service,
        jobType,
      });
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({
      error: "Message failed",
    });
  }
};