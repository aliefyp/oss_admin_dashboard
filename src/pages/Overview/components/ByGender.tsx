import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { useTranslation } from "react-i18next";

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
      <div className="overflow-x-auto" ref={chartWrapperRef}>
        <PieChart
          series={[{
            data: [
              { id: 0, value: 10, label: 'series A', color: '#9DD7F3' },
              { id: 1, value: 15, label: 'series B', color: '#54BEF2' },
              { id: 2, value: 20, label: 'series C', color: '#292D30' },
            ],
            innerRadius: chartWidth / 4,
          }]}
          width={chartWidth}
          height={chartWidth - 20}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              padding: -8,
            },
          }}
        />
      </div>
    </div>
  );
}

export default ByGender;