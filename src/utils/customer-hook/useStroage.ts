export default function useStorage() {
  const setStorage = (name: string, object: object) => {
    const objectParsing = JSON.stringify(object);
    sessionStorage.setItem(name, objectParsing);
  };

  const getStorage = <T>(name: string): T => {
    return JSON.parse(sessionStorage.getItem(name) ?? '');
  };

  return { setStorage, getStorage };
}
