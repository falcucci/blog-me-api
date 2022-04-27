const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  let tag = sequelize.define(
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
      timestamps: false
    }
  );

  return tag;
};
