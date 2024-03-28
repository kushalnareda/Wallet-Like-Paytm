import { BrowserRouter, Route, Routes, } from "react-router-dom";

import { Signin } from "./pages/SignIn";
import { Signup } from "./pages/SignUp";




function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
