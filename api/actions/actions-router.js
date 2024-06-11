// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const { validateActionId, validateAction } = require('./actions-middlware')
const router = express.Router()

// [GET] /api/actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

// [GET] /api/actions/:id
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
  })

// [POST] /api/actions
router.post('/', validateAction, async (req, res, next) => {
    try {
        const action = await Actions.insert(req.body)
        res.status(201).json(action)
    } catch (err) {
        next(err)
    }
})

// [PUT] /api/actions/:id
router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
    try {
      const updatedAction = await Actions.update(req.params.id, req.body)
      res.status(200).json(updatedAction)
    } catch (err) {
      next(err)
    }
  })

// [DELETE] /api/actions/:id

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
      const count = await Actions.remove(req.params.id)
      res.status(200).json({ message: 'Action deleted' })
    } catch (err) {
      next(err)
    }
  })

module.exports = router