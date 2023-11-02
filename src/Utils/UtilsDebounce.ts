import { LOCAL_STORAGE_KEYS } from '../globalConstants';



export const getLocalStorageValue = (key: string) => {
    return localStorage.getItem(key) || '';
}

export const resetAllLocalStorageValues = () => {
    const keys = Object.keys(LOCAL_STORAGE_KEYS);
    keys.forEach((key) => localStorage.removeItem(key));
}
