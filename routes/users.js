const express = require("express");
const router = express.Router();

// @router POST api/user
// @desc register a user
// @acess Public

router.get('/' ,(req, res) => {
    res.json({msg: 'Register a new user route'})
});

module.exports = router;
