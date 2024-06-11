// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
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
router.get('/:id', async (req, res, next) => {
    try {
      const action = await Actions.get(req.params.id);
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    } catch (err) {
      next(err);
    }
  })

// [POST] /api/actions
router.post('/', async (req, res, next) => {
    try {
        const action = await Actions.insert(req.body)
        res.status(201).json(action)
    } catch (err) {
        next(err)
    }
})

// [PUT] /api/actions/:id
router.put('/:id', async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        if (updatedAction) {
            res.status(200).json(updatedAction)
        } else {
            res.status(404).json({ message: 'Action not found' })
        }
    } catch (err) {
        next(err)
    }
})

// [DELETE] /api/actions/:id

router.delete('/:id', async (req, res, next) => {
    try {
        const count = await Actions.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({ message: 'Action deleted' })
        } else {
            res.status(404).json({ message: 'Action not found' })
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router