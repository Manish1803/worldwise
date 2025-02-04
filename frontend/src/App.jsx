import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="bottom-left" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<h1>Homepage</h1>} />
            <Route path="/product" element={<h1>Product</h1>} />
            <Route path="/pricing" element={<h1>Pricing</h1>} />
            <Route path="/auth" element={<h1>Auth</h1>} />
            <Route path="/app" element={<h1>App</h1>}></Route>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
