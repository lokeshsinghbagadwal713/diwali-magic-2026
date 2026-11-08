
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");

const Greeting = require("../models/Greeting");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Store uploaded image temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("Only image files are allowed."));
    }
  },
});

// Upload image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "diwali-magic-2026",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });
};

// POST: Create a greeting
router.post("/", upload.single("photo"), async (req, res) => {
  let uploadedPhoto;

  try {
    const {
      senderName,
      recipientName,
      message,
      template,
    } = req.body;

    if (!senderName?.trim() || !recipientName?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Sender, recipient and message are required.",
      });
    }

    if (message.length > 240) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 240 characters.",
      });
    }

    const allowedTemplates = ["royal", "traditional", "midnight"];

    if (template && !allowedTemplates.includes(template)) {
      return res.status(400).json({
        success: false,
        message: "Invalid greeting template.",
      });
    }

    // Upload photo if provided
    if (req.file) {
      uploadedPhoto = await uploadToCloudinary(req.file.buffer);
    }

    // Generate unique greeting ID
    const greetingId = crypto.randomBytes(8).toString("hex");

    const greeting = await Greeting.create({
      greetingId,
      senderName: senderName.trim(),
      recipientName: recipientName.trim(),
      message: message.trim(),
      template: template || "royal",
      photoUrl: uploadedPhoto?.secure_url || "",
      photoPublicId: uploadedPhoto?.public_id || "",
    });

    res.status(201).json({
      success: true,
      message: "Your Diwali greeting has been created!",
      greetingId: greeting.greetingId,
      shareUrl: `${process.env.CLIENT_URL}/wish/${greeting.greetingId}`,
    });
  } catch (error) {
    console.error("Greeting creation error:", error);

    // Clean up uploaded photo if database save fails
    if (uploadedPhoto?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedPhoto.public_id);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError.message);
      }
    }

    res.status(500).json({
      success: false,
      message: "Unable to create greeting. Please try again.",
    });
  }
});

// GET: Fetch a greeting using its unique ID
router.get("/:id", async (req, res) => {
  try {
    const greeting = await Greeting.findOne({
      greetingId: req.params.id,
    }).select("-photoPublicId -_id -__v");

    if (!greeting) {
      return res.status(404).json({
        success: false,
        message: "Greeting not found.",
      });
    }

    res.json({
      success: true,
      greeting,
    });
  } catch (error) {
    console.error("Greeting fetch error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch greeting.",
    });
  }
});

module.exports = router;