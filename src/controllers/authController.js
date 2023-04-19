const jwt = require('jsonwebtoken')

const userLogin = (req, res) => {

    const user = req.user

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_HASH,
        { expiresIn: '8h' }
    )

    return res.json({ ...user, token })

}

module.exports = {
    userLogin
}