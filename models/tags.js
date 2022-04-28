const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const tag = sequelize.define(
    "tag",
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "name",
      },
      description: {
        type: DataTypes.STRING(255),
        field: "description",
      },
      postId: { type: DataTypes.INTEGER.UNSIGNED, field: 'post_id' },
    },
    {
      tableName: "tags",
      timestamps: false,
      classMethods: {
        associate: function() {
          tag.belongsTo(
            this.models().post,
            { as: 'posts', foreignKey: 'postId', timestamps: false }
          )
        },
        update: function (obj, id) {
          return tag.find({
            where: {
              id: id
            }
          }).then(function(row) {
            if(row){
              return row.updateAttributes(_.omit(obj, 'id'));
            }
          }); 
        },
      }
    },
  );

  return tag;
};
