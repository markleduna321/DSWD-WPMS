import React from 'react';
import * as XLSX from 'xlsx';

export default function ReportTableSection({ data }) {
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Report</title></head><body>');
    printWindow.document.write('<h1>Report Data</h1>');
    printWindow.document.write('<table border="1" style="border-collapse: collapse;">');
    printWindow.document.write('<thead><tr><th>Barangay</th><th>Evacuation Site</th><th>Created At</th></tr></thead>');
    printWindow.document.write('<tbody>');
    
    data.forEach((item) => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${item.barangay}</td>`);
      printWindow.document.write(`<td>${item.evacuation_site}</td>`);
      printWindow.document.write(`<td>${new Date(item.created_at).toLocaleDateString()}</td>`);
      printWindow.document.write('</tr>');
    });

    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadExcel = () => {
    // Convert data to a format compatible with Excel
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      Barangay: item.barangay,
      'Evacuation Site': item.evacuation_site,
      'Created At': new Date(item.created_at).toLocaleDateString(),
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    
    // Download the Excel file
    XLSX.writeFile(workbook, 'report.xlsx');
  };

  return (
    <div className="bg-white shadow-xl sm:h-[730px] overflow-y-auto">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5">
              
              <table id="report-table" className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Barangay
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Evacuation Site
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.barangay}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.evacuation_site}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
