import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const UpdateMemberDialog = ({ isOpen, onClose, member, onUpdateMember }) => {
  const [updatedMember, setUpdatedMember] = useState(null);

  useEffect(() => {
    setUpdatedMember(member);
  }, [member]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split(".");

    setUpdatedMember((prevState) => ({
      ...prevState,
      adress: [{ ...prevState.adress[0], [childKey]: value }], // assuming you only have one address object
    }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split(".");
    setUpdatedMember((prevState) => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        [childKey]: value,
      },
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
      setUpdatedMember((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Updated member:", updatedMember);

    onUpdateMember(updatedMember._id, {
      memberFirstName: updatedMember.memberName.memberFirstName,
      memberLastName: updatedMember.memberName.memberLastName,
      identityMember: updatedMember.identityMember,
      city: updatedMember.adress[0].city,
      street: updatedMember.adress[0].street,
      numberOfStreet: updatedMember.adress[0].numberOfStreet,
      dateOfBirth: updatedMember.dateOfBirth,
      telephone: updatedMember.telephone,
      mobilePhone: updatedMember.mobilePhone,
    });

    onClose();
    setUpdatedMember(null);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Update Member</DialogTitle>
      <DialogContent>
        <TextField
          name="memberName.memberFirstName"
          label="First Name"
          value={updatedMember ? updatedMember.memberName.memberFirstName : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="memberName.memberLastName"
          label="Last Name"
          value={updatedMember ? updatedMember.memberName.memberLastName : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="identityMember"
          label="Identity Number"
          value={updatedMember ? updatedMember.identityMember : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="adress[0].city"
          label="City"
          value={updatedMember ? updatedMember.adress[0].city : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="adress[0].street"
          label="Street"
          value={updatedMember ? updatedMember.adress[0].street : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="adress[0].numberOfStreet"
          label="Number of Street"
          value={updatedMember ? updatedMember.adress[0].numberOfStreet : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          value={updatedMember ? updatedMember.dateOfBirth : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="telephone"
          label="Telephone"
          value={updatedMember ? updatedMember.telephone : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="mobilePhone"
          label="Mobile Phone"
          value={updatedMember ? updatedMember.mobilePhone : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMemberDialog;
