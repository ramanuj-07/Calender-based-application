import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { saveAs } from "file-saver";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { jsPDF } from "jspdf";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // This is for Pie chart
);
  
const Reports = ({ communications,methods }) => {
    
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
    const generateFrequencyData = () => {
        if (!communications || Object.keys(communications).length === 0) {
          return {};
        }
      
        const frequency = {};
        Object.entries(communications).forEach(([key, comms]) => {
          if (Array.isArray(comms)) { // Safeguard to ensure comms is an array
            comms.forEach(({ type }) => {
              frequency[type] = (frequency[type] || 0) + 1;
            });
          } else {
            console.warn(`Skipping key ${key}: Value is not an array`, comms);
          }
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


  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text("Communication Frequency Report", 20, 20);
    
    // Content
    let y = 30; // starting Y position for the content
    
    doc.setFontSize(12);
    Object.entries(frequencyData).forEach(([type, count], index) => {
      doc.text(`${type}: ${count}`, 20, y);
      y += 10;
    });

    doc.save("communication_report.pdf");
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
        <div className="flex space-x-4">
        {/* Button to download CSV */}
        <button
          onClick={downloadCSV}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export as CSV
        </button>

        {/* Button to download PDF */}
        <button
          onClick={downloadPDF}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Export as PDF
        </button>
      </div>
      </div>
    );
}

export default Reports;