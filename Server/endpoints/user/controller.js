const user = require('../../models/user')

exports.register = (req, res, next) => {
    console.log("Dieter")
    user.create(req.body).then(async user => {
        return res.status(200).json(user.strip())
    }).catch(err => {
        next({ status: 500, message: err.message })
    })
}
