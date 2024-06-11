// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
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
router.get('/:id', async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: 'Project not found' })
        }
    } catch (err) {
        next(err)
    }
})

// [POST] /api/projects

router.post('/', async (req, res, next) => {
    try {
        const project = await Projects.insert(req.body)
        res.status(201).json(project)
    } catch (err) {
        next(err)
    }
})

// [PUT] /api/projects/:id

router.put('/:id', async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body)
        if (updatedProject) {
            res.status(200).json(updatedProject)
        } else {
            res.status(404).json({ message: 'Project not found' })
        }
    } catch (err) {
        next(err)
    }
})

// [DELETE] /api/projects/:id

router.delete('/:id', async (req, res, next) => {
    try {
        const count = await Projects.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({ message: 'Project deleted'})
        } else {
            res.status(404).json({ message: 'Project not found' })
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router