import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';
  import axios from "axios"
  import { useEffect, useState } from "react"
  import "../css/sidebar.css"
const Sidebar = () => {
  const [profile, setProfile] = useState({})
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
    setProfile(response.data)


  })
  .catch(function (error) {
    console.log(error);
  });
  }
  me()
  }, [])
  const logout = async() => {
    var config = {
      method: 'get',
      url: `http://localhost:8000/api/auth/logout`,
      headers: { 
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
      }
    };

    await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("acess_token")
      localStorage.removeItem("profil")
      window.location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });

  }
    return(
        <div style={{ 
          display: 'flex', 
          height: '100vh',
           overflow: 'scroll initial',
        }}>
      <CDBSidebar textColor="#fff" backgroundColor="#123860">
        <CDBSidebarHeader>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            SMKN 1 SAMPIT
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content toogled">
          <CDBSidebarMenu>            
            {localStorage.getItem("profil") && JSON.parse(localStorage.getItem("profil")).role === "Administrator"
             ?
             <> 
             <NavLink exact to="/classes" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Classes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink> 
            </>
            : <></>}
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Surveys</CDBSidebarMenuItem>
            </NavLink>
            <NavLink activeClassName="activeClicked">
              <CDBSidebarMenuItem onClick={logout}  className="text-danger" icon="">Logout</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            {profile.username} | {profile.role}
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    );
}
export default Sidebar;