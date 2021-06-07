export default function useKeyBoard() {
  const enter = (callback: () => void) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      callback();
    }
  };

  return { enter };
}
