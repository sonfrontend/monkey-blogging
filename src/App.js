import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
