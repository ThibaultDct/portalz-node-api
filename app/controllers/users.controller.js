const userDao = require('../dao/user.dao')
const profileDao = require('../dao/profile.dao')

var userController = {
  addUser: addUser,
  findUsers: findUsers,
  findUserById: findUserById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
  setProfile: setProfile,
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

function setProfile(req, res) {
  //let profile = profileDao.createFromJson(req.body.bio, req.body.avatar)
  let user = userDao.findById(req.params.id)
    .then(function (user) {
      if (!user) {
        res.status(404).json({
          success: false,
          message: "❓ No user found with given ID"
        })
      }
      user.createProfile({
        bio: req.body.bio,
        avatar: req.body.avatar
      })
        .then(associatedProfile => {
          res.status(200).json({
            success: true,
            message: `✅ Profile set to user ${req.params.id}`
          })
        })
        .catch((error) => {
          console.log(error)
          res.status(500).json({
            success: false,
            message: `✖️ An error occured when setting profile to user ${req.params.id}`
          })
        })
    })
}

module.exports = userController