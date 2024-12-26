import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [companies, setCompanies] = useState([]);
  const [methods, setMethods] = useState([]);
  const [communications, setCommunications] = useState([]);

  const onAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  // Function to handle adding a method (example)
  const onAddMethod = (newMethod) => {
    setMethods([...methods, newMethod]);
  };
  const handleUpdateCommunications = (companyId, newCommunication) => {
    setCommunications((prev) => ({
      ...prev,
      [companyId]: prev[companyId] ? [newCommunication, ...prev[companyId]].slice(0, 5) : [newCommunication]
    }));
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
          
          {/* Admin Route */}
          {isAuthenticated && userRole === 'admin' && (
            <Route path="/admin" element={<AdminPanel companies={companies} methods={methods} onAddCompany={onAddCompany} onAddMethod={onAddMethod} />} />
          )}
          
          {/* User Route */}
          {isAuthenticated && userRole === 'user' && (
            <Route path="/dashboard" element={<UserPanel communications={communications}  companies={companies}
            methods={methods}
            handleUpdateCommunications={handleUpdateCommunications}/>} />
          )}
          
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
