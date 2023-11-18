import { Dispatch, SetStateAction, createContext} from 'react';

interface IAuthContext {
    authState: {
        email: string,
        id: number,
        status: boolean,
    };
    setAuthState: Dispatch<SetStateAction<{
        email: string,
        id: number,
        status: boolean,
    }>>;
}
  

export const AuthContext = createContext<IAuthContext>({
    authState: {
        email: '',
        id: 0,
        status: false
    },
    setAuthState: () => {}
});
