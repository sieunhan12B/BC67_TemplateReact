import { toast, ToastContainer } from "react-toastify";
import useRoutesCustom from "./hooks/useRoutesCustom";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export const NotificationContext = React.createContext();
function App() {
  const handleNotification = (content, type) => {
    return toast[type](content, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  const routes = useRoutesCustom();

  return (
    <NotificationContext.Provider value={{ handleNotification }}>
      {routes}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
