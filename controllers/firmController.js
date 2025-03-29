const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./uploads/");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmname, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "vender not found" });
    }
    if (!firmname) {
      return res.status(400).json({ error: "firmname is required" });
    }
    const firm = new Firm({
      firmname,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });
    const savedFirm = await firm.save();
    const firmId = savedFirm._id;
    const vendorFirmName = savedFirm.firmName;
    vendor.firm.push(savedFirm);
    await vendor.save();

    return res.status(200).json({ message: "firm added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error in firm controller");
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId);
    if (!deletedFirm) {
      return res.status(404).json({ error: "No Firm found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = { addFirm: [upload.single("image"), addFirm], deleteFirmById }; //02:06:00
