import { StackNavigationProp } from '@react-navigation/stack';
import { FiltersState } from '../../redux/filters/slice';
import { ScreenNames } from '../../constants/screenNames';

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type DrawerStackType = {
  TASK_TAB_BAR_STACK: undefined;
  SETTINGS_TAB_BAR_STACK: undefined;
};

export type LoggedInStackType = {
  DRAWER_STACK: undefined;   
};

export type ISettings = FiltersState;

export type TaskTabBarStackType = {
  [ScreenNames.TODAY_TASKS_PAGE]: undefined;
  [ScreenNames.ALL_TASKS_PAGE]: { settings?: ISettings };  
  [ScreenNames.MARKED_TASKS_PAGE]: undefined;
  [ScreenNames.ADD_TASK_PAGE]: { settings?: ISettings }; 
  [ScreenNames.UPDATE_TASK_PAGE]: { settings?: ISettings };
  [ScreenNames.FILTERS_SETTINGS_PAGE]: { settings?: ISettings };
};

export type SettingsTabBarStackType = {
  THEME_PAGE: undefined;
  LANGUAGE_PAGE: undefined;
  ABOUT_PAGE: undefined;
};

const LoggedOutStackScreens: LoggedOutStackType = {
  LOGIN_PAGE: undefined,
  REGISTRATION_PAGE: undefined,
};

const LoggedInStackScreens: DrawerStackType = {
  TASK_TAB_BAR_STACK: undefined,
  SETTINGS_TAB_BAR_STACK: undefined,
};

export type RootStackNavigation = {
  LOGGED_IN_STACK: { screens?: keyof typeof LoggedInStackScreens };
  LOGGED_OUT_STACK: { screens?: keyof typeof LoggedOutStackScreens };
};

export type FilterSettingsNavigationProp = StackNavigationProp<
  TaskTabBarStackType,
  ScreenNames.ALL_TASKS_PAGE
  >;

  export type AddTaskNavigationProp = StackNavigationProp<
  TaskTabBarStackType,
  ScreenNames.ALL_TASKS_PAGE
>;
