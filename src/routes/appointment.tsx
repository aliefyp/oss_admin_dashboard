import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
import PageLoader from "components/PageLoader";

const LazyAppointment = Loadable({
  loader: () => import('pages/Appointment'),
  loading: () => <PageLoader />,
});

const LazyAppointmentDetail = Loadable({
  loader: () => import('pages/AppointmentDetail'),
  loading: () => <PageLoader />,
});

function AppointmentRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyAppointment />} />
      <Route path="/:appointment_id" element={<LazyAppointmentDetail />} />
    </Routes>
  );
}

export default AppointmentRoute;