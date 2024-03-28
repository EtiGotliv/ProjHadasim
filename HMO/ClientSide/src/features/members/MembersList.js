import React, { useState, useEffect } from "react";
import "./MemberList.css";
import { FaInfo, FaTrash } from "react-icons/fa";
import AddMemberDialog from "./AddMemberDialog"; // Import the dialog component
import UpdateMemberDialog from "./UpdateMemberDialog";
import dayjs from "dayjs";

const MembersList = () => {
  const [members, setMembers] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [vaccinationHistory, setVaccinationHistory] = useState([]);
  const [vaccinationHistoryMember, setVaccinationHistoryMember] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3500/members")
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members", error));

    fetch("http://localhost:3500/vaccins")
      .then((response) => response.json())
      .then((data) => setVaccinationHistory(data))
      .catch((error) => console.error("Error fetching members", error));
  }, []);

  const handleRowClick = (member, event) => {
    // Check if the click target or its parent has the class 'trashIcon'
    if (
      event.target.classList.contains("trashIcon") ||
      event.target.parentNode.classList.contains("trashIcon")
    ) {
      // If it's the trash icon or info icon, do not open the dialog
      return;
    } else if (
      event.target.classList.contains("infoIcon") ||
      event.target.parentNode.classList.contains("infoIcon")
    ) {
      console.log(vaccinationHistory);
      console.log(member);
      // Filter vaccination history by identityMember
      const filteredVaccinationHistory = vaccinationHistory.filter(
        (vaccination) => vaccination.identityMember == member.identityMember
      );

      console.log("filteredVaccinationHistory");

      console.log(filteredVaccinationHistory);

      // Sort filtered vaccination history by vaccineDate
      filteredVaccinationHistory.sort((a, b) => {
        // Assuming vaccineDate is in ISO date format, you can compare them directly
        return new Date(a.vaccineDate) - new Date(b.vaccineDate);
      });

      // Set filtered and sorted vaccination history to state
      setVaccinationHistoryMember(filteredVaccinationHistory);

      return;
    }
    // Open the dialog for other cases
    setSelectedMember(member);

    setShowUpdateDialog(true);
  };

  //   const fetchVaccinationHistory = (identityMember) => {
  //     fetch(`http://localhost:3500/vaccines/byIdentifyMember/${identityMember}`)
  //       .then((response) => response.json())
  //       .then((data) => setVaccinationHistory(data))
  //       .catch((error) =>
  //         console.error("Error fetching vaccination history", error)
  //       );
  //   };

  const handleAddMember = (newMember) => {
    return new Promise((resolve, reject) => {
      // Send POST request to create new member
      try {
        fetch("http://localhost:3500/members", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to add member");
            }
          })
          .then((data) => {
            console.log(data);
            console.log(newMember);
            setMembers((prevMembers) => [...prevMembers, data]);
            setShowDialog(false);
            resolve(); // Resolve the promise when member is successfully added
          })
          .catch((error) => {
            console.error("Error adding member:", error);
            reject(error); // Reject the promise if there's an error
          });
      } catch (error) {
        console.error(error);
        reject(error); // Reject the promise if there's an error
      }
    });
  };

  const handleUpdateMember = (memberId, updatedMemberData) => {
    fetch(`http://localhost:3500/members/${memberId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMemberData),
    })
      .then((response) => {
        if (response.ok) {
          // Assuming the response contains the updated member data
          return response.json();
        } else {
          throw new Error("Failed to update member");
        }
      })
      .then((data) => {
        console.log("Updated member:", data);
        // Update the specific row in the table with the new values
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member._id === memberId ? { ...member, ...data } : member
          )
        );
        setShowUpdateDialog(false); // Close the update dialog
      })
      .catch((error) => {
        console.error("Error updating member:", error);
        // Handle error as needed
      });
  };

  const handleDeleteMember = (id) => {
    try {
      fetch(`http://localhost:3500/members/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          // Update state to remove the deleted member
          setMembers((prevMembers) =>
            prevMembers.filter((member) => member._id !== id)
          );
          // Clear selected member if it's the one being deleted
          if (selectedMember && selectedMember._id === id) {
            setSelectedMember(null);
          }
        } else {
          console.log(response);
          throw new Error("Failed to delete member");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="memberList">
      <h1>Members List</h1>
      <table>
        <caption>List of Members</caption>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Identify Number</th>
        </thead>
        <tbody>
          {members &&
            members.map((member) => (
              <tr
                key={member._id}
                onClick={(event) => handleRowClick(member, event)}
              >
                <td>{member.memberName.memberFirstName}</td>
                <td>{member.memberName.memberLastName}</td>
                <td>{member.identityMember}</td>
                <FaTrash
                  className="trashIcon"
                  onClick={() => handleDeleteMember(member._id)}
                  style={{ marginRight: "10px" }}
                />
                <FaInfo
                  className="infoIcon"
                  onClick={() => setSelectedMember(member)}
                />
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => setShowDialog(true)}>Add Member</button>
      <AddMemberDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onAddMember={handleAddMember}
      />

      {selectedMember && (
        <div>
          <h2>Mmember Information</h2>
          <p>First Name: {selectedMember.memberName.memberFirstName}</p>
          <p>Last Name: {selectedMember.memberName.memberLastName}</p>
          <p>Identify Number: {selectedMember.identityMember}</p>
          <p>
            Adress: {selectedMember.adress[0].street}{" "}
            {selectedMember.adress[0].numberOfStreet},{" "}
            {selectedMember.adress[0].city}
          </p>
          <p>Date Of Birth: {selectedMember.dateOfBirth}</p>
          <p>Telephone: {selectedMember.telephone}</p>
          <p>mobilePhone: {selectedMember.mobilePhone}</p>
          <p>Num of vaccins: {selectedMember.numVaccin}</p>
          <h2>Vaccination History</h2>
          {vaccinationHistoryMember.map((vaccination) => (
            <div
              key={vaccination._id}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ marginRight: "20px" }}>
                Vaccination Date:{" "}
                {dayjs(vaccination.vaccineDate).format("DD/MM/YYYY")}
              </p>
              <p>Manufacturer: {vaccination.manuFacturer}</p>
            </div>
          ))}
          {selectedMember && (
            <UpdateMemberDialog
              isOpen={showUpdateDialog}
              onClose={() => setShowUpdateDialog(false)}
              member={selectedMember}
              onUpdateMember={handleUpdateMember}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default MembersList;
