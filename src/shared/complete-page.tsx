import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path.enum';
import LoadingBar from 'src/shared/loading-bar';

export function CompletePage() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 3000);
  }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <label className="text-2xl">完成填寫</label>
      <label className="text-sm mb-4">正在將你導回到登入頁面</label>
      <LoadingBar />
      {redirect && <Redirect to={MainPath.UserLogin} />}
    </div>
  );
}
