import axios from "axios";
import { useState, useEffect, useReducer, useRef } from "react";

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const planReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useFetchData = (initialUrl, token) => {
  const [queryData, setQueryData] = useState({ url: initialUrl, token });
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: {},
  });
  const config = token !== "" && {
    headers: {
      Authorization: `Bearer ${queryData.token}`,
    },
  };

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios.get(queryData.url, config);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_ERROR" });
        }
      }
    };
    if (queryData.token !== "") {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [queryData]);

  return [state, setQueryData];
};

export const useDeleteData = (initialUrl, token) => {
  const [queryData, setQueryData] = useState({ url: initialUrl, token });
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: {},
  });
  const config = token !== "" && {
    headers: {
      Authorization: `Bearer ${queryData.token}`,
    },
  };

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios.delete(queryData.url, config);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_ERROR" });
        }
      }
    };
    if (queryData.token !== "") {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [queryData]);

  return [state, setQueryData];
};

export const useAuthUser = (initialUrl, userData) => {
  const [queryData, setQueryData] = useState({ url: initialUrl, userData });
  const [state, dispatch] = useReducer(dataReducer, {
    isLoading: false,
    isError: false,
    data: {},
  });
  useEffect(() => {
    let didCancel = false;
    const postData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios.post(queryData.url, queryData.userData);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_ERROR" });
        }
      }
    };
    if (
      queryData.userData?.email.length > 0 &&
      queryData.userData?.password.length > 0
    ) {
      postData();
    }
    return () => {
      didCancel = true;
    };
  }, [queryData]);

  return [state, setQueryData];
};

//rendering large list
export const useSubLoad = (containerSelector, handleLoading = false) => {
  const [loaded, setLoaded] = useState(false);
  const elRef = useRef();

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;

          if (isIntersecting) {
            setLoaded(true);
            if (handleLoading === false) {
              observer = observer.disconnect();
            }
          } else if (handleLoading) {
            setLoaded(false);
          }
        });
      },
      {
        root: document.querySelector(containerSelector),
      }
    );

    observer.observe(elRef.current);
  }, []);

  return [loaded, elRef];
};
