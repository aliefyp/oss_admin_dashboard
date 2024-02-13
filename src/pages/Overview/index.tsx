import RegisteredCitizens from "./components/RegisteredCitizens";
import TypeRegistered from "./components/TypeRegistered";
import ByGender from "./components/ByGender";
import ByAge from "./components/ByAge";

const Overview: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 space-y-4">
        <RegisteredCitizens />
        <div className="grid grid-cols-2 gap-4">
          <ByGender />
          <ByAge />
        </div>
      </div>
      <div className="col-span-4 space-y-4">
        <TypeRegistered />
      </div>
    </div>
  );
}

export default Overview;