export const retrieveLocalStorage = <T>(key: string) => {
    const object = localStorage.getItem(key) || '';

    if (!object) {
        return null;
    }

    try {
        return JSON.parse(object) as T;
    } catch {
        return null;
    }
};
