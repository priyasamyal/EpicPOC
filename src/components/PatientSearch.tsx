import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

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

interface PatientSearchProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ patients, onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');

  const filteredPatients = patients.filter(patient => {
    const term = searchTerm.toLowerCase();
    switch (searchType) {
      case 'name':
        return patient.name.toLowerCase().includes(term);
      case 'mrn':
        return patient.mrn.toLowerCase().includes(term);
      case 'id':
        return patient.id.toLowerCase().includes(term);
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="name">Name</option>
            <option value="mrn">MRN</option>
            <option value="id">Patient ID</option>
          </select>
        </div>
        
        <p className="text-sm text-gray-600">
          Searching Epic FHIR Patient resources • {filteredPatients.length} results found
        </p>
      </div>

      <div className="space-y-2">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-red-50 hover:border-red-300 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{patient.name}</h4>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {patient.mrn}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {patient.gender} • DOB: {new Date(patient.dob).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {filteredPatients.length === 0 && searchTerm && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <User className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No patients found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;