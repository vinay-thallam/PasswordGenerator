import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import Markup from "./temp";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();

ReactDOM.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
      {/* <Markup /> */}
    </BaseProvider>
  </StyletronProvider>,
  document.getElementById("root")
);
