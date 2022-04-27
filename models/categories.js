const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  let category = sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "name",
      },
      description: {
        type: DataTypes.STRING(255),
        field: "description",
      }
    },
    {
      tableName: "categories",
      timestamps: false,
      classMethods: {
        create: function (obj) {
          return category.build(obj).save()
        },
        update: function (obj, id) {
          return category.findOne({
            where: {
              id: id
            }
          }).then(function(row) {
            if(row){
              return row.updateAttributes(_.omit(obj, 'id'));
            }
          }); 
        },
        find: function(id) {
          return category.findOne({ 
            where: { id: id }
          })
        }
      },
    }
  );

  return category;
};
