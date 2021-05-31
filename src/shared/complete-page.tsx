import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import LoadingBar from 'src/shared/loading-bar';
import { useAuth } from 'src/utils/customer-hook/useAuth';

export function CompletePage() {
  const [redirect, setRedirect] = useState(false);
  const { userLogout } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
      userLogout();
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
