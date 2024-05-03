const db = require('../configs/db.config').promise();

const getUserByEmail = (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email]);
};

const registrarUser = ({name, lastname, email, password, permissions}) =>{
    return db.query('INSERT INTO users (name, lastname, email, password, permissions) VALUES (?,?,?,?,?)', 
    [name, lastname, email, password, permissions]);
};

const getUserById = (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', [id]);
};

const getAllUsersModel = () => {
    return db.query('SELECT * FROM users')
};

const getUserModel = (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', [id])
};

const updateUserModel = (id, {name, lastname, email, permissions, newpassword}) => {
    if(newpassword !== ''){
        return db.query("UPDATE users SET name = ?, lastname = ?, email = ?, permissions = ?, password = ? WHERE id = ?", [name, lastname, email, permissions, newpassword, id])
    }else{
        return db.query("UPDATE users SET name = ?, lastname = ?, email = ?, permissions = ? WHERE id = ?", [name, lastname, email, permissions, id])
    }
};

const deleteUserModel = (id) => {
    return db.query('DELETE FROM users WHERE id = ?', [id])
};

module.exports = {
    getUserByEmail,
    registrarUser,
    getUserById,
    getAllUsersModel,
    getUserModel,
    updateUserModel,
    deleteUserModel
}