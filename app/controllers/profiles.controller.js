const profileDao = require('../dao/profile.dao');
const userDao = require('../dao/user.dao');

var profileController = {
  addProfile: addProfile,
  findProfiles: findProfiles,
  findProfileById: findProfileById,
  updateProfile: updateProfile,
  deleteProfileById: deleteProfileById,
  getProfileByUserId: getProfileByUserId,
}

function addProfile(req, res) {
  let user_id = req.params.id
  let profile = req.body;
  let created = profileDao.create(profile)
    .then((data) => {
      let user = userDao.findById(user_id)
        .then(function (user) {
          if (!user) {
            res.status(404).json({
              success: false,
              message: `❓ No user found with ID ${user_id}`
            })
          }
          user.setProfile(created)
        })
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when adding profile"
      })
    })
}

function findProfiles(req, res) {
  profileDao.findAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        profiles: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when finding profiles"
      })
    })
}

function findProfileById(req, res) {
  profileDao.findById(req.params.id)
    .then((data) => {
      res.status(200).json({
        success: true,
        profile: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when finding profile " + req.params.id
      })
    })
}

function updateProfile(req, res) {
  profileDao.update(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "🆗 Profile successfully updated.",
        profile: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when updating profile " + req.params.id
      })
    })
}

function deleteProfileById(req, res) {
  profileDao.deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "🆗 Profile successfully deleted.",
        profile: data,
        elapsedTime: res.elapsedTime
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "✖️ An error occured when deleting profile " + req.params.id
      })
    })
}

function getProfileByUserId(req, res) {
  let id = req.params.id
  let user = userDao.findById(id)
    .then(function (user) {
      if (!user) {
        res.status(404).json({
          success: false,
          message: `❓ No user found with ID ${id}`
        })
      }
      let profile = user.getProfile()
        .then(associatedProfile => {
          res.status(200).json({
            success: true,
            user: user,
            profile: associatedProfile
          })
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: `✖️ An error occured when getting profile from user ${id}`
          })
        })
    })
}

module.exports = profileController