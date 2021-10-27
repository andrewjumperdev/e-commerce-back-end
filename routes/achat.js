const express = require('express');
const achatController = require('../controllers/achat.controller');
const auth = require('../middleware/auth');
const router = express.Router();




router.post('/', auth, achatController.save);
router.get('/:id', auth, achatController.showOne);
router.get('/', auth, achatController.showAll);

router.delete('/:id', auth, achatController.destroyPost);

module.exports = router;
