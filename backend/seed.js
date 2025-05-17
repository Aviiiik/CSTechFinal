require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
  });

  const email = 'avikmallick1@gmail.com';
  const exists = await User.findOne({ email });

  if (exists) {
    console.log('User already exists');
    return process.exit();
  }

  const plainPassword = 'test1';
  await new User({ email, password: plainPassword }).save();

  console.log(`✅ Seeded user: ${email} / ${plainPassword}`);
  process.exit();
}

seed();
