export default function ThankYou({ coin }) {
    return (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h1>Cảm ơn bạn đã hoàn thành link!</h1>
            <h2>Bạn đã nhận: +{coin} coin</h2>
            <p>Hãy quay lại Discord để kiểm tra số dư.</p>
        </div>
    );
}

ThankYou.getInitialProps = ({ query }) => {
    return { coin: query.coin || 0 }
}
