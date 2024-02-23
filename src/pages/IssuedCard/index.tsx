import PageHeading from "components/PageHeading";
import ServiceCard from "./components/ServiceCard";
import services from "constants/services";

const IssuedCard = () => {
  return (
    <div>
      <PageHeading title="Issued Cards" />
      <div className="grid grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} count={5} />
        ))}
      </div>
    </div>
  );
}

export default IssuedCard;