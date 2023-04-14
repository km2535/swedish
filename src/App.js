import "./App.css";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import AuthLogin from "./component/authLogin/AuthLogin";

function App() {
  return (
    <>
      <AuthContextProvider>
        <AuthLogin />
        <Outlet />
      </AuthContextProvider>
    </>
  );
}

export default App;
