import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

// Lazy configure Cloudinary instance
function getCloudinary() {
  if (!isCloudinaryConfigured()) return null;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return cloudinary;
}

export interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  error?: string;
}

export async function uploadImageBuffer(
  buffer: Buffer,
  folder = 'ents'
): Promise<CloudinaryUploadResult> {
  const c = getCloudinary();
  if (!c) {
    return {
      success: false,
      error: 'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local.',
    };
  }

  return new Promise<CloudinaryUploadResult>((resolve) => {
    const uploadStream = c.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          resolve({
            success: false,
            error: error?.message || 'Failed to upload image to Cloudinary.',
          });
        } else {
          resolve({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

export async function uploadBase64Image(
  base64Data: string,
  folder = 'ents'
): Promise<CloudinaryUploadResult> {
  const c = getCloudinary();
  if (!c) {
    return {
      success: false,
      error: 'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local.',
    };
  }

  try {
    const result = await c.uploader.upload(base64Data, {
      folder,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message || 'Failed to upload image.',
    };
  }
}

