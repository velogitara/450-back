const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const options = {
  // explorer: true,
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

module.exports = router;
