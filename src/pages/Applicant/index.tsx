import { Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import ApplicantFilter from "./components/ApplicantFilter";
import ApplicantTable from "./components/ApplicantTable";
import { useTranslation } from "react-i18next";

const Applicants: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeading title={t('page_applicant.title')}>
        {/* <Button variant="text">+ Apply for Services</Button> */}
      </PageHeading>
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <ApplicantFilter />
          <Typography variant="caption" className="text-gray-600 block">
            <span dangerouslySetInnerHTML={{ __html: t('page_applicant.total_registered', { count: 2000 })}} />
          </Typography>
        </div>
        <div>
          <ApplicantTable />
        </div>
      </div>
    </>
  );
}

export default Applicants;