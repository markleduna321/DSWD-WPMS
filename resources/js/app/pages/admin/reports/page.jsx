import React, { useState } from 'react';
import AdminLayout from '../layout';
import ReportSearchSection from './_sections/report-search-section';
import ReportTableSection from './_sections/report-table-section';
import { ArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';

export default function ReportsPage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('report-table'); // Get the table by its ID

    if (!printContent) {
      console.error("Table content not found.");
      return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');

    printWindow.document.write(`
      <html>
        <head>
          <title>Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border: 1px solid #000; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h2>Report</h2>
          ${printContent.outerHTML} <!-- This ensures the full table is copied -->
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };



  const handleDownloadExcel = () => {
    if (searchResults.length === 0) {
      alert("No data to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(searchResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

    // Auto-adjust column width
    const columnWidths = Object.keys(searchResults[0] || {}).map(key => ({ wch: key.length + 5 }));
    worksheet['!cols'] = columnWidths;

    XLSX.writeFile(workbook, 'report.xlsx');
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Reports Page</h1>
      <div className="mt-2">
        <div className='flex justify-between gap-5'>
          <div>
            <ReportSearchSection onSearch={handleSearch} />
          </div>
          {/* Buttons for Print and Download */}
          <div className="flex gap-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-2 h-8 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <PrinterIcon className="h-5 w-5" />
              
            </button>

            <button
              onClick={handleDownloadExcel}
              className="inline-flex items-center px-2 h-8 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              <ArrowDownIcon className="h-5 w-5" />
             
            </button>
          </div>

        </div>



        {/* Table with report data */}
        <div className="mt-4">
          <ReportTableSection data={searchResults} />
        </div>
      </div>
    </AdminLayout>
  );
}
