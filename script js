function generateUUID() {
  // Tạo một chuỗi Key ngẫu nhiên có định dạng 4-4-4-4
  const pattern = 'xxxx-xxxx-xxxx-xxxx';
  const key = pattern.replace(/[x]/g, (c) => {
    // Tạo giá trị hex ngẫu nhiên
    const r = (Math.random() * 16) | 0;
    return r.toString(16);
  }).toUpperCase();
  // Thêm tiền tố để bot dễ dàng nhận dạng và xử lý hơn
  return `GETCOIN-${key}`; 
}

document.addEventListener('DOMContentLoaded', () => {
  const keyDisplay = document.getElementById('key-display');
  const copyButton = document.getElementById('copy-button');
  
  // 1. Tạo và hiển thị Key khi trang được tải
  const generatedKey = generateUUID();
  keyDisplay.textContent = generatedKey;

  // 2. Xử lý sự kiện Copy Key
  copyButton.addEventListener('click', () => {
    // Sử dụng Clipboard API hiện đại
    navigator.clipboard.writeText(generatedKey).then(() => {
      // Cập nhật giao diện khi copy thành công
      const originalText = copyButton.textContent;
      const originalColor = copyButton.style.backgroundColor;
      
      copyButton.textContent = 'Đã Copy!';
      copyButton.style.backgroundColor = '#28a745'; // Màu xanh lá cây
      
      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.backgroundColor = originalColor; 
      }, 2000);

    }).catch(err => {
      // Fallback: Thông báo lỗi nếu trình duyệt không hỗ trợ hoặc bị chặn
      console.error('Không thể copy key: ', err);
      alert('Lỗi Copy. Vui lòng sao chép thủ công: ' + generatedKey);
    });
  });
});
