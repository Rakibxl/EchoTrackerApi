const mongoose = require('mongoose');
const Waste = require('./models/Waste'); // Update with the correct path to your Home model
const WasteCategory = require('./models/WasteCategory'); // Update with the correct path to your WasteCategory model

require('dotenv').config({ path: '.env.development' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
  seedDB();
}).catch(err => {
  console.error("MongoDB Connection Error:", err);
});

const seedDB = async () => {
  try {
    // Clear out the existing data
    await Waste.deleteMany({});
    await WasteCategory.deleteMany({});

    // Create some WasteCategory instances
    const category1 = new WasteCategory({ description: 'Blue Bin' });
    await category1.save();

    const category2 = new WasteCategory({ description: 'Garbage Bin' });
    await category2.save();

    // Create some Home instances
    const waste1 = new Waste({
      description: 'Vegetable Discards',
      image: 'path/to/plastic_image.jpg', // Replace with your image path or URL
      IDWasteCategory: category1._id
    });
    await waste1.save();

    const waste2 = new Waste({
      description: 'Plastic Water Bottles',
      image: 'path/to/paper_image.jpg', // Replace with your image path or URL
      IDWasteCategory: category2._id
    });
    await waste2.save();

    console.log('Database seeded!');

  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    // Close the connection to the DB
    mongoose.connection.close();
  }
};
