const axios = require('axios');

const COIN_MAP = {
    yeumoney: 250,
    click1s: 230,
    seotrieuview: 230
};

const BOT_ADD_COIN_API_URL = 'http://87.106.105.24:9161/add_coin'; 

async function addCoinToUser(userId, coins) {
    const BOT_SECRET_KEY = process.env.BOT_SECRET_KEY; 

    if (!BOT_SECRET_KEY) {
        return { success: false, message: 'Lỗi cấu hình: Thiếu BOT_SECRET_KEY.' };
    }
    
    const payload = {
        user_id: userId,
        amount: coins,
        secret: BOT_SECRET_KEY 
    };

    try {
        const response = await axios.post(BOT_ADD_COIN_API_URL, payload);

        if (response.data && response.data.status === 'ok') {
            return { success: true, message: `Đã cộng thành công ${coins} coin.` };
        } else {
            return { success: false, message: response.data.message || response.data.error || 'Lỗi không xác định từ Bot API.' };
        }

    } catch (error) {
        const errorMessage = `Lỗi kết nối API: ${error.message}`;
        return { success: false, message: errorMessage };
    }
}

function generateHtmlResponse(isSuccess, coins, userId, message) {
    const title = isSuccess ? '✅ Thành Công Rực Rỡ!' : '❌ Đã Xảy Ra Lỗi';
    const bgColor = isSuccess ? '#e6ffe6' : '#ffe6e6';
    const borderColor = isSuccess ? '#00cc00' : '#cc0000';
    const mainColor = isSuccess ? '#006400' : '#8b0000';
    const coinDisplay = isSuccess ? `<p style="font-size: 1.5em; font-weight: bold; color: #00cc00;">+ ${coins} COIN</p>` : '';

    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .container { 
                max-width: 500px; 
                padding: 40px; 
                border-radius: 12px; 
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                text-align: center;
                background-color: ${bgColor};
                border: 2px solid ${borderColor};
                color: ${mainColor};
            }
            h1 { font-size: 2em; margin-bottom: 20px; color: ${mainColor}; }
            p { font-size: 1.2em; line-height: 1.5; color: #333; }
            .footer { margin-top: 30px; font-size: 0.9em; color: #888; }
            .user-id { font-size: 1em; color: #666; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${title}</h1>
            ${coinDisplay}
            <p>${message}</p>
            ${isSuccess ? `<p class="user-id">ID Người Dùng: ${userId}</p>` : ''}
            <p class="footer">*Bạn có thể đóng trang này và quay lại bot.</p>
        </div>
    </body>
    </html>
    `;
}

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send(generateHtmlResponse(false, 0, null, 'Method Not Allowed. Vui lòng truy cập qua link rút gọn.'));
        return;
    }

    const { user_id, service } = req.query;

    if (!user_id || !service) {
        res.status(400).send(generateHtmlResponse(false, 0, null, 'Thiếu thông tin người dùng (user_id) hoặc dịch vụ (service) trong URL.'));
        return;
    }

    const coins = COIN_MAP[service];

    if (!coins) {
        res.status(400).send(generateHtmlResponse(false, 0, null, `Dịch vụ rút gọn link "${service}" không hợp lệ.`));
        return;
    }
    
    const result = await addCoinToUser(user_id, coins); 
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    if (result.success) {
        res.status(200).send(generateHtmlResponse(true, coins, user_id, result.message));
    } else {
        res.status(200).send(generateHtmlResponse(false, 0, user_id, result.message));
    }
};
