import { Divider, Typography } from "@mui/material";

const DUMMY_DATA = [
  { id: 1, name: 'Pending', percentage: 15, color: '#DCEBF5' },
  { id: 2, name: 'In Progress', percentage: 15, color: '#9DD7F3' },
  { id: 3, name: 'Approved', percentage: 45, color: '#54BEF2' },
  { id: 4, name: 'Rejected', percentage: 25, color: '#292D30' },
]

const TypeRegistered = () => {
  return (
    <div className="border rounded-lg py-4 px-3">
      <Typography variant="h6" className="font-sm">
        Type Registered
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
          Issued Card: 124
        </Typography>
        <Typography variant="caption" className="block text-gray-600">
          Include as approved but have waiting first
        </Typography>
      </div>
    </div>
  );
}

export default TypeRegistered;