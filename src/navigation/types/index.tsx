import { StackNavigationProp } from '@react-navigation/stack';
import { FiltersState } from '../../redux/filters/slice';
import { ScreenNames } from '../../constants/screenNames';
import { ITask } from '../../types/task';

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type DrawerStackType = {
  TASK_TAB_BAR_STACK: undefined;  
};

export type LoggedInStackType = {
  DRAWER_STACK: undefined;   
};

export type ISettings = FiltersState;

export type TaskTabBarStackType = {
  [ScreenNames.HOME_PAGE]: undefined;
  [ScreenNames.ALL_TASKS_PAGE]: { settings?: ISettings; backPath?: ScreenNames };  
  [ScreenNames.MARKED_TASKS_PAGE]: { backPath?: ScreenNames };
  [ScreenNames.DETAILS_TASK_PAGE]: { task: ITask; backPath?: ScreenNames };
  [ScreenNames.ADD_TASK_PAGE]: { settings?: ISettings; backPath?: ScreenNames }; 
  [ScreenNames.UPDATE_TASK_PAGE]: { settings?: ISettings; backPath?: ScreenNames };
  [ScreenNames.FILTERS_SETTINGS_PAGE]: { settings?: ISettings; backPath?: ScreenNames };
};

const LoggedOutStackScreens: LoggedOutStackType = {
  LOGIN_PAGE: undefined,
  REGISTRATION_PAGE: undefined,
};

const LoggedInStackScreens: DrawerStackType = {
  TASK_TAB_BAR_STACK: undefined,  
};

export type RootStackNavigation = {
  LOGGED_IN_STACK: { screens?: keyof typeof LoggedInStackScreens };
  LOGGED_OUT_STACK: { screens?: keyof typeof LoggedOutStackScreens };
};

export type DetailsTaskNavigationProp = StackNavigationProp<
  TaskTabBarStackType,
  ScreenNames.DETAILS_TASK_PAGE
>;

export type AddTaskNavigationProp = StackNavigationProp<
  TaskTabBarStackType,
  ScreenNames.ALL_TASKS_PAGE
>;

export type TaskNavigationProp = StackNavigationProp<
  TaskTabBarStackType,
  ScreenNames.MARKED_TASKS_PAGE
  >;
  
export type SearchBarNavigationProp = StackNavigationProp<
  TaskTabBarStackType,
  ScreenNames.FILTERS_SETTINGS_PAGE
>;

export type FilterSettingsNavigationProp = StackNavigationProp<
  TaskTabBarStackType,
  ScreenNames.FILTERS_SETTINGS_PAGE
>;
