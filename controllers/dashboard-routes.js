const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const {User, Post, Category} = require('../models');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
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
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/edit/:id', withAuth, (req,res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'post_text',
          'user_id',
          'category_id',
          'created_at',
        ],
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
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }

          const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})

module.exports = router;