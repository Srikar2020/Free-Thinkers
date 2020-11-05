const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const categoryRoutes = require('./category-routes.js');
const postRoutes = require('./post-routes.js');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);

module.exports = router;