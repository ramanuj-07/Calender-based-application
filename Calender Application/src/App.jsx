import { useState,useEffect } from 'react'
import './App.css'
import CompanyForm from "./components/CompanyForm";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Notifications from "./components/Notifications";
import MethodManager from './components/MethodManager';
import Reports from './components/Reports';


function App() {
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState({});
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesResponse = await fetch("/data/companies.json");
        const companiesData = await companiesResponse.json();
  
        if (companiesData.companies && Array.isArray(companiesData.companies)) {
          setCompanies(companiesData.companies); // Access nested 'companies' key
        } else {
          console.error("Invalid data format: companies.json should contain a 'companies' array.");
          setCompanies([]); // Fallback to an empty array
        }
  
        const communicationsResponse = await fetch("/data/communications.json");
        const communicationsData = await communicationsResponse.json();
        // setCommunications(communicationsData); // Ensure object structure
        if (communicationsData && typeof communicationsData === "object") {
          Object.entries(communicationsData).forEach(([key, value]) => {
            if (!Array.isArray(value)) {
              console.error(`Key ${key} in communications is not an array. Value:`, value);
            }
          });
          setCommunications(communicationsData);
        } else {
          console.error("Invalid communications format. Expected an object:", communicationsData);
          setCommunications({});
        }
        
  
        const methodsResponse = await fetch("/data/methods.json");
        const methodsData = await methodsResponse.json();
        setMethods(Array.isArray(methodsData) ? methodsData : []); // Ensure array structure
      } catch (error) {
        console.error("Failed to fetch data: ", error);
        setCompanies([]);
        setCommunications({});
        setMethods([]);
      }
    };
  
    fetchData();
  }, []);
  

  const handleAddCompany = (company) => {
    setCompanies((prev) => [...prev, { id: Date.now(), ...company }]);
  };
  const handleAddMethod = (method) => {
    setMethods((prev) => [...prev, { id: Date.now(), ...method }]);
  };
  const handleUpdateCommunications = (companyId, newCommunication) => {
    setCommunications((prev) => ({...prev, [companyId] : prev[companyId] ? [newCommunication, ...prev[companyId]].slice(0, 5) : [newCommunication]}));
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
        <Dashboard companies={companies}
          communications={communications}
          methods={methods}
          onUpdateCommunications={handleUpdateCommunications} />
      </section>

         {/* Reports Section */}
         <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Reports and Analytics</h2>
        <Reports communications={communications} methods={methods} />
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
