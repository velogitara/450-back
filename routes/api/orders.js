const express = require('express');

const router = express.Router();
const { orders: ctrl } = require('../../controllers');
const { validateBody, isValidId, auth, ctrlWrapper } = require('../../middlewares');
const { orderJoiSchemas } = require('../../models/order');

router.get('/', ctrlWrapper(ctrl.getAll));

router.post('/', validateBody(orderJoiSchemas.addSchema), ctrlWrapper(ctrl.add));

router.get('/:orderId', isValidId, ctrlWrapper(ctrl.getOrderById));

router.patch(
  '/:orderId/add-person',
  isValidId,
  validateBody(orderJoiSchemas.addPersonToOrderSchema),
  ctrlWrapper(ctrl.addPersonToOrder)
);
router.get('/:orderId/:personId', isValidId, ctrlWrapper(ctrl.activatePerson));

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
