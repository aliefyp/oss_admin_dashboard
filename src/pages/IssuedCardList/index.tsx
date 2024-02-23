import { Chip, Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import IssuedCardListFilter from "./components/IssuedCardListFilter";
import IssuedCardListTable from "./components/IssuedCardListTable";

const IssuedCardList: React.FC = () => {
  return (
    <>
      <PageHeading withBackButton title="Issued Cards: Passport Card" />
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <IssuedCardListFilter />
          <div className="flex items-center gap-3">
            <Typography variant="caption" className="text-gray-600 block">Total <b>2000</b> Issued Cards</Typography>
            <div className="flex items-center gap-2">
              <Typography variant="body2" className="!font-bold text-red-500">Reset Filter</Typography>
              <Chip label="Service" size="small" variant="outlined" onDelete={() => {}} />
            </div>
          </div>
        </div>
        <div>
          <IssuedCardListTable />
        </div>
      </div>
    </>
  );
}

export default IssuedCardList;