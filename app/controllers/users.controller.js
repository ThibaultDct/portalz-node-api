const userDao = require('../dao/user.dao')

var userController = {
  addUser: addUser,
  findUsers: findUsers,
  findUserById: findUserById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
}

function addUser(req, res) {
  let user = req.body;
  userDao.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when adding user"
      })
    })
}

function findUsers(req, res) {
  userDao.findAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        users: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when finding users"
      })
    })
}

function findUserById(req, res) {
  userDao.findById(req.params.id)
    .then((data) => {
      res.status(200).json({
        success: true,
        user: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when finding user " + req.params.id
      })
    })
}

function updateUser(req, res) {
  userDao.update(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "🆗 User successfully updated.",
        user: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when updating user " + req.params.id
      })
    })
}

function deleteUserById(req, res) {
  userDao.deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "🆗 User successfully deleted.",
        user: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when deleting user " + req.params.id
      })
    })
}

module.exports = userController