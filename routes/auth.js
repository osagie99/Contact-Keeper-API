const express = require('express')
const router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {body, validationResult} = require ('express-validator')
const User = require('../models/User')
const auth = require('../middleware/auth')

// @router GET api/auth
// desc Get logged in user
// @access private

router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch (error) {
        console.error(err.message)
        res.status(500).send('server error')
    }
});

// @ROUTER POST /api/auth
// @desc Auth user & get token
// @acess public

router.post('/' , [
    body('email').isEmail().withMessage('Please Enter an email'),
    body('password').exists().withMessage('Please enter a password')
], async (req,res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).send('No user found')
        }
        // check password against hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).send('Wrong password')
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn: 360000
        },(err, token)=>{
            if(err) throw err
            res.json({token})

        })
    } catch (error) {
        
    }
})

module.exports = router;

