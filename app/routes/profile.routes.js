const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profiles.controller');

router.post('/:id', profileController.addProfile);
router.get('/', profileController.findProfiles);
router.get('/:id', profileController.findProfileById);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfileById);
router.get('/user/:id', profileController.getProfileByUserId);

module.exports = router;