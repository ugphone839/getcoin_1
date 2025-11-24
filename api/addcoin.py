from flask import Flask, request
import json

app = Flask(__name__)

@app.route("/api/addcoin")
def add_coin():
    uid = request.args.get("uid")
    type = request.args.get("type")

    if not uid or not type:
        return "Thiếu uid hoặc type"

    coin_amounts = {
        "yeumoney": 250,
        "click1s": 230,
        "seotrieuview": 230,
        "link4m": 200
    }

    if type not in coin_amounts:
        return "Loại không hợp lệ"

    try:
        with open("users.json", "r", encoding="utf-8") as f:
            users = json.load(f)
    except:
        users = {}

    if uid not in users:
        users[uid] = {"coin_normal": 0, "coin_vip": 0}

    users[uid]["coin_normal"] += coin_amounts[type]

    with open("users.json", "w", encoding="utf-8") as f:
        json.dump(users, f, indent=4, ensure_ascii=False)

    return f"Bạn đã nhận +{coin_amounts[type]} coin!"
