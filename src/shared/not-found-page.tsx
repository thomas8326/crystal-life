import React from 'react';
import { Button1 } from 'src/styles/components/button';

export function NotFoundPage() {
  const back = () => {
    window.history.back();
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <i className="icon-5xl icon-page-not-found"></i>
      <span className="text-2xl font-bold">Page Not Found</span>
      <button className="mt-3 border-b border-dotted border-black" onClick={back}>
        返回
      </button>
    </div>
  );
}
