import * as Yup from 'yup';

export const TicketSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too Short!')
    .max(50, 'Name is too Long!')
    .required('Name is required!'),
  email: Yup.string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  department: Yup.string().required('Department is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});
