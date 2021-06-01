import { useEffect, useRef, useState } from 'react';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';

export function useInfiniteList(
  tableName: string,
  observeElement: Element | null,
  rootElement: Element | null,
  mutationElement: Element | null,
): { list: any[]; isLoading: boolean } {
  const { list: dataList, isLoading, getList } = useHttpClient(tableName, false, undefined);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const isIntersection = useRef(false);
  const isSending = useRef(false);

  const getPage = async () => {
    if (!isComplete) {
      getList('', 3).then((isComplete) => {
        setIsComplete(isComplete);
      });
    }
  };

  const observeIntersection = (element: Element): IntersectionObserver => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isIntersection.current = entries[0].isIntersecting;
        if (isSending.current) {
          return;
        }

        if (isIntersection.current) {
          isSending.current = true;
          getPage();
        }
      },
      { root: rootElement },
    );

    intersectionObserver.observe(element);

    return intersectionObserver;
  };

  const observeMutation = (mutationElement: Element): MutationObserver => {
    const mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
      const isListChange = mutations[mutations.length - 1].addedNodes[0]?.nodeName == 'LI';
      isSending.current = false;

      if (isIntersection.current && isListChange) {
        isSending.current = true;
        getPage();
      }
    });
    mutationObserver.observe(mutationElement, {
      childList: true,
      subtree: false,
    });

    return mutationObserver;
  };

  useEffect(() => {
    setIsComplete(false);
  }, [tableName]);

  useEffect(() => {
    let intersection: IntersectionObserver;
    let mutation: MutationObserver;

    if (observeElement && rootElement && mutationElement) {
      intersection = observeIntersection(observeElement);
      mutation = observeMutation(mutationElement);
    }

    return () => {
      intersection && intersection.disconnect();
      mutation && mutation.disconnect();
    };
  }, [tableName, observeElement, rootElement]);

  return { list: dataList, isLoading };
}
