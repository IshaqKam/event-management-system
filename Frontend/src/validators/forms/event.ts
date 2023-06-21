import { string as YupString, date, object } from 'yup';

export default function EventFormValidator() {
  return object().shape({
    title: YupString().required('Title is required'),
    location: YupString().required('Location is required'),
    description: YupString().required('Description is required'),

    date: date().required('Date is required'),
    time: YupString()
      .matches(
        /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        'Invalid time format. Please enter a valid time (HH:mm).',
      )
      .required('Time is required'),
  });
}
