// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjectId(req, res, next) {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if (project) {
              req.project = project 
              next()
            } else {
              res.status(404).json({ message: "Project not found" })
            }
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to get project"})
        })
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !description || typeof completed === 'undefined') {
        return res.status(400).json({ message: "Missing required fields: name, description, or completed" });
    }
    next();
}

module.exports = {
    validateProjectId,
    validateProject,
}