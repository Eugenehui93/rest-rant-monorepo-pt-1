const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
        where:{email:req.body.email}
    })

    if (!user || !await bcrypt.compare(req.body.password,user.passwordDigest)){
        res.status(404).json({
            message: "Could not find a user with the provided name and password"
        })

    }
    else{
        const result = await jwt.encode(processs.env.JWT_SECRET, {id:user.userId})
        res.json({user:user,token:result.value})
    }
})

module.exports = router

router.get('/profile', async (req, res) => {
    try {
            const [method, token] = req.headers.authorization.split(' ')

            if (method == 'Bearer') {

            const result = await jwt.decode(process.env.JWT_SECRET, token)

            const { id } = result.value

            let user = await User.findOne({
                where: {
                        userId: id
                    }
                })           
                res.json(user)
            }
        } catch (err){ 
                res.json(null)
            }
        })
        
        module.exports = router