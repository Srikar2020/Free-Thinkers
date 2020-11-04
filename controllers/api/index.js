const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const categoryRoutes = require('./category-routes.js');
//const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
//router.use('/comments', commentRoutes);

module.exports = router;