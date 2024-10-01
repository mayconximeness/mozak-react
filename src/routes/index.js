import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Evento from "../pages/Evento";
import EventDetails from '../pages/EventDetails';
import CreateEvent from '../pages/CreateEvent';

const RoutesApp = () => {
  const { signed } = useAuth(); // Acessa o estado de autenticação

  useEffect(() => {
    // Se estiver autenticado, redireciona para /eventos ao carregar a página
    if (signed) {
      window.history.replaceState(null, '', '/eventos');
    }
  }, [signed]);

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {/* Redireciona para /eventos se estiver autenticado, caso contrário, para / */}
          <Route path="/" element={signed ? <Navigate to="/eventos" /> : <Home />} />
          <Route path="/eventos" element={signed ? <Evento /> : <Navigate to="/" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/event-details/:uuid" element={<EventDetails />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
