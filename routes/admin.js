const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')

router.post('/',adminController.create)
router.post('/login',adminController.login)
router.post('/logout',adminController.logout)

module.exports = router