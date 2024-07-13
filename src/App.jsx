import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [filterQuestions, setfilterQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState([]);
  const [iscorrect, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0);
  const [count, setCount] = useState(null)

  let startDiv = useRef(null);
  let difficultyDiv = useRef(null);
  let questionBoxDiv = useRef(null);
  let endBoxDiv = useRef(null);
  let shadowDiv = useRef(null);

  useEffect(() => {
    async function api() {
      let apiKey = "gmUCFqZj0KTz3CwRKwMQbHcvtRT5VBW3tAoFDsX6";
      let response = await axios.get("https://quizapi.io/api/v1/questions", {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      setQuestions(response.data);
      console.log(response.data);
    }
    api();
  }, []);

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
            <button
              className="difficultyItem"
              id="difficultyItem1"
              onClick={() => {
                handledifficulty(
                  "Easy",
                  difficultyDiv.current,
                  questionBoxDiv.current
                );
              }}
            >
              Easy
            </button>
            <button
              className="difficultyItem"
              id="difficultyItem2"
              onClick={() => {
                handledifficulty(
                  "Medium",
                  difficultyDiv.current,
                  questionBoxDiv.current
                );
              }}
            >
              Medium
            </button>
          </div>
          <div className="questionBox" ref={questionBoxDiv}>
            {randomQuestion.map((item) => {
              return (
                <div className="mainBox">
                  <div className="questionTag">
                    <p className="tagBox">{item.question}</p>
                  </div>
                  <div className="answersBox">
                    {Object.keys(item.answers).map((key, index) => {
                      if (item.answers[key] !== null) {
                        return (
                          <button
                            className="btnBox"
                            onClick={() => {
                              handleAnswer(index, item.correct_answers);
                            }}
                          >
                            {(index += 1)} - {item.answers[key]}
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="endGameBox" ref={endBoxDiv}>
            <div className="modal">
              <p className="score">true Answer : {iscorrect}</p>
              <p className="score">false Answer : {wrong}</p>
              <button className="retry" onClick={retryGame}>retry</button>
            </div>
          </div>
          <div className="shadowEnd" ref={shadowDiv}></div>
        </div>
      </div>
    </>
  );

  function handlestart(startDiv, difficultyDiv) {
    startDiv.style.display = "none";
    difficultyDiv.style.display = "flex";
  }

  async function handledifficulty(difficulty, difficultyDiv, questionBoxDiv) {
    console.log(difficulty);
    difficultyDiv.style.display = "none";
    questionBoxDiv.style.display = "block";

    let filter = questions.filter((item) => {
      return item.difficulty === difficulty;
    });
    setfilterQuestions(filter);

    let randomItem = filter[Math.floor(Math.random() * filter.length)];
    setRandomQuestion([randomItem]);
  }

  function handleAnswer(index, correct) {
    let btnBox = document.getElementsByClassName('btnBox')
    let trueAnswer = Object.keys(correct).filter(key => correct[key] === 'true')
    let x;
    if (trueAnswer[0] === "answer_a_correct") {
      x =0
    }
    if (trueAnswer[0] === "answer_b_correct") {
      x = 1;
    }
    if (trueAnswer[0] === "answer_c_correct") {
      x = 2;
    }
    if (trueAnswer[0] === "answer_d_correct") {
      x = 3;
    }
    if (trueAnswer[0] === "answer_e_correct") {
      x = 4;
    }
    if (trueAnswer[0] === "answer_f_correct") {
      x = 5; 
    }
    if (btnBox[x].style.border === "5px solid green" || btnBox[index - 1].style.border === '5px solid green') {
      return
    }
    if (index === 1) {
      if (correct.answer_a_correct === "true") {
        btnBox[index - 1].style.border = "5px solid green";
        setCorrect(iscorrect + 1)
        setCount(count + 1)
        setTimeout(() => {
        btnBox[index - 1].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
      if (correct.answer_a_correct === "false") {
        btnBox[index - 1].style.border = "5px solid red";
        btnBox[x].style.border = "5px solid green";
        setWrong(wrong + 1)
        setCount(count + 1);
        setTimeout(() => {
          btnBox[index - 1].style.border = "2px solid #fff";
        btnBox[x].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
    } else if (index === 2) {
      if (correct.answer_b_correct === "true") {
        btnBox[index - 1].style.border = "5px solid green";
        setCorrect(iscorrect + 1);
        setCount(count + 1);
        setTimeout(() => {
        btnBox[index - 1].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
      if (correct.answer_b_correct === "false") {
        btnBox[index - 1].style.border = "5px solid red";
        btnBox[x].style.border = "5px solid green";
        setWrong(wrong + 1)
        setCount(count + 1);
        setTimeout(() => {
          btnBox[index - 1].style.border = "2px solid #fff";
        btnBox[x].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
    } else if (index === 3) {
      if (correct.answer_c_correct === "true") {
        btnBox[index - 1].style.border = "5px solid green";
        setCorrect(iscorrect + 1);
        setCount(count + 1);
        setTimeout(() => {
        btnBox[index - 1].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
      if (correct.answer_c_correct === "false") {
        btnBox[index - 1].style.border = "5px solid red";
        btnBox[x].style.border = "5px solid green";
        setWrong(wrong + 1)
        setCount(count + 1);
        setTimeout(() => {
          btnBox[index - 1].style.border = "2px solid #fff";
        btnBox[x].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
    } else if (index === 4) {
      if (correct.answer_d_correct === "true") {
        btnBox[index - 1].style.border = "5px solid green";
        setCorrect(iscorrect + 1);
        setCount(count + 1);
        setTimeout(() => {
        btnBox[index - 1].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
      if (correct.answer_d_correct === "false") {
        btnBox[index - 1].style.border = "5px solid red";
        btnBox[x].style.border = "5px solid green";
        setWrong(wrong + 1)
        setCount(count + 1);
        setTimeout(() => {
          btnBox[index - 1].style.border = "2px solid #fff";
        btnBox[x].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
    } else if (index === 5) {
      if (correct.answer_e_correct === "true") {
        btnBox[index - 1].style.border = "5px solid green";
        setCorrect(iscorrect + 1);
        setCount(count + 1);
        setTimeout(() => {
        btnBox[index - 1].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
      if (correct.answer_e_correct === "false") {
        btnBox[index - 1].style.border = "5px solid red";
        btnBox[x].style.border = "5px solid green";
        setWrong(wrong + 1)
        setCount(count + 1);
        setTimeout(() => {
          btnBox[index - 1].style.border = "2px solid #fff";
        btnBox[x].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
    } else if (index === 6) {
      if (correct.answer_f_correct === "true") {
        btnBox[index - 1].style.border = "5px solid green";
        setCorrect(iscorrect + 1);
        setCount(count + 1);
        setTimeout(() => {
        btnBox[index - 1].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
      if (correct.answer_f_correct === "false") {
        btnBox[index - 1].style.border = "5px solid red";
        btnBox[x].style.border = "5px solid green";
        setWrong(wrong + 1);
        setCount(count + 1);
        setTimeout(() => {
          btnBox[index - 1].style.border = "2px solid #fff";
        btnBox[x].style.border = "2px solid #fff";
          random();
        }, 2000);
      }
    }
  }

  function random() {
      if (count >= 4) {
        endGame();
        return;
      }
    let randomItem =
      filterQuestions[Math.floor(Math.random() * filterQuestions.length)];
    setRandomQuestion([randomItem]);
  }

  function endGame() {
    endBoxDiv.current.style.display = 'flex'
    shadowDiv.current.style.display = 'block'
  }
  function retryGame() {
    window.location.reload()
  }
}

export default App;
