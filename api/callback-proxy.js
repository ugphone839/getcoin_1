
export default async function handler(req, res) {
  const { sid, m } = req.query;

  await fetch("http://87.106.24.9:1961/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sid, method: m })
  });

  res.send("<h3>Đã vượt link! Bạn có thể quay lại Discord.</h3>");
}
