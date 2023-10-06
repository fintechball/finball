import { useEffect } from "react";
import type { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchTest } from "../../store/slices/testSlice";
import { StylesProvider } from "@material-ui/core";

import styles from "./TestPage.module.scss";

import UrlPath from "../../routes/UrlPath";

function TestPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  const test = useSelector((state: RootState) => state.test.test);
  const isLoading = useSelector((state: RootState) => state.test.isLoading);
  const error = useSelector((state: RootState) => state.test.error);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return error;
  }

  return (
    <div className={styles.container}>
      <UrlPath />
      {test.map((t, index) => (
        <div key={index}>
          <h1>{t.title}</h1>
          <p>{t.id}</p>
          <p>{t.body}</p>
        </div>
      ))}
    </div>
  );
}

export default TestPage;
