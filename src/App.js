import "./styles/App.css";
import Body from "./components/Body";
import { createContext, useState } from "react";

export const CountryContext = createContext();

function App() {
  const [country, setCountry] = useState({
    name: "Elvin",
    code: "az",
    inStore: false,
  });
  const [show, setShow] = useState(false);
  const [visited, setVisited] = useState({});

  return (
    <div className="App">
      <CountryContext.Provider value={{ country, setCountry, show, setShow, visited, setVisited }}>
        <Body />
      </CountryContext.Provider>
    </div>
  );
}

export default App;
