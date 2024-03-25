import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
import PageLoader from "components/PageLoader";

const LazyAppoinment = Loadable({
  loader: () => import('pages/Appoinment'),
  loading: () => <PageLoader />,
});

// const LazyAppoinmentDetail = Loadable({
//   loader: () => import('pages/AppoinmentDetail'),
//   loading: () => <PageLoader />,
// });

function AppoinmentRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyAppoinment />} />
      {/* <Route path="/:applicant_id" element={<LazyAppoinmentDetail />} /> */}
    </Routes>
  );
}

export default AppoinmentRoute;