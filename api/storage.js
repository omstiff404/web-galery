// api/storage.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Simulasi data storage (dalam real implementation, ini bisa connect ke database)
      const storageData = {
        total: 5, // 5GB total
        used: await calculateStorageUsage(),
        timestamp: new Date().toISOString()
      };
      
      storageData.free = storageData.total - storageData.used;
      storageData.percentage = Math.round((storageData.used / storageData.total) * 100);
      
      return res.status(200).json({
        success: true,
        data: storageData
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to get storage info'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function calculateStorageUsage() {
  // Simulasi perhitungan storage usage
  // Dalam implementasi nyata, ini akan menghitung dari database atau file system
  return Math.random() * 3 + 0.5; // Random antara 0.5GB - 3.5GB
}