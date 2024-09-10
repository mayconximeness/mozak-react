import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth.js";
import GlobalStyle from "./styles/global.js";

const App = () => (
  <AuthProvider>
    <RoutesApp />
    <GlobalStyle />
  </AuthProvider>
);

export default App;