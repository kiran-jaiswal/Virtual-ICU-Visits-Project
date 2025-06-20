import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  Heart, 
  Activity, 
  Clock, 
  MapPin, 
  Users, 
  FileText,
  CheckCircle,
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  priority: 'primary' | 'secondary' | 'emergency';
}

interface EmergencyProtocol {
  id: string;
  title: string;
  description: string;
  steps: string[];
  estimatedTime: string;
  severity: 'critical' | 'urgent' | 'moderate';
}

interface EmergencyProtocolsProps {
  userRole: 'doctor' | 'family';
}

const EmergencyProtocols: React.FC<EmergencyProtocolsProps> = ({ userRole }) => {
  const [activeProtocol, setActiveProtocol] = useState<EmergencyProtocol | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showContacts, setShowContacts] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Emergency Services',
      role: 'Emergency Response',
      phone: '911',
      priority: 'emergency'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      role: 'Attending Physician',
      phone: '(555) 123-4567',
      priority: 'primary'
    },
    {
      id: '3',
      name: 'ICU Nursing Station',
      role: 'Nursing Team',
      phone: '(555) 123-4568',
      priority: 'primary'
    },
    {
      id: '4',
      name: 'Hospital Security',
      role: 'Security Team',
      phone: '(555) 123-4569',
      priority: 'secondary'
    }
  ];

  const protocols: EmergencyProtocol[] = [
    {
      id: '1',
      title: 'Cardiac Emergency',
      description: 'Immediate response for cardiac arrest or severe cardiac events',
      estimatedTime: '2-5 minutes',
      severity: 'critical',
      steps: [
        'Call 911 immediately',
        'Check for responsiveness and breathing',
        'Begin CPR if no pulse detected',
        'Use AED if available',
        'Continue CPR until help arrives',
        'Document time and actions taken'
      ]
    },
    {
      id: '2',
      title: 'Respiratory Distress',
      description: 'Protocol for severe breathing difficulties or respiratory failure',
      estimatedTime: '1-3 minutes',
      severity: 'critical',
      steps: [
        'Assess airway and breathing',
        'Position patient upright if conscious',
        'Administer oxygen if available',
        'Call medical team immediately',
        'Monitor vital signs continuously',
        'Prepare for intubation if needed'
      ]
    },
    {
      id: '3',
      title: 'Severe Bleeding',
      description: 'Emergency response for significant blood loss',
      estimatedTime: '2-4 minutes',
      severity: 'urgent',
      steps: [
        'Apply direct pressure to wound',
        'Elevate injured area if possible',
        'Use pressure bandage',
        'Call for medical assistance',
        'Monitor for signs of shock',
        'Prepare for blood transfusion'
      ]
    },
    {
      id: '4',
      title: 'Allergic Reaction',
      description: 'Response protocol for severe allergic reactions',
      estimatedTime: '1-2 minutes',
      severity: 'urgent',
      steps: [
        'Identify and remove allergen',
        'Administer epinephrine if available',
        'Call medical team',
        'Monitor airway and breathing',
        'Prepare antihistamines',
        'Document reaction details'
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'urgent': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'primary': return 'text-blue-600 bg-blue-100';
      case 'secondary': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const startProtocol = (protocol: EmergencyProtocol) => {
    setActiveProtocol(protocol);
    setCurrentStep(0);
    setElapsedTime(0);
    setIsTimerRunning(true);
  };

  const nextStep = () => {
    if (activeProtocol && currentStep < activeProtocol.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetProtocol = () => {
    setActiveProtocol(null);
    setCurrentStep(0);
    setElapsedTime(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const callEmergency = (phone: string) => {
    if (phone === '911') {
      // In a real app, this would trigger emergency services
      alert('Emergency services would be contacted immediately');
    } else {
      window.open(`tel:${phone}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Emergency Protocols</h2>
              <p className="text-gray-600 mt-1">
                {userRole === 'doctor' 
                  ? 'Quick access to emergency response procedures' 
                  : 'Emergency contacts and basic response guidelines'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowContacts(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Emergency Contacts</span>
          </button>
        </div>
      </div>

      {activeProtocol ? (
        /* Active Protocol View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg border-2 ${getSeverityColor(activeProtocol.severity)}`}>
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{activeProtocol.title}</h3>
                <p className="text-gray-600">{activeProtocol.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{formatTime(elapsedTime)}</div>
                <div className="text-sm text-gray-600">Elapsed Time</div>
              </div>
              <button
                onClick={resetProtocol}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {activeProtocol.steps.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentStep + 1) / activeProtocol.steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / activeProtocol.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-600 text-white rounded-full">
                <span className="text-sm font-bold">{currentStep + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-red-900 mb-2">Current Step</h4>
                <p className="text-red-800 text-lg">{activeProtocol.steps[currentStep]}</p>
              </div>
            </div>
          </div>

          {/* All Steps */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">All Steps</h4>
            <div className="space-y-3">
              {activeProtocol.steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    index === currentStep
                      ? 'bg-red-100 border border-red-200'
                      : index < currentStep
                      ? 'bg-green-100 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-1 rounded-full ${
                    index === currentStep
                      ? 'bg-red-600 text-white'
                      : index < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-400 text-white'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold w-4 h-4 flex items-center justify-center">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <p className={`flex-1 ${
                    index === currentStep
                      ? 'text-red-900 font-medium'
                      : index < currentStep
                      ? 'text-green-900'
                      : 'text-gray-700'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <button
                onClick={previousStep}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === activeProtocol.steps.length - 1}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Step
              </button>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => callEmergency('911')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call 911</span>
              </button>
              <button
                onClick={resetProtocol}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Protocol Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {protocols.map((protocol) => (
            <div
              key={protocol.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg border-2 ${getSeverityColor(protocol.severity)}`}>
                  <Heart className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{protocol.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(protocol.severity)}`}>
                      {protocol.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{protocol.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{protocol.estimatedTime}</span>
                    </div>
                    <button
                      onClick={() => startProtocol(protocol)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Emergency Contacts Modal */}
      {showContacts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
                <button
                  onClick={() => setShowContacts(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getPriorityColor(contact.priority)}`}>
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => callEmergency(contact.phone)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyProtocols;