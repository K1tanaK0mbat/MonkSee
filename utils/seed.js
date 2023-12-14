const connection = require('../config/connection');
const {User, Thought} = require('../models');
const seedData = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    let userMap = {};
    try {
        console.log('Database connected');


        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Existing data cleared');

        const insertedUsers = await User.insertMany(seedData.users);
        insertedUsers.forEach(user => {
            userMap[user.username] = user._id;
        });

        const thoughtsData = seedData.thoughts.map(thought => ({
            ...thought,
            userId: userMap[thought.username]
        }));
        await Thought.insertMany(thoughtsData);

   
        for (const username in seedData.friends) {
            const user = await User.findOne({ username });
            const friendIds = seedData.friends[username].map(friendUsername => userMap[friendUsername]);
            user.friends = friendIds;
            await user.save();
        }

        console.log('Seeding complete! 🌱');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
});