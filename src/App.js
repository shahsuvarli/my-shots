import "./styles/App.css";
import Body from "./components/Body";
import { createContext } from "react";

export const CountryContext = createContext();
const data = {
  name: "Elvin",
  code: "az",
  inStore: true,
};

function App() {
  return (
    <div className="App">
      <CountryContext.Provider value={data}>
        <Body />
      </CountryContext.Provider>
    </div>
  );
}

export default App;
