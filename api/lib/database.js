// Mock database - CẦN THAY THẾ BẰNG REAL DATABASE
let users_data = {};

function load_data(file_name) {
    return users_data;
}

function save_data(data, file_name) {
    users_data = { ...data };
    return true;
}

function get_user_data(user_id) {
    const user_id_str = String(user_id);
    if (!users_data[user_id_str]) {
        users_data[user_id_str] = {
            coin_normal: 0,
            coin_vip: 0,
            total_coin_earned_weekly: 0
        };
    }
    return users_data[user_id_str];
}

function save_user_data(user_id, data) {
    users_data[String(user_id)] = data;
    return true;
}

module.exports = {
    users_data,
    load_data,
    save_data,
    get_user_data,
    save_user_data
};
