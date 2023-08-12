const express = require('express');

const router = express.Router();
const { orders: ctrl } = require('../../controllers');
const {
  validateBody,
  isValidId,
  auth,
  ctrlWrapper,
  modifyRequestBody,
} = require('../../middlewares');
const { orderJoiSchemas } = require('../../models/order');

// router.get('/', ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));
router.get('/', ctrlWrapper(ctrl.getAll));

router.post(
  '/',
  ctrlWrapper(modifyRequestBody),
  validateBody(orderJoiSchemas.addSchema),
  ctrlWrapper(ctrl.add)
);

// router.get('/:contactId', ctrlWrapper(auth), isValidId, ctrlWrapper(ctrl.getById));

// router.put(
//   '/:contactId',
//   ctrlWrapper(auth),
//   isValidId,
//   validateBody(idpHelpJoiSchemas.addSchema),
//   ctrlWrapper(ctrl.updateById)
// );

// router.patch(
//   '/:contactId/favorite',
//   ctrlWrapper(auth),
//   isValidId,
//   validateBody(idpHelpJoiSchemas.updateFavorite),
//   ctrlWrapper(ctrl.updateById)
// );

router.delete('/:contactId', ctrlWrapper(auth), isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
