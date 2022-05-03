'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0,255]
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        len: [0,255],
        isUrl: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,255]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,255]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,2]
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,5]
      }
    },
    lat: {
      type: DataTypes.NUMERIC,
      validate: {
        isDecimal: true,
        max: 180,
        min: -180
      }
    },
    lng: {
      type: DataTypes.NUMERIC,
      validate: {
        isDecimal: true,
        max: 90,
        min: -90
      }
    },
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.belongsTo(models.User, { foreignKey: 'ownerId' });
  };
  return Business;
};