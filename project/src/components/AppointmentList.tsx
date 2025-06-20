import React, { useState } from 'react';
import { Calendar, Clock, User, Video, Phone, MessageSquare, Edit, Trash2, Eye, Filter, Search } from 'lucide-react';

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

interface AppointmentListProps {
  appointments: Appointment[];
  userRole: 'doctor' | 'family';
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
  onJoin: (id: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  userRole, 
  onEdit, 
  onDelete, 
  onJoin 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'consultation': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesType = typeFilter === 'all' || appointment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const isAppointmentToday = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  };

  const isAppointmentSoon = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    return timeDiff > 0 && timeDiff <= 30 * 60 * 1000; // Within 30 minutes
  };

  const canJoinAppointment = (appointment: Appointment) => {
    return appointment.status === 'scheduled' && 
           isAppointmentSoon(appointment.date, appointment.time) &&
           appointment.type === 'video';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="in-progress">In Progress</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="all">All Types</option>
              <option value="video">Video Call</option>
              <option value="phone">Phone Call</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => {
            const TypeIcon = getTypeIcon(appointment.type);
            const isToday = isAppointmentToday(appointment.date);
            const canJoin = canJoinAppointment(appointment);
            
            return (
              <div
                key={appointment.id}
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
                  isToday ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200'
                } ${canJoin ? 'ring-2 ring-green-200 animate-pulse-slow' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${getPriorityColor(appointment.priority)}`}>
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {userRole === 'doctor' ? appointment.patientName : appointment.doctorName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {userRole === 'doctor' ? 'Patient' : 'Doctor'}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(appointment.priority)}`}>
                            {appointment.priority.toUpperCase()}
                          </span>
                          {isToday && (
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 animate-pulse">
                              TODAY
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {new Date(appointment.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{appointment.time} ({appointment.duration} min)</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User className="h-4 w-4" />
                          <span className="text-sm">{appointment.familyMembers.length} family member(s)</span>
                        </div>
                      </div>
                      
                      {appointment.familyMembers.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Family Members:</p>
                          <div className="flex flex-wrap gap-2">
                            {appointment.familyMembers.map((member, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {appointment.notes && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {appointment.notes}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      {canJoin && (
                        <button
                          onClick={() => onJoin(appointment.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 animate-bounce-subtle"
                        >
                          <Video className="h-4 w-4" />
                          <span>Join Now</span>
                        </button>
                      )}
                      
                      {appointment.status === 'scheduled' && !canJoin && (
                        <button
                          onClick={() => onEdit(appointment)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => onDelete(appointment.id)}
                        className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AppointmentList;