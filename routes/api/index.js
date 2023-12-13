const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute');
const userRoute = require('./userRoute');
const friendRoute=require('./friendRoute');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);
router.use('/friends', friendRoute);


module.exports = router;
