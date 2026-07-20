import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async ( filePath: string) => {

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "users",
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
  };
};