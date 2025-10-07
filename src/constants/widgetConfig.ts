import { IWidgetsState } from '../redux/widgets/slice';
import { selectTasksByWidget } from '../redux/widgets/selectors';

export type SwitchItem = {
  key: keyof IWidgetsState;
  listKey: keyof ReturnType<typeof selectTasksByWidget>;
  label: string;
};

export type SwitchBlock = {
  title: string;
  items: SwitchItem[];
};

export const getSwitchBlocks = (t: (key: string) => string): SwitchBlock[] => [
  {
    title: t('drawer:widget.byStatusTitle'),
    items: [
      { key: 'isUndone', listKey: 'undone', label: t('drawer:widget.byStatus.undone') },
      { key: 'isInProgress', listKey: 'inProgress', label: t('drawer:widget.byStatus.inProgress') },
      { key: 'isDone', listKey: 'done', label: t('drawer:widget.byStatus.done') },
    ],
  },
  {
    title: t('drawer:widget.byPriorityTitle'),
    items: [
      { key: 'isLow', listKey: 'low', label: t('drawer:widget.byPriority.low') },
      { key: 'isMedium', listKey: 'medium', label: t('drawer:widget.byPriority.medium') },
      { key: 'isHigh', listKey: 'high', label: t('drawer:widget.byPriority.high') },
    ],
  },
  {
    title: t('drawer:widget.byDatesTitle'),
    items: [
      { key: 'isToday', listKey: 'today', label: t('drawer:widget.byDates.today') },
      { key: 'isWeek', listKey: 'week', label: t('drawer:widget.byDates.thisWeek') },
      { key: 'isOverdue', listKey: 'overdue', label: t('drawer:widget.byDates.overdue') },
    ],
  },
  {
    title: t('drawer:widget.byCategoriesTitle'),
    items: [
      { key: 'isWork', listKey: 'work', label: t('drawer:widget.byCategories.work') },
      { key: 'isPersonal', listKey: 'personal', label: t('drawer:widget.byCategories.personal') },
      { key: 'isStudy', listKey: 'study', label: t('drawer:widget.byCategories.study') },
    ],
  },
];

export const getFilters = (t: (key: string) => string): SwitchItem[] =>
  getSwitchBlocks(t).flatMap(block => block.items);
