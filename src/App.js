import "./App.css";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [questionsData, setQuestionsData] = useState([
    {
      question: "What is the the capital of Pakistan?",
      option: ["Karachi", "Islamabad", "Peshawar", "Quetta"],
      correctOption: "Islamabad",
    },
    {
      question: "What does OOP stands for?",
      option: [
        "HTML",
        "Object Oriented Programming",
        "Objected Operational Programming",
        "SQL",
      ],
      correctOption: "Object Oriented Programming",
    },
    {
      question: "What is does SQL stands for?",
      option: ["OOP", "HTML", "Structured Query Language", "Server Quota Link"],
      correctOption: "Structured Query Language",
    },
    {
      question: "What is the HTML tag that creates a link",
      option: ["p", "link", "canvas", "a"],
      correctOption: "a",
    },
    {
      question: "What does JS Stands for?",
      option: ["JavaScript", "JavaScore", "JackpotScreen", "JooteKaSole"],
      correctOption: "JavaScript",
    },
    {
      question: "Which CSS property is used for text color?",
      option: ["margin:", "style:", "background:", "color:"],
      correctOption: "color:",
    },
    {
      question: "What does CSS stands for?",
      option: [
        "Castle Stand System",
        "Cascading Style Sheet",
        "Cascading Stencil Sheet",
        "Color Style Sheet",
      ],
      correctOption: "Cascading Style Sheet",
    },
    {
      question: "Which is used for storing data in JavaScript?",
      option: ["Conditional Statements", "Loops", "Functions", "Variable"],
      correctOption: "Variable",
    },
    {
      question: "Which type of JavaScript language is ?",
      option: [
        "Object-Oriented",
        "Object-Based",
        "Assembly-language",
        "High-level",
      ],
      correctOption: "Object-Based",
    },
    {
      question: 'The "function" and " var" are known as:',
      option: [
        "Keypoints",
        "Data types",
        "Declaration statements",
        "Prototypes",
      ],
      correctOption: "Declaration statements",
    },
  ]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [disabled, setdisabled] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [minutes, setMinutes] = useState(1);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#d81b60",
      },
      secondary: {
        main: "#00acc1",
      },
    },
  });

  let checkAnswer = (current, correct) => {
    console.log(current);
    console.log(correct);
    if (current === correct) {
      setScore(score + 1);
      console.log(score);
    }
    setdisabled(true);
  };

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
        if (minutes == 0) {
          setSeconds(59);
        }
      }
    }, 1000);
    if (minutes == 0 && seconds == 0) {
      clearInterval(timer);
      setShowResult(true);
    }
    return () => clearInterval(timer);
  });

  return (
    <div>
      {showResult ? (
        <Box>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                margin: "20px 0px 20px 0px",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              RESULT:
            </Typography>
            <Typography
              color="primary"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Your Score: {score}
            </Typography>
            <Typography
              color="primary"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Percentage: {((score / questionsData.length) * 100).toFixed(2)}%
            </Typography>
            <Typography
              color="primary"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Attempted Questions: {score}
            </Typography>
            <Typography
              color="error"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Unattempted Questions / Wrong Answers:
              {questionsData.length - score}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  padding: "20px 30px 20px 30px",
                  fontWeight: "bolder",
                }}
                endIcon={<RestartAltIcon />}
                onClick={() => {
                  setIndexNumber(0);
                  setScore(0);
                  setShowResult(false);
                  setMinutes(1);
                  setSeconds(30);
                  clearInterval(timer);
                }}
              >
                Reattempt Quiz
              </Button>
            </Box>
          </Container>
        </Box>
      ) : null}

      {!showResult ? (
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              backgroundColor: "#023e8a",
              color: "white",
              margin: "20px 0px 10px 0px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bolder" }}>
              Quiz App
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#ffb703" }}
            >
              Question # {indexNumber + 1} / {questionsData.length}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            color="primary"
            value={(indexNumber + 1) * 10}
            sx={{ height: "8px", borderRadius: "10px", marginBottom: "20px" }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="h5"
              sx={{
                display: "inline",
                fontWeight: "bolder",
                marginRight: "30px",
              }}
            >
              Time Remaining:
            </Typography>
            <Typography
              variant="h3"
              sx={{
                display: "inline",
                fontWeight: "bolder",
              }}
            >
              {minutes}:
            </Typography>
            <Typography
              variant="h3"
              sx={{
                display: "inline",
                fontWeight: "bolder",
              }}
            >
              {seconds}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "20px",
              margin: "10px",
              backgroundColor: "#003566",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bolder" }}>
              {questionsData[indexNumber].question}
            </Typography>
          </Box>
          <Box>
            {questionsData[indexNumber].option.map((e, i) => (
              <ThemeProvider key={i} theme={theme}>
                <Chip
                  key={i}
                  sx={{
                    width: "48%",
                    margin: "10px",
                    padding: "30px",
                    fontSize: "22px",
                    cursor: "pointer",
                    color: "white",
                  }}
                  color="secondary"
                  disabled={disabled}
                  onClick={() => {
                    checkAnswer(e, questionsData[indexNumber].correctOption);
                  }}
                  label={e}
                />
              </ThemeProvider>
            ))}
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              endIcon={<NavigateNextIcon />}
              variant="contained"
              sx={{
                padding: "20px 30px 20px 30px",
                fontWeight: "bolder",
              }}
              onClick={() => {
                if (indexNumber < questionsData.length) {
                  setIndexNumber(indexNumber + 1);
                  setdisabled(false);
                }
                if (indexNumber + 1 == questionsData.length) {
                  setIndexNumber(0);
                  setShowResult(true);
                }
              }}
            >
              Next Question
            </Button>
          </Box>
        </Container>
      ) : null}
    </div>
  );
}

export default App;
