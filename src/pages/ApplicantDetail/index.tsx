import { Button, Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import { HiOutlineDownload } from "react-icons/hi";
import Table from "./components/Table";
import { useState } from "react";
import ModalApproveConfirmation from "./components/ModalApproveConfirmation";
import ModalRejectConfirmation from "./components/ModalRejectConfirmation";

const PERSONAL_DETAILS = [
  {
    label: "Applicant’s ID",
    value: "099-864-351-uu",
  },
  {
    label: "Identity Number",
    value: "12345678901234",
  },
  {
    label: "First Name",
    value: "Manuel",
  },
  {
    label: "Email",
    value: "Manuel.Belo@gmail.com",
  },
  {
    label: "Last Name",
    value: "Manuel Moniz Belo",
  },
  {
    label: "Phone Number",
    value: "+92 234 434 222",
  },
  {
    label: "Identity Type",
    value: "Citizen Card",
  },
  {
    label: "Gender",
    value: "Male",
  },
];

const BIRTH_DETAILS = [
  {
    label: "Birth Date",
    value: "12-09-1993",
  },
  {
    label: "Country",
    value: "Timor-Leste",
  },
  {
    label: "Municipality/State",
    value: "Aileu",
  },
  {
    label: "Post Administrative/City",
    value: "Laulara",
  },
];

const LOCAL_RESIDENCE = [
  {
    label: "Country",
    value: "Timor-Leste",
  },
  {
    label: "Municipality/State",
    value: "Aileu",
  },
  {
    label: "Post Administrative/City",
    value: "Laulara",
  },
];

const DETAILS_DATA = [
  {
    span: 2,
    title: "Personal Details",
    data: PERSONAL_DETAILS,
  },
  {
    span: 1,
    title: "Birth Details",
    data: BIRTH_DETAILS,
  },
  {
    span: 1,
    title: "Local Residence",
    data: LOCAL_RESIDENCE,
  },
];

const ApplicantDetail: React.FC = () => {
  const [openApproveConfirmation, setOpenApproveConfirmation] = useState(false);
  const [openRejectConfirmation, setOpenRejectConfirmation] = useState(false);

  return (
    <>
      <PageHeading title="Applicant Detail" withBackButton />

      <div className="space-y-4">

        {/* card status */}
        <div className="border rounded-lg py-2 px-3">
          <div className="flex justify-between items-center">
            <Typography variant="body2" className="m-0">
              Applying for: <b>Re-new Passport</b>
            </Typography>
            <Typography variant="body2" className="m-0">
              Deliver: <b>Normal</b>
            </Typography>
            <Button variant="text" className="flex items-center gap-1 !py-1"><HiOutlineDownload /> Download All Data</Button>
          </div>
        </div>

        {/* card detail */}
        <div className="border rounded-lg pt-4 pb-6 px-3">
          <Typography variant="h4" className="!mb-6">
            Citizen Identity
          </Typography>
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-1">
              <img src="https://via.placeholder.com/150" alt="citizen identity" />
            </div>
            {DETAILS_DATA.map(item => (
              <div key={item.title} className={`col-span-${item.span} border-r last:border-r-0 pl-4 pr-2`}>
                <Typography variant="h6" className="!mb-7">
                  {item.title}
                </Typography>
                <div className={`grid grid-cols-${item.span} gap-4`}>
                  {item.data.map(i => (
                    <div key={i.label} className="col-span-1">
                      <Typography variant="body2" className="!text-gray-500">{i.label}</Typography>
                      <Typography variant="body2" className="!font-bold">{i.value}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="py-4 space-y-4">
          <Typography variant="h4">
            Checking Required Documents
          </Typography>
          <Table />
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              className="w-[200px]"
              onClick={() => setOpenApproveConfirmation(true)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              className="w-[200px]"
              onClick={() => setOpenRejectConfirmation(true)}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>

      <ModalApproveConfirmation
        open={openApproveConfirmation}
        onClose={() => setOpenApproveConfirmation(false)}
        onConfirm={() => { }}
      />

      <ModalRejectConfirmation
        open={openRejectConfirmation}
        onClose={() => setOpenRejectConfirmation(false)}
        onConfirm={() => { }}
      />
    </>
  );
}

export default ApplicantDetail;