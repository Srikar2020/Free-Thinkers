
// import all models
const Post = require('./Post');
const User = require('./User');
const Category = require('./Categories')


// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(Category, {
    foreignkey: 'category_id'
})

Category.hasMany (Post, {
    foreignkey: 'category_id'
})

module.exports = { User, Post, Category };
