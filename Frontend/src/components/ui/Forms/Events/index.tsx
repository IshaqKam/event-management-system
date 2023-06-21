import { memo } from 'react';
import { ROUTES } from 'routes';
import { useFormik } from 'formik';
import { PageQuery } from 'interfaces/query';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AppButton, Link, Card, Input } from 'components';
import { CardContent, CardHeader, Divider, Grid } from '@mui/material';
import EventFormValidator from 'validators/forms/event';
import { DeleteEvent } from 'services/event.service';
import { useRouter } from 'next/router';
import { ToastInfo } from 'hooks/useToast';

type Props = {
  type: PageQuery;
  data: IEvent | undefined;
  handleUpdate: (values: ICreateEvent) => void;
  showToast: (info: ToastInfo) => void;
};

function EventDetails({ type, data, handleUpdate, showToast }: Props) {
  const router = useRouter();
  const formik = useFormik<ICreateEvent>({
    initialValues: {
      title: data ? data.title : '',
      time: data ? data.time : '',
      date: data ? data.date : '',
      location: data ? data.location : '',
      description: data ? data.description : '',
    },
    onSubmit: values => handleUpdate(values),
    validationSchema: EventFormValidator,
  });

  const handleDelete = async () => {
    if (data) {
      const { _id } = data;
      const { data: eventData } = await DeleteEvent(_id);
      if (eventData) {
        showToast({ level: 'info', message: 'Deleted Successfully' });
        router.push(ROUTES['my-events']);
        return;
      }
    }
  };

  return (
    <form
      style={{ width: '100%', margin: '0rem 1rem' }}
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          subheader={'The information can be edited'}
          title={
            <Link href={ROUTES['my-events']}>
              <div className="flex items-center text-xl cursor-pointer">
                <AiOutlineArrowLeft className="mr-2" />
                Events
              </div>
            </Link>
          }
        />
        <Divider style={{ borderColor: '#E6E8F0' }} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Input
                disabled={type === PageQuery.VIEW}
                name="title"
                type="text"
                label="Title"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.errors.title}
                error={Boolean(formik.errors.title)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Input
                disabled={type === PageQuery.VIEW}
                name="location"
                type="text"
                label="Location"
                value={formik.values.location}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.errors.location}
                error={Boolean(formik.errors.location)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Input
                disabled={type === PageQuery.VIEW}
                name="date"
                type="date"
                value={formik.values.date}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.errors.date}
                error={Boolean(formik.errors.date)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Input
                disabled={type === PageQuery.VIEW}
                name="time"
                type="time"
                value={formik.values.time}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.errors.time}
                error={Boolean(formik.errors.time)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Input
                disabled={type === PageQuery.VIEW}
                name="description"
                type="text"
                label="Description"
                rows={3}
                multiline
                value={formik.values.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.errors.description}
                error={Boolean(formik.errors.description)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider style={{ borderColor: '#E6E8F0' }} />
        <div className="flex justify-center p-4">
          <AppButton
            type={'submit'}
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
            title={
              type !== PageQuery.VIEW
                ? type.toUpperCase()
                : 'RSVP to this event'
            }
            sx={{ mx: 1, textTransform: 'capitalize' }}
          />
          {type === 'update' ? (
            <AppButton
              type="button"
              onClick={handleDelete}
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              title={'Delete Event'}
              color="error"
              sx={{ mx: 1, textTransform: 'capitalize' }}
            />
          ) : null}
        </div>
      </Card>
    </form>
  );
}

export default memo(EventDetails);
