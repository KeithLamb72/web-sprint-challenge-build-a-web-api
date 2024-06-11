// add middlewares here related to actions
const Actions = require('./actions-model')

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ message: "Action not found" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to get action" });
      });
  }

function validateAction(req, res, next) {
    if (!req.body.description || !req.body.notes) {
        return res.status(400).json({ message: "Missing required fields"})
    }
    next()
}

module.exports = {
    validateActionId,
    validateAction,
}