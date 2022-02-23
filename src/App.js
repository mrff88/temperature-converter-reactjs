import { useEffect, useReducer } from "react";
import "./App.css";

const initialState = {
  input: 0,
  output: 0,
  unit: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "changeInput":
      return { ...state, input: action.payload };
    case "Celsius":
      return {
        ...state,
        output: ((state.input - 32) * 5) / 9,
        unit: action.type,
      };
    case "Farenheit":
      return {
        ...state,
        output: state.input * (9 / 5) + 32,
        unit: action.type,
      };
    default:
      break;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    dispatch({ type: "changeInput", payload: e.target.value });
  };

  const handleSelectChange = (e) => {
    dispatch({ type: e.target.value });
  };

  useEffect(() => {
    if (state.unit) {
      dispatch({ type: state.unit });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.input]);

  return (
    <div className="App">
      <h1 className="title">TEMPERATURE CONVERTER</h1>
      <p className="description">
        Fill the input with the value of the temperature you want to convert,
        then select the temperature unit you want to convert to
      </p>
      <input
        className="input"
        value={state.input}
        onChange={handleInputChange}
        type="number"
      />
      <select
        className="select"
        defaultValue={"DEFAULT"}
        onChange={handleSelectChange}
      >
        <option value={"DEFAULT"} disabled>
          Select a unit
        </option>
        <option value="Celsius">°C</option>
        <option value="Farenheit">°F</option>
      </select>
      <div className="container">
        <div className="conversion left">
          <label>Celsius: </label>
          <span>
            {state.unit === "Celsius" ? `${state.output.toFixed(2)} °C` : " - "}
          </span>
        </div>
        <div className="conversion">
          <label>Farenheit: </label>
          <span>
            {state.unit === "Farenheit"
              ? `${state.output.toFixed(2)} °F`
              : " - "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
