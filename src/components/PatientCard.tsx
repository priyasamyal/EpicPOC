import React from 'react';
import { User, Calendar, MapPin, Phone, Mail } from 'lucide-react';

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

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{patient.name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {patient.mrn}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {new Date(patient.dob).toLocaleDateString()} ({calculateAge(patient.dob)} years)
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="h-4 w-4" />
              <span className="text-sm">{patient.gender}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{patient.address}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{patient.phone}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600 md:col-span-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{patient.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;