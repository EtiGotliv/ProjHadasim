//const Member = require('../models/Member')
const Vaccin = require("../models/Vaccin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Member = require("../models/Member");

// @desc Get all vaccinations
// @route GET /vaccinations
// @access Private
const getAllVaccin = asyncHandler(async (req, res) => {
  const vaccins = await Vaccin.find().lean();
  if (!vaccins?.length) {
    return res.status(400).json({ message: "No vaccinatins found" });
  }
  res.json(vaccins);
});

const getAllVaccinByIdentityMember = asyncHandler(async (req, res) => {
  const { identityMember } = req.params;

  const vaccins = await Vaccin.find({ identityMember }).lean().exec();
  if (!vaccins?.length) {
    return res.status(400).json({ message: "No vaccinatins found" });
  }
  res.json(vaccins);
});

// @desc Create new vaccination
// @route GET /vaccinations
// @access Private
const createNewVaccin = asyncHandler(async (req, res) => {
  const { identityMember, vaccineDate, manuFacturer } = req.body;

  try {
    // Confirm data
    if (!identityMember || !vaccineDate || !manuFacturer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exisitingMember = await Member.findOne({ identityMember });

    if (!exisitingMember) {
      return res
        .status(409)
        .json({ message: "Member does not exist in member collection." });
    }
    // Check if member with the same identity card already exists
    const existingVaccin = await Vaccin.findOne({
      identityMember,
      vaccineDate,
    });

    console.log(existingVaccin);

    if (existingVaccin) {
      return res
        .status(409)
        .json({ message: "Duplicate Vaccination (based on identity card)" });
    }

    // Check if the maximum number of vaccinations (4) for this member has been reached
    const vaccinationCount = await Vaccin.countDocuments({ identityMember });
    if (vaccinationCount >= 4) {
      return res
        .status(400)
        .json({
          message:
            "The maximum amount of vaccinations (4) has been reached for this member.",
        });
    }
    // Create and store new member
    const vaccination = await Vaccin.create({
      identityMember,
      vaccineDate,
      manuFacturer,
    });

    exisitingMember.numVaccin += 1;

    console.log(exisitingMember);

    // Save updated member
    await exisitingMember.save();
    if (vaccination) {
      //created
      res
        .status(201)
        .json({ message: `New vaccination of ${identityMember} created` });
    } else {
      res.status(400).json({ message: "Invalid vaccination data received" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// @desc Update a vaccination
// @route PATCH /vaccinations
// @access Private
const updateVaccin = asyncHandler(async (req, res) => {
  const { id, identityMember, vaccineDate, manuFacturer } = req.body;

  // Confirm data
  if (!id || !identityMember || !vaccineDate || !manuFacturer) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Does the user exist to update?
  const vacc = await Vaccin.findById(id).exec();
  if (!vacc) {
    return res.status(400).json({ message: "Vaccination Not Found" });
  }

  // Check if member with the same identity card already exists
  const existingVaccin = await Vaccin.findOne({
    identityMember,
    _id: { $ne: id },
  })
    .lean()
    .exec();
  if (existingMember) {
    return res
      .status(409)
      .json({ message: "Duplicate Vaccination (based on identity card)" });
  }

  // Check if memberId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Vaccination ID" });
  }

  // Allow updates to the original user
  if (existingVaccin && existingVaccin?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate vaccination" });
  }

  // Find the member by ID
  let vaccination = await Vaccin.findById(id);
  if (!vaccination) {
    return res.status(404).json({ message: "Vaccination not found" });
  }

  // Update member fields
  vaccination.identityMember = identityMember;
  vaccination.vaccineDate = vaccineDate;
  vaccination.manuFacturer = manuFacturer;

  // Save updated member
  vaccination = await vaccination.save();
  res.json({
    message: `Vaccination with the ID ${vaccination.identityMember} updated`,
  });
});

// @desc Delete a vaccination
// @route DELETE /vaccinations
// @access Private
const deleteVaccin = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Vaccination ID Required" });
  }

  // Does the user exist to delete?
  const vaccin = await Vaccin.findById(id).exec();

  const identityMember = vaccin.identityMember;

  const exisitingMember = await Member.findOne({ identityMember });

  if (!vaccin) {
    return res.status(400).json({ message: "vaccin not found" });
  }

  await vaccin.deleteOne();

  exisitingMember.numVaccin -= 1;

  console.log(exisitingMember);

  // Save updated member
  await exisitingMember.save();

  const reply = `Vaccin deleted`;

  res.json(reply);
});

module.exports = {
  getAllVaccin,
  getAllVaccinByIdentityMember,
  createNewVaccin,
  updateVaccin,
  deleteVaccin,
};
