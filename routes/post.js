const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller')
const addminMiddleware = require("../middlewares/adminMiddleware")

router.post('/',addminMiddleware,postController.create)
router.get('/',postController.getAll)
router.get('/single',postController.getSingle)
router.post('/edit',addminMiddleware,postController.edit)
router.post('/delete',addminMiddleware,postController.deletePost)

module.exports = router