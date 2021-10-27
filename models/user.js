const Achat = require('./achat');

module.exports = (sequelize, Datatypes) => {
  User = sequelize.define('User', {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    sold: {
      type: Datatypes.DOUBLE,
      allowNull: false,
    },
    role: {
      type: Datatypes.STRING,
      allowNull: false,
      require: true,
    },
  });
  return User;
};
