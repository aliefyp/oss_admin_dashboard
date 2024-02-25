import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
import PageLoader from "components/PageLoader";

const LazyNotification = Loadable({
  loader: () => import('pages/Notification'),
  loading: () => <PageLoader />,
});

function NotificationRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyNotification />} />
    </Routes>
  );
}

export default NotificationRoute;