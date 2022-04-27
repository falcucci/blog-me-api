const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  let post = sequelize.define(
    "post",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "title",
      },
      author: {
        type: DataTypes.STRING(255),
        field: "author",
      },
      content: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        field: "content",
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "image",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: "id_category",
      },
    },
    {
      tableName: "posts",
      timestamps: false,
      classMethods: {
        associate: function() {
          post.hasMany(
            this.models().tag,
            { as: 'tags', foreignKey: 'postId', timestamps: false }
          )
          post.hasOne(
            this.models().category,
            { as: 'categories',
              foreignKey: 'postId', timestamps: false }
            )
        },
        findById: function (id) {
          return post.findOne({ where: { id: id }, attributes: { exclude: ['id'] } });
        },
        create: function (obj) {
          return post.build(obj).save()
        },
        update: function (obj, id) {
          return post.find({
            where: {
              id: id
            }
          }).then(function(row) {
            if(row){
              return row.updateAttributes(_.omit(obj, 'id'));
            }
          }); 
        },
        all: function(offset, limit) {
          let filters = [];

          offset = offset || 0;
          limit = limit || 20;
          return post.findAll({ 
            include:[
              {
                model: this.models().category,
                as: 'categories',
                attributes: ['name']
              },
              {
              model: this.models().tag,
              as: 'tags',
              attributes: ['name']
            }], 
            where: { $and: filters }, 
            attributes: { exclude: ['categoryId'] },
            offset: offset, 
            limit: limit 
          }); 
        }
      },
    }
  );

  return post;
};
