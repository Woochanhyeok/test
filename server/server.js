const express = require('express');
const path = require('path');
const os = require('os');
const router = require('./routes/router');
const db = require('./dbconnection');
const { predictPreference } = require('./predictPreference');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4002;

app.use(express.static(path.join(__dirname,'..','public/')));


app.post("/addUser",(req,res,next) => {
  const address = req.body.address;
  const password = req.body.password;
  const name = req.body.name;
  const age = req.body.age;
  const sex = req.body.sex;

  db.query("Select * from user_information where user_id = \'" + address
    + '\' AND user_password = \'' + password + '\' AND user_name = \'' + name + '\'',
    (err, rows) => {
      //Check User
      if(err)
        console.log('AddUser error');
      else {
        if(rows.recordset[0] === undefined){
          //New User Insert
          db.query("register_user_information \'" + address + "\', \'" + password + "\' ,\'" + name + "\', \'" + age + "\', \'" + sex + "\'",
            (err,rows) =>{
              if(err){
                console.log('insert error');
                console.log(address);
                console.log(password + name + age + sex);
              }
              else {
                res.send({text : 'success'});
              }

            });
        }
        else {
          //Already User Inserted
          res.send({text: 'Same User exists'});
        }
      }
    }
  )
});

app.post("/process/login", (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  db.query("Select * from user_information where user_id = \'" + id + '\'' + 'AND user_password = \'' + password + '\'',
    (err,rows) => {
      if(rows.recordset[0] === undefined || err)
        res.send({err:'error'});
      else {
        db.query("select * from user_preference", async (e,r) => {
          if(r.recordset === undefined || e)
            res.send({err:'error'});
          else {
            let max_user_no = 0;
            let num = 0;
            //유저수 체크
            while(true) {
              try {
                const a = r.recordset[num]['음식_0'];
                num +=1;
              }
              catch(e){
                max_user_no = num;
                break;
              }
            }
            console.log('max_user의 수 ' + max_user_no);

            const preference = Array(max_user_no).fill(null).map(() => Array());
            let i = 0;
            while(true) {
              let u_no;
              try{
                for(let j = 0; j< 515; j++){
                  u_no = i;
                  preference[u_no][j] =
                    r.recordset[i]['음식_'+j];
                }
                i+=1;
              }
              catch(e){
                break;
              }
            }

<<<<<<< HEAD
            //선호도 모델 예측해서 변수에 담아놓은 부분
            let predicted_preference = await recommend(preference, 3);
            predicted_preference = predicted_preference.map((item, index) => {
             return {
               "food_no": index,
               "predicted_preference": item
             }
            });
            console.log(predicted_preference);
=======
            // 선호도 모델 계산되고 정렬되어 반환됨.
            await predictPreference(preference);
>>>>>>> upstream/master

            res.send({user:rows.recordsets[0],
              pref:preference
            })
          }
        })
      }
    })
});

app.post("/hate",(req,res,next) => {
  const user_id = req.body.user_id;
  const food_no = req.body.food_id;
  console.log(user_id+  '  ' + food_no)
  db.query("change_user_preference'" + user_id + "','" + food_no + "' , '" + 0 + "'",(err,rows) =>{
    if(err)
      console.log('error');
    else {
      //console.log('success for hate');
      res.send(rows.recordsets);
    }
  });

});
app.post("/getNutrition", (req,res,next) => {

  db.query("read_user_nutrition'" +  1 + "'", (err,rows) => {
    if(err)
      console.log('error');
    else {
      res.send(rows.recordsets[0][0]);
    }
  });
})

app.post("/getIntake",(req,res,next) => {

  db.query("read_user_today_nutrition'" +  1 + "'", (err,rows) =>{
    if(err)
      console.log('error');
    else {
      res.send(rows.recordsets[0][0]);
    }
  });
});

app.use("/",router);

app.listen(PORT,() => {
  console.log('Check out the app at https://localhost:' + PORT);
});