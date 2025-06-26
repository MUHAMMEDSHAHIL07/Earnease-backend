import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "earnease/employer_licenses",
    allowed_formats: ["pdf", "jpg", "png", "jpeg"],
    resource_type: "auto",
  },
});

// Export cloudinary instance and multer middleware
export const upload = multer({ storage });
export { cloudinary };
