import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword} = req.body;
  
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }
    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);

    const imageUrl = req.file 
    ? `/uploadsUniv/${req.file.filename}` 
    : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(fullname)}`;

    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
      image: imageUrl
    });
    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          image: newUser.image,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};

// export const login= async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       res.status(400).json({ msg: "Enter email and password" });
//   }
//   try {
//       const findUser = await User.findOne({ email });
//       if (!findUser) {
//           return res.status(404).json({ msg: "User not found" });
//       }
//       let isMatch = await bcrypt.compare(password, findUser.password);

//       if (!isMatch) {
//           return res.status(400).json({ msg: "Incorrect password" })
//       }
//        // Generate JWT token
//        const token = createToken(findUser._id,findUser.email);
//        res.setHeader('Authorization', `Bearer ${token}`);
//       res.status(200).json({
//           msg: "User login Successfully",
//           UserDetails: {
//               fullname: findUser.firstname + ' ' + findUser.lastname,
//               gender: findUser.gender,
//               token:token

//           }
//       });
//   } catch (error) {
//       res.status(500).json({ msg: "Internal server error" });
//   }
// }
