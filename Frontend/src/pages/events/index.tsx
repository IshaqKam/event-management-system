import { ROUTES } from 'routes';
import dynamic from 'next/dynamic';
import { GetAllEvents } from 'services/event.service';
import { useEffect, useState } from 'react';
import { PageProps } from 'interfaces/pages';

const List = dynamic(() => import('components/ui/Listing'), { ssr: false });
const Layout = dynamic(() => import('components/ui/Layout'), { ssr: false });
const ListToolbar = dynamic(() => import('components/ui/ListToolbar'), {
  ssr: false,
});

export default function Page({ showToast }: PageProps) {
  const [eventData, setEventData] = useState<IEvent[]>([
    {
      _id: '',
      date: '',
      time: '',
      title: '',
      rsvps: [''],
      location: '',
      created_by: '',
      description: '',
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const { error, data } = await GetAllEvents();
      if (data) {
        setEventData(data.data);
      } else if (error && error.response && error.response.data) {
        const axioserror = error.response.data as unknown as any;
        showToast({
          level: 'warning',
          message: String(axioserror.message),
        });
      }
    };
    getData();
  }, []);

  const TableContent = eventData.map((item, index) => ({
    ...item,
    rsvpsLength: item.rsvps.length,
    date: item.date.split('T')[0],
    no: index + 1,
  }));

  return (
    <main className="grow py-4">
      <div className="mx-4">
        <ListToolbar heading={'All Events'} />
        <div className="mt-4">
          <List
            content={TableContent}
            customURL={id => `${ROUTES['events-view']}?id=${id}`}
            columns={[
              { dataField: 'no', caption: 'NO.' },
              { dataField: 'title', caption: 'Title' },
              { dataField: 'description', caption: 'Description' },
              { dataField: 'date', caption: 'Date' },
              { dataField: 'rsvpsLength', caption: 'Number of RSVPs' },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading={'Events'}>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    revalidate: 2,
    props: {},
  };
}
