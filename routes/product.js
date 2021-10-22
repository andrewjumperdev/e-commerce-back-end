const express = require('express');
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const imageUploader = require('../helpers/image-uploader');
const router = express.Router();

router.post(
  '/',
  auth,
  imageUploader.upload.single('image'),
  productController.save
);
router.get('/:id', auth, productController.showOne);
router.get('/', productController.showAll);

router.delete('/:id', auth, productController.destroyPost);

module.exports = router;
