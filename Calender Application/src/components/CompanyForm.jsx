import React from "react";
import { useState } from "react";

const CompanyForm = ({ onSubmit }) => {
  const [company, setCompany] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(company);
    setCompany({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded space-y-4">
      <div>
        <label className="block font-medium">Name: </label>
        <input
          placeholder="Name of the company"
          name="name"
          value={company.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Location:</label>
        <input
          placeholder="Operational location"
          name="location"
          value={company.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Linkdin Profile</label>
        <input
          placeholder="The company’s LinkedIn page"
          name="Linkdin Profile"
          value={company.linkdinProfile}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Emails</label>
        <input
          placeholder="Email address for communication"
          name="Emails"
          value={company.emails}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Phone Number</label>
        <input
          placeholder="Contact numbers for representatives"
          name="Phone Number"
          value={company.phoneNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Comments</label>
        <textarea
          placeholder="Notes or Additional Information"
          name="Comments"
          value={company.comments}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Communication Periodicity</label>
        <input
          placeholder="Time interval for scheduled communications"
          name="Communication Periodicity"
          value={company.communicationPeriodicity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
    </form>
  );
};

export default CompanyForm;
