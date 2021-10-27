const models = require('../models');
var fs = require('fs');

// save on db
function save(req, res) {
  console.log(req);
  const reqProduct = req.body;
  // console.log(req);
  const product = {
    name: reqProduct.name,
    characteristic: reqProduct.characteristic,
    price: reqProduct.price,
    image: reqProduct.image,
    stock: reqProduct.stock
  };

  models.Product.create(product)
    .then((result) => {
      res.status(201).json({
        message: 'product created!',
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'cannot created product',
        err: err,
      });
    });
}

// find specific post on db

function showOne(req, res) {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Post not found!' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'cannot find!',
      });
    });
}

// find all post on db

function showAll(req, res) {
  models.Product.findAll().then(result=>{
    for (let index = 0; index < result.length; index++) {
     result[index].getAchats().then(achats=>{
        console.log(achats);
      });
      
    }
    res.status(200).json(result);

  }).catch(err =>{
    res.status(500).json(err);

  })

}

// update post

async function update(req, res) {
  const reqPost = JSON.parse(req.body.data);

  const id = req.params.id;
  console.log(req);
  let updatePost = {};
  if (req.file.path) {
    // delete the old image of the post if a new image was provided
    await models.Post.findByPk(id)
      .then((result) => {
        if (result) {
          fs.unlinkSync(result.image_url);
        } else {
          res.status(404).json({ message: 'Post not found!' });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'cannot find!',
        });
      });

    updatePost = {
      titre: reqPost.titre,
      contenu: reqPost.contenu,
      image_url: req.file.path,
      categorie: reqPost.categorie,
    };
  } else {
    updatePost = {
      titre: reqPost.titre,
      contenu: reqPost.contenu,
      categorie: reqPost.categorie,
    };
  }

  console.log(updatePost);

  models.Post.update(updatePost, { where: { id: id } }).then((result) => {
    res
      .status(200)
      .json({
        message: 'Post Updated!',
        post: updatePost,
      })
      .catch((err) => {
        res.status(500).json({
          message: 'cannot update!',
          err: err,
        });
      });
  });
}

// delete post

function destroyPost(req, res) {
  models.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId === req.user.userId || req.user.role === 'admin') {
        post.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'post deleted!' });
      } else {
        res.status(404).json({ message: 'cannot deleted!' });
      }
    })
    .catch((error) => console.log(error));
}

module.exports = {
  save: save,
  showOne: showOne,
  showAll: showAll,
  update: update,
  destroyPost: destroyPost,
};
