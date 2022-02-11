module.exports = (req, res, next) => {
    console.log(req.body)
    if (req.method === 'POST' && req.path === '/login') {
        if (req.body.username === 'jack' && req.body.password === '12345') {
            return res.status(200).json({
                user: {
                    token: '123'
                }
            })
        } else {
            return res.status(400).json({
                message: 'username or password error!'
            })
        }
    }
    next()
}