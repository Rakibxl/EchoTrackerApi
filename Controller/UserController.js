const User = require("../models/User");

const getSingleProfile = async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById(userId).populate("address").exec();

    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user);
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phonenumber: user.phonenumber,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred while fetching user details.");
  }
};

const editSingleProfile = async (req, res) => {
  try {
    const { userid } = req.params;
    const {
      firstName,
      lastName,
      email,
      phonenumber,
      streetName,
      postalCode,
      city,
      province,
      aptNumber,
    } = req.body;
    let updateData = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (streetName) updateData.streetName = streetName;
    if (postalCode) updateData.postalCode = postalCode;
    if (city) updateData.city = city;
    if (province) updateData.province = province;
    if (aptNumber) updateData.aptNumber = aptNumber;
    if (email) updateData.email = email;
    if (phonenumber) updateData.phonenumber = phonenumber;

    const user = await User.findByIdAndUpdate(userid, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phonenumber: user.phonenumber,
        streetName: user.streetName,
        city: user.city,
        province: user.province,
        postalCode: user.postalCode,
        aptNumber: user.aptNumber,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getSingleProfile, editSingleProfile };
