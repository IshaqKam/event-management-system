import dynamic from 'next/dynamic';
import { RootState } from 'redux/store';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/useReduxHook';
import { GetMyEvents, GetAllEvents } from 'services/event.service';

const Layout = dynamic(() => import('components/ui/Layout'), { ssr: false });
const InfoCard = dynamic(() => import('components/ui/Dashboard/InfoCard'), {
  ssr: false,
});

export default function Page() {
  const { user } = useAppSelector((state: RootState) => state);
  const [data, setData] = useState({ totalEvents: 0, myEvents: 0 });

  useEffect(() => {
    async function getDashboardData() {
      const [myEvents, allEvents] = await Promise.all([
        GetMyEvents(),
        GetAllEvents(),
      ]);
      if (myEvents.data && allEvents.data) {
        console.log(myEvents.data.data.length + allEvents.data.data.length);
        setData({
          ...data,
          totalEvents: Number(
            myEvents.data.data.length + allEvents.data.data.length,
          ),
          myEvents: myEvents.data.data.length,
        });
      }
    }
    getDashboardData();
  }, []);

  if (!user.id) return <></>;

  return (
    <div className="flex max-w-full py-16 ">
      <div className="w-full flex flex-col flex-1">
        <div className="container px-2">
          <div className="grid grid-cols-3 place-items-center">
            <div className="flex items-center">
              <InfoCard heading="Total Events" count={data.totalEvents} />
            </div>
            <div className="flex items-center">
              <InfoCard heading="My Events" count={data.myEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading={'Event Management System'}>{page}</Layout>;
};
