import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
import PageLoader from "components/PageLoader";

const LazyOverview = Loadable({
  loader: () => import('pages/Overview'),
  loading: () => <PageLoader />,
});

function OverviewRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyOverview />} />
    </Routes>
  );
}

export default OverviewRoute;