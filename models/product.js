const Achat = require('./achat');

module.exports = (sequelize, Datatypes) => {
  Product = sequelize.define('Product', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    characteristic: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    price: {
      type: Datatypes.DOUBLE,
      allowNull: false,
    },
    image: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    stock: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
  });

  return Product;
};
