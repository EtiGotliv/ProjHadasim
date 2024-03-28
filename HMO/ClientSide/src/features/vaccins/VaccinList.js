import React, { useState, useEffect } from "react";
//import "./VaccineList.css";

const VaccinList = () => {
     const [vaccines, setVaccines] = useState([]);

     useEffect(() => {
         fetch('http://localhost:3500/vaccins')
             .then(response => response.json())
             .then(data => setVaccines(data))
             .catch(error => console.error("Error fetching vaccines", error));
     }, []);
 
     return (
         <div className="vaccineList">
             <h1>Vaccine List</h1>
             <table>
                 <caption>List of Vaccines</caption>
                 <thead>
                     <tr>
                         <th>Member ID</th>
                         <th>Vaccination Date</th>
                         <th>Manufacturer</th>
                     </tr>
                 </thead>
                 <tbody>
                 {vaccines.map(vaccin => (
                         <tr key={vaccin._id}>
                             <td>{vaccin.identityMember}</td>
                             <td>{vaccin.vaccineDate}</td>
                             <td>{vaccin.manufacturer}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
     );
};

export default VaccinList;
