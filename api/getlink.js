
export default function handler(req, res) {
  const sid = req.query.sid;
  if (!sid) return res.status(400).json({ error: "No session id" });

  res.send(`
    <html><body>
    <h3>Chọn hệ thống:</h3>
    <a href="/api/redirect?sid=${sid}&m=yeumoney">Yeumoney</a><br>
    <a href="/api/redirect?sid=${sid}&m=click1s">Click1s</a><br>
    <a href="/api/redirect?sid=${sid}&m=seotrieuview">Seotrieuview</a><br>
    </body></html>
  `);
}
