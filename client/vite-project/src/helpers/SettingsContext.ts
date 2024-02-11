import { Dispatch, SetStateAction, createContext} from 'react';

interface ISettingsContext {
    accountState: {
        reminders: boolean,
        tips: boolean,
        updates: boolean,
    }
    setAccountState: Dispatch<SetStateAction<{
        reminders: boolean,
        tips: boolean,
        updates: boolean,
    }>>;
    generalState: {
        usesTraditional: boolean,
        studyGoal: number,
        batchSize: number,
    }
    setGeneralState: Dispatch<SetStateAction<{
        usesTraditional: boolean,
        studyGoal: number,
        batchSize: number,
    }>>;
    themeState: {
        backgroundTheme: string,
        accentColor: string,
    }
    setThemeState: Dispatch<SetStateAction<{
        backgroundTheme: string,
        accentColor: string,
    }>>;
    apiState: {
        userKey: string
    }
    setApiState: Dispatch<SetStateAction<{
        userKey: string,
    }>>;
}
  

export const SettingsContext = createContext<ISettingsContext>({
    accountState: {
        reminders: true,
        tips: true,
        updates: true,
    },
    setAccountState: () => {},
    generalState: {
        usesTraditional: false,
        studyGoal: 5,
        batchSize: 5,
    },
    setGeneralState: () => {},
    themeState: {
        backgroundTheme: "light",
        accentColor: "blue",
    },
    setThemeState: () => {},
    apiState: {
        userKey: '',
    },
    setApiState: () => {},
});
