const models = require('../models');
var fs = require('fs');

// save on db
function save(req, res) {
  console.log(req);
  const reqAchat = req.body;
  // console.log(req);
  const post = {
    userId: reqAchat.userId,
    productId: reqAchat.productId,
    quantity: reqAchat.quantity
  };

  models.Achat.create(post)
    .then((result) => {
      res.status(201).json({
        message: 'achat created!',
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'cannot create achat',
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
  let result = models.Post.findAll()

    .then(async (result) => {
      // let posts = result;
      let posts = [];
      for (let index = 0; index < result.length; index++) {
        const post = result[index];
        const comments = await models.Comment.findAll({
          where: {
            postId: post.id,
          },
        });

        // // * get the comment creator names
        let comments_tmp = [];

        for (let index2 = 0; index2 < comments.length; index2++) {
          const element = comments[index2];
          const creators = await models.User.findAll({
            where: {
              id: element.userId,
            },
          });

          comments_tmp.push({
            ...element['dataValues'],
            creator: creators[0].nom + ' ' + creators[0].prenom,
          });
        }
        console.log(comments_tmp);

        // * get likes of the post
        const likes = await models.Like.findAll({
          where: {
            idPost: post.id,
          },
        });

        // * get the creator of the post info

        const creators = await models.User.findAll({
          where: {
            id: post.userId,
          },
        });
        posts.push({
          ...result[index]['dataValues'],
          comments: comments_tmp,
          likes: likes,
          creator: creators[0].nom + ' ' + creators[0].prenom,
        });
      }

      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'cannot find!',
      });
    });
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
