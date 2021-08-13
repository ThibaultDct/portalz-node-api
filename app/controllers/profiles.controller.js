const profileDao = require('../dao/profile.dao')

var profileController = {
  addProfile: addProfile,
  findProfiles: findProfiles,
  findProfileById: findProfileById,
  updateProfile: updateProfile,
  deleteProfileById: deleteProfileById,
}

function addProfile(req, res) {
  let profile = req.body;
  profileDao.create(profile)
    .then((data) => {
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

module.exports = profileController