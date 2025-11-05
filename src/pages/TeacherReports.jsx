import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, FileTextIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TeacherReports() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('class');
  const [dateRange, setDateRange] = useState('week');

  const handleGenerate = () => {
    alert(`Generating ${reportType} report for the past ${dateRange}...`);
  };

  const handleDownload = () => {
    alert('Downloading report as PDF...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <button
            onClick={() => navigate('/teacher-dashboard')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl p-4 mr-4">
                <FileTextIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Generate Reports</h1>
                <p className="text-gray-600">Create detailed reports for your class</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="class">Class Performance</option>
                  <option value="individual">Individual Student</option>
                  <option value="attendance">Attendance Report</option>
                  <option value="progress">Progress Report</option>
                  <option value="assessment">Assessment Results</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-md"
              >
                Generate Report
              </button>
              <button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-bold transition-colors"
              >
                <DownloadIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-bold transition-colors"
              >
                <PrinterIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sample Report Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Report Preview</h2>
            <div className="space-y-4 text-gray-600">
              <p>Report will be generated based on your selections.</p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">Sample Metrics</h3>
                <ul className="space-y-2">
                  <li>• Total Students: 3</li>
                  <li>• Average Score: 84%</li>
                  <li>• Attendance Rate: 93%</li>
                  <li>• Lessons Completed: 10</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}