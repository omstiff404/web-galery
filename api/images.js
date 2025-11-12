// api/images.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Get all images
    return res.status(200).json({
      success: true,
      data: {
        images: [],
        total: 0,
        totalSize: 0
      }
    });
  }

  if (req.method === 'POST') {
    // Upload new image
    try {
      const { imageData, fileName } = req.body;
      
      // Validasi file size (max 5MB per image)
      if (imageData.length > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          error: 'File size too large. Maximum 5MB per image.'
        });
      }

      // Simpan image (dalam implementasi nyata, simpan ke database atau cloud storage)
      const imageInfo = {
        id: Date.now(),
        name: fileName,
        url: imageData,
        uploadedAt: new Date().toISOString(),
        size: imageData.length
      };

      return res.status(200).json({
        success: true,
        data: imageInfo
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to upload image'
      });
    }
  }

  if (req.method === 'DELETE') {
    // Delete image
    const { imageId } = req.body;
    
    return res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}