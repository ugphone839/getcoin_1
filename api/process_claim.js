import fetch from 'node-fetch';

// --- PHẢI CẤU HÌNH TRONG VERCEL ENV VARIABLES HOẶC THAY THẾ TRỰC TIẾP ---
// Đảm bảo BOT_SECRET_KEY ở đây khớp với BOT_SECRET_KEY trong bott.py
const BOT_API_BASE = "http://87.106.105.24:9161"; 
const BOT_SECRET_KEY = "a-very-long-and-secure-secret-key-12345"; 

export default async function handler(req, res) {
  // Lấy tham số từ URL
  const { user_id, coin, tx_id } = req.query;

  if (!user_id || !coin || !tx_id) {
    return res.status(400).json({ status: 'error', message: 'Missing parameters' });
  }

  // GỌI ĐẾN BOT API BẢO MẬT
  const botClaimUrl = (
    `${BOT_API_BASE}/api/add_coin?`
    `user_id=${user_id}&`
    `coin=${coin}&`
    `tx_id=${tx_id}&`
    `secret=${BOT_SECRET_KEY}` // Gửi key bí mật
  );

  try {
    const response = await fetch(botClaimUrl);
    const data = await response.json();

    // Trả về kết quả của Bot cho Vercel Frontend
    if (response.ok) {
        return res.status(200).json(data);
    } else {
        // Trả về mã lỗi HTTP của Bot để Vercel Frontend xử lý
        return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi Bot API:", error);
    return res.status(500).json({ status: 'error', message: 'Không thể kết nối đến Bot Backend (Network Error)' });
  }
}
