const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const {User, Post, Category} = require('../models');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'title',
          'post_text',
          'user_id',
          'category_id',
          'created_at',
        ],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
              model: Category,
              attributes: ['category_name']
          }
        ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('search', { posts, loggedIn: true });
        //res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;