import React, { useState } from 'react';
import { Search, User, Heart, Plus, Activity, Building2, Users, UserPlus } from 'lucide-react';
import PatientCard from './components/PatientCard';
import VitalsTable from './components/VitalsTable';
import VitalsModal from './components/VitalsModal';
import PatientSearch from './components/PatientSearch';
import AddPatient from './components/AddPatient';

interface Patient {
  id: string;
  mrn: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
}

interface Vital {
  id: string;
  patientId: string;
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number;
  weight: number;
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  
  // Sample data for demo
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      mrn: 'MRN-001234',
      name: 'Sarah Johnson',
      dob: '1985-03-15',
      gender: 'Female',
      address: '123 Main St, Boston, MA 02101',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@email.com'
    },
    {
      id: '2',
      mrn: 'MRN-005678',
      name: 'Michael Chen',
      dob: '1978-11-22',
      gender: 'Male',
      address: '456 Oak Ave, Cambridge, MA 02139',
      phone: '(555) 987-6543',
      email: 'michael.chen@email.com'
    }
  ]);

  const [vitals, setVitals] = useState<Vital[]>([
    {
      id: '1',
      patientId: '1',
      date: '2024-01-15',
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      weight: 135
    },
    {
      id: '2',
      patientId: '1',
      date: '2024-01-08',
      systolic: 118,
      diastolic: 78,
      heartRate: 70,
      temperature: 98.4,
      weight: 136
    }
  ]);

  const handleAddVitals = (newVitals: Omit<Vital, 'id'>) => {
    const vital: Vital = {
      id: Date.now().toString(),
      ...newVitals
    };
    setVitals(prev => [vital, ...prev]);
    setShowVitalsModal(false);
  };

  const patientVitals = selectedPatient 
    ? vitals.filter(v => v.patientId === selectedPatient.id)
    : [];

  const tabs = [
    { id: 'home', label: 'Home', icon: Building2 },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'add-patient', label: 'Add Patient', icon: UserPlus },
    { id: 'vitals', label: 'Vitals', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Area */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">smartData</h1>
                <p className="text-xs text-gray-500">SMART on FHIR POC</p>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Epic Sandbox Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                SMART on FHIR Integration Demo
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                This proof-of-concept demonstrates seamless integration with Epic's FHIR APIs,
                showcasing patient data retrieval, vitals management, and healthcare workflow automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Patient Management</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Search and retrieve patient demographics from Epic's FHIR Patient resources.
                </p>
                <button
                  onClick={() => setActiveTab('patients')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Patients →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="h-8 w-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Vitals Integration</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Read and write vital signs using Epic's FHIR Observation resources.
                </p>
                <button
                  onClick={() => setActiveTab('vitals')}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Manage Vitals →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <UserPlus className="h-8 w-8 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Data Synchronization</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Seamlessly sync patient data between your system and Epic's EHR.
                </p>
                <button
                  onClick={() => setActiveTab('add-patient')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Add Patient →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Patient Search</h2>
              <div className="text-sm text-gray-500">
                Connected to Epic Sandbox Environment
              </div>
            </div>
            
            <PatientSearch patients={patients} onSelectPatient={setSelectedPatient} />
            
            {selectedPatient && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PatientCard patient={selectedPatient} />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Vitals</h3>
                    <button
                      onClick={() => setShowVitalsModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Update Vitals</span>
                    </button>
                  </div>
                  <VitalsTable vitals={patientVitals} />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add-patient' && <AddPatient />}

        {activeTab === 'vitals' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Vitals Management</h2>
            {selectedPatient ? (
              <div className="space-y-4">
                <PatientCard patient={selectedPatient} />
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Vitals History</h3>
                  <button
                    onClick={() => setShowVitalsModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Vitals</span>
                  </button>
                </div>
                <VitalsTable vitals={patientVitals} />
              </div>
            ) : (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a patient first to manage their vitals</p>
                <button
                  onClick={() => setActiveTab('patients')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Search Patients →
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Activity className="h-5 w-5" />
              <span className="text-sm">Powered by SMART on FHIR & Epic Sandbox</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 smartData POC - Healthcare Integration Demo
            </div>
          </div>
        </div>
      </footer>

      {/* Vitals Modal */}
      {showVitalsModal && selectedPatient && (
        <VitalsModal
          patient={selectedPatient}
          onClose={() => setShowVitalsModal(false)}
          onSave={handleAddVitals}
        />
      )}
    </div>
  );
}

export default App;