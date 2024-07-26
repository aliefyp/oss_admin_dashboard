import PageLoader from "components/PageLoader";
import Loadable from 'react-loadable';
import { Route, Routes } from "react-router-dom";

const LazyTicket = Loadable({
  loader: () => import('pages/Ticket'),
  loading: () => <PageLoader />,
});

// const LazyTicketDetail = Loadable({
//   loader: () => import('pages/TicketDetail'),
//   loading: () => <PageLoader />,
// });

function TicketRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyTicket />} />
      {/* <Route path="/:ticket_id" element={<LazyTicketDetail />} /> */}
    </Routes>
  );
}

export default TicketRoute;