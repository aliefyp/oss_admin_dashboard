import { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis, ChartsYAxis, MarkPlot, ResponsiveChartContainer } from "@mui/x-charts";
import { useTranslation } from "react-i18next";
import { Response } from "types/dashboard/dashboard";
import dayjs from "dayjs";

interface Data {
  daily: Response['data']['dailyRegisteredCitizens'];
  weekly: Response['data']['weeklyRegisteredCitizens'];
  monthly: Response['data']['monthlyRegisteredCitizens'];
}

interface Props {
  data: Data;
  loading: boolean;
}

const RegisteredCitizens = ({ data, loading }: Props) => {
  const [activeTab, setActiveTab] = useState("daily");
  const { t } = useTranslation();

  console.log(setActiveTab)

  // const handleChange = (_: React.SyntheticEvent, newValue: string) => {
  //   setActiveTab(newValue);
  // }

  const dataSource = data.daily?.length > 0 ? data[activeTab] : [];

  return (
    <div className="border rounded-lg py-4 px-3">
      <div className="flex justify-between items-center">
        <Typography variant="h6" className="font-sm">
          {t('page_overview.section_registered_citizen.title')}
        </Typography>
        {/* <Tabs value={activeTab} onChange={handleChange} aria-label="Period">
          <Tab value="daily" sx={{ minWidth: '56px', padding: '4px 8px' }} label={t('page_overview.section_registered_citizen.tab_daily')} id="daily" />
          <Tab value="weekly" sx={{ minWidth: '56px', padding: '4px 8px' }} label={t('page_overview.section_registered_citizen.tab_weekly')} id="weekly" />
          <Tab value="monthly" sx={{ minWidth: '56px', padding: '4px 8px' }} label={t('page_overview.section_registered_citizen.tab_monthly')} id="monthly" />
        </Tabs> */}
      </div>
      <div className="py-2 overflow-x-auto h-[300px] w-full">
        {loading && (
          <div className="flex w-[100%] h-[300px] justify-center items-center">
            <CircularProgress />
          </div>
        )}
        {dataSource.length && (
          <ResponsiveChartContainer
            series={[
              {
                type: 'bar',
                data: dataSource.map(item => item.total),
                color: '#357AF6',
              }
            ]}
            xAxis={[
              {
                scaleType: 'band',
                id: 'x-axis-id',
                data: dataSource.map(item => dayjs(item.date).format('ddd, DD')),
              }
            ]}
          >
            <BarPlot />
            <MarkPlot />
            <ChartsXAxis position="bottom" axisId="x-axis-id" />
            <ChartsYAxis position="left" />
          </ResponsiveChartContainer>
        )}
      </div>
    </div>
  );
}

export default RegisteredCitizens;