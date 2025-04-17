import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./containers/public";
import { path } from "./ultils/constant";

function App() {
  return (
    <h1 className="h-screen w-1100 bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </h1>
  );
}

export default App;
