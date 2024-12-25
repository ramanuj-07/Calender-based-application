import { useState } from 'react'
import './App.css'
import CompanyForm from "./components/CompanyForm";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Notifications from "./components/Notifications";
import MethodManager from './components/MethodManager';

function App() {
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState({});
  const [methods, setMethods] = useState([
    { id: 1, name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { id: 2, name: "LinkedIn Message", description: "Message via LinkedIn", sequence: 2, mandatory: true },
    { id: 3, name: "Email", description: "Send an email", sequence: 3, mandatory: true },
    { id: 4, name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
    { id: 5, name: "Other", description: "Other forms of communication", sequence: 5, mandatory: false }
  ]);

  const handleAddCompany = (company) => {
    setCompanies((prev) => [...prev, { id: Date.now(), ...company }]);
  };
  const handleAddMethod = (method) => {
    setMethods((prev) => [...prev, { id: Date.now(), ...method }]);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Communication Tracker</h1>

      {/* Company Management Form */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add Company</h2>
        <CompanyForm onSubmit={handleAddCompany} />
      </section>
      {/* {Company Method Manager} */}
      <section className='mb-8'>
      <h2 className="text-xl font-bold mb-4">Manage Communication Methods</h2>
      <MethodManager methods={methods} onAddMethod={handleAddMethod} />
      </section>
      {/* Notifications Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <Notifications
          overdue={companies.filter((c) => c.overdue)}
          dueToday={companies.filter((c) => c.dueToday)}
        />
      </section>

      {/* Dashboard Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <Dashboard companies={companies} />
      </section>

      {/* Calendar Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Calendar</h2>
        <Calendar communications={communications} />
      </section>
    </div>
  );
};

export default App
