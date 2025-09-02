export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};
export type DrawerStackType = {
  MAIN_TAB_BAR_STACK: undefined;
  SETTINGS_TAB_BAR_STACK: undefined,
};
export type LoggedInStackType = {
  DRAWER_STACK: undefined;
};
export type MainTabBarStackType = {
  HOME_PAGE: undefined;
  TASKS_PAGE: undefined;
  FAVORITE_PAGE: undefined;
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
  LOGGED_IN_STACK: {screens?: keyof typeof LoggedInStackScreens};
  LOGGED_OUT_STACK: {screens?: keyof typeof LoggedOutStackScreens};
};