import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { useTranslation } from "react-i18next";
import ChartLegend from "components/ChartLegend";

const DUMMY_DATA = [
  { id: 0, value: 10, label: 'series A', color: '#9DD7F3' },
  { id: 1, value: 15, label: 'series B', color: '#54BEF2' },
  { id: 2, value: 20, label: 'series C', color: '#292D30' },
]

const ByGender = () => {
  const { t } = useTranslation();

  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    if (chartWrapperRef.current) {
      setChartWidth(chartWrapperRef.current.clientWidth);
    }
  }, [chartWrapperRef])

  return (
    <div className="border rounded-lg py-4 px-3">
      <Typography variant="h6" className="font-sm">
        {t('page_overview.section_by_gender.title')}
      </Typography>
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="2xl:col-span-3 col-span-4" ref={chartWrapperRef}>
          <div className="relative flex items-center justify-center bg-gray-100 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Typography variant="body2" className="text-gray-600">
                Total Registered
              </Typography>
              <Typography variant="h6" className="font-sm text-center">
                2000
              </Typography>
            </div>
            <PieChart
              margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
              series={[{
                data: DUMMY_DATA,
                innerRadius: chartWidth / 4,
              }]}
              width={chartWidth}
              height={chartWidth}
              slotProps={{
                legend: {
                  hidden: true,
                },
              }}
            />
          </div>
        </div>
        <div className="2xl:col-span-1 col-span-4">
          <ChartLegend data={DUMMY_DATA} />
        </div>
      </div>
    </div>
  );
}

export default ByGender;