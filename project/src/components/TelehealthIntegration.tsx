import React, { useState } from 'react';
import { Smartphone, Watch, Activity, Wifi, WifiOff, Battery, Bluetooth, Heart, Thermometer, Droplets, Wind, AlertTriangle, CheckCircle, FolderSync as Sync, Settings } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'smartwatch' | 'phone' | 'sensor' | 'monitor';
  status: 'connected' | 'disconnected' | 'syncing';
  battery: number;
  lastSync: string;
  data: any;
}

interface TelehealthIntegrationProps {
  userRole: 'doctor' | 'family';
}

const TelehealthIntegration: React.FC<TelehealthIntegrationProps> = ({ userRole }) => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      status: 'connected',
      battery: 85,
      lastSync: '2 minutes ago',
      data: {
        heartRate: 72,
        steps: 8420,
        calories: 1850,
        sleepHours: 7.5
      }
    },
    {
      id: '2',
      name: 'iPhone Health App',
      type: 'phone',
      status: 'connected',
      battery: 92,
      lastSync: '1 minute ago',
      data: {
        bloodPressure: { systolic: 118, diastolic: 78 },
        weight: 165,
        medications: ['Taken', 'Pending', 'Taken']
      }
    },
    {
      id: '3',
      name: 'Pulse Oximeter',
      type: 'sensor',
      status: 'syncing',
      battery: 67,
      lastSync: '5 minutes ago',
      data: {
        oxygenSaturation: 97,
        pulseRate: 74
      }
    },
    {
      id: '4',
      name: 'Smart Thermometer',
      type: 'sensor',
      status: 'disconnected',
      battery: 23,
      lastSync: '2 hours ago',
      data: {
        temperature: 98.4
      }
    }
  ]);

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(devices[0]);
  const [showSettings, setShowSettings] = useState(false);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch': return Watch;
      case 'phone': return Smartphone;
      case 'sensor': return Activity;
      case 'monitor': return Heart;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'disconnected': return 'text-red-600 bg-red-100';
      case 'syncing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const syncDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, status: 'syncing' as const, lastSync: 'Syncing...' }
        : device
    ));

    setTimeout(() => {
      setDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'connected' as const, lastSync: 'Just now' }
          : device
      ));
    }, 3000);
  };

  const renderDeviceData = (device: Device) => {
    switch (device.type) {
      case 'smartwatch':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-900">Heart Rate</span>
              </div>
              <p className="text-2xl font-bold text-red-900">{device.data.heartRate}</p>
              <p className="text-xs text-red-700">bpm</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Steps</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{device.data.steps.toLocaleString()}</p>
              <p className="text-xs text-blue-700">today</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Calories</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{device.data.calories}</p>
              <p className="text-xs text-orange-700">burned</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Wind className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Sleep</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{device.data.sleepHours}</p>
              <p className="text-xs text-purple-700">hours</p>
            </div>
          </div>
        );
      
      case 'phone':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Blood Pressure</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {device.data.bloodPressure.systolic}/{device.data.bloodPressure.diastolic}
              </p>
              <p className="text-xs text-blue-700">mmHg</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Medications</span>
              </div>
              <div className="flex space-x-2">
                {device.data.medications.map((status: string, index: number) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full ${
                      status === 'Taken' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'sensor':
        if (device.name.includes('Oximeter')) {
          return (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Oxygen Saturation</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{device.data.oxygenSaturation}%</p>
              <p className="text-xs text-blue-700">Pulse: {device.data.pulseRate} bpm</p>
            </div>
          );
        } else {
          return (
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Temperature</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{device.data.temperature}°F</p>
              <p className="text-xs text-orange-700">Body temperature</p>
            </div>
          );
        }
      
      default:
        return <div>No data available</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Connected Health Devices</h2>
            <p className="text-gray-600 mt-1">
              {userRole === 'doctor' 
                ? 'Monitor patient health data from connected devices' 
                : 'Your health data from connected devices'}
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Devices</h3>
            <div className="space-y-3">
              {devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.type);
                return (
                  <div
                    key={device.id}
                    onClick={() => setSelectedDevice(device)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedDevice?.id === device.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <DeviceIcon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{device.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.status)}`}>
                            {device.status}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Battery className={`h-3 w-3 ${getBatteryColor(device.battery)}`} />
                            <span className={`text-xs ${getBatteryColor(device.battery)}`}>
                              {device.battery}%
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Last sync: {device.lastSync}
                        </p>
                      </div>
                      {device.status === 'connected' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            syncDevice(device.id);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        >
                          <Sync className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Device Details */}
        <div className="lg:col-span-2">
          {selectedDevice ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    {React.createElement(getDeviceIcon(selectedDevice.type), {
                      className: "h-6 w-6 text-blue-600"
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedDevice.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedDevice.status)}`}>
                        {selectedDevice.status}
                      </span>
                      <span className="text-sm text-gray-600">
                        Last sync: {selectedDevice.lastSync}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Battery className={`h-5 w-5 ${getBatteryColor(selectedDevice.battery)}`} />
                  <span className={`font-medium ${getBatteryColor(selectedDevice.battery)}`}>
                    {selectedDevice.battery}%
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Data</h4>
                {renderDeviceData(selectedDevice)}
              </div>

              {selectedDevice.status === 'disconnected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">Device Disconnected</p>
                      <p className="text-sm text-red-700">
                        Please check your device connection and try syncing again.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => syncDevice(selectedDevice.id)}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reconnect Device
                  </button>
                </div>
              )}

              {userRole === 'doctor' && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Clinical Notes</h5>
                  <p className="text-sm text-blue-800">
                    Patient's vital signs from connected devices show stable patterns. 
                    Continue monitoring for any significant changes. Consider adjusting 
                    medication timing based on activity patterns.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Device</h3>
              <p className="text-gray-600">Choose a device from the list to view its data</p>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Device Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sync Frequency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Every 5 minutes</option>
                  <option>Every 15 minutes</option>
                  <option>Every 30 minutes</option>
                  <option>Every hour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Sharing
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Share with medical team</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Emergency alerts</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelehealthIntegration;