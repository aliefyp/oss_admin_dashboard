import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
import PageLoader from "components/PageLoader";

const LazyIssuedCard = Loadable({
  loader: () => import('pages/IssuedCard'),
  loading: () => <PageLoader />,
});

const LazyIssuedCardList = Loadable({
  loader: () => import('pages/IssuedCardList'),
  loading: () => <PageLoader />,
});

function IssuedCardRoute() {
  return (
    <Routes>
      <Route path="/" element={<LazyIssuedCard />} />
      <Route path="/:card_id" element={<LazyIssuedCardList />} />
    </Routes>
  );
}

export default IssuedCardRoute;