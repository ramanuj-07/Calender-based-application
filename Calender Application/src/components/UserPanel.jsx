import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserPanel = ({ communications }) => {
    return (
        <div>
            <h2>User Dashboard</h2>
            {/* Displaying communications or companies */}
            {Object.entries(communications).map(([companyId, comms]) => (
                <div key={companyId}>
                    <h3>Company: {companyId}</h3>
                    <ul>
                        {comms.map((comm, idx) => (
                            <li key={idx}>
                                {comm.type} - Status: {comm.status} - Due: {comm.dueDate}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default UserPanel