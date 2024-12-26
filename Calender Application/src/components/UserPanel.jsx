import React from 'react';
import Dashboard from './Dashboard';
import Reports from './Reports';
import Calendar from './Calendar';

const UserPanel = ({ communications, companies, methods, handleUpdateCommunications }) => {
    
    return (
        <div>
            <h2>User Dashboard</h2>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <Dashboard
                  companies={companies}
                  communications={communications}
                  methods={methods}
                  onUpdateCommunications={handleUpdateCommunications}
                />
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Reports and Analytics</h2>
                <Reports communications={communications} methods={methods} />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Calendar</h2>
                <Calendar communications={communications} />
            </section>
        </div>
    );
};

export default UserPanel;
