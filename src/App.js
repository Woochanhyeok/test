import React, { useState,useEffect } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./routes/Home";
import AddButton from "./components/AddButton";

function App() {
  
  const UserInfo = localStorage.getItem('info');
  const [isLogin, setLog] = useState(false);
  
  useEffect(() => {
    if(UserInfo){
      console.log(`로그인 완료 ${UserInfo}`);
      console.log(isLogin);
      console.log(isLogin);
    }
    else 
    console.log('fail');
    //Login 검사 
   

    //선호도 검사 
  },[])
  
 

  return (
    <>
      {isLogin ? (
        <>
          <Header />
          <AddButton/>
        </>
      ) : null}
      <Switch>
        <Route exact path="/" render={
          (props) => <Home {...props} isLogin={isLogin} />
        } />
        <Route path="/SignUp" component={SignUp}/>
        <Route path="/Login" render={
          (props) => <Login {...props} setLog={setLog} />
        } />
      </Switch>
    </>
  );
}

export default App;
