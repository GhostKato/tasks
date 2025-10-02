
import * as Yup from 'yup';

export const taskSchema = Yup.object({
  id: Yup.string().required(),
  title: Yup.string()
    .min(3, 'validationTaskForm:titleTooShort')
    .max(45, 'validationTaskForm:titleTooLong')
    .required('validationTaskForm:titleRequired'),
  description: Yup.string()
    .min(5, 'validationTaskForm:descTooShort')
    .max(200, 'validationTaskForm:descTooLong')
    .required('validationTaskForm:descRequired'),
  status: Yup.mixed<'done' | 'undone' | 'inProgress'>()
    .oneOf(['done', 'undone', 'inProgress'])
    .required(),
  priority: Yup.mixed<'high' | 'medium' | 'low'>()
    .oneOf(['high', 'medium', 'low'])
    .required(),
  category: Yup.mixed<'work' | 'personal' | 'study'>()
    .oneOf(['work', 'personal', 'study'])
    .required(),
  isMarked: Yup.boolean().required(),
  ownerId: Yup.string().required(),
  deadline: Yup.string()
  .required('validationTaskForm:deadlineRequired')
  .test('is-date', 'validationTaskForm:deadlinePast', (value) => {
    if (!value) return false;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isNaN(date.getTime()) && date >= today;
  }),
});
