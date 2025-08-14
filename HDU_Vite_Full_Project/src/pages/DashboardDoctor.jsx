import React from 'react';
import DoctorAppointments from '../features/appointments/DoctorAppointments';
import EHRViewer from '../features/ehr/EHRViewer';
import TelemedicineRoom from '../features/telemedicine/TelemedicineRoom';

export default function DashboardDoctor(){
  return <div>
    <h3>Doctor Dashboard</h3>
    <DoctorAppointments />
    <EHRViewer patientId={'PLACEHOLDER_PATIENT_ID'} />
    <TelemedicineRoom roomId={'hdu-room-123'} />
  </div>
}
