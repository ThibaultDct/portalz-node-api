const { v4: uuid } = require('uuid')
const Language = require('../models/index').language
var languageDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    update: update,
}

function findAll() {
    return Language.findAll();
}

function findById(id) {
    return Language.findByPk(id);
}

function deleteById(id) {
    return Language.destroy({ where: { language_id: id } });
}

function create(language) {
    var newLanguage = new Language(language);
    return newLanguage.save();
}

function update(language, id) {
    var updateLanguage = {
        name: language.name,
    };
    return Language.update(updateLanguage, { where: { language_id: id } });
}

module.exports = languageDao