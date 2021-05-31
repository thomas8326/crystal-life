export default function useStorage() {
  const setSession = (name: string, object: object) => {
    const objectParsing = JSON.stringify(object);
    sessionStorage.setItem(name, objectParsing);
  };

  const getSession = <T>(name: string): T | null => {
    return sessionStorage.getItem(name) ? JSON.parse(sessionStorage.getItem(name) ?? '') : null;
  };

  return { setSession, getSession };
}
