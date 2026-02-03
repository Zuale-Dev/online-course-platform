const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Krijimi i përdoruesit në DB
    const user = await User.create({
      name,
      email,
      password, // Shënim: Nesër do e bëjmë hash me bcrypt
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { registerUser };