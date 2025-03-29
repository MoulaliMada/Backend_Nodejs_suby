const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();

const secreteKey = process.env.whatIsYourName;

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("Email already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();

    res.status(201).json({ message: "Vendor registered successfully" });
    console.log("registered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginVendor = await Vendor.findOne({ email });
    if (
      !loginVendor ||
      !(await bcrypt.compare(password, loginVendor.password))
    ) {
      return res.status(401).json({ error: "Ivalid username or password" });
    }

    const token = jwt.sign({ vendorId: loginVendor._id }, secreteKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: "Login Successfully", token });

    console.log(email, "this is token", token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendor = await Vendor.find().populate("firm");
    res.json({ vendor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }
    return res.status(200).json({vendor});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors ,getVendorById};
