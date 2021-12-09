const express = require('express')
const router = express.Router();

// @router GET api/auth
// desc Get logged in user
// @acess private

router.get('/', (req,res) => {
    res.json({msg:'GET A LOGGED IN USER'})
});

// @ROUTER POST /api/auth
// @desc Auth user & get token
// @acess public

router.post('/' ,(req,res) => {
    res.json({msg: 'log in a user and get token'})
})

module.exports = router;

