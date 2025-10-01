import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import { drawerEN, filterSettingsEN, globalEN, modalConfirmDeletionEN, namesScreenForHeaderEN, screenAllTasksEN, screenAuthEN, screenDetailsTaskEN, screenHomeEN, taskFormEN, taskTabBarEN,
  drawerUA, filterSettingsUA, globalUA, modalConfirmDeletionUA, namesScreenForHeaderUA, screenAllTasksUA, screenAuthUA, screenDetailsTaskUA, screenHomeUA, taskFormUA, taskTabBarUA,
  drawerPL, filterSettingsPL, globalPL, modalConfirmDeletionPL, namesScreenForHeaderPL, screenAllTasksPL, screenAuthPL, screenDetailsTaskPL, screenHomePL, taskFormPL, taskTabBarPL } from './src/localization';

const resources = {
  en: {
    drawer: drawerEN,
    filterSettings: filterSettingsEN,
    global: globalEN,
    modalConfirmDeletion: modalConfirmDeletionEN,
    namesScreenForHeader: namesScreenForHeaderEN,
    screenAllTasks: screenAllTasksEN,
    screenAuth: screenAuthEN,
    screenDetailsTask: screenDetailsTaskEN,
    screenHome: screenHomeEN,
    taskForm: taskFormEN,
    taskTabBar: taskTabBarEN,
  },
  uk: {
    drawer: drawerUA,
    filterSettings: filterSettingsUA,
    global: globalUA,
    modalConfirmDeletion: modalConfirmDeletionUA,
    namesScreenForHeader: namesScreenForHeaderUA,
    screenAllTasks: screenAllTasksUA,
    screenAuth: screenAuthUA,
    screenDetailsTask: screenDetailsTaskUA,
    screenHome: screenHomeUA,
    taskForm: taskFormUA,
    taskTabBar: taskTabBarUA,
  },
  pl: {
    drawer: drawerPL,
    filterSettings: filterSettingsPL,
    global: globalPL,
    modalConfirmDeletion: modalConfirmDeletionPL,
    namesScreenForHeader: namesScreenForHeaderPL,
    screenAllTasks: screenAllTasksPL,
    screenAuth: screenAuthPL,
    screenDetailsTask: screenDetailsTaskPL,
    screenHome: screenHomePL,
    taskForm: taskFormPL,
    taskTabBar: taskTabBarPL,
  }
};

const deviceLanguage = getLocales()[0]?.languageCode || 'en';

const langMap: Record<string, string> = {
  uk: 'uk',
  en: 'en',
  pl: 'pl'
};

const lng = langMap[deviceLanguage] || 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    initImmediate: false
  });

export default i18n;
