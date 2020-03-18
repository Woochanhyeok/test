import React, { useEffect,useState } from "react";
import "./Recommendation.scss"
import Food from "./Food";

function Recommendation({foodImageList}) {
  const UserInfo = sessionStorage.getItem('info');
  const [user_no,setUser_no] = useState();
  useEffect(() => {
      setUser_no(JSON.parse(UserInfo)[0].user_no) 
  }
  )

  //console.log('recommendation :' + user_no[0].user_no);
  return (
    <article className="recommendation">
      <h1>이런 음식 어때요?</h1>
      {foodImageList.map(imageSrc => {
        return (
          <Food key={imageSrc} imageSrc={imageSrc} num = {user_no}/>
        );
      })}
    </article>
  );
}

export default Recommendation;