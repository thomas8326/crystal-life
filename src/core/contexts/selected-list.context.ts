import React from 'react';
import Selection from '../models/selection';

export class SlideListContextProps {
  setSelectedList: (item: Selection) => void = () => {};
}

export const SlideListContext = React.createContext<SlideListContextProps>({
  setSelectedList: () => {},
});
