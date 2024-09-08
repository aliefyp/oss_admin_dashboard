import { Typography } from "@mui/material";

interface Data {
  id: number;
  upperContent?: string;
  mainContent: string;
  lowerContent?: string;
  isActive?: boolean;
}

interface Props {
  data: Data[];
}

const Timeline = ({ data }: Props) => {
  if (!data?.length) return null;

  return (
    <>
      {data.map((item, index) => {
        const isLast = index === data.length - 1;

        return (
          <div key={item.id} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-[24px] h-[24px] bg-red-200 rounded-full shrink-0 flex items-center justify-center">
                {item.isActive && <div className="w-[16px] h-[16px] bg-red-500 rounded-full" />}
              </div>
              {!isLast && <div className="w-0 border-l-2 border-dashed border-red-200 grow" />}
            </div>
            <div className="pb-4">
              {item.upperContent && (
                <Typography variant="caption" className="!text-gray-600">
                  {item.upperContent}
                </Typography>
              )}
              <Typography variant="body1" className="!font-bold">
                {item.mainContent}
              </Typography>
              {item.lowerContent && (
                <Typography variant="body2" className="!text-gray-600">
                  {item.lowerContent}
                </Typography>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Timeline;
