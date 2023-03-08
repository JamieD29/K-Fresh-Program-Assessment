import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/Login";
import PrivateRoute from "./ultis/PrivateRoute";
import { routes } from "./app/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          {routes.map(({ path, component: Component }) => {
            return <Route path={path} element={<Component />} />;
          })}
        </Route>

        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
