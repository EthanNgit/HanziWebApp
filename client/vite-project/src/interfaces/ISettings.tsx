interface userSettings {
    accountState: {
        reminders: boolean;
        tips: boolean;
        updates: boolean;
    };
    generalState: {
        usesTraditional: boolean;
        studyGoal: number;
        batchSize: number;
    };
    themeState: {
        backgroundTheme: string;
        accentColor: string;
    };
    apiState: {
        userKey: string;
    };
}
