import { Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import Filter from "./components/Filter";
import Table from "./components/Table";

const Applicants: React.FC = () => {
  return (
    <>
      <PageHeading title="Applicants">
        {/* <Button variant="text">+ Apply for Services</Button> */}
      </PageHeading>
      <div className="space-y-4">
        <div className="mb-4 space-y-3">
          <Filter />
          <Typography variant="caption" className="text-gray-600 block">Total <b>2000</b> Registered</Typography>
        </div>
        <div>
          <Table />
        </div>
      </div>
    </>
  );
}

export default Applicants;