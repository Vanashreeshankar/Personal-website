import Visit from "../models/visit.js";
import { sendEmailNotification } from "../utils/sendEmail.js";

export const trackVisit = async (req, res) => {
  try {
    const ref = req.query.ref || "direct";

    // Get IP
    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    //  Prevent duplicate (same IP within 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const existing = await Visit.findOne({
      ip,
      createdAt: { $gte: oneHourAgo },
    });

    if (existing) {
      return res.json({ skipped: true });
    }

    // Get location
    let city = "Unknown";
    let country = "Unknown";

    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
      const geo = await geoRes.json();

      city = geo.city || "Unknown";
      country = geo.country || "Unknown";
    } catch (err) {
      console.log("Geo error");
    }

    //  Save visit
    await Visit.create({
      ref,
      ip,
      city,
      country,
      userAgent: req.headers["user-agent"],
    });

    // 📩 Send email (using your existing util)
    await sendEmailNotification({
      name: "Portfolio Viewer",
      email: "system",
      message: `Your portfolio was viewed at ${new Date().toLocaleString()}`,
      service: `${ref} (${city}, ${country})`,
      jobType: "visit",
    });

    res.json({ success: true });
  } catch (error) {
    console.error("TRACK ERROR:", error);
    res.status(500).json({ error: "Failed" });
  }
};
