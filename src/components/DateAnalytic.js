import React, {useEffect, useState} from "react";
import './DateAnalytic.scss';

// 사용자의 영양 권장량을 가져오는 함수
function getNutritionRecommended() {
  const recommendedNutrition = sessionStorage.getItem('recommended_nutrition');

  return recommendedNutrition === null
    ? new Promise((resolve, reject) => {
      fetch('/getNutrition', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
<<<<<<< HEAD
      arr = JSON.parse(sessionStorage.getItem("recommended_nutrition"));
      return [arr.권장열량,arr.권장탄수화물,arr.권장단백질,arr.권장지방,arr.권장당류,arr.권장나트륨,arr.권장콜레스테롤,arr.권장포화지방산,arr.권장트랜스지방산];
  }

// 사용자의 일일 영양 섭취량을 가져오는 함수
function GetNutritionIntake() {
  var arr = [];
  fetch('/getIntake',{method: 'POST', body:JSON.stringify(),
      headers:{ 
=======
        .then(res => res.json())
        .then(data => {
          sessionStorage.setItem('recommended_nutrition', JSON.stringify(data));
          resolve(Object.values(data));
        })
        .catch(error => reject(error));
    })
    : new Promise((resolve) => resolve(Object.values(JSON.parse(recommendedNutrition))));
}

// 사용자의 일일 영양 섭취량을 가져오는 함수
function getNutritionIntake() {
  return new Promise((resolve, reject) => {
    fetch('/getIntake',{
      method: 'POST',
      body: JSON.stringify(),
      headers:{
>>>>>>> upstream/master
        "Content-Type":"application/json",
        "Accept":"application/json"
      }})
      .then(res => res.json())
      .then(data => resolve(Object.values(data)))
      .catch(err => reject(err));
  });
}

function DateAnalytic() {
  const [recommended, setRecommendation] = useState([]);
  const [intake, setIntake] = useState([]);
  const [ratio, setRatio] = useState([]);

  const nutritionList = [
    'calorie', 'carbohydrate', 'protein',
    'fat', 'sugar', 'salt',
    'cholesterol', 'saturated-fat', 'trans-fat'
  ];

  useEffect( () => {
    async function getData() {
      try {
        const data = await Promise.all([getNutritionRecommended(), getNutritionIntake()]);
        console.log(data);
        return data;
      } catch(err) {
        console.error(err);
      }
    }
    getData()
      .then((data) => {
        setRecommendation(data[0]);
        setIntake(data[1]);
        setRatio(recommended.map((arg, index) =>
          arg !== 0
            ? intake[index] / arg
            : 0
        ))
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const getElementsStyle = (nutritionArray) => {
      return nutritionArray.map(nutrition => document.getElementById(nutrition).style);
    };
    const elementsStyle = getElementsStyle(nutritionList);
    for(let i = 0; i < elementsStyle.length; ++i) {
      elementsStyle[i].width = (75 * ratio[i]).toString() + '%';
    }
  }, [nutritionList, ratio]);

  return (
    <article className="analytic">
      {/*<h2>일일 섭취량</h2>*/}

      <ul className="nutrition">
        <li>열량</li>
        <li>탄수화물</li>
        <li>단백질</li>
        <li>지방</li>
        <li>당류</li>
        <li>나트륨</li>
        <li>콜레스테롤</li>
        <li>포화지방산</li>
        <li>트랜스지방산</li>
      </ul>

      <ul className="nutrition-graph">
        <li><div id="calorie" />{intake[0]}kcal</li>
        <li><div id="carbohydrate" />{intake[1]}g</li>
        <li><div id="protein" />{intake[2]}g</li>
        <li><div id="fat" />{intake[3]}g</li>
        <li><div id="sugar" />{intake[4]}g</li>
        <li><div id="salt" />{intake[5]}mg</li>
        <li><div id="cholesterol" />{intake[6]}mg</li>
        <li><div id="saturated-fat" />{intake[7]}g</li>
        <li><div id="trans-fat" />{intake[8]}g</li>
        <div className="recommended-amount" />
      </ul>
    </article>
  );
}

export default DateAnalytic;