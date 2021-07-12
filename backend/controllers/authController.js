const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlerwares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Registering a user ==> api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "hello",
      url: "world",
    },
  });

  sendToken(user, 200, res);
});

// Login user  ----> /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email and password", 400));
  }

  // Find user in DB
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Check if password correct
  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  sendToken(user, 200, res);
});
