const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');


connection.on('error', (err) => err);

connection.once('open', async () => {
    try {
        await connection.open();
        console.log('Database connected');


        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Existing data cleared');

        const insertedUsers = await User.insertMany(seedData.users);
        console.log('Users inserted:', insertedUsers.length);


        console.table(students);
        console.info('Seeding complete! 🌱');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
});



