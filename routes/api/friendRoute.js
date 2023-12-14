// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list

const router = require('express').Router();
const {
  addFriend,
  removeFriend
} = require('../../controllers/userController');


router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
