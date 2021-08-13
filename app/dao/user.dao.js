const { v4: uuid } = require('uuid')
const User = require('../models/index').user
var userDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    update: update,
    // setProfile: setProfile,
}

function findAll() {
    return User.findAll();
}

function findById(id) {
    return User.findByPk(id);
}

function deleteById(id) {
    return User.destroy({ where: { user_id: id } });
}

function create(user) {
    var newUser = new User(user);
    return newUser.save();
}

function update(user, id) {
    var updateUser = {
        username: user.username,
        mail: user.mail,
        password: user.password,
        creation_date: user.creation_date,
        role: user.role
    };
    return User.update(updateUser, { where: { user_id: id } });
}

// function setProfile(profile, id) {
//     var updateUser = User.findByPk(id)
//     return updateUser.setProfile(profile);
// }

module.exports = userDao