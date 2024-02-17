import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm space-y-4 text-center">
        {/* <img
          src="/img_404.svg"
          alt="Not Found"
          className=" mx-auto mb-8 max-w-md"
        /> */}
        <Typography variant="h1" className="text-6xl font-bold">
          Oops...
        </Typography>
        <Typography variant="body1">
          Sorry, the page you are looking for could not be found. Please go back to the homepage.
        </Typography>
        <Link to="/" className="mx-auto inline-block">
          <Button variant="contained" size="large">Back to homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
