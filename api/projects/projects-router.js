// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const { validateProjectId, validateProject } = require('./projects-middleware')
const router = express.Router()

// [GET] api/projects
router.get('/', async (req, res, next) => {
    try {
      const projects = await Projects.get()
      res.status(200).json(projects)
    } catch (err) {
      next(err)
    }
})

// [GET] api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project)
})

// [GET] /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

// [POST] /api/projects

router.post('/', validateProject, async (req, res, next) => {
    try {
        const project = await Projects.insert(req.body)
        res.status(201).json(project)
    } catch (err) {
        next(err)
    }
})

// [PUT] /api/projects/:id

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
      const updatedProject = await Projects.update(req.params.id, req.body)
      res.status(200).json(updatedProject)
    } catch (err) {
      next(err)
    }
  })

// [DELETE] /api/projects/:id

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
      const count = await Projects.remove(req.params.id)
      res.status(200).json({ message: 'Project deleted' })
    } catch (err) {
      next(err)
    }
  })

module.exports = router