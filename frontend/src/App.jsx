import "./App.css";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
        <Login/>
    </div>
  )
}

export default App
