import { Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import ApplicantFilter from "./components/ApplicantFilter";
import ApplicantTable from "./components/ApplicantTable";

const Applicants: React.FC = () => {
  return (
    <>
      <PageHeading title="Applicants">
        {/* <Button variant="text">+ Apply for Services</Button> */}
      </PageHeading>
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <ApplicantFilter />
          <Typography variant="caption" className="text-gray-600 block">Total <b>2000</b> Registered</Typography>
        </div>
        <div>
          <ApplicantTable />
        </div>
      </div>
    </>
  );
}

export default Applicants;