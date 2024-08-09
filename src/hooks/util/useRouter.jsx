import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    dest => {
      console.log('Navigating to:', dest);
      navigate(dest);
    },
    [navigate]
  );
  return {
    navigate: handleNavigate,
  };
};

export default useRouter;
