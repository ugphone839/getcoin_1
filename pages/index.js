// pages/index.js

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
    const [key, setKey] = useState(null);
    const [status, setStatus] = useState('Đang chờ Key từ URL...');

    useEffect(() => {
        // KIỂM TRA MÔI TRƯỜNG ĐỂ TRÁNH LỖI SSR
        // Code này chỉ chạy trên trình duyệt (client-side)
        if (typeof window !== 'undefined') { 
            // Lấy Key từ URL: /?key=RANDOMCODE
            const params = new URLSearchParams(window.location.search);
            const codeKey = params.get('key');
            
            if (codeKey && codeKey.length >= 10) {
                setKey(codeKey);
                setStatus('✅ Hoàn thành vượt link! Vui lòng copy Key này.');
            } else {
                setStatus('❌ Lỗi nghiêm trọng: Thiếu hoặc Key không hợp lệ trong URL.');
            }
        }
    }, []);

    const handleCopy = () => {
        if (key) {
            // Sử dụng API Clipboard để sao chép Key
            navigator.clipboard.writeText(key)
                .then(() => {
                    alert('Đã sao chép Key thành công! Quay lại Discord.');
                })
                .catch(err => {
                    console.error('Không thể sao chép: ', err);
                    alert('Không thể tự động sao chép. Vui lòng chọn và copy Key thủ công.');
                });
        }
    };

    return (
        <div style={styles.container}>
            <Head>
                <title>Nhận Key Vượt Link</title>
            </Head>
            <main style={styles.main}>
                <h1 style={styles.title}>Bước Cuối: Nhận và Sử Dụng Key</h1>
                
                {key ? (
                    <>
                        <p style={styles.description}>
                            <span style={{fontWeight: 'bold', color: '#ffb347'}}>HƯỚNG DẪN:</span> Key đã được tạo sau khi hoàn thành vượt link. <br/>
                            Vui lòng **COPY Key** dưới đây và sử dụng lệnh **`/getcoin <Key>`** trên Discord để nhận Coin.
                        </p>

                        <div style={styles.keyBox}>
                            <span style={styles.keyLabel}>Key (Mã):</span>
                            <span style={styles.key}>{key}</span>
                        </div>
                        
                        <button 
                            onClick={handleCopy} 
                            style={styles.button}
                        >
                            BẤM VÀO ĐÂY ĐỂ SAO CHÉP KEY
                        </button>
                         <p style={{marginTop: '15px', color: '#ccc', fontWeight: 'bold'}}>Key này chỉ cần sử dụng 1 lần.</p>
                    </>
                ) : (
                    <p style={styles.error}>{status}</p>
                )}
            </main>
            <footer style={styles.footer}>
                <p>Powered by Bot Service</p>
            </footer>
        </div>
    );
}

// CSS đơn giản
const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#2f3136', color: '#fff' },
    main: { padding: '50px', textAlign: 'center', maxWidth: '800px', width: '90%' },
    title: { color: '#7289da', fontSize: '2.5em', marginBottom: '30px' },
    description: { margin: '25px 0', fontSize: '1.2em', lineHeight: '1.6' },
    keyBox: {
        backgroundColor: '#40444b',
        padding: '20px',
        borderRadius: '10px',
        margin: '20px auto',
        wordBreak: 'break-all',
        textAlign: 'center',
        border: '2px solid #f04747'
    },
    keyLabel: {
        display: 'block',
        fontSize: '1em',
        color: '#ffb347',
        marginBottom: '5px'
    },
    key: { 
        fontSize: '1.8em', 
        fontWeight: '900',
        color: '#43b581'
    },
    button: {
        padding: '18px 35px',
        fontSize: '1.5em',
        fontWeight: '900',
        backgroundColor: '#7289da',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s'
    },
    error: { color: '#f04747', margin: '20px 0', fontSize: '1.2em' },
    footer: { padding: '20px', fontSize: '0.8em', color: '#888' }
};
