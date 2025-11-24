const { users_data, save_data, USER_FILE } = require('../lib/database');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
    
    try {
        const { user_id, reward } = req.body;
        
        if (!user_id || !reward) {
            return res.status(400).json({ success: false, error: 'Thiếu thông tin user_id hoặc reward' });
        }
        
        // Trong thực tế, bạn cần import và sử dụng database thực
        // Đây là mock implementation
        const userData = await getUserData(user_id);
        userData.coin_normal = (userData.coin_normal || 0) + reward;
        userData.total_coin_earned_weekly = (userData.total_coin_earned_weekly || 0) + reward;
        
        await saveUserData(user_id, userData);
        
        // Log hành động
        await logAction(user_id, 'GETCOIN_CLAIM', { reward });
        
        res.status(200).json({ 
            success: true, 
            message: `Đã nhận ${reward} Coin Normal`,
            new_balance: userData.coin_normal
        });
        
    } catch (error) {
        console.error('Claim coin error:', error);
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
};

// Mock functions - cần thay thế bằng database thực
async function getUserData(userId) {
    return { coin_normal: 0, total_coin_earned_weekly: 0 };
}

async function saveUserData(userId, data) {
    // Implementation thực tế
}

async function logAction(userId, action, details) {
    // Implementation thực tế
}
