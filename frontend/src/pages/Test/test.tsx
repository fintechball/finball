import React from "react";
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "../../store/slices/counterSlice";

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button aria-label="reset value" onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
