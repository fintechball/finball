import React, { useEffect } from "react";
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchTest } from "../../store/slices/testSlice";

function TestPage() {
  const dispatch = useDispatch();

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
    <div>
      <h1>{test.title}</h1>
      <p>{test.id}</p>
      <p>{test.body}</p>
    </div>
  );
}

export default TestPage;
