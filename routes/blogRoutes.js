const express = require('express')
const blogController = require('../controllers/blogController.js')
const router = express.Router()


router.get('/', blogController.blog_index)

router.get('/create', blogController.blog_create_get)

// post handler 
router.post('/', blogController.blog_create_post)

// route parameter handler
router.get('/:id', blogController.blog_details)

// handle a delete request
router.delete('/:id', blogController.blog_delete)

module.exports = router;