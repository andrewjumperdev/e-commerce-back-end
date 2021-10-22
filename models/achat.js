module.exports = (sequelize, Datatypes) => {
  Achat = sequelize.define('Achat', {
    userId: {
      type: Datatypes.INTEGER,
    },
    productId: {
      type: Datatypes.INTEGER,
    },
    quantity: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
  });
  return Achat;
};
