import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Video, 
  Calendar, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Activity, 
  Clock, 
  UserCheck,
  MessageSquare,
  Phone,
  Search,
  Filter,
  FileText,
  Stethoscope,
  Plus,
  Brain,
  Smartphone,
  AlertTriangle,
  Shield
} from 'lucide-react';
import AppointmentScheduler from './AppointmentScheduler';
import AppointmentList from './AppointmentList';
import PatientMonitoring from './PatientMonitoring';
import MedicalRecords from './MedicalRecords';
import AIHealthAssistant from './AIHealthAssistant';
import TelehealthIntegration from './TelehealthIntegration';
import EmergencyProtocols from './EmergencyProtocols';
import MentalHealthSupport from './MentalHealthSupport';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  severity: 'Critical' | 'Stable' | 'Improving';
  room: string;
  admissionDate: string;
  familyMembers: string[];
  lastVisit: string;
  status: 'online' | 'offline';
}

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'consultation';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  familyMembers: string[];
}

const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'monitoring' | 'records' | 'ai-assistant' | 'telehealth' | 'emergency' | 'mental-health'>('overview');
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);

  // Mock patient data
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Robert Johnson',
      age: 67,
      condition: 'Post-operative complications',
      severity: 'Critical',
      room: 'ICU-101',
      admissionDate: '2024-01-15',
      familyMembers: ['John Smith (Son)', 'Mary Johnson (Daughter)'],
      lastVisit: '2 hours ago',
      status: 'online'
    },
    {
      id: '2',
      name: 'Emma Davis',
      age: 45,
      condition: 'Respiratory failure',
      severity: 'Stable',
      room: 'ICU-102',
      admissionDate: '2024-01-18',
      familyMembers: ['Michael Davis (Husband)', 'Sarah Davis (Sister)'],
      lastVisit: '1 day ago',
      status: 'offline'
    },
    {
      id: '3',
      name: 'James Wilson',
      age: 72,
      condition: 'Cardiac arrest recovery',
      severity: 'Improving',
      room: 'ICU-103',
      admissionDate: '2024-01-10',
      familyMembers: ['Lisa Wilson (Wife)', 'Tom Wilson (Son)'],
      lastVisit: '4 hours ago',
      status: 'online'
    }
  ];

  // Mock appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-21',
      time: '10:00',
      duration: 30,
      type: 'video',
      status: 'scheduled',
      priority: 'high',
      notes: 'Post-operative follow-up',
      familyMembers: ['John Smith', 'Mary Johnson']
    },
    {
      id: '2',
      patientName: 'Emma Davis',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-21',
      time: '14:30',
      duration: 45,
      type: 'consultation',
      status: 'scheduled',
      priority: 'medium',
      notes: 'Respiratory assessment',
      familyMembers: ['Michael Davis']
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startVideoCall = (patientId: string) => {
    navigate(`/video-call/${patientId}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Stable': return 'text-yellow-600 bg-yellow-100';
      case 'Improving': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScheduleAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    console.log('Edit appointment:', appointment);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const handleJoinAppointment = (id: string) => {
    navigate(`/video-call/${id}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
              <button
                onClick={() => setShowAppointmentScheduler(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Schedule Appointment</span>
              </button>
            </div>
            <AppointmentList
              appointments={appointments}
              userRole="doctor"
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
              onJoin={handleJoinAppointment}
            />
          </div>
        );
      case 'monitoring':
        return <PatientMonitoring />;
      case 'records':
        return <MedicalRecords userRole="doctor" />;
      case 'ai-assistant':
        return <AIHealthAssistant userRole="doctor" />;
      case 'telehealth':
        return <TelehealthIntegration userRole="doctor" />;
      case 'emergency':
        return <EmergencyProtocols userRole="doctor" />;
      case 'mental-health':
        return <MentalHealthSupport userRole="doctor" />;
      default:
        return (
          <>
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover-card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-green-600">+2 this week</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover-card">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Activity className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Critical Cases</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-xs text-red-600">Requires attention</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover-card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Video className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                    <p className="text-xs text-green-600">Live now</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover-card">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Visits</p>
                    <p className="text-2xl font-bold text-gray-900">7</p>
                    <p className="text-xs text-yellow-600">Today</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Patient List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Patient Management</h2>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <UserCheck className="h-4 w-4" />
                        <span>New Patient</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search patients..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(patient.severity)}`}>
                                {patient.severity}
                              </span>
                              <div className={`w-2 h-2 rounded-full ${patient.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <p><span className="font-medium">Age:</span> {patient.age}</p>
                                <p><span className="font-medium">Room:</span> {patient.room}</p>
                              </div>
                              <div>
                                <p><span className="font-medium">Condition:</span> {patient.condition}</p>
                                <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Family:</span> {patient.familyMembers.join(', ')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => startVideoCall(patient.id)}
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                            >
                              <Video className="h-4 w-4" />
                              <span>Start Call</span>
                            </button>
                            <button
                              onClick={() => setSelectedPatient(patient)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowAppointmentScheduler(true)}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>Schedule Visit</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('emergency')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>Emergency Protocols</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('ai-assistant')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Brain className="h-5 w-5 text-purple-600" />
                      <span>AI Assistant</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('telehealth')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <span>Device Monitoring</span>
                    </button>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-200 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-purple-900">AI Insights</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-900">Patient Risk Alert</p>
                      <p className="text-xs text-purple-700 mt-1">Robert Johnson shows elevated stress indicators</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-900">Medication Reminder</p>
                      <p className="text-xs text-purple-700 mt-1">Emma Davis due for medication review</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Video call completed with Johnson family</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">AI flagged potential medication interaction</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Emergency protocol activated for Room 104</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-800">Virtual ICU</span>
              </Link>
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              <div className="hidden md:block">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'monitoring', label: 'Monitoring', icon: Stethoscope },
              { id: 'records', label: 'Records', icon: FileText },
              { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
              { id: 'telehealth', label: 'Telehealth', icon: Smartphone },
              { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
              { id: 'mental-health', label: 'Mental Health', icon: Heart }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>

      {/* Appointment Scheduler Modal */}
      {showAppointmentScheduler && (
        <AppointmentScheduler
          userRole="doctor"
          onClose={() => setShowAppointmentScheduler(false)}
          onSchedule={handleScheduleAppointment}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;