// Thay thế bằng fetch tương thích (nếu cần) hoặc nếu dùng Next.js thì fetch là có sẵn
import fetch from 'node-fetch'; 

// ==============================================================================
// ⚠️ CẤU HÌNH BẮT BUỘC PHẢI THAY THẾ ⚠️
// ==============================================================================
// Địa chỉ IP và Port của Bot Backend API của bạn
const BOT_API_BASE = "http://87.106.105.24:9161"; 
// Key bí mật (PHẢI GIỐNG TRONG bott.py và api_server.py)
const BOT_SECRET_KEY = "your-super-secret-key-that-only-bot-knows-123456789"; 
// ==============================================================================

export default async function handler(req, res) {
  // Lấy tham số từ URL
  const { user_id, coin, tx_id } = req.query;

  if (!user_id || !coin || !tx_id) {
    return res.status(400).json({ status: 'error', message: 'Missing parameters' });
  }

  // GỌI ĐẾN BOT API BẢO MẬT CỦA BẠN
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

    if (response.ok) {
        // Trả về thành công
        return res.status(200).json(data);
    } else {
        // Trả về lỗi, bao gồm cả 409 Conflict (Đã claim)
        return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi Bot API:", error);
    return res.status(500).json({ 
        status: 'error', 
        message: 'Không thể kết nối đến Bot Backend (Network Error). Vui lòng kiểm tra Server 87.106.105.24:9161.' 
    });
  }
}

