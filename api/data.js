// File: /api/data.js

// Fungsi ini akan dieksekusi oleh Vercel setiap kali URL /api/data diakses.
export default async function handler(request, response) {
  // Ambil kunci API & ID Sheet dari Environment Variables di Vercel (lebih aman)
  const SHEET_ID = process.env.SHEET_ID;
  const API_KEY = process.env.API_KEY;
  const RANGE = 'Sheet1!A:EZ'; // Sesuaikan jika perlu

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const fetchResponse = await fetch(url);
    if (!fetchResponse.ok) {
      throw new Error(`Google Sheets API error! status: ${fetchResponse.status}`);
    }
    const data = await fetchResponse.json();
    
    // Proses data (balik urutan agar yang terbaru di atas)
    const rows = data.values ? data.values.slice(1).reverse() : [];
    
    // Penting! Atur header CORS agar bisa diakses dari GitHub Pages
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Kirim data yang sudah diproses sebagai respons
    response.status(200).json({ values: rows });

  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Gagal mengambil data dari Google Sheets.' });
  }
}
