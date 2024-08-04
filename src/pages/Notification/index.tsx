import { Button, Typography } from "@mui/material";
import { useLogs } from "api/me";
import EmptyState from "components/EmptyState";
import PageHeading from "components/PageHeading";
import PageLoader from "components/PageLoader";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserData } from "types/auth/user";
import { Response } from "types/me/logs";
import useRoleGroup from "usecase/useRoleGroup";
import groupBy from "utils/groupBy";

type LogItem = Response['data'][0] & { formattedDate: string, isRead: boolean };
type GroupedLogs = Record<string, LogItem[]>;
type ActionType = "createApplication" |
  "approveApplicationFromFrontOffice" |
  "rejectApplicationFromFrontOffice" |
  "approveApplicationFromBackOffice" |
  "rejectApplicationFromBackOffice" |
  "createAppointment" |
  "rescheduleAppointment" |
  "approveAppointment" |
  "rejectAppointment"

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuthUser<UserData>();
  const { t } = useTranslation();
  const { data, isFetching, error } = useLogs();
  const logData = data?.data;
  const { isFoGroup, isBoGroup } = useRoleGroup(auth?.roleGroup || '');

  const [readIds, setReadIds] = useState<number[]>([]);
  const storageKey = `readStatus-${auth?.userId}`;

  useEffect(() => {
    if (readIds.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(readIds));
    }
  }, [readIds, storageKey])

  useEffect(() => {
    const storage = localStorage.getItem(storageKey);
    const ids = JSON.parse(storage || '[]');

    // init storage if no storage found
    if (!storage) {
      localStorage.setItem(storageKey, JSON.stringify([]));
    }

    // init read id from local storage
    if (storage && ids.length > 0 && readIds.length === 0) {
      setReadIds(ids);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getReadStatus = (id: number) => {
    return readIds.includes(id);
  }

  const markAsRead = (id: number) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id]);
    }
  }

  const markAllAsUnRead = () => {
    setReadIds([]);
  }

  const groupedByDate: GroupedLogs = groupBy(
    logData?.map(i => ({
      ...i,
      formattedDate: dayjs(i.createdAt).format('dddd, DD MMM YYYY'),
      isRead: getReadStatus(i.id),
    })).sort((a, b) => {
      return dayjs(a.createdAt).diff(b.createdAt) * -1
    }) || [],
    'formattedDate'
  );

  const dates = Object.keys(groupedByDate);

  const getTemplateByAction = (logItem: LogItem) => {
    const action = logItem.action as ActionType;

    const service = logItem.applicationService;
    const serviceStr = service ? `for ${t(`sub_services.${service}`)}` : '';

    const name = logItem.citizenFullName;
    const nameStr = name ? `from <b>${name}</b>` : '';

    switch (action) {
      case 'createApplication':
        if (isFoGroup) return `You have new application ${nameStr} ${serviceStr}`;
        else return '';
      case 'approveApplicationFromFrontOffice':
        if (isFoGroup) return `You have <b>Approved</b> application ${nameStr} ${serviceStr}`;
        if (isBoGroup) return `You have new application ${nameStr} ${serviceStr}`
        else return '';
      case 'rejectApplicationFromFrontOffice':
        if (isFoGroup) return `You have <b>Rejected</b> application ${nameStr} ${serviceStr}`;
        else return '';
      case 'approveApplicationFromBackOffice':
        if (isFoGroup) return `Application ${nameStr} ${serviceStr} is <b>Completed</b>`;
        if (isBoGroup) return `You have <b>Approved</b> application ${nameStr} ${serviceStr}`;
        else return '';
      case 'rejectApplicationFromBackOffice':
        if (isFoGroup) return `Application ${nameStr} ${serviceStr} is <b>Rejected</b>`;
        if (isBoGroup) return `You have <b>Rejected</b> application ${nameStr} ${serviceStr}`;
        else return '';
      case 'createAppointment':
        if (isFoGroup) return `You have new <b>Appointment</b> request ${nameStr} ${serviceStr}`;
        else return '';
      case 'rescheduleAppointment':
        if (isFoGroup) return `You have rescheduled <b>Appointment</b> request ${nameStr} ${serviceStr}`;
        else return '';
      case 'approveAppointment':
        if (isFoGroup) return `You have <b>Approved</b> appointment request ${nameStr} ${serviceStr}`;
        else return '';
      case 'rejectAppointment':
        if (isFoGroup) return `You have Rejected appointment request ${nameStr} ${serviceStr}`;
        else return '';
      default:
        return '';
    }
  }

  const getUrlByAction = (logItem: LogItem) => {
    const action = logItem.action as ActionType;

    switch (action) {
      case 'createApplication':
        return `/applicant/${logItem.applicationId}`;
      case 'approveApplicationFromFrontOffice':
        return `/applicant/${logItem.applicationId}`;
      case 'rejectApplicationFromFrontOffice':
        return `/applicant/${logItem.applicationId}`;
      case 'approveApplicationFromBackOffice':
        return `/applicant/${logItem.applicationId}`;
      case 'rejectApplicationFromBackOffice':
        return `/applicant/${logItem.applicationId}`;
      case 'createAppointment':
        return `/appointment/${logItem.appointmentId}`;
      case 'rescheduleAppointment':
        return `/appointment/${logItem.appointmentId}`;
      case 'approveAppointment':
        return `/appointment/${logItem.appointmentId}`;
      case 'rejectAppointment':
        return `/appointment/${logItem.appointmentId}`;
      default:
        return '';
    }
  }

  const handleLogClick = (logItem: LogItem) => {
    const url = getUrlByAction(logItem);
    markAsRead(logItem.id);
    setTimeout(() => navigate(url), 50);
  }

  if (isFetching) return <PageLoader />;

  return (
    <>
      <PageHeading withBackButton title="Notification">
        {logData?.length > 0 && (
          <Button variant="text" onClick={markAllAsUnRead}>Mark as Unread</Button>
        )}
      </PageHeading>
      {(error && !isFetching) && (
        <EmptyState type="error" title="Error">{error.message}</EmptyState>
      )}
      {(!logData?.length || (!isFoGroup && !isBoGroup)) && !isFetching && (
        <EmptyState type="empty" title="Ooops..">
          No notification found.
        </EmptyState>
      )}
      {logData?.length > 0 && dates?.map((date) => (
        <div key={date} className="mb-4">
          <Typography variant="h6" className="!mb-2">{date}</Typography>
          {groupedByDate[date].map((item) => (
            <div key={item.id} onClick={() => handleLogClick(item)} className="block border-b border-gray-300 last:border-none cursor-pointer">
              <div className={`grid grid-cols-12 py-3 px-2 align-baseline hover:bg-gray-50 ${!item.isRead ? 'bg-purple-100 hover:bg-purple-200' : ''}`}>
                {/* <Typography variant="body2" className={`col-span-2 ${item.unread ? '!font-bold' : ''}`}>{item.category}</Typography> */}
                <Typography variant="body2" className="col-span-11">
                  <span dangerouslySetInnerHTML={{ __html: getTemplateByAction(item) }}></span>
                </Typography>
                <Typography variant="caption" className="col-span-1 text-right">{dayjs(item.createdAt).format('HH:mm')}</Typography>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Notification;