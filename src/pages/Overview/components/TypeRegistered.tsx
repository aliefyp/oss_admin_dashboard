import { Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


const TypeRegistered = () => {
  const { t } = useTranslation();

  const DUMMY_DATA = [
    { id: 1, name: t('page_overview.section_type_registered.status_pending'), percentage: 15, color: '#DCEBF5' },
    { id: 2, name: t('page_overview.section_type_registered.status_in_progress'), percentage: 15, color: '#9DD7F3' },
    { id: 3, name: t('page_overview.section_type_registered.status_approved'), percentage: 45, color: '#54BEF2' },
    { id: 4, name: t('page_overview.section_type_registered.status_rejected'), percentage: 25, color: '#292D30' },
  ]

  return (
    <div className="border rounded-lg py-4 px-3">
      <Typography variant="h6" className="font-sm">
        {t('page_overview.section_type_registered.title')}
      </Typography>
      <div className="flex my-4 mb-6">
        {DUMMY_DATA.map(data => (
          <div
            key={data.id}
            className="h-5 rounded-xl"
            style={{ width: `${data.percentage}%`, backgroundColor: data.color }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 my-4">
        {DUMMY_DATA.map(data => (
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
          {t('page_overview.section_type_registered.issued_card_count', { count: 124 })}
        </Typography>
        <Typography variant="caption" className="block text-gray-600">
          {t('page_overview.section_type_registered.issued_card_description')}
        </Typography>
      </div>
    </div>
  );
}

export default TypeRegistered;