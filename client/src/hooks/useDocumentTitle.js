import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} — AuthFlow` : 'AuthFlow';
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
