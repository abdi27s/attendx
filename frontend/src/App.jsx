import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes.jsx";
const App = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <AppRoutes />
    </div>
  );
};

export default App;
