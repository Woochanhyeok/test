const  { recommend } = require("./recommendation-model/recommend");

function quickSort() {

}

async function predict(preference) {
  try {
    let predicted_preference = await recommend(preference, 3);
    predicted_preference = predicted_preference.map((item, index) => {
      return {
        "food_no": index,
        "predicted_preference": item
      }
    });
    console.log(predicted_preference);
  } catch(err) {
    console.error(err);
    // 에러 처리를 나중에 해야됩니다.
  }
}

module.exports.predictPreference = predict;