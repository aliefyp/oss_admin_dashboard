import { Typography } from "@mui/material"
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: string;
  count: number;
}

const CategoryCard = ({ category, count }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group border rounded-xl p-4 cursor-pointer hover:border-gray-500 duration-200 ease-out" onClick={() => navigate("/issued-card/123")}>
      <div className="flex justify-between items-center mb-4">
        <div className="w-[64px] h-[64px] flex items-center justify-center bg-orange-200 rounded-xl">
          <img src="http://placehold.it/32x32" alt="icon" />
        </div>
        <HiArrowRight className="text-2xl mr-2 group-hover:translate-x-3 ease-out duration-100" />
      </div>
      <Typography variant="h6">{category}</Typography>
      <Typography className="text-red-500">{`${count} issued cards`}</Typography>
    </div>
  );
}

export default CategoryCard;
