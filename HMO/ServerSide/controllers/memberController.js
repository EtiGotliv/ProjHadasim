const Member = require("../models/Member");
const Vaccin = require("../models/Vaccin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// @desc Get all members
// @route GET /members
// @access Private
const getAllMember = asyncHandler(async (req, res) => {
  const members = await Member.find().lean();
  if (!members?.length) {
    return res.status(400).json({ message: "No member found" });
  }
  res.json(members);
});

const getMemberById = asyncHandler(async (req, res) => {
  const { id_ } = req.params;
  console.log(id_);
  const member = await Member.findById(id_).exec();
  if (!member) {
    return res.status(400).json({ message: "No member found" });
  }
  res.json(member);
});

const getMemberByIdentifyNumber = asyncHandler(async (req, res) => {
  const { identityMember } = req.params;
  console.log(identityMember);
  const member = await Member.findOne({ identityMember }).lean().exec();
  if (!member) {
    return res.status(400).json({ message: "No member found" });
  }
  res.json(member);
});

const getMemberByCity = asyncHandler(async (req, res) => {
  const { city } = req.params;
  console.log(city);
  const member = await Member.find({ city }).lean().exec();
  if (!member) {
    return res.status(400).json({ message: "No member found" });
  }
  res.json(member);
});

// @desc Create new member
// @route GET /members
// @access Private
const createNewMember = asyncHandler(async (req, res) => {
  const {
    memberFirstName,
    memberLastName,
    identityMember,
    city,
    street,
    numberOfStreet,
    dateOfBirth,
    telephone,
    mobilePhone,
  } = req.body;

  // Todo: validtion on all inputs

  // Confirm data
  if (
    !memberFirstName ||
    !memberLastName ||
    !identityMember ||
    !city ||
    !street ||
    !numberOfStreet ||
    !dateOfBirth
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Custom validation to ensure at least one phone number is provided
  if (!telephone && !mobilePhone) {
    return res.status(400).json({
      message: "At least one of Telephone or Mobile Phone is required",
    });
  }

  // Check if member with the same identity card already exists
  const existingMember = await Member.findOne({ identityMember }).lean().exec();
  if (existingMember) {
    return res
      .status(409)
      .json({ message: "Duplicate member (based on identity card)" });
  }

  // Create and store new member
  const member = await Member.create({
    memberName: {
      memberFirstName,
      memberLastName,
    },
    identityMember,
    adress: [
      {
        city,
        street,
        numberOfStreet,
      },
    ],
    dateOfBirth,
    telephone,
    mobilePhone,
  });

  if (member) {
    //created
    res.status(201).json(member);
  } else {
    res.status(400).json({ message: "Invalid member data received" });
  }
});

// @desc Update a member
// @route PATCH /members
// @access Private
// body example:
// {
//     "memberFirstName": "eti",
//     "memberLastName": "goot",
//     "identityMember": "213497877",
//     "city": "elad",
//     "street": "eeee",
//     "numberOfStreet": "11",
//     "dateOfBirth": "12/12/2000",
//     "telephone": "213456789",
//     "mobilePhone": "1223566",
//     "numVaccin": 0
// }
const updateMember = asyncHandler(async (req, res) => {
  const { id_ } = req.params;
  const {
    memberFirstName,
    memberLastName,
    identityMember,
    city,
    street,
    numberOfStreet,
    dateOfBirth,
    telephone,
    mobilePhone,
  } = req.body;

  // Todo: validtion on all inputs

  console.log(id_);

  // Does the user exist to update?
  let member = await Member.findById(id_).exec();
  if (!member) {
    return res.status(400).json({ message: "Member Not Found" });
  }

  // Confirm data
  if (
    !id_ ||
    !memberFirstName ||
    !memberLastName ||
    !identityMember ||
    !city ||
    !street ||
    !numberOfStreet ||
    !dateOfBirth
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Custom validation to ensure at least one phone number is provided
  if (!telephone && !mobilePhone) {
    return res.status(400).json({
      message: "At least one of Telephone or Mobile Phone is required",
    });
  }

  // Check if member with the same identity card already exists
  const existingMember = await Member.findOne({ identityMember }).lean().exec();

  if (existingMember._id.toString() != member._id.toString()) {
    return res
      .status(409)
      .json({ message: "Duplicate member (based on identity card)" });
  }

  // Update member fields
  member.memberName.memberFirstName = memberFirstName;
  member.memberName.memberLastName = memberLastName;
  member.identityMember = identityMember;
  member.adress[0].city = city;
  member.adress[0].street = street;
  member.adress[0].numberOfStreet = numberOfStreet;
  member.dateOfBirth = dateOfBirth;
  member.telephone = telephone;
  member.mobilePhone = mobilePhone;

  // Save updated member
  member = await member.save();
  res.json(member);
});

// @desc Delete a member
// @route DELETE /members
// @access Private
const deleteMember = asyncHandler(async (req, res) => {
  const { id_ } = req.params;

  console.log(id_);

  // Confirm data
  if (!id_) {
    return res.status(400).json({ message: "Member ID Required" });
  }

  // Does the user exist to delete?
  const member = await Member.findById(id_).exec();

  if (!member) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await member.deleteOne();

  const reply = `Username ${
    member.memberName.memberFirstName + " " + member.memberName.memberLastName
  } with ID ${id_} deleted`;

  res.json(reply);
});

module.exports = {
  getAllMember,
  getMemberById,
  getMemberByIdentifyNumber,
  getMemberByCity,
  createNewMember,
  updateMember,
  deleteMember,
};
