import React, { useState } from "react";

const AddMemberDialog = ({ isOpen, onClose, onAddMember }) => {
  const [newMember, setNewMember] = useState({
    memberName: {
      memberFirstName: "",
      memberLastName: "",
    },
    identityMember: "",
    adress: [
      {
        city: "",
        street: "",
        numberOfStreet: "",
      },
    ],
    dateOfBirth: "",
    telephone: "",
    mobilePhone: "",
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split(".");
    setNewMember((prevState) => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split(".");

    setNewMember((prevState) => ({
      ...prevState,
      adress: [{ ...prevState.adress[0], [childKey]: value }], // assuming you only have one address object
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "memberName.memberFirstName" ||
      name === "memberName.memberLastName"
    ) {
      handleNameChange(e);
    } else if (name.includes("adress")) {
      handleAddressChange(e);
    } else {
      setNewMember((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      memberName: { memberFirstName, memberLastName },
      identityMember,
      adress: [{ city, street, numberOfStreet }],
      dateOfBirth,
      telephone,
      mobilePhone,
    } = newMember;

    onAddMember({
      memberFirstName,
      memberLastName,
      identityMember,
      city,
      street,
      numberOfStreet,
      dateOfBirth,
      telephone,
      mobilePhone,
    })
      .then(() => {
        // Resetting the state for newMember after successfully adding a member
        setNewMember({
          memberName: {
            memberFirstName: "",
            memberLastName: "",
          },
          identityMember: "",
          adress: [
            {
              city: "",
              street: "",
              numberOfStreet: "",
            },
          ],
          dateOfBirth: "",
          telephone: "",
          mobilePhone: "",
        });
      })
      .catch((error) => {
        console.error("Error adding member:", error);
      });
  };

  return (
    <div className={`dialog ${isOpen ? "open" : ""}`}>
      <div className="dialog-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Member</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "centerS",
          }}
        >
          <label>
            First Name:
            <input
              type="text"
              name="memberName.memberFirstName"
              value={newMember.memberName.memberFirstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="memberName.memberLastName"
              value={newMember.memberName.memberLastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Identity Number:
            <input
              type="text"
              name="identityMember"
              value={newMember.identityMember}
              onChange={handleChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="adress[0].city"
              value={newMember.adress[0].city}
              onChange={handleChange}
            />
          </label>
          <label>
            Street:
            <input
              type="text"
              name="adress[0].street"
              value={newMember.adress[0].street}
              onChange={handleChange}
            />
          </label>
          <label>
            Number of Street:
            <input
              type="number"
              name="adress[0].numberOfStreet"
              value={newMember.adress[0].numberOfStreet}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={newMember.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <label>
            Telephone:
            <input
              type="tel"
              name="telephone"
              value={newMember.telephone}
              onChange={handleChange}
            />
          </label>
          <label>
            Mobile Phone:
            <input
              type="tel"
              name="mobilePhone"
              value={newMember.mobilePhone}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Member</button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberDialog;
