import React,{useState,useEffect} from 'react';
import CompanyForm from './CompanyForm';
import MethodManager from './MethodManager';
import Notifications from './Notifications';

const AdminPanel = () => {

    const [companies, setCompanies] = useState([]);
    const [communications, setCommunications] = useState({});
    const [methods, setMethods] = useState([]);

    const handleAddCompany = (company) => {
        setCompanies((prev) => [...prev, { id: Date.now(), ...company }]);
      };
    
      const handleAddMethod = (method) => {
        setMethods((prev) => [...prev, { id: Date.now(), ...method }]);
      };
    

    const onUpdateCommunications = (companyId, updatedComms) => {
        setCommunications((prev) => ({ ...prev, [companyId]: updatedComms }));
      };
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const companiesResponse = await fetch("/data/companies.json");
            const companiesData = await companiesResponse.json();
            if (companiesData.companies && Array.isArray(companiesData.companies)) {
              setCompanies(companiesData.companies);
            } else {
              console.error("Invalid data format");
              setCompanies([]);
            }
      
            const communicationsResponse = await fetch("/data/communications.json");
            const communicationsData = await communicationsResponse.json();
            if (communicationsData && typeof communicationsData === "object") {
              setCommunications(communicationsData);
            } else {
              console.error("Invalid communications format");
              setCommunications({});
            }
      
            const methodsResponse = await fetch("/data/methods.json");
            const methodsData = await methodsResponse.json();
            setMethods(Array.isArray(methodsData) ? methodsData : []);
          } catch (error) {
            console.error("Failed to fetch data", error);
          }
        };
    
        fetchData();
    }, []);
    

    const onAddCompany = (company) => setCompanies([...companies, company]);
    const onAddMethod = (method) => setMethods([...methods, method]);
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Admin Panel</h2>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Add Company</h2>
                <CompanyForm onSubmit={onAddCompany} />
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Manage Communication Methods</h2>
                <MethodManager methods={methods} onAddMethod={onAddMethod} />
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Notifications</h2>
                <Notifications
                  overdue={companies.filter((c) => communications[c.id]?.some(comm => comm.date < new Date()))}
                  dueToday={companies.filter((c) => communications[c.id]?.some(comm => comm.date === new Date().toISOString().split("T")[0]))}
                />
            </section>
        </div>
    );
};

export default AdminPanel;
