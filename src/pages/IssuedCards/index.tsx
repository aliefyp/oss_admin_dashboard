import PageHeading from "components/PageHeading";
import CategoryCard from "./components/CategoryCard";

const IssuedCard = () => {
  return (
    <div>
      <PageHeading title="Issued Cards" />
      <div className="grid grid-cols-4 gap-4">
        <CategoryCard category="Birth Certificate" count={5} />
        <CategoryCard category="Marriage Certificate" count={5} />
        <CategoryCard category="Death Certificate" count={5} />
        <CategoryCard category="Birth Certificate" count={5} />
        <CategoryCard category="Marriage Certificate" count={5} />
        <CategoryCard category="Death Certificate" count={5} />
        <CategoryCard category="Marriage Certificate" count={5} />
        <CategoryCard category="Death Certificate" count={5} />
      </div>
    </div>
  );
}

export default IssuedCard;