const router = require('express').Router()
const homeController = require('../controller/indexController')
const {catchErrors} = require('../handlers/errorHandlers')

// Set up our Routes
router.route('/').get(catchErrors(homeController.getImages))
router.route('/image/:id').get(homeController.fullImage)
router.route('/search/').get(homeController.search)


module.exports = router