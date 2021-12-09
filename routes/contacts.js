const express = require('express');
const router = express.Router();

// will have four routes because it a CRUD route

// @router POST api/contacts
// @desc create a new contact
// @access private

router.post('/', (req, res) => {
    res.json({msg: 'Create a new contact route'})
});

// @router GET api/contacts
// @desc get all users contacts
// @acess private

router.get('/' , (req, res) => {
    res.json({msg: 'get all users contacts'})
})

// @router PUT api/contact/:id
// @desc to update a users contacts
// @access private

router.put('/:id', (req, res) => {
    res.json({msg: 'Update Contact'})
})

// @router DELETE api/contacts/delete/:id
// @desc to Delete a user contact
// @access private

router.delete('/:id' , (req, res) => [
    res.json({msg: 'Delete a contact'})
])

module.exports = router;
