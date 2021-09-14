const Camp = require('../models/camp.model')

/**
 * @description display all camps
 * @route /camps
 * @method GET
 */
exports.list_all_camps = async (req, res, next) => {
  try {
    const camps = await Camp.find()
    res.render('pages/camps/list_all', { camps })
  } catch (e) {
    next(e)
  }
}

/**
 * @description display creating form
 * @route /camps/create
 * @method GET
 */
exports.create_form = (req, res) => {
  res.render('pages/camps/create_form')
}

/**
 * @description create new camp
 * @route /camps
 * @method POST
 */
exports.create = async (req, res, next) => {
  try {
    await Camp.create(req.body)
    res.redirect('/camps')
  } catch (e) {
    next(e)
  }
}

/**
 * @description load a camp by id
 * @route /camps/:id
 */
exports.loadById = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id)
    req.camp = camp
    next()
  } catch (e) {
    next(e)
  }
}

/**
 * @description display a camp by id
 * @route /camps/:id
 * @method GET
 */
exports.display_camp = (req, res) => {
  const { camp } = req
  res.render('pages/camps/display_camp', { camp })
}

/**
 * @description display update form
 * @route /camps/:id/edit
 * @method GET
 */
exports.update_form = (req, res) => {
  const { camp } = req
  res.render('pages/camps/update_form', { camp })
}

/**
 * @description update camp
 * @route /camps/:id
 * @method PATCH
 */
exports.update = async (req, res, next) => {
  const { camp } = req
  try {
    const updates = ['title', 'location', 'price', 'description']
    updates.forEach((update) => {
      camp[update] = req.body[update] || camp[update]
    })
    await camp.save()
    res.redirect(`/camps/${camp._id}`)
  } catch (e) {
    next(e)
  }
}

/**
 * @description delete camp
 * @route /camps/:id
 * @method DELETE
 */
exports.delete = async (req, res, next) => {
  const { camp } = req
  try {
    await camp.remove()
    res.redirect('/camps')
  } catch (e) {
    next(e)
  }
}
