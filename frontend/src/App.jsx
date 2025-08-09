import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContextProvider from "./store/meal-cart-context.jsx";
import MainAppContent from "./components/MainAppContent.jsx";

export const orders = [];

function App() {
  return (
    <>
      <AppContextProvider>
        <MainAppContent />
      </AppContextProvider>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
