import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  Switch,useLocation
  
} from "react-router-dom"
import Login from "./components/js/auth/login"
import Home from "./components/js/home"
import Users from "./components/js/users/users"
import Classes from "./components/js/classes/classes"
import Surveys from "./components/js/surveys/surveys"
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  useEffect, 
  useState 
} from "react";
import axios from "axios";

function App() {
  const [role, setRole] = useState()
  useEffect(() => {
  const me = async() => {
    var config = {
    method: 'get',
    url: 'http://localhost:8000/api/auth/me',
    headers: { 
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
    }
  };

  await axios(config)
  .then(function (response) {
    localStorage.setItem("profil", JSON.stringify(response.data));
    setRole(response.data.role)
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  me()

  }, [])
 return (
    <>
	  <div>
		<Outlet />
	  </div>
    <BrowserRouter>
      <Routes>
        <Route
        path="/login"
        element={ localStorage.getItem("isLoggedIn")
			 ? <Navigate replace to="/" /> : <Login /> } />
        <Route 
        path="/" 
        element={ localStorage.getItem("isLoggedIn")
			? <Surveys role={role}  />  : <Navigate replace to="/login" /> } />

        <Route 
        path="/users" 
        element={ localStorage.getItem("isLoggedIn") && role === "Administrator"
      ? <Users />: <Navigate replace to="/login" /> }  />

      <Route 
        path="/classes" 
        element={ localStorage.getItem("isLoggedIn") && role === "Administrator"
      ? <Classes /> : <Navigate replace to="/login" /> }  />

      
      </Routes> 
    </BrowserRouter>
    </>
  );
}

export default App;
