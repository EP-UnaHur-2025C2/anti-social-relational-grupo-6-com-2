const { Router } = require('express')
const router = Router()

const userRoutes = require('./user_routes')
const tagRoutes = require('./tag_routes')
const postImagesRoutes = require('./postImages_routes')
const postRoutes = require('./post_routes')
const commentRoutes = require('./comment_routes')

router.use("/users", userRoutes)
router.use("/tags", tagRoutes)
router.use("/images", postImagesRoutes)
router.use("/posts", postRoutes)
router.use("/comments", commentRoutes)

module.exports = router;