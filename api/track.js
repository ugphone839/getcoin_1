// api/track.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Xử lý tracking nếu cần
    console.log('User completed getcoin:', req.body);
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
