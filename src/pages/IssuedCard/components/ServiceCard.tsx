import { Typography } from "@mui/material"
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Service } from "../types";

interface ServiceCardProps extends Service {
  count: number;
}

const ServiceCard = ({ id, icon, name, count }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group border rounded-xl p-4 cursor-pointer hover:border-gray-500 duration-200 ease-out"
      onClick={() => navigate(`/issued-card/${id}`)}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="w-[64px] h-[64px] flex items-center justify-center bg-orange-200 rounded-xl">
          <img src={icon} alt={name} width={32} height={32} />
        </div>
        <HiArrowRight className="text-2xl mr-2 group-hover:translate-x-3 ease-out duration-100" />
      </div>
      <Typography variant="h6">{name}</Typography>
      <Typography className="text-red-500">{`${count} issued cards`}</Typography>
    </div>
  );
}

export default ServiceCard;
