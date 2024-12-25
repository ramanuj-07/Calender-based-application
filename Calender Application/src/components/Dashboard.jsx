import React,{useState} from "react";

const Dashboard = ({
  companies,
  communications,
  methods,
  onUpdateCommunications,
}) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCommunication, setNewCommunication] = useState({
    type: "",
    date: "",
    notes: "",
  });

  const handleCommunicationChange = (e) => {
    const { name, value } = e.target;
    setNewCommunication({ ...newCommunication, [name]: value });
  };

  const handleSaveCommunication = () => {
    if (selectedCompany) {
      onUpdateCommunications(selectedCompany.id, newCommunication);
      setNewCommunication({ type: "", date: "", notes: "" });
      setShowModal(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Last 5 Communications</th>
            <th className="border px-4 py-2">Next Scheduled</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            const overdue =
              communications[company.id]?.[0]?.date <
              new Date().toISOString().split("T")[0];
            const dueToday =
              communications[company.id]?.[0]?.date ===
              new Date().toISOString().split("T")[0];

            return (
              <tr
                key={company.id}
                className={
                  overdue
                    ? "bg-red-100"
                    : dueToday
                    ? "bg-yellow-100"
                    : "bg-white"
                }
              >
                <td className="border px-4 py-2">{company.name}</td>
                <td className="border px-4 py-2">
                  {communications[company.id]?.map((comm, index) => (
                    <div key={index} className="relative group">
                      <span>
                        {comm.type} - {comm.date}
                      </span>
                      <div className="absolute hidden group-hover:block bg-gray-600 text-white text-xs p-2 rounded">
                        {comm.notes}
                      </div>
                    </div>
                  )) || "N/A"}
                </td>
                <td className="border px-4 py-2">
                  {methods[0]?.name || "N/A"} -{" "}
                  {new Date().toISOString().split("T")[0]}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowModal(true);
                    }}
                  >
                    Log Communication
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-lg font-bold mb-4">Log Communication</h2>
            <select
              name="type"
              value={newCommunication.type}
              onChange={handleCommunicationChange}
              className="w-full border mb-4 p-2 rounded"
            >
              <option value="">Select Type</option>
              {methods.map((method) => (
                <option key={method.id} value={method.name}>
                  {method.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={newCommunication.date}
              onChange={handleCommunicationChange}
              className="w-full border mb-4 p-2 rounded"
            />
            <textarea
              name="notes"
              value={newCommunication.notes}
              onChange={handleCommunicationChange}
              placeholder="Add notes here"
              className="w-full border mb-4 p-2 rounded"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSaveCommunication}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
