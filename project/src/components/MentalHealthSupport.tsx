import React, { useState } from 'react';
import { 
  Heart, 
  Brain, 
  MessageCircle, 
  Phone, 
  Video, 
  Calendar, 
  BookOpen,
  Headphones,
  Users,
  Star,
  Play,
  Pause,
  Volume2,
  Clock,
  CheckCircle
} from 'lucide-react';

interface SupportResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'audio' | 'exercise';
  duration: string;
  description: string;
  category: 'anxiety' | 'depression' | 'stress' | 'grief' | 'general';
  rating: number;
}

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  availability: 'available' | 'busy' | 'offline';
  languages: string[];
}

interface MentalHealthSupportProps {
  userRole: 'doctor' | 'family';
}

const MentalHealthSupport: React.FC<MentalHealthSupportProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'counseling' | 'exercises' | 'crisis'>('resources');
  const [selectedResource, setSelectedResource] = useState<SupportResource | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const resources: SupportResource[] = [
    {
      id: '1',
      title: 'Coping with Medical Anxiety',
      type: 'article',
      duration: '5 min read',
      description: 'Learn effective strategies to manage anxiety during medical situations and hospital visits.',
      category: 'anxiety',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Guided Meditation for Stress Relief',
      type: 'audio',
      duration: '10 min',
      description: 'A calming guided meditation to help reduce stress and promote relaxation.',
      category: 'stress',
      rating: 4.9
    },
    {
      id: '3',
      title: 'Understanding Grief in Healthcare',
      type: 'video',
      duration: '15 min',
      description: 'Professional guidance on processing grief and loss in medical contexts.',
      category: 'grief',
      rating: 4.7
    },
    {
      id: '4',
      title: 'Breathing Exercises for Panic',
      type: 'exercise',
      duration: '3 min',
      description: 'Quick breathing techniques to manage panic attacks and acute anxiety.',
      category: 'anxiety',
      rating: 4.6
    }
  ];

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Emily Chen',
      specialization: 'Medical Trauma & Anxiety',
      rating: 4.9,
      availability: 'available',
      languages: ['English', 'Mandarin']
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      specialization: 'Grief & Loss Counseling',
      rating: 4.8,
      availability: 'busy',
      languages: ['English', 'Spanish']
    },
    {
      id: '3',
      name: 'Dr. Sarah Williams',
      specialization: 'Family Support & Communication',
      rating: 4.7,
      availability: 'available',
      languages: ['English', 'French']
    }
  ];

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 crisis support and suicide prevention'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Treatment referral and information service'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anxiety': return 'text-blue-600 bg-blue-100';
      case 'depression': return 'text-purple-600 bg-purple-100';
      case 'stress': return 'text-green-600 bg-green-100';
      case 'grief': return 'text-gray-600 bg-gray-100';
      case 'general': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'exercise': return Heart;
      default: return BookOpen;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resources':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {resources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <div
                    key={resource.id}
                    onClick={() => setSelectedResource(resource)}
                    className={`bg-white rounded-xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedResource?.id === resource.id ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${getCategoryColor(resource.category)}`}>
                          <TypeIcon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(resource.category)}`}>
                              {resource.category}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{resource.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {renderStars(resource.rating)}
                                <span className="text-sm text-gray-600 ml-1">{resource.rating}</span>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              {resource.type === 'article' ? 'Read' : resource.type === 'video' ? 'Watch' : 'Listen'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-6">
              {selectedResource ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Now Playing</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedResource.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{selectedResource.description}</p>
                    </div>
                    
                    {selectedResource.type === 'audio' && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>
                          <span className="text-sm text-gray-600">10:00</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentTime / 600) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          >
                            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Volume2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {selectedResource.type === 'exercise' && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-900 mb-2">Breathing Exercise</h5>
                        <p className="text-sm text-green-800 mb-3">
                          Follow the circle: Breathe in as it expands, breathe out as it contracts.
                        </p>
                        <div className="flex justify-center">
                          <div className="w-24 h-24 bg-green-200 rounded-full animate-pulse flex items-center justify-center">
                            <span className="text-green-800 font-medium">Breathe</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Resource</h3>
                  <p className="text-gray-600">Choose a resource to begin your mental health journey</p>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>Chat with AI Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Phone className="h-5 w-5 text-green-600" />
                    <span>Call Crisis Hotline</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>Schedule Counseling</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'counseling':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counselors.map((counselor) => (
                <div key={counselor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                    <p className="text-gray-600">{counselor.specialization}</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(counselor.rating)}
                        <span className="text-sm text-gray-600 ml-1">{counselor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(counselor.availability)}`}>
                        {counselor.availability}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Languages: </span>
                      <span className="text-sm text-gray-900">{counselor.languages.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      disabled={counselor.availability !== 'available'}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Schedule Session
                    </button>
                    <button
                      disabled={counselor.availability !== 'available'}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'crisis':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="text-xl font-semibold text-red-900">Crisis Support</h3>
                  <p className="text-red-700">Immediate help is available 24/7</p>
                </div>
              </div>
              <p className="text-red-800 mb-4">
                If you or someone you know is in immediate danger or having thoughts of self-harm, 
                please reach out for help immediately. You are not alone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crisisResources.map((resource, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Phone className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600 mb-4">{resource.phone}</p>
                    <button
                      onClick={() => window.open(`tel:${resource.phone.replace(/\D/g, '')}`)}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Call Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mental Health Support</h2>
            <p className="text-gray-600 mt-1">
              {userRole === 'doctor' 
                ? 'Resources and support tools for patient mental health' 
                : 'Support resources for your emotional wellbeing during this difficult time'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 rounded-t-xl">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'resources', label: 'Resources', icon: BookOpen },
            { id: 'counseling', label: 'Counseling', icon: Users },
            { id: 'crisis', label: 'Crisis Support', icon: Heart }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-purple-500 text-purple-600'
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

      {/* Tab Content */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MentalHealthSupport;