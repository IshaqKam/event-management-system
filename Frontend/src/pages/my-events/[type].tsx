import { ROUTES } from 'routes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { PageQuery } from 'interfaces/query';
import { PageProps } from 'interfaces/pages';
import { RequestType } from 'validators/query/utils';
import { GetServerSidePropsContext } from 'next';
import { AddEvent, GetEvent, UpdateEvent } from 'services/event.service';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const Layout = dynamic(() => import('components/ui/Layout'), { ssr: false });
const UsersDetails = dynamic(() => import('components/ui/Forms/Events'), {
  ssr: false,
});

type Props = PageProps & {
  type: PageQuery;
  id: string | null;
};

export default function Page({ showToast, id, type }: Props) {
  const router = useRouter();
  const [event, setEvent] = useState<IEvent>();

  const getData = async () => {
    if (id) {
      const { data } = await GetEvent(String(id));
      if (data && data.data) {
        setEvent({
          ...data.data,
          date: format(new Date(data.data.date), 'yyyy-MM-dd'),
        });
      } else {
        showToast({ level: 'warning', message: 'No Event found by this id' });
      }
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  async function handleUpdateUser(values: ICreateEvent) {
    if (type === PageQuery.UPDATE && event) {
      const { _id } = event;
      const { data: eventData } = await UpdateEvent(_id, { ...values });
      if (eventData) {
        showToast({ level: 'info', message: 'Updated' });
        return;
      }
    } else {
      const { data: eventData } = await AddEvent(values);
      if (eventData) {
        console.log(eventData.data);
        const id = eventData.data._id;
        showToast({ level: 'info', message: 'Added' });
        router.push(`${ROUTES['my-events-update']}?id=${id}`);
        return;
      }
    }
    showToast({ level: 'error', message: 'Update failed!' });
  }

  return (
    <main className="grow py-4">
      <div className="flex items-center justify-between">
        <UsersDetails
          data={event}
          type={type}
          handleUpdate={handleUpdateUser}
          showToast={showToast}
        />
      </div>
    </main>
  );
}

Page.getLayout = (page: JSX.Element) => {
  return <Layout heading={'Users'}>{page}</Layout>;
};

export async function getServerSideProps({
  res,
  query,
  locale,
}: GetServerSidePropsContext) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=86400',
  );

  const request = RequestType.safeParse(query);

  if (!request.success) {
    return {
      notFound: true,
    };
  }

  const type = request.data.type;

  if (type === PageQuery.ADD) {
    return {
      props: {
        type,
        data: null,
      },
    };
  }

  const id = query.id;

  if (!id) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES['my-events'],
      },
      props: {},
    };
  }

  console.log('MYFD');

  return {
    props: {
      type,
      id,
    },
  };
}
