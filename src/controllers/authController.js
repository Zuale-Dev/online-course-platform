const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Ju lutem plotësoni të gjitha fushat",
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Përdoruesi ekziston tashmë",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "student",
  });

  if (user) {
    return res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Të dhënat e user-it janë të pavlefshme",
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Ju lutem vendosni email dhe password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    return res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Email ose password i gabuar",
    });
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  return res.json({
    success: true,
    data: user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
