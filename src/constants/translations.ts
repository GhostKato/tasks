export type Translations = {  
  taskTabBar: {
    home: string,
    allTasks: string,
    markedTasks: string,
  };
  drawer: {
    logOutBtn: string,     
    main: {
     titleTab: string,
     theme: string,
     language: string,      
    },    
    widget: {
     titleTab: string,
      byStatusTitle: string,
      resetBtn: string,
     byStatus: {
      done: string,
      undone: string,
      inProgress: string,
    },
    byPriorityTitle: string,
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
    byCategoriesTitle: string,
     byCategories: {
      work: string,
      personal: string,
      study: string,
    };
    },
    }, 
  namesScreenForHeader: {
    home: string,
    allTasks: string,
    markedTask: string,
    addTask: string,
    updateTask: string,
    filtersSettings: string,
    detailsTask: string,
  },
  screenAuth: {
    title: string,
    text: string,
    loginizationBtn: string,
    registrationBtn: string,
    placeholderEmail: string,
    placeholderPassword: string,
    placeholderConfirmPassword: string,      
    logInBtn: string,  
    registerBtn: string,       
  };
  screenHome: {
    selectWidgets: string,        
  };
  screenAllTasks: {
    searchInput: string,
    addBtn: string,    
  };
  screenDetailsTask: {
    description: string,
    priority: string,
    status: string,
    category: string,
    deadline: string,
    deleteBtn: string,
    updateBtn: string,
  };
  taskListEmpty: string,
  filterSettings: {    
    sortByDate: string,
    byStatusTitle: string,
    allTasks: string,
    byStatus: {
      done: string,
      undone: string,
      inProgress: string,
    },
    byPriorityTitle: string,
    byPriority: {
      high: string,
      medium: string,
      low: string,
    };
    byDatesTitle: string,
    byDates: {
      today: string,
      thisWeek: string,
      overdue: string,
    };
    byCategoriesTitle: string,
    byCategories: {
      work: string,
      personal: string,
      study: string,
    };
    showVariationsBtn: string,
    resetFiltersBtn: string,
  };
  TaskForm: {
    placeholderTitle: string,
    placeholderDescription: string,      
    selectionDate: string,  
    selectionTime: string,
    addTaskBtn: string,
    updateTaskBtn: string,
  };
  ModalConfirmDeletion: {
    title: string,
    yesBtn: string,      
    noBtn: string,
  };
};

export const en: Translations = {  
taskTabBar: {
  home: 'Home',
  allTasks: 'All',
  markedTasks: 'Marked',
  },
  drawer: {
  logOutBtn: 'Log Out',
  main: {
    titleTab: 'Main settings',
    theme: 'Topic selection',
    language: 'Language selection',      
    },    
  widget: {
    titleTab: 'Widgets settings',
    byStatusTitle: 'Status widgets',
    resetBtn: 'Reset',
    byStatus: {
      done: 'Done',
      undone: 'Undone',
      inProgress: 'In progress',
    },
    byPriorityTitle: 'Priority widgets',
    byPriority: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    byDatesTitle: 'Date widgets',
    byDates: {
      today: 'Today',
      thisWeek: 'This week',
      overdue: 'Overdue',
    },
    byCategoriesTitle: 'Category widgets',
    byCategories: {
      work: 'Work',
      personal: 'Personal',
      study: 'Study',
    },
    },
    },
  namesScreenForHeader: {
    home: 'Home',
    allTasks: 'All tasks',
    markedTask: 'Marked tasks',
    addTask: 'Add the task',
    updateTask: 'Update task',
    filtersSettings: 'Filters',
    detailsTask: 'Task details',
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
  screenHome: {
    selectWidgets: 'Select widgets in the settings!',        
  },
  screenAllTasks: {
    searchInput: 'Task search',
    addBtn: 'Add task',    
  },
  screenDetailsTask: {
    description: 'Description:',
    priority: 'Priority:',
    status: 'Status:',
    category: 'Category:',
    deadline: 'Deadline:',
    deleteBtn: 'Delete',
    updateBtn: 'Update',
  },
  taskListEmpty: 'Task not found',
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
    placeholderDescription: 'Description',      
    selectionDate: 'Select a date',  
    selectionTime: 'Select a time',
    addTaskBtn: 'Add task',
    updateTaskBtn: 'Update task',
  },
  ModalConfirmDeletion: {
    title: 'Confirm deletion?',
    yesBtn: 'Yes',      
    noBtn: 'No',
  },
};

export const ua: Translations = {  
  taskTabBar: {
    home: 'Домашня',
    allTasks: 'Всі',
    markedTasks: 'Відмічені',
  },
  drawer: {
    logOutBtn: 'Вийти',
  main: {
    titleTab: 'Головні',
    theme: 'Вибір теми',
    language: 'Вибір  мови',      
    },    
  widget: {
    titleTab: 'Віджети',
    byStatusTitle: 'Віджети статусу',
    resetBtn: 'Скинути',
    byStatus: {
      done: 'Виконані',
      undone: 'Невиконані',
      inProgress: 'У процесі',
    },
    byPriorityTitle: 'Віджети пріоритету',
    byPriority: {
      high: 'Високий',
      medium: 'Середній',
      low: 'Низький',
    },
    byDatesTitle: 'Віджети дати',
    byDates: {
      today: 'Сьогодні',
      thisWeek: 'На тижні',
      overdue: 'Просрочені',
    },
    byCategoriesTitle: 'Віджети категорій',
    byCategories: {
      work: 'Робота',
      personal: 'Особисте',
      study: 'Навчання',
    },
    },
    },
  namesScreenForHeader: {
    home: 'Домашня',
    allTasks: 'Всі завдання',
    markedTask: 'Відмічені завдання',
    addTask: 'Дотати завдання',
    updateTask: 'Оновити завдання',
    filtersSettings: 'Фільтри',
    detailsTask: 'Деталі завдання',
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
  screenHome: {
    selectWidgets: 'Виберіть віджети в налаштуваннях!',        
  },
  screenAllTasks: {
    searchInput: 'Пошук задачі',
    addBtn: 'Додати завдання',    
  },
  screenDetailsTask: {
    description: 'Опис:',
    priority: 'Пріоритет:',
    status: 'Статус:',
    category: 'Категорія:',
    deadline: 'Дедлайн:',
    deleteBtn: 'Видалити',
    updateBtn: 'Оновити',
  },
  taskListEmpty: 'Завдань не знайдено',
  filterSettings: {     
     sortByDate: 'Сортувати за датою додавання',
    byStatusTitle: 'За статусом',
    allTasks: 'Всі',
    byStatus: {
      done: 'Виконані',
      undone: 'Невиконані',
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
    placeholderDescription: 'Опис',      
    selectionDate: 'Вибір дати',  
    selectionTime: 'Вибір часу',
    addTaskBtn: 'Додати задачу',
    updateTaskBtn: 'Оновити задачу',
  },
  ModalConfirmDeletion: {
    title: 'Підтвердити видалення?',
    yesBtn: 'Так',      
    noBtn: 'Ні',
  },
};

export const pl: Translations = {  
  taskTabBar: {
    home: 'Dom',
    allTasks: 'Wszystko',
    markedTasks: 'Oznaczony',
  },
  drawer: {    
    logOutBtn: 'Wylogować',
  main: {
    titleTab: 'Główne ustawienia',
    theme: 'Wybór tematu',
    language: 'Wybór języka',      
    },    
  widget: {
    titleTab: 'Ustawienia widżetów',
    byStatusTitle: 'Widżety statusu',
    resetBtn: 'Resetuj',
    byStatus: {
      done: 'Zrobione',
      undone: 'Niespełniony',
      inProgress: 'W toku',
    },
    byPriorityTitle: 'Widżety priorytetowe',
    byPriority: {
      high: 'Wysoki',
      medium: 'Średnia',
      low: 'Niski',
    },
    byDatesTitle: 'Widżety daty',
    byDates: {
      today: 'Dzisiaj',
      thisWeek: 'Ten tydzień',
      overdue: 'Zaległy',
    },
    byCategoriesTitle: 'Widżety kategorii',
    byCategories: {
      work: 'Praca',
      personal: 'Osobisty',
      study: 'Nauka',
    },
    },
    },
  namesScreenForHeader: {
    home: 'Dom',
    allTasks: 'Wszystkie zadania',
    markedTask: 'Oznaczone zadania',
    addTask: 'Dodać zadanie',
    updateTask: 'Zadanie aktualizacji',
    filtersSettings: 'Filtry',
    detailsTask: 'Szczegóły zadania',
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
  screenHome: {
    selectWidgets: 'Wybierz widżety w ustawieniach!',        
  },
  screenAllTasks: {
    searchInput: 'Wyszukiwanie zadań',
    addBtn: 'Dodaj zadanie',    
  },
  screenDetailsTask: {
    description: 'Opis:',
    priority: 'Priorytet:',
    status: 'Status:',
    category: 'Kategoria:',
    deadline: 'Termin:',
    deleteBtn: 'Usuń',
    updateBtn: 'Aktualizacja',
  },
  taskListEmpty: 'Nie znaleziono zadania',
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
    placeholderDescription: 'Opis',      
    selectionDate: 'Wybrać datę',  
    selectionTime: 'Wybrać czas',
    addTaskBtn: 'Dodaj zadanie',
    updateTaskBtn: 'Zadanie aktualizacji',
  },
  ModalConfirmDeletion: {
    title: 'Potwierdź usunięcie?',
    yesBtn: 'Tak',      
    noBtn: 'Nie',
  },
};