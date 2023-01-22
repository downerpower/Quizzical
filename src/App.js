import { useState, useEffect } from 'react';
import Question from './components/Question';
import StartingPage from './components/StartingPage';
import { nanoid } from 'nanoid'

function App() {
  const [quizStart, setQuizStart] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [difficultyValue, setDifficultyValue] = useState('easy');
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  let score = 0;

  const shuffleAnswers = (array) => array.sort(() => Math.random() - 0.5);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategoryValue(category.replace('&', 'and').toLowerCase().split(' ').join('_'));
  }

  const handleDifficultyChange = (e) => {
    setDifficultyValue(e.target.value);
  }

  useEffect(() => {
    try {
      if (quizStart) {
        setIsLoading(true);
        fetch(`https://the-trivia-api.com/api/questions?${categoryValue && `categories=${categoryValue}&`}limit=5&difficulty=${difficultyValue}`)
          .then(res => res.json())
          .then(data => {
            setQuizData(data.map(quizElement => ({
              id: quizElement.id,
              question: quizElement.question,
              correctAnswer: quizElement.correctAnswer,
              incorrectAnswers: quizElement.incorrectAnswers,
              answers: shuffleAnswers([...quizElement.incorrectAnswers.map(incorrectAnswer => ({ answer: incorrectAnswer, id: nanoid() })), { answer: quizElement.correctAnswer, id: nanoid() }]),
              selected: null,
            })))
            setIsLoading(false);
          }
          )
      }
    } catch (err) {
      console.log(err)
    }

  }, [quizStart, categoryValue, difficultyValue])

  const handleStartQuizClick = () => {
    setQuizStart(true);
  }

  const handleAddAnswerClick = (id, answer) => {
    setQuizData(prevData => prevData.map(prevDataElement => prevDataElement.id === id ? ({ ...prevDataElement, selected: answer }) : prevDataElement));
    setUserAnswers(quizData.map(dataElement => dataElement.selected));
  }

  const handleCheckAnswerClick = () => {
    setIsChecked(true);
    quizData.map(quizElement => userAnswers.includes(quizElement.correctAnswer) ? score += 1 : score);
    setTotalScore(score);
  }

  const handlePlayAgainClick = () => {
    setQuizStart(false);
    setIsChecked(false);
    setTotalScore(0);
    setUserAnswers([]);
    setQuizData([]);
    setCategoryValue('');
    setDifficultyValue('easy');
  }

  return (
    <div className="container">
      <img src='./img/blob-yellow.png' alt='yellow blob' className="yellow-blob" />
      <img src='./img/blob-blue.png' alt='blue blob' className="blue-blob" />
      {!quizStart && <StartingPage
        handleCategoryChange={handleCategoryChange}
        handleDifficultyChange={handleDifficultyChange}
        handleStartQuizClick={handleStartQuizClick}
      />}
      {quizStart && isLoading && <p className='loading'>Loading...</p>}
      {quizStart &&
        !isLoading &&
        <div className='questions-container'>
          {quizData.map(quizQuestion => (<Question
            key={quizQuestion.id}
            id={quizQuestion.id}
            question={quizQuestion.question}
            answers={quizQuestion.answers}
            correctAnswer={quizQuestion.correctAnswer}
            selected={quizQuestion.selected}
            isChecked={isChecked}
            onClick={handleAddAnswerClick}
          />))}
          {!isChecked ?
            (<button className='button button--play' onClick={handleCheckAnswerClick}>Check answers</button>) :
            (
              <div className='answer-check--container'>
                <p>You scored {totalScore}/5 correct answers</p>
                <button className='button button--play' onClick={handlePlayAgainClick}>Play again</button>
              </div>
            )
          }
        </div>
      }
    </div >
  );
}

export default App;
