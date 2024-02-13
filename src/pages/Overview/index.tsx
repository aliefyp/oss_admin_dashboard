import TypeRegistered from "./components/TypeRegistered";

const Overview: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 space-y-4">
        <div className="border rounded-lg py-4 px-2">
          adsdasd
        </div>
        <div className="border rounded-lg py-4 px-2">
          adsdasd
        </div>
      </div>
      <div className="col-span-4 space-y-4">
        <TypeRegistered />
      </div>
    </div>
  );
}

export default Overview;