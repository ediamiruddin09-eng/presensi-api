// File: /api/webhook.js

// Ini adalah Serverless Function. Vercel secara otomatis
// akan membuat endpoint /api/webhook dari file ini.

export default function handler(request, response) {
  // Pastikan request datang dari metode POST
  if (request.method === 'POST') {
    console.log('Webhook diterima dari Google Sheets!');

    // Di sini Anda akan menambahkan logika Socket.IO jika menggunakannya,
    // atau logika untuk memperbarui cache data.
    // Untuk webhook sederhana, ini sudah cukup.

    response.status(200).send('Notifikasi Webhook Diterima oleh Vercel!');
  } else {
    // Jika metode bukan POST, kirim error.
    response.status(405).send('Method Not Allowed');
  }
}