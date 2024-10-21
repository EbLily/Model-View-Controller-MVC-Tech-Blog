const User = require('./User');
const Tech = require('./Tech');
const Comment = require('./Comment');

User.hasMany(Tech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'techs'
});

Tech.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Tech, Comment };
