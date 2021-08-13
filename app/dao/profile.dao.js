const { v4: uuid } = require('uuid')
const Profile = require('../models/index').profile
var profileDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    update: update,
    createFromJson: createFromJson
}

function findAll() {
    return Profile.findAll();
}

function findById(id) {
    return Profile.findByPk(id);
}

function deleteById(id) {
    return Profile.destroy({ where: { profile_id: id } });
}

function create(profile) {
    var newProfile = new Profile(profile);
    return newProfile.save();
}

function update(profile, id) {
    var updateProfile = {
        bio: profile.bio,
        avatar: profile.avatar,
    };
    return Profile.update(updateProfile, { where: { profile_id: id } });
}

function createFromJson(bio, avatar) {
    var toCreate = new Profile()
    toCreate.profile_id = uuid()
    toCreate.bio = bio
    toCreate.avatar = avatar
    toCreate.save()
}

module.exports = profileDao