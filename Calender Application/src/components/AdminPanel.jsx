import React, { useState } from 'react';
import CompanyForm from './CompanyForm';  // Admin form to add companies
import MethodManager from './MethodManager'; 

const AdminPanel = ({ companies, methods, onAddCompany, onAddMethod }) => {
    return (
        <div>
            <h2>Admin Panel</h2>
          
            <div>
                <h3>Add Company</h3>
                <CompanyForm onAddCompany={onAddCompany} />
            </div>
          
            <div>
                <h3>Manage Communication Methods</h3>
                <MethodManager methods={methods} onAddMethod={onAddMethod} />
            </div>
          
            {/* You can include a list of companies and communication methods here */}
        </div>
    );
};

export default AdminPanel