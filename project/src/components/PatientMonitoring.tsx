import React, { useState, useEffect } from 'react';
import { Activity, Heart, Thermometer, Droplets, Wind, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface VitalSigns {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  timestamp: string;
}

interface Patient {
  id: string;
  name: string;
  room: string;
  condition: string;
  status: 'Critical' | 'Stable' | 'Improving';
  vitals: VitalSigns[];
  alerts: Alert[];
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

const PatientMonitoring: React.FC = () => {
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Robert Johnson',
      room: 'ICU-101',
      condition: 'Post-operative complications',
      status: 'Critical',
      vitals: [
        {
          heartRate: 85,
          bloodPressure: { systolic: 120, diastolic: 80 },
          temperature: 98.6,
          oxygenSaturation: 95,
          respiratoryRate: 16,
          timestamp: new Date().toISOString()
        }
      ],
      alerts: [
        {
          id: '1',
          type: 'warning',
          message: 'Heart rate elevated above normal range',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          acknowledged: false
        }
      ]
    },
    {
      id: '2',
      name: 'Emma Davis',
      room: 'ICU-102',
      condition: 'Respiratory failure',
      status: 'Stable',
      vitals: [
        {
          heartRate: 72,
          bloodPressure: { systolic: 110, diastolic: 70 },
          temperature: 99.1,
          oxygenSaturation: 98,
          respiratoryRate: 14,
          timestamp: new Date().toISOString()
        }
      ],
      alerts: []
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]);

  // Simulate real-time vital signs updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would come from medical devices
      const newVitals: VitalSigns = {
        heartRate: 70 + Math.floor(Math.random() * 30),
        bloodPressure: {
          systolic: 110 + Math.floor(Math.random() * 20),
          diastolic: 70 + Math.floor(Math.random() * 15)
        },
        temperature: 98 + Math.random() * 2,
        oxygenSaturation: 95 + Math.floor(Math.random() * 5),
        respiratoryRate: 12 + Math.floor(Math.random() * 8),
        timestamp: new Date().toISOString()
      };

      setSelectedPatient(prev => ({
        ...prev,
        vitals: [...prev.vitals.slice(-9), newVitals]
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVitalStatus = (vital: string, value: number) => {
    const ranges = {
      heartRate: { normal: [60, 100], warning: [50, 120] },
      systolic: { normal: [90, 140], warning: [80, 160] },
      diastolic: { normal: [60, 90], warning: [50, 100] },
      temperature: { normal: [97, 99], warning: [96, 101] },
      oxygenSaturation: { normal: [95, 100], warning: [90, 100] },
      respiratoryRate: { normal: [12, 20], warning: [10, 25] }
    };

    const range = ranges[vital as keyof typeof ranges];
    if (!range) return 'normal';

    if (value >= range.normal[0] && value <= range.normal[1]) return 'normal';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const currentVitals = selectedPatient.vitals[selectedPatient.vitals.length - 1];

  return (
    <div className="space-y-6">
      {/* Patient Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Monitoring</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {patients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`flex-shrink-0 p-4 rounded-lg border-2 transition-all ${
                selectedPatient.id === patient.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-left">
                <p className="font-semibold text-gray-900">{patient.name}</p>
                <p className="text-sm text-gray-600">{patient.room}</p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                  patient.status === 'Critical' ? 'text-red-600 bg-red-100' :
                  patient.status === 'Stable' ? 'text-yellow-600 bg-yellow-100' :
                  'text-green-600 bg-green-100'
                }`}>
                  {patient.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vital Signs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Vitals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Current Vital Signs</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heart Rate */}
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-gray-900">Heart Rate</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getStatusColor(getVitalStatus('heartRate', currentVitals.heartRate))
                  }`}>
                    {getVitalStatus('heartRate', currentVitals.heartRate)}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{currentVitals.heartRate}</span>
                  <span className="text-sm text-gray-600">bpm</span>
                </div>
              </div>

              {/* Blood Pressure */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Blood Pressure</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getStatusColor(getVitalStatus('systolic', currentVitals.bloodPressure.systolic))
                  }`}>
                    {getVitalStatus('systolic', currentVitals.bloodPressure.systolic)}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {currentVitals.bloodPressure.systolic}/{currentVitals.bloodPressure.diastolic}
                  </span>
                  <span className="text-sm text-gray-600">mmHg</span>
                </div>
              </div>

              {/* Temperature */}
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-900">Temperature</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getStatusColor(getVitalStatus('temperature', currentVitals.temperature))
                  }`}>
                    {getVitalStatus('temperature', currentVitals.temperature)}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {currentVitals.temperature.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-600">°F</span>
                </div>
              </div>

              {/* Oxygen Saturation */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">Oxygen Saturation</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getStatusColor(getVitalStatus('oxygenSaturation', currentVitals.oxygenSaturation))
                  }`}>
                    {getVitalStatus('oxygenSaturation', currentVitals.oxygenSaturation)}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{currentVitals.oxygenSaturation}</span>
                  <span className="text-sm text-gray-600">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vital Signs Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs Trend</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Real-time monitoring chart</p>
                <p className="text-sm text-gray-500">Chart visualization would be implemented here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts and Patient Info */}
        <div className="space-y-6">
          {/* Patient Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Name</p>
                <p className="text-gray-900">{selectedPatient.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Room</p>
                <p className="text-gray-900">{selectedPatient.room}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Condition</p>
                <p className="text-gray-900">{selectedPatient.condition}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  selectedPatient.status === 'Critical' ? 'text-red-600 bg-red-100' :
                  selectedPatient.status === 'Stable' ? 'text-yellow-600 bg-yellow-100' :
                  'text-green-600 bg-green-100'
                }`}>
                  {selectedPatient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Active Alerts
            </h3>
            <div className="space-y-3">
              {selectedPatient.alerts.length === 0 ? (
                <p className="text-gray-600 text-sm">No active alerts</p>
              ) : (
                selectedPatient.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {!alert.acknowledged && (
                        <button className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors">
                <Activity className="h-5 w-5" />
                <span>View Full Report</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>Set Alert Threshold</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Emergency Protocol</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMonitoring;