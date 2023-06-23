import { useState } from 'react';

export const useIsAuthorized = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  return { isAuthorized, setIsAuthorized };
};
