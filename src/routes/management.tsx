import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
import PageLoader from "components/PageLoader";

const LazyManagement = Loadable({
  loader: () => import('pages/Management'),
  loading: () => <PageLoader />,
});

const LazyManagementForm = Loadable({
  loader: () => import('pages/ManagementForm'),
  loading: () => <PageLoader />,
});

function ManagementRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyManagement />} />
      <Route path="/new" element={<LazyManagementForm />} />
      <Route path="/edit/:user_id?" element={<LazyManagementForm />} />
    </Routes>
  );
}

export default ManagementRoute;