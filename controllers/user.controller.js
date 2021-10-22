const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// signup function

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.send(409).json({ message: 'email already exist!' });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
              solde: req.body.solde,
            };

            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: 'user created!',
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: 'cannot create the user!',
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
}

// login function

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: 'Invalid!',
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                  role: user.role,
                },
                'RANDOM_TOKEN_SECRET',
                function (err, token) {
                  res.status(200).json({
                    message: 'Authentification ok!',
                    token: token,
                    userId: user.id,
                    nom: user.name,
                  });
                }
              );
            } else {
              res.status(401).json({ message: 'Invalid!' });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
}

// delete account

function destroyAccount(req, res) {
  // console.log(req);
  if (req.body.userId === req.user.userId || req.user.role === 'admin') {
    models.Comment.destroy({ where: { userId: req.user.userId } }).then(() => {
      models.Post.destroy({ where: { userId: req.user.userId } }).then(() => {
        models.User.destroy({ where: { id: req.user.userId } })
          .then(() => {
            res.status(200).json({ message: 'User deleted!' });
          })
          .catch((error) => console.log(error));
      });
    });
  } else {
    res.status(401).json({ message: 'Cannot deleted!' });
  }
}

module.exports = {
  signUp: signUp,
  login: login,
  destroyAccount: destroyAccount,
};
