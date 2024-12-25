import React from "react";

const Dashboard = ({ companies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Company</th>
            <th className="border px-4 py-2">Last 5 Communications</th>
            <th className="border px-4 py-2">Next Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className={`$ {
                company.overdue
                  ? "bg-red-500 text-white"
                  : company.dueToday
                  ? "bg-yellow-300"
                  : ""
              }`}
            >
              <td className="border px-4 py-2">{company.name}</td>
              <td className="border px-4 py-2">
                {company.lastCommunications?.join(", ") || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {company.nextCommunication || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
