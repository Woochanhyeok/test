import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import './Food.scss'

function Food({imageSrc, num}) {
  const food_no = imageSrc.split('.')[0].split('/')[2];

  //console.log('user no in food.js ' + num)
  const [inputs, setInputs] = useState({
    user_id:num,
    food_id:food_no
  });

  const onClick = () => {
    console.log('click event ' + food_no);
    setInputs({
      user_id:num,
      food_id:food_no
    });
    //DB 선호도 내리기
    fetch('/hate',{method: 'POST', body:JSON.stringify(inputs),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }})
      .then(res => res.json())
      .then(data => {
        console.log('선호도 내림 ')
      })
  };

  return (
    <div className="food-container">
      <div className="food">
        <img src={imageSrc} alt="foodImage"/>
        <button onClick={onClick}>
          <FontAwesomeIcon size="2x" icon={faThumbsDown}/>
        </button>
      </div>
    </div>
  );
}

export default Food;