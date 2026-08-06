import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function DownloadReport({
  crops,
  fertilizers,
  pests,
  recommendations,
  users,
}) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Smart Farmer System Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Category", "Count"]],
      body: [
        ["Crops", crops.length],
        ["Fertilizers", fertilizers.length],
        ["Pests", pests.length],
        ["Recommendations", recommendations.length],
        ["Users", users.length],
      ],
    });

    doc.save("SmartFarmerReport.pdf");
  };

  return (
    <div className="card">
      <h2>📄 PDF Report</h2>

      <button onClick={downloadPDF}>
        Download PDF Report
      </button>
    </div>
  );
}

export default DownloadReport;