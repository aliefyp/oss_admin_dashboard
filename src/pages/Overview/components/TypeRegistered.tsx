import { CircularProgress, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Response } from "types/dashboard/dashboard";

interface Props {
  data: Response['data']['totalApplicationByStatus'];
  loading: boolean;
}

const COLORS = ['#292D30', '#54BEF2', '#9DD7F3', '#DCEBF5', '#C2D3DF', '#F3F4F6'];

const TypeRegistered = ({ data, loading }: Props) => {
  const { t } = useTranslation();

  const total = data?.reduce((acc, curr) => acc + curr.total, 0);
  const percentages = data?.map((item, index) => ({
    id: item.status,
    name: t(`application_status.${item.status.toLowerCase()}`),
    percentage: Math.round((item.total / total) * 100),
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="border rounded-lg py-4 px-3">
      <Typography variant="h6" className="font-sm">
        {t('page_overview.section_type_registered.title')}
      </Typography>
      {loading && (
        <div className="flex w-[100%] h-[300px] justify-center items-center">
          <CircularProgress />
        </div>
      )}
      {data && (
        <>
          <div className="flex my-4 mb-6">
            {percentages.map(data => (
              <div
                key={data.id}
                className="h-5 rounded-xl"
                style={{ width: `${data.percentage}%`, backgroundColor: data.color }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 my-4">
            {percentages.map(data => (
              <div key={data.id} className="flex gap-2 items-baseline w-full">
                <div className="w-4 h-4 rounded-md" style={{ backgroundColor: data.color }} />
                <div>
                  <Typography variant="body2" className="font-sm text-gray-600">
                    {data.name}
                  </Typography>

                  <Typography variant="body2" className="font-sm">
                    {data.percentage}%
                  </Typography>
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div className="pt-4">
            <Typography variant="caption" className="block">
              {t('page_overview.section_type_registered.issued_card_count', { count: total })}
            </Typography>
            <Typography variant="caption" className="block text-gray-600">
              {t('page_overview.section_type_registered.issued_card_description')}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}

export default TypeRegistered;