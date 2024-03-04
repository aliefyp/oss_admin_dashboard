import { Typography } from "@mui/material";

interface Data {
  label: string;
  value: string | number;
  color: string;
}

interface ChartLegendProps {
  data: Data[];
}

const ChartLegend = ({ data }: ChartLegendProps) => {
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div className="w-[16px] h-[16px] rounded-[3px]" style={{ backgroundColor: item.color }}></div>
          <div>
            <Typography variant="body2" className="text-gray-600">{item.label}</Typography>
            <Typography variant="body2">{item.value}</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend;
