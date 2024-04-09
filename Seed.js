const mongoose = require('mongoose');
const Waste = require('./models/Waste'); 
const WasteCategory = require('./models/WasteCategory'); 
const Address = require('./models/Address'); 
const Schedule = require('./models/Schedule'); 
const ApiCredential = require('./models/ApiCredential');

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
    // await Waste.deleteMany({});
    // await WasteCategory.deleteMany({});
    // await Address.deleteMany({});
    // await Schedule.deleteMany({});
     await ApiCredential.deleteMany({});


    // Create some WasteCategory instances
    // const category1 = new WasteCategory({ description: 'Blue Bin' });
    // await category1.save();

    // const category2 = new WasteCategory({ description: 'Garbage Bin' });
    // await category2.save();

    // const blueBin = new WasteCategory({ description: 'Blue Bin' });
    // await blueBin.save();

    // const garbageBin = new WasteCategory({ description: 'Garbage Bin' });
    // await garbageBin.save();


    // Create an Address instance
    // const address = new Address({ address: 'Scarborough' });
    // await address.save();

    // Create some Home instances
    // const waste1 = new Waste({
    //   description: 'Vegetable Discards',
    //   image: 'path/to/plastic_image.jpg', 
    //   IDWasteCategory: blueBin._id
    // });
    // await waste1.save();

    // const waste2 = new Waste({
    //   description: 'Plastic Water Bottles',
    //   image: 'path/to/paper_image.jpg', 
    //   IDWasteCategory: garbageBin._id
    // });
    // await waste2.save();

    // const scheduleDate = new Date(2024, 1, 20); 
    // const schedule = new Schedule({
    //   ScheduleDate: scheduleDate,
    //   AddressId: address._id,
    //   IDWasteCategories: [blueBin._id, garbageBin._id] 
    // });
    // await schedule.save();


    const mailgunCredentials = new ApiCredential({
      serviceProvider: 'mailgun',
      apiKey: 'ecotracker',
      password: 'df1614430bf65fa0edda1410169068cd-4b670513-0821a00c'
    });
    await mailgunCredentials.save();

    console.log('Database seeded!');

  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    // Close the connection to the DB
    mongoose.connection.close();
  }
};
