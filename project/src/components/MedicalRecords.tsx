import React, { useState } from 'react';
import { FileText, Download, Eye, Plus, Search, Filter, Calendar, User, Stethoscope } from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  type: 'consultation' | 'lab-result' | 'imaging' | 'prescription' | 'discharge';
  title: string;
  description: string;
  attachments: string[];
  status: 'draft' | 'final' | 'reviewed';
}

interface MedicalRecordsProps {
  userRole: 'doctor' | 'family';
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const [records] = useState<MedicalRecord[]>([
    {
      id: '1',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-20',
      type: 'consultation',
      title: 'Post-operative Follow-up',
      description: 'Patient showing good recovery progress. Vital signs stable. Recommended continued monitoring.',
      attachments: ['consultation-notes.pdf', 'vital-signs-chart.pdf'],
      status: 'final'
    },
    {
      id: '2',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Michael Chen',
      date: '2024-01-19',
      type: 'lab-result',
      title: 'Blood Work Results',
      description: 'Complete blood count and metabolic panel results. All values within normal ranges.',
      attachments: ['blood-work-results.pdf'],
      status: 'reviewed'
    },
    {
      id: '3',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-18',
      type: 'imaging',
      title: 'Chest X-Ray',
      description: 'Post-operative chest imaging showing clear lungs and proper surgical site healing.',
      attachments: ['chest-xray.jpg', 'radiology-report.pdf'],
      status: 'final'
    },
    {
      id: '4',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-17',
      type: 'prescription',
      title: 'Medication Update',
      description: 'Updated pain management protocol and antibiotic course.',
      attachments: ['prescription.pdf'],
      status: 'final'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'text-blue-600 bg-blue-100';
      case 'lab-result': return 'text-green-600 bg-green-100';
      case 'imaging': return 'text-purple-600 bg-purple-100';
      case 'prescription': return 'text-orange-600 bg-orange-100';
      case 'discharge': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'final': return 'text-green-600 bg-green-100';
      case 'reviewed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return Stethoscope;
      case 'lab-result': return FileText;
      case 'imaging': return Eye;
      case 'prescription': return Plus;
      case 'discharge': return Download;
      default: return FileText;
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
            <p className="text-gray-600 mt-1">
              {userRole === 'doctor' ? 'Patient medical history and documentation' : 'Your medical records and reports'}
            </p>
          </div>
          {userRole === 'doctor' && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Record</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="all">All Types</option>
            <option value="consultation">Consultations</option>
            <option value="lab-result">Lab Results</option>
            <option value="imaging">Imaging</option>
            <option value="prescription">Prescriptions</option>
            <option value="discharge">Discharge</option>
          </select>
        </div>
      </div>

      {/* Records List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredRecords.map((record) => {
              const TypeIcon = getTypeIcon(record.type);
              
              return (
                <div
                  key={record.id}
                  className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md cursor-pointer ${
                    selectedRecord?.id === record.id ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(record.type)}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                            <p className="text-sm text-gray-600">
                              {record.type.replace('-', ' ').toUpperCase()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                              {record.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <User className="h-4 w-4" />
                            <span className="text-sm">{record.doctorName}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{record.attachments.length} file(s)</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4">{record.description}</p>
                        
                        {record.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {record.attachments.map((attachment, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200 transition-colors cursor-pointer"
                              >
                                <Download className="h-3 w-3" />
                                <span>{attachment}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Record Details Sidebar */}
        <div className="space-y-6">
          {selectedRecord ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Title</p>
                    <p className="text-gray-900">{selectedRecord.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Type</p>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(selectedRecord.type)}`}>
                      {selectedRecord.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Date</p>
                    <p className="text-gray-900">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Doctor</p>
                    <p className="text-gray-900">{selectedRecord.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedRecord.status)}`}>
                      {selectedRecord.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedRecord.description}</p>
              </div>

              {selectedRecord.attachments.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                  <div className="space-y-2">
                    {selectedRecord.attachments.map((attachment, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Download className="h-5 w-5 text-blue-600" />
                        <span className="flex-1 text-sm text-gray-900">{attachment}</span>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors">
                    <Download className="h-5 w-5" />
                    <span>Download Record</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Eye className="h-5 w-5 text-gray-600" />
                    <span>View Full Report</span>
                  </button>
                  {userRole === 'doctor' && (
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                      <Plus className="h-5 w-5 text-green-600" />
                      <span>Add Follow-up</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Record</h3>
              <p className="text-gray-600">Click on a record to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;