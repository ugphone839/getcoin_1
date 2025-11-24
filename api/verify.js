export default async function handler(req, res) {
    const { user_id, type, token } = req.query;

    const SECRET = "YOUR_SECRET_KEY";

    if (token !== SECRET)
        return res.status(403).send("Invalid token");

    const rewards = {
        yeumoney: 250,
        click1s: 230,
        seotrieuview: 230
    };

    const reward = rewards[type];
    if (!reward) return res.status(400).send("Invalid type");

    try {
        await fetch("https://87.106.105.24:9161/addcoin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, amount: reward, type })
        });
    } catch(e) {
        console.log("CALLBACK FAILED:", e);
    }

    return res.redirect(`/thankyou?coin=${reward}`);
}
