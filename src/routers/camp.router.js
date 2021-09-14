const router = require('express').Router()

const campCtrl = require('../controllers/camp.controller')

router.route('/').get(campCtrl.list_all_camps).post(campCtrl.create)
router.route('/create').get(campCtrl.create_form)
router.route('/:id/edit').get(campCtrl.update_form)
router
  .route('/:id')
  .get(campCtrl.display_camp)
  .patch(campCtrl.update)
  .delete(campCtrl.delete)

router.param('id', campCtrl.loadById)

module.exports = router
