import { Dispatch, SetStateAction, createContext} from 'react';

interface IHanziContext {
    allHanziState: HanziRow[];
    setAllHanziState: Dispatch<SetStateAction<HanziRow[]>>;
}
  

export const HanziContext = createContext<IHanziContext>({
    allHanziState: [] as HanziRow[],
    setAllHanziState: () => {}
});
