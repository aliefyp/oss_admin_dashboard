import { Typography } from "@mui/material";
import RegisteredCitizens from "./components/RegisteredCitizens";
import TypeRegistered from "./components/TypeRegistered";
import ByGender from "./components/ByGender";
import ByAge from "./components/ByAge";
import ServiceDistributed from "./components/ServiceDistributed";
import Filter from "./components/Filter";
import PageHeading from "components/PageHeading";

const Overview: React.FC = () => {
  return (
    <>
      <PageHeading title="Overview">
        <Typography variant="caption" className="text-gray-600">Latest Update: <span className="text-gray-800">Monday, 15 April 2024 - 11:23</span></Typography>
      </PageHeading>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-4 space-y-3">
          <Filter />
          <Typography variant="caption" className="text-gray-600 block">Total <b>2000</b> Registered</Typography>
        </div>
        <div className="col-span-8 space-y-4">
          <RegisteredCitizens />
          <div className="grid grid-cols-2 gap-4">
            <ByGender />
            <ByAge />
          </div>
        </div>
        <div className="col-span-4 space-y-4">
          <TypeRegistered />
          <ServiceDistributed />
        </div>
      </div>
    </>
  );
}

export default Overview;