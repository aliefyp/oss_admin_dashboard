import { Typography } from "@mui/material";
import { useZendeskTickets } from "api/zendesk";
import PageHeading from "components/PageHeading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import TicketTable from "./components/TicketTable";

const Applicants: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const {
    data: dataTickets,
    isFetching: loadingTickets,
    error: errorTickets,
  } = useZendeskTickets();

  useEffect(() => {
    const urlParams = new URLSearchParams({
      page: String(paginationModel.page + 1),
      limit: String(paginationModel.pageSize),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [paginationModel, navigate, location.pathname])

  return (
    <>
      <PageHeading title={t('page_ticket.title')} />
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Typography variant="caption" className="text-gray-600 block">
              <span dangerouslySetInnerHTML={{ __html: t('page_ticket.total_registered', { count: dataTickets?.metadata?.totalCount }) }} />
            </Typography>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <TicketTable
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            data={dataTickets}
            loading={loadingTickets}
            error={errorTickets}
          />
        </div>
      </div>
    </>
  );
}

export default Applicants;