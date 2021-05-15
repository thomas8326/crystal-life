import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { storageRef } from 'src/core/config/firebase.config';
import SelectedItem from 'src/core/models/selection';

const MAX_RESULT = 12;

export function useInfiniteList(
  tableName: string,
  observeElement: Element | null,
  rootElement: Element | null,
  mutationElement: Element | null,
): SelectedItem[] {
  const [list, setList] = useState<SelectedItem[]>([]);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const token = useRef<string | null>(null);
  const isIntersection = useRef(false);

  const getPage = async () => {
    const page = await storageRef.child(tableName).list({ maxResults: MAX_RESULT, pageToken: token.current });

    Promise.all(page.items.map((item) => item.getDownloadURL())).then((urls) =>
      setList((prev) => prev.concat(urls.map((url) => new SelectedItem(url)))),
    );

    token.current = page.nextPageToken;
    !page.nextPageToken && setIsComplete(true);
  };

  const observeIntersection = (element: Element): IntersectionObserver => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isIntersection.current = entries[0].isIntersecting;

        if (isIntersection.current) {
          setIsLoadMore(true);
        } else {
          setIsLoadMore(false);
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
      if (isIntersection.current && isListChange) {
        setIsLoadMore(true);
      } else {
        setIsLoadMore(false);
      }
    });
    mutationObserver.observe(mutationElement, {
      childList: true,
      subtree: false,
    });

    return mutationObserver;
  };

  useEffect(() => {
    setIsLoadMore(false);
    setIsComplete(false);
    setList([]);
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

  useEffect(() => {
    if (!!isLoadMore && !isComplete) {
      getPage();
      setIsLoadMore(false);
    }
  }, [tableName, isLoadMore, isComplete]);

  return list;
}
