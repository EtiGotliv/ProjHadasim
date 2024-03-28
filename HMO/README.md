# Patient management system

This project is a patient management system aimed at efficient management of patient records, including personal details, vaccination history and dates of illness and recovery.

## Table of Contents

- [installation] (#installation)
- [Usage] (#usage)
- [features] (#features)

## installation

To get started with the patient management system, follow these steps:

1. **Duplicate the repository**:
      In the fire
      Clone git https://github.com/your-username/patient-management-system.git
      ```

2. **installation dependency**:
      Navigate to the project directory and install the required dependencies for both the server and the client:
      In the fire
      CD patient management system
      npm install
      CD client
      npm install
      ```

3. **Set up MongoDB**:
      Make sure MongoDB is installed and running on your system. Update the MongoDB connection string in the server configuration file (`server/config/db.js`) if necessary.

4. **Start the server and client**:
      In separate terminal windows, start the server and the client:
      In the fire
      # Start the server
      Getting started with npm

      # Start the client
      CD client
      Getting started with npm
      ```

## Usage

Once the server and client are up and running, you can access the patient management system in your web browser. The system provides the following features:

1. **Show all members**:
      - Access to the list of all patients.
      - Add new patients, update existing records or delete patients.

2. **Show all vaccines**:
      - See a list of all the vaccines given to patients.

3. **Show all dates of illness and recovery**:
      - See a list of all illness and recovery dates for patients.

## Properties

### Patient management
- **Add a new member**:
     - Entering personal details and vaccination details for a new patient.
- **Update member details**:
     - Introducing the member, change existing patient records, including personal details, vaccination history, illness and recovery dates.
- **delete friend**:
     - Removing patients from the database.

Like this for each database separately

### Detailed information about the patient
- **Personal Information**:
     - Access to comprehensive personal information for each patient.
- **vaccination history**:
     - Review each patient's vaccination history.
- **Dates of illness and recovery**:
     - View dates of illness and recovery for each patient.