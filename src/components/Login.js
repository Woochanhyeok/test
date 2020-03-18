import React, {useState, useCallback, useRef, useEffect} from 'react';
import './Login.scss';
import { Link } from "react-router-dom";

function Login({ history, setLog }) {
  const [inputs,setInputs] = useState({
    id:'',
    password:''
  });
  const {id, password} = inputs;

  const [isLoading, setLoad] = useState(false);

  const onChange = useCallback(e => {
      const {name,value} = e.target;
      setInputs({
        ...inputs,
        [name]:value
      });
      if(idReference.current.value && passwordReference.current.value) {
        buttonReference.current.style.backgroundColor = "#3797F0";
      }
    },[inputs]
  );

  const isSuccess = () => {
    setInputs({
      id:'',
      password:''
    })
  };

  const onClick = () => {
    setLoad(true);
    fetch('/process/login',{method: 'POST', body:JSON.stringify(inputs),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }})
      .then(res => res.json())
      .then(data => {
        //Login Fail
        if(data.err ==='error') {
          setLoad(false);
          buttonReference.current.style.backgroundColor = "#CBE0F8";
          errorMessage.current.innerHTML = "잘못된 비밀번호입니다. 다시 시도해주세요.";
          isSuccess();
        } else {
          sessionStorage.setItem('info', JSON.stringify(data.user));
          sessionStorage.setItem('isLogin', true);
          //Go Home
          console.log('Login Success');
          setLog(true);
          history.push('/');
        }
      });
  };
  const idReference = useRef();
  const passwordReference = useRef();
  const buttonReference = useRef();
  const errorMessage = useRef();

  useEffect(() => {
    const isLogin = sessionStorage.getItem('isLogin');
    if(isLogin) {
      history.push('/');
    }
  }, [history]);

  return (
    <div className='login-page'>
      <div className="introduce"></div>
      <div className="login-container">
        <img src="/images/maet-logo.png" alt="팀 로고" />
        <input
          name="id"
          placeholder="아이디"
          onChange={onChange}
          value={id}
          ref={idReference}
        />
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={password}
          ref={passwordReference}
        />
        <div className="error-message" ref={errorMessage} />
        <button onClick = {onClick} ref={buttonReference}>
          {!isLoading
            ? "로그인"
            : <div className="loader" />
          }
        </button>
        <div className="hr-sect">또는</div>
        <div className="signup-nav">
          계정이 없으신가요?
          <Link to="Signup"> 가입하기</Link>
        </div>
      </div>
    </div>
  )
}
export default Login;