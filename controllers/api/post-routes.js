const router = require('express').Router();
const {User, Post, Category} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
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
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
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
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      category_id: req.body.category_id,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;