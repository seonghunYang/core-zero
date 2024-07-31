import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Popover } from "../save-folder/headless/components/popover";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Popover>
        <Popover.Trigger>click click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}

export default App;
