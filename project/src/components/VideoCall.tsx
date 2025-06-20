import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Monitor, 
  Users, 
  Settings, 
  MessageSquare,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Heart,
  Camera,
  MoreVertical
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: 'doctor' | 'family' | 'patient';
  videoEnabled: boolean;
  audioEnabled: boolean;
  isOnline: boolean;
}

const VideoCall: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Mock participants
  const [participants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      videoEnabled: true,
      audioEnabled: true,
      isOnline: true
    },
    {
      id: '2',
      name: 'John Smith',
      role: 'family',
      videoEnabled: true,
      audioEnabled: true,
      isOnline: true
    },
    {
      id: '3',
      name: 'Robert Johnson',
      role: 'patient',
      videoEnabled: false,
      audioEnabled: false,
      isOnline: true
    }
  ]);

  const [chatMessages] = useState([
    {
      id: '1',
      sender: 'Dr. Sarah Johnson',
      message: 'Good morning! How are you feeling today?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'John Smith',
      message: 'Thank you for arranging this call, Doctor.',
      timestamp: '10:31 AM'
    }
  ]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const endCall = () => {
    setIsCallActive(false);
    setTimeout(() => {
      navigate(user?.role === 'doctor' ? '/doctor-dashboard' : '/family-dashboard');
    }, 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, send message to other participants
      setChatMessage('');
    }
  };

  if (!isCallActive) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <Heart className="h-16 w-16 text-red-500 mx-auto animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Call Ended</h2>
          <p className="text-gray-400 mb-4">Thank you for using Virtual ICU</p>
          <p className="text-gray-400">Duration: {formatDuration(callDuration)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gray-900 flex flex-col`}>
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Heart className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-white font-semibold">Virtual ICU Visit</h1>
              <p className="text-gray-400 text-sm">Room: {roomId} • {formatDuration(callDuration)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Connected</span>
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 h-full">
            {/* Main participant video */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
                {isVideoEnabled ? (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-white text-lg">Your Video</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Video Off</p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {user?.name} (You)
              </div>
            </div>

            {/* Other participants */}
            {participants.filter(p => p.id !== user?.id).map((participant) => (
              <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                  {participant.videoEnabled ? (
                    <div className="text-center">
                      {participant.role === 'patient' ? (
                        <>
                          <Heart className="h-16 w-16 text-red-400 mx-auto mb-4" />
                          <p className="text-white text-lg">{participant.name}</p>
                          <p className="text-gray-400 text-sm">Patient</p>
                        </>
                      ) : (
                        <>
                          <Video className="h-16 w-16 text-green-400 mx-auto mb-4" />
                          <p className="text-white text-lg">{participant.name}</p>
                          <p className="text-gray-400 text-sm">{participant.role === 'doctor' ? 'Doctor' : 'Family'}</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl font-bold">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                      <p className="text-white text-lg">{participant.name}</p>
                      <p className="text-gray-400 text-sm">Video Off</p>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                  <span>{participant.name}</span>
                  {!participant.audioEnabled && <MicOff className="h-3 w-3" />}
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`w-3 h-3 rounded-full ${participant.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-3">
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isAudioEnabled
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isVideoEnabled
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>

              <button
                onClick={endCall}
                className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-200 transform hover:scale-110"
              >
                <PhoneOff className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-medium text-sm">{msg.sender}</span>
                    <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                  </div>
                  <p className="text-white text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Call Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Camera</label>
                <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2">
                  <option>Default Camera</option>
                  <option>External Camera</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Microphone</label>
                <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2">
                  <option>Default Microphone</option>
                  <option>External Microphone</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Speaker</label>
                <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2">
                  <option>Default Speaker</option>
                  <option>Headphones</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;