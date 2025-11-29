/**
 * Lấy giá trị của một tham số từ URL hiện tại.
 * @param {string} name - Tên của tham số cần lấy (ví dụ: 'k').
 * @returns {string|null} Giá trị của tham số hoặc null nếu không tìm thấy.
 */
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Hàm sao chép Key vào clipboard.
 */
function copyKey() {
    const keyElement = document.getElementById('validation-key');
    const key = keyElement.textContent;
    const copyButton = document.getElementById('copy-button');

    if (key && key !== 'Không tìm thấy Key!' && key !== 'Đang tải Key...') {
        // Sử dụng Clipboard API hiện đại
        navigator.clipboard.writeText(key).then(() => {
            // Thay đổi giao diện nút để thông báo thành công
            copyButton.textContent = '✅ Đã Sao Chép!';
            copyButton.style.backgroundColor = '#1abc9c'; // Màu xanh ngọc
            
            // Đặt lại sau 2 giây
            setTimeout(() => {
                copyButton.innerHTML = '<span class="icon">📋</span> Sao Chép Key';
                copyButton.style.backgroundColor = '#2ecc71';
            }, 2000);
        }).catch(err => {
            console.error('Không thể sao chép văn bản: ', err);
            copyButton.textContent = '🚫 Lỗi Sao Chép!';
            // Tạm thời hiển thị key nếu sao chép tự động thất bại (phòng trường hợp trình duyệt cũ)
            alert("Lỗi sao chép tự động. Vui lòng sao chép thủ công Key: \n" + key);
        });
    } else {
        copyButton.textContent = '❌ Key không hợp lệ!';
        copyButton.style.backgroundColor = '#e74c3c';
        setTimeout(() => {
            copyButton.innerHTML = '<span class="icon">📋</span> Sao Chép Key';
            copyButton.style.backgroundColor = '#2ecc71';
        }, 2000);
    }
}

// Chạy khi trang đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    const keyElement = document.getElementById('validation-key');
    // Key được truyền qua tham số 'k' (ví dụ: ?k=abcxyz)
    const key = getUrlParam('k'); 

    if (key) {
        keyElement.textContent = key;
    } else {
        keyElement.textContent = 'Không tìm thấy Key!';
        keyElement.style.color = '#e74c3c';
        document.getElementById('copy-button').disabled = true;
    }
});
