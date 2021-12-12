const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')

// @router POST api/user
// @desc register a user
// @acess Public

router.post('/',[
    body('name').not().isEmpty().withMessage('Please enter a Name'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('Password must be greater than 5')
] , async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({msg: "User Already Exists"})
        } else {
            user = new User({name, email, password})
            // hash password with bcrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            // save to database
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload,config.get('jwtSecret'), {
                expiresIn: 36000
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            })
            
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")

    }
});



module.exports = router;
