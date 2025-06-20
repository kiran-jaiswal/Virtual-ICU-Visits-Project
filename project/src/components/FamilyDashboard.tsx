import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Video, 
  Calendar, 
  Clock, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Phone,
  MessageSquare,
  Activity,
  FileText,
  Camera,
  Mic,
  MicOff,
  Plus,
  Brain,
  Smartphone,
  AlertTriangle,
  Shield
} from 'lucide-react';
import AppointmentScheduler from './AppointmentScheduler';
import AppointmentList from './AppointmentList';
import MedicalRecords from './MedicalRecords';
import AIHealthAssistant from './AIHealthAssistant';
import TelehealthIntegration from './TelehealthIntegration';
import EmergencyProtocols from './EmergencyProtocols';
import MentalHealthSupport from './MentalHealthSupport';

interface Visit {
  id: string;
  date: string;
  time: string;
  duration: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  doctor: string;
}

interface PatientInfo {
  name: string;
  age: number;
  condition: string;
  room: string;
  admissionDate: string;
  doctor: string;
  status: 'Critical' | 'Stable' | 'Improving';
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

const FamilyDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'records' | 'communication' | 'ai-assistant' | 'telehealth' | 'emergency' | 'mental-health'>('overview');
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);

  // Mock patient data
  const patientInfo: PatientInfo = {
    name: 'Robert Johnson',
    age: 67,
    condition: 'Post-operative complications',
    room: 'ICU-101',
    admissionDate: '2024-01-15',
    doctor: 'Dr. Sarah Johnson',
    status: 'Stable'
  };

  // Mock visit history
  const visits: Visit[] = [
    {
      id: '1',
      date: '2024-01-20',
      time: '14:30',
      duration: '25 min',
      status: 'completed',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      date: '2024-01-21',
      time: '10:00',
      duration: '30 min',
      status: 'scheduled',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: '3',
      date: '2024-01-19',
      time: '16:00',
      duration: '20 min',
      status: 'completed',
      doctor: 'Dr. Sarah Johnson'
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
      notes: 'Family consultation for post-operative care',
      familyMembers: ['John Smith', 'Mary Johnson']
    },
    {
      id: '2',
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-20',
      time: '14:30',
      duration: 25,
      type: 'video',
      status: 'completed',
      priority: 'medium',
      notes: 'Weekly check-in',
      familyMembers: ['John Smith']
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startVideoCall = () => {
    navigate('/video-call/patient-1');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Stable': return 'text-yellow-600 bg-yellow-100';
      case 'Improving': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVisitStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
              <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
              <button
                onClick={() => setShowAppointmentScheduler(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Request Appointment</span>
              </button>
            </div>
            <AppointmentList
              appointments={appointments}
              userRole="family"
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
              onJoin={handleJoinAppointment}
            />
          </div>
        );
      case 'records':
        return <MedicalRecords userRole="family" />;
      case 'ai-assistant':
        return <AIHealthAssistant userRole="family" />;
      case 'telehealth':
        return <TelehealthIntegration userRole="family" />;
      case 'emergency':
        return <EmergencyProtocols userRole="family" />;
      case 'mental-health':
        return <MentalHealthSupport userRole="family" />;
      case 'communication':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your father is showing good progress. We'll continue monitoring his condition closely.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Nurse Jennifer</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Medication schedule has been updated. Please review the new timing.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Send New Message
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <button
                    onClick={startVideoCall}
                    className="w-full flex items-center space-x-3 p-4 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <Video className="h-6 w-6" />
                    <div className="text-left">
                      <p className="font-medium">Start Video Visit</p>
                      <p className="text-sm">Connect with medical team</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors">
                    <Phone className="h-6 w-6" />
                    <div className="text-left">
                      <p className="font-medium">Call ICU Desk</p>
                      <p className="text-sm">(555) 123-4567</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('emergency')}
                    className="w-full flex items-center space-x-3 p-4 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <AlertTriangle className="h-6 w-6" />
                    <div className="text-left">
                      <p className="font-medium">Emergency</p>
                      <p className="text-sm">Access emergency protocols</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Enhanced Patient Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{patientInfo.name}</h2>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-gray-600">Room {patientInfo.room}</span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(patientInfo.status)}`}>
                        {patientInfo.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={startVideoCall}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Video className="h-5 w-5" />
                    <span>Start Visit</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('emergency')}
                    className="flex items-center space-x-2 px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <span>Emergency</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="text-lg font-semibold">{patientInfo.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Condition</p>
                  <p className="text-lg font-semibold">{patientInfo.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Attending Doctor</p>
                  <p className="text-lg font-semibold">{patientInfo.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Admission Date</p>
                  <p className="text-lg font-semibold">{new Date(patientInfo.admissionDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Overview</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Scheduled Activities</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-900">Scheduled Visit</p>
                            <p className="text-sm text-blue-700">Tomorrow at 10:00 AM with Dr. Sarah Johnson</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Updates</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Activity className="h-5 w-5 text-green-600 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Vital signs stable</p>
                            <p className="text-xs text-gray-600">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">AI health insights updated</p>
                            <p className="text-xs text-gray-600">4 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <User className="h-5 w-5 text-purple-600 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Mental health support session scheduled</p>
                            <p className="text-xs text-gray-600">6 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Visits</h4>
                      <div className="space-y-3">
                        {visits.slice(0, 3).map((visit) => (
                          <div key={visit.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center space-x-3">
                                  <p className="font-medium text-gray-900">
                                    {new Date(visit.date).toLocaleDateString()} at {visit.time}
                                  </p>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getVisitStatusColor(visit.status)}`}>
                                    {visit.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Duration: {visit.duration} • Doctor: {visit.doctor}
                                </p>
                              </div>
                              {visit.status === 'scheduled' && (
                                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                  <Video className="h-4 w-4" />
                                  <span>Join</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                      onClick={startVideoCall}
                      className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <Video className="h-5 w-5" />
                      <span>Start Video Visit</span>
                    </button>
                    <button
                      onClick={() => setShowAppointmentScheduler(true)}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>Schedule Visit</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('ai-assistant')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Brain className="h-5 w-5 text-purple-600" />
                      <span>AI Health Assistant</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('mental-health')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Heart className="h-5 w-5 text-pink-600" />
                      <span>Mental Health Support</span>
                    </button>
                  </div>
                </div>

                {/* AI Insights for Family */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-200 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-purple-900">AI Care Insights</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-900">Recovery Progress</p>
                      <p className="text-xs text-purple-700 mt-1">Your loved one is showing positive signs of improvement</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-900">Care Recommendation</p>
                      <p className="text-xs text-purple-700 mt-1">Consider scheduling a mental health support session</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Emergency</p>
                        <p className="text-sm text-gray-600">911</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">ICU Desk</p>
                        <p className="text-sm text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveTab('emergency')}
                      className="w-full mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      View Emergency Protocols
                    </button>
                  </div>
                </div>

                {/* Visit Guidelines */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Visit Guidelines</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Keep visits to 30 minutes or less</li>
                    <li>• Speak calmly and positively</li>
                    <li>• Follow medical staff instructions</li>
                    <li>• Respect patient's rest time</li>
                    <li>• Use mental health resources if needed</li>
                  </ul>
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
                <p className="text-sm text-gray-600">Welcome,</p>
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
              { id: 'records', label: 'Records', icon: FileText },
              { id: 'communication', label: 'Communication', icon: MessageSquare },
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
          userRole="family"
          onClose={() => setShowAppointmentScheduler(false)}
          onSchedule={handleScheduleAppointment}
        />
      )}
    </div>
  );
};

export default FamilyDashboard;