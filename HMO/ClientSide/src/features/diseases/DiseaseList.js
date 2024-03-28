import React, { useState, useEffect } from "react";
import "./DiseaseList.css";

const DiseaseList = () => {
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3500/diseases')
            .then(response => response.json())
            .then(data => setDiseases(data))
            .catch(error => console.error("Error fetching diseases", error));
    }, []);

    return (
        <div className="diseaseList">
            <h1>Disease List</h1>
            <table>
                <caption>List of Diseases</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vaccination Date</th>
                        <th>Recovery Date</th>
                    </tr>
                </thead>
                <tbody>
                    {diseases.map(disease => (
                        <tr key={disease._id}>
                            <td>{disease.identityMember}</td>
                            <td>{disease.positiveResultDate}</td>
                            <td>{disease.recoveryDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DiseaseList;
