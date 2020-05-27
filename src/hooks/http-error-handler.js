import { useState, useEffect } from "react";

const useHttpErrorHandler = (axios) => {
  const [error, setError] = useState(null);

  const reqInterceptor = axios.interceptors.request.use((request) => {
    setError(null);
    return request;
  });
  const resInterceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [
    reqInterceptor,
    resInterceptor,
    axios.interceptors.request,
    axios.interceptors.response,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;
