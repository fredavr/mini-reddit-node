const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController')

/**  
 * Routes CRUD pour les liens
 * CRUD = Create, Read, Update, Delete
**/
router.get('/', linkController.getAllLinks); // /api/links
router.post('/', linkController.createLink);
router.get('/:id', linkController.getLinkById) // /api/links/1
router.put('/:id', linkController.updateLinkById);
router.delete('/:id', linkController.deleteLinkById);

module.exports = router;

