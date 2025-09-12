import { StackNavigationProp } from '@react-navigation/stack';
import { ISettings } from '../../screen/FilterSettings';
import { ScreenNames } from '../../constants/screenNames';

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type DrawerStackType = {
  MAIN_TAB_BAR_STACK: undefined;
  SETTINGS_TAB_BAR_STACK: undefined;
};

export type LoggedInStackType = {
  DRAWER_STACK: undefined;   
};

export type MainTabBarStackType = {
  [ScreenNames.HOME_PAGE]: undefined;
  [ScreenNames.TASKS_PAGE]: { settings?: ISettings };  
  [ScreenNames.FAVORITE_PAGE]: undefined;
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
  MAIN_TAB_BAR_STACK: undefined,
  SETTINGS_TAB_BAR_STACK: undefined,
};

export type RootStackNavigation = {
  LOGGED_IN_STACK: { screens?: keyof typeof LoggedInStackScreens };
  LOGGED_OUT_STACK: { screens?: keyof typeof LoggedOutStackScreens };
};

export type FilterSettingsNavigationProp = StackNavigationProp<
  MainTabBarStackType,
  ScreenNames.TASKS_PAGE
  >;

  export type AddTaskNavigationProp = StackNavigationProp<
  MainTabBarStackType,
  ScreenNames.TASKS_PAGE
>;
