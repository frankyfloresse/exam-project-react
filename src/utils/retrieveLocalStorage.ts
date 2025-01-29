export const retrieveLocalStorage = <T>(key: string) => {
    const object = localStorage.getItem(key) || '';

    if (!object) {
        return null;
    }

    const parse = JSON.parse(object);
    return parse as T;
};
