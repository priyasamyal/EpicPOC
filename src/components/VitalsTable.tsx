import React from 'react';
import { Calendar, Heart, Thermometer, Weight, Activity } from 'lucide-react';

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

interface VitalsTableProps {
  vitals: Vital[];
}

const VitalsTable: React.FC<VitalsTableProps> = ({ vitals }) => {
  if (vitals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">No vital signs recorded yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-red-600" />
          <span>Vitals History</span>
        </h4>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Activity className="h-4 w-4" />
                  <span>Blood Pressure</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>Heart Rate</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Thermometer className="h-4 w-4" />
                  <span>Temperature</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Weight className="h-4 w-4" />
                  <span>Weight</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vitals.map((vital) => (
              <tr key={vital.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(vital.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {vital.systolic}/{vital.diastolic}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">mmHg</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{vital.heartRate}</span>
                  <span className="text-xs text-gray-500 ml-1">bpm</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{vital.temperature}</span>
                  <span className="text-xs text-gray-500 ml-1">°F</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{vital.weight}</span>
                  <span className="text-xs text-gray-500 ml-1">lbs</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VitalsTable;