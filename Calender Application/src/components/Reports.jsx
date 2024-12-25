import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { saveAs } from "file-saver";


const Reports = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
    const generateFrequencyData = () => {
      const frequency = {};
      Object.values(communications).forEach((comms) => {
        comms.forEach(({ type }) => {
          frequency[type] = (frequency[type] || 0) + 1;
        });
      });
      return frequency;
    };
  
    const frequencyData = generateFrequencyData();
  
    const downloadCSV = () => {
      let csvContent = "data:text/csv;charset=utf-8,Type,Count\n";
      Object.entries(frequencyData).forEach(([type, count]) => {
        csvContent += `${type},${count}\n`;
      });
      const encodedUri = encodeURI(csvContent);
      saveAs(encodedUri, "communication_report.csv");
    };
  
    return (
      <div>
        <h3 className="font-bold text-lg mb-4">Communication Frequency Report</h3>
        <div className="mb-4">
          <Bar
            data={{
              labels: Object.keys(frequencyData),
              datasets: [
                {
                  label: "Frequency",
                  data: Object.values(frequencyData),
                  backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0"],
                },
              ],
            }}
          />
        </div>
  
        <h3 className="font-bold text-lg mb-4">Engagement Effectiveness Dashboard</h3>
        <Pie
          data={{
            labels: Object.keys(frequencyData),
            datasets: [
              {
                label: "Effectiveness",
                data: Object.values(frequencyData),
                backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0"],
              },
            ],
          }}
        />
  
        <h3 className="font-bold text-lg mb-4">Downloadable Reports</h3>
        <button
          onClick={downloadCSV}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export CSV
        </button>
      </div>
    );
}

export default Reports;