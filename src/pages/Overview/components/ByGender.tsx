import { useEffect, useRef, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { useTranslation } from "react-i18next";
import ChartLegend from "components/ChartLegend";
import { Response } from "types/dashboard/dashboard";

const CHART_COLOR_BY_GENDER = {
  male: '#292D30',
  female: '#9DD7F3',
};

interface Props {
  data: Response['data']['registeredCitizenByGenders'];
  loading: boolean;
}

const ByGender = ({ data, loading }: Props) => {
  const { t } = useTranslation();

  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  const total = data?.reduce((acc, item) => acc + item.total, 0);

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
      {loading && (
        <div className="flex w-[100%] h-[300px] justify-center items-center">
          <CircularProgress />
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="lg:col-span-3 col-span-4" ref={chartWrapperRef}>
          <div className="relative flex items-center justify-center bg-gray-100 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Typography variant="body2" className="text-gray-600">
                {t('page_overview.section_by_gender.total')}
              </Typography>
              <Typography variant="h6" className="font-sm text-center">
                {total}
              </Typography>
            </div>
            <PieChart
              margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
              series={[{
                data: data?.map(item => ({
                  value: item.total,
                  label: t(`gender.${item.gender}`),
                  color: CHART_COLOR_BY_GENDER[item.gender]
                })) || [],
                innerRadius: chartWidth / 3,
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
        <div className="lg:col-span-1 col-span-4">
          <ChartLegend data={data?.map(item => ({
            value: `${Math.round(item.total / total * 100)}%`,
            label: t(`gender.${item.gender}`),
            color: CHART_COLOR_BY_GENDER[item.gender]
          })) || []} />
        </div>
      </div>
    </div>
  );
}

export default ByGender;