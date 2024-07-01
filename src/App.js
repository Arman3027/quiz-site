import axios from "axios";
import { useEffect, useState } from "react";

function App() {

const [questions,setQuestions] = useState([])

  useEffect(() => {
    async function api() {
      let apiKey = "gmUCFqZj0KTz3CwRKwMQbHcvtRT5VBW3tAoFDsX6";
      let response = await axios
        .get("https://quizapi.io/api/v1/questions", {
          headers: {
            "X-Api-Key": apiKey,
          }
        })
      setQuestions(response.data)
    }
    api();
  },[]);

  return (
    <>
      {questions.map((item) => {
        return (
          <>
          <p>{item.category}</p>
          <p>{item.difficulty}</p>
          </>
        )
      })}
    </>
  );
}

export default App;
