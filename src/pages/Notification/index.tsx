import { Button, Typography } from "@mui/material";
import PageHeading from "components/PageHeading";

const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    name: 'Thursday, 29 Feb 2024',
    items: [
      {
        id: 11,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: true,
        url: '/applicant/123',
      },
      {
        id: 12,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: true,
        url: '/applicant/123',
      },
      {
        id: 13,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: false,
        url: '/applicant/123',
      },
    ]
  },
  {
    id: 2,
    name: 'Wednesday, 28 Feb 2024',
    items: [
      {
        id: 21,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: false,
        url: '/applicant/123',
      },
      {
        id: 22,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: false,
        url: '/applicant/123',
      },
      {
        id: 23,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: false,
        url: '/applicant/123',
      },
    ]
  },
  {
    id: 3,
    name: 'Tuesday, 27 Feb 2024',
    items: [
      {
        id: 31,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: false,
        url: '/applicant/123',
      },
      {
        id: 32,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: false,
        url: '/applicant/123',
      },
      {
        id: 33,
        category: 'Re-New Passport Card',
        message: 'Citizen Maria Nunes Viqueque waiting approval for this submission',
        timestamp: '10:00',
        unread: false,
        url: '/applicant/123',
      },
    ]
  }
];

const Notification: React.FC = () => {
  return (
    <>
      <PageHeading withBackButton title="Notification">
        <Button variant="text">Mark as Unread</Button>
      </PageHeading>
      {DUMMY_NOTIFICATIONS.map((notif) => (
        <div key={notif.id} className="mb-4">
          <Typography variant="h6" className="!mb-2">{notif.name}</Typography>
          {notif.items.map((item) => (
            <a key={item.id} href={item.url} className="block border-b border-gray-300 last:border-none cursor-pointer">
              <div className={`grid grid-cols-12 py-3 px-2 align-baseline hover:bg-gray-50 ${item.unread ? 'bg-purple-100 hover:bg-purple-200' : ''}`}>
                <Typography variant="body2" className={`col-span-2 ${item.unread ? '!font-bold' : ''}`}>{item.category}</Typography>
                <Typography variant="body2" className="col-span-9">{item.message}</Typography>
                <Typography variant="caption" className="col-span-1 text-right">{item.timestamp}</Typography>
              </div>
            </a>
          ))}
        </div>
      ))}
    </>
  );
}

export default Notification;