import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoginPage  from "./pages/LoginPage";
import UserListPage  from "./pages/UserListPage";
import ChatPage from "./pages/ChatPage"


function App(){
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/users" element={<UserListPage/>}/>
      <Route path="/chat/:userId" element={<ChatPage/>}/>
      </Routes>
    </Router>
  )
}
export default App;