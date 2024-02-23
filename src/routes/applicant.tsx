import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
import PageLoader from "components/PageLoader";

const LazyApplicant = Loadable({
  loader: () => import('pages/Applicant'),
  loading: () => <PageLoader />,
});

const LazyApplicantDetail = Loadable({
  loader: () => import('pages/ApplicantDetail'),
  loading: () => <PageLoader />,
});

function ApplicantRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyApplicant />} />
      <Route path="/:applicant_id" element={<LazyApplicantDetail />} />
    </Routes>
  );
}

export default ApplicantRoute;