import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {

const [questions,setQuestions] = useState([])

  let startDiv = useRef(null)
  let difficultyDiv = useRef(null);
  let questionBoxDiv = useRef(null)


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
      <div className="container">
        <div className="main">
          <div className="start" ref={startDiv}>
            <div className="startTag">Are you ready ?</div>
            <button
              className="startBtn"
              onClick={() => {
                handlestart(startDiv.current, difficultyDiv.current);
              }}
            >
              lets go
            </button>
          </div>
          <div className="difficulty" ref={difficultyDiv}>
            <button className="difficultyItem" id="difficultyItem1" onClick={() => {handledifficulty('easy',difficultyDiv.current,questionBoxDiv.current)}}>
              easy
            </button>
            <button className="difficultyItem" id="difficultyItem2" onClick={() => {handledifficulty('medium',difficultyDiv.current,questionBoxDiv.current)}}>
              medium
            </button>
          </div>
          <div className="questionBox" ref={questionBoxDiv}>
            {questions.map((item) => {
              return <p>{item.difficulty}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
  
  function handlestart(startDiv , difficultyDiv) {
    startDiv.style.display = 'none'
    difficultyDiv.style.display = 'flex'
}
  function handledifficulty(difficulty , difficultyDiv, questionBoxDiv) {
    console.log(difficulty);
    difficultyDiv.style.display = 'none'
    questionBoxDiv.style.display = 'block'
  }
}

export default App;
