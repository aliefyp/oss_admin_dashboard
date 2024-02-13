import { useState } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis, ChartsYAxis, MarkPlot, ResponsiveChartContainer } from "@mui/x-charts";

const RegisteredCitizens = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  }

  return (
    <div className="border rounded-lg py-4 px-3">
      <div className="flex justify-between items-center">
        <Typography variant="h6" className="font-sm">
          Registered Citizens
        </Typography>
        <Tabs value={activeTab} onChange={handleChange} aria-label="Period">
          <Tab sx={{ minWidth: '56px', padding: '4px 8px' }} label="Daily" id="daily" />
          <Tab sx={{ minWidth: '56px', padding: '4px 8px' }} label="Weekly" id="weekly" />
          <Tab sx={{ minWidth: '56px', padding: '4px 8px' }} label="Monthly" id="monthly" />
        </Tabs>
      </div>
      <div className="py-2 overflow-x-auto h-[300px] w-full">
        <ResponsiveChartContainer
          series={[
            {
              type: 'bar',
              data: [40, 30, 50, 25, 35, 60, 40],
              color: '#357AF6',
            }
          ]}
          xAxis={[
            {
              scaleType: 'band',
              id: 'x-axis-id',
              data: ['Tue, 9', 'Wed, 10', 'Thu, 11', 'Fri, 12', 'Sat, 13', 'Sun, 14', 'Mon, 15'],
            }
          ]}
        >
          <BarPlot />
          <MarkPlot />
          <ChartsXAxis position="bottom" axisId="x-axis-id" />
          <ChartsYAxis position="left" />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
}

export default RegisteredCitizens;