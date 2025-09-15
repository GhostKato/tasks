export type Translations = {  
  taskTabBar: {
    home: string;
    allTasks: string;
    markedTasks: string;
  };
  screenNames: {
    HOME_PAGE: string,
    ALL_TASKS_PAGE: string,
    MARKED_TASKS_PAGE: string,
    ADD_TASK_PAGE: string,
    UPDATE_TASK_PAGE: string,
    FILTERS_SETTINGS_PAGE: string,
    DETAILS_TASK_PAGE: string,
  },
  screenAuth: {
    title: string;
    text: string;
    loginizationBtn: string;
    registrationBtn: string;
    placeholderEmail: string;
    placeholderPassword: string;
    placeholderConfirmPassword: string;
    logInBtn: string;  
    registerBtn: string;        
  };
  logOutBtn: string;  
  screenTasks: {
    AddBtn: string;    
  };
  filterSettings: {    
    sortByDate: string;
    byStatusTitle: string;
    allTasks: string;
    byStatus: {
      done: string,
      undone: string,
      inProgress: string,
    },
    byPriorityTitle: string;
    byPriority: {
      high: string,
      medium: string,
      low: string,
    };
    byDatesTitle: string;
    byDates: {
      today: string,
      thisWeek: string,
      overdue: string,
    };
    byCategoriesTitle: string;
    byCategories: {
      work: string,
      personal: string,
      study: string,
    };
    showVariationsBtn: string,
    resetFiltersBtn: string,
  };
  TaskForm: {
    placeholderTitle: string;
    placeholerDescription: string;      
    selectionDate: string;  
    selectionTime: string;
    addTaskBtn: string;
    updateTaskBtn: string;
  };
};

export const en: Translations = {  
  taskTabBar: {
    home: 'Home',
    allTasks: 'All',
    markedTasks: 'Marked',
  },
  screenNames: {
    HOME_PAGE: 'Home',
    ALL_TASKS_PAGE: 'All tasks',
    MARKED_TASKS_PAGE: 'Marked tasks',
    ADD_TASK_PAGE: 'Add the task',
    UPDATE_TASK_PAGE: 'Update task',
    FILTERS_SETTINGS_PAGE: 'Filters',
    DETAILS_TASK_PAGE: 'Task details',
  },
  screenAuth: {
    title: 'Glad to welcome you!',
    text: 'He who manages his tasks controls his life.',
    loginizationBtn: 'Loginization',
    registrationBtn: 'Registration',
    placeholderEmail: 'Email',
    placeholderPassword: 'Password',
    placeholderConfirmPassword: 'Confirm Password',
    logInBtn: 'Log In',  
    registerBtn: 'Register',        
  },
  logOutBtn: 'Log Out',
  screenTasks: {
    AddBtn: 'Add task',    
  },
  filterSettings: {    
     sortByDate: 'Sort by date added',
    byStatusTitle: 'By status',
     allTasks: 'All',
    byStatus: {
      done: 'Done',
      undone: 'Undone',
      inProgress: 'In progress',
     },
    byPriorityTitle: 'By priority',
    byPriority: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
     },
    byDatesTitle: 'By dates',
    byDates: {
      today: 'Today',
      thisWeek: 'This week',
      overdue: 'Overdue',
     },
    byCategoriesTitle: 'By categories',
    byCategories: {
      work: 'Work',
      personal: 'Personal',
      study: 'Study',
    },
    showVariationsBtn: 'Show variations',
    resetFiltersBtn: 'Reset filters',
  },
  TaskForm: {
    placeholderTitle: 'Title',
    placeholerDescription: 'Description',      
    selectionDate: 'Select a date',  
    selectionTime: 'Select a time',
    addTaskBtn: 'Add task',
    updateTaskBtn: 'Update task',
  },
};

export const ua: Translations = {  
  taskTabBar: {
    home: 'Домашня',
    allTasks: 'Всі',
    markedTasks: 'Відмічені',
  },
  screenNames: {
    HOME_PAGE: 'Домашня',
    ALL_TASKS_PAGE: 'Всі завдання',
    MARKED_TASKS_PAGE: 'Відмічені завдання',
    ADD_TASK_PAGE: 'Дотати завдання',
    UPDATE_TASK_PAGE: 'Оновити завдання',
    FILTERS_SETTINGS_PAGE: 'Фільтри',
    DETAILS_TASK_PAGE: 'Деталі завдання',
  },
  screenAuth: {
    title: 'Раді вітати тебе!',
    text: 'Хто керує своїми задачами, той контролює своє життя.',
    loginizationBtn: 'Вхід',
    registrationBtn: 'Реєстрація',
    placeholderEmail: 'Емейл',
    placeholderPassword: 'Пароль',
    placeholderConfirmPassword: 'Підтвердити пароль',
    logInBtn: 'Увійти',  
    registerBtn: 'Зареєструватись',        
  },
  logOutBtn: 'Вийти',
  screenTasks: {
    AddBtn: 'Додати завдання',    
  },
  filterSettings: {     
     sortByDate: 'Сортувати за датою додавання',
    byStatusTitle: 'За статусом',
    allTasks: 'Всі',
    byStatus: {
      done: 'Виконано',
      undone: 'Невиконано',
      inProgress: 'У прогресі',
     },
    byPriorityTitle: 'За пріоритетом',
    byPriority: {
      high: 'Високий',
      medium: 'Середній',
      low: 'Низький',
     },
    byDatesTitle: 'За датами',
    byDates: {
      today: 'Сьогодні',
      thisWeek: 'На тижні',
      overdue: 'Прострочені',
     },
    byCategoriesTitle: 'За категоріями',
    byCategories: {
      work: 'Робота',
      personal: 'Особисте',
      study: 'Навчання',
    },
    showVariationsBtn: 'Показати варіанти',
    resetFiltersBtn: 'Зкинути фыльтри',
  },
  TaskForm: {
    placeholderTitle: 'Заголовок',
    placeholerDescription: 'Опис',      
    selectionDate: 'Вибір дати',  
    selectionTime: 'Вибір часу',
    addTaskBtn: 'Додати задачу',
    updateTaskBtn: 'Оновити задачу',
  },
};

export const pl: Translations = {  
  taskTabBar: {
    home: 'Dom',
    allTasks: 'Wszystko',
    markedTasks: 'Oznaczony',
  },
  screenNames: {
    HOME_PAGE: 'Dom',
    ALL_TASKS_PAGE: 'Wszystkie zadania',
    MARKED_TASKS_PAGE: 'Oznaczone zadania',
    ADD_TASK_PAGE: 'Dodać zadanie',
    UPDATE_TASK_PAGE: 'Zadanie aktualizacji',
    FILTERS_SETTINGS_PAGE: 'Filtry',
    DETAILS_TASK_PAGE: 'Szczegóły zadania',
  },
  screenAuth: {
    title: 'Miło Cię powitać!',
    text: 'Ten, kto zarządza swoimi zadaniami, kontroluje swoje życie.',
    loginizationBtn: 'Logowanie',
    registrationBtn: 'Rejestracja',
    placeholderEmail: 'Email',
    placeholderPassword: 'Hasło',
    placeholderConfirmPassword: 'Potwierdź hasło',
    logInBtn: 'Logować',  
    registerBtn: 'Rejestr',        
  },
  logOutBtn: 'Wylogować',
  screenTasks: {
    AddBtn: 'Dodaj zadanie',    
  },
  filterSettings: {     
     sortByDate: 'Sortuj według dodanej daty',
    byStatusTitle: 'Według stanu',
     allTasks: 'Wszystko',
     byStatus: {
      done: 'Zrobione',
      undone: 'Niespełniony',
      inProgress: 'W toku',
     },
      byPriorityTitle: 'Według priorytetu',
    byPriority: {
      high: 'Wysoki',
      medium: 'Średnia',
      low: 'Niski',
     },
    byDatesTitle: 'Według dat',
    byDates: {
      today: 'Dzisiaj',
      thisWeek: 'Ten tydzień',
      overdue: 'Zaległy',
     },
    byCategoriesTitle: 'Według kategorii',
    byCategories: {
      work: 'Praca',
      personal: 'Osobisty',
      study: 'Nauka',
    },
    showVariationsBtn: 'Pokaż opcje',
    resetFiltersBtn: 'Zresetuj filtry',
  },
  TaskForm: {
    placeholderTitle: 'Tytuł',
    placeholerDescription: 'Opis',      
    selectionDate: 'Wybrać datę',  
    selectionTime: 'Wybrać czas',
    addTaskBtn: 'Dodaj zadanie',
    updateTaskBtn: 'Zadanie aktualizacji',
  },
};