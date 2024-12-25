import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CompanyForm from "./components/CompanyForm";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Notifications from "./components/Notifications";

function App() {
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState({});

  const handleAddCompany = (company) => {
    setCompanies((prev) => [...prev, { id: Date.now(), ...company }]);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Communication Tracker</h1>

      {/* Company Management Form */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add Company</h2>
        <CompanyForm onSubmit={handleAddCompany} />
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
