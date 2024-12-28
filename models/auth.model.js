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

const getuserByEmailModel = (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email])
};

const updateUserModel = (id, {name, lastname, email, permissions, newpassword}) => {
    if(newpassword !== ''){
        return db.query("UPDATE users SET name = ?, lastname = ?, email = ?, permissions = ?, password = ? WHERE id = ?", [name, lastname, email, permissions, newpassword, id])
    }else{
        return db.query("UPDATE users SET name = ?, lastname = ?, email = ?, permissions = ? WHERE id = ?", [name, lastname, email, permissions, id])
    }
};

const updateUser2Model = (data, id) => {
    const fieldsToUpdate = Object.keys(data).map(key => `${key} = ?`).join(', ');

    return db.query(`UPDATE users SET ${fieldsToUpdate} WHERE id = ?`, 
    [...Object.values(data), id]);
}

const deleteUserModel = (id) => {
    return db.query('DELETE FROM users WHERE id = ?', [id])
};

module.exports = {
    getUserByEmail,
    registrarUser,
    getUserById,
    getAllUsersModel,
    getUserModel,
    getuserByEmailModel,
    updateUserModel,
    updateUser2Model,
    deleteUserModel
}