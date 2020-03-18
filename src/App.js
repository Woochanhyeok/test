import React, { useState,useEffect } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./routes/Home";
import AddButton from "./components/AddButton";

function App() {
  const UserInfo = sessionStorage.getItem('info');
  const [isLogin, setLog] = useState(sessionStorage.getItem('isLogin'));

  useEffect(() => {
    //Login 검사 
    if(UserInfo){
      console.log(`로그인 정보있음 ${UserInfo}`);
      const user_no = JSON.parse(UserInfo)[0].user_no;
      console.log(user_no);
    }
    else 
    console.log('fail');
    //선호도 검사 

  },[UserInfo]);

  return (
    <>
      {isLogin
        ? (
          <>
            <Header />
            <AddButton />
          </>
        )
        : null
      }
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} isLogin={isLogin} />}
        />
        <Route path="/SignUp" component={SignUp}/>
        <Route
          path="/Login"
          render={(props) => <Login {...props} setLog={setLog}/>}
        />
      </Switch>
    </>
  );
}

export default App;
