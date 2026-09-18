import { v2 as cloudinary } from 'cloudinary';

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
  folder = 'ents',
  mimeType = 'image/jpeg'
): Promise<CloudinaryUploadResult> {
  const c = getCloudinary();
  if (!c) {
    return {
      success: false,
      error:
        'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local.',
    };
  }

  try {
    const base64 = `data:${mimeType};base64,${buffer.toString('base64')}`;
    const result = await c.uploader.upload(base64, {
      folder,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      timeout: 60000,
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (err: unknown) {
    const msg = (err as Error)?.message || 'Failed to upload image to Cloudinary.';
    console.error('Cloudinary upload error:', msg);
    return {
      success: false,
      error: msg,
    };
  }
}

export async function uploadBase64Image(
  base64Data: string,
  folder = 'ents'
): Promise<CloudinaryUploadResult> {
  const c = getCloudinary();
  if (!c) {
    return {
      success: false,
      error:
        'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local.',
    };
  }

  try {
    const result = await c.uploader.upload(base64Data, {
      folder,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      timeout: 60000,
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (err: unknown) {
    const msg = (err as Error)?.message || 'Failed to upload image.';
    console.error('Cloudinary base64 upload error:', msg);
    return {
      success: false,
      error: msg,
    };
  }
}
