import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Offer from "./pages/Offer";
import Auth from "./pages/Auth";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/offers" element={<Offer />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/app" element={<AppLayout />}></Route>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
