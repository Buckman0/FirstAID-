import React from 'react';
import BookAppointment from '../features/appointments/BookAppointment';
import Chatbot from '../features/chat/Chatbot';
import EHRViewer from '../features/ehr/EHRViewer';
import CMEUpload from '../features/cme/CMEUpload';

export default function DashboardPatient(){
  const doctorId = 'PLACEHOLDER_DOCTOR_ID';
  const patientId = 'PLACEHOLDER_PATIENT_ID';
  return (
    <div>
      <h3>Patient Dashboard</h3>
      <BookAppointment doctorId={doctorId} />
      <Chatbot context={{ role: 'patient', patientId }} />
      <EHRViewer patientId={patientId} />
      <CMEUpload />
    </div>
  );
}
