const { registerUser, loginUser } = require("../Controller/AuthController");

const router = require("express").Router();

// Register a new user
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// router.get("/addresses", async (req, res) => {
//   try {
//     const addresses = await Address.find({});
//     res.json(addresses);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// router.get("/schedules", async (req, res) => {
//   try {
//     const schedules = await Schedule.find({}).populate(
//       "AddressId IDWasteCategories"
//     );
//     res.json(schedules);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

module.exports = router;
