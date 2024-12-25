import React from 'react'
import { useState } from 'react'

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
    }

  return (
      <>
        
      </>
  )
}

export default CompanyForm