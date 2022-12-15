const Question = ({ question, onClick, answers, correctAnswer, id, selected, isChecked }) => {

   return (
      <div className='question-container'>
         <h3>{question}</h3>
         <div className="answers">
            {answers.map(answer => {
               return (
                  <div
                     key={answer.id}
                     className={`answer 
                     ${(isChecked ?
                           ((((answer.answer === selected && selected === correctAnswer) || (answer.answer === correctAnswer)) && 'answer--correct') ||
                              (answer.answer === selected && answer.answer !== correctAnswer && 'answer--incorrect') ||
                              'answer--nonchosen')
                           :
                           answer.answer === selected && 'answer--selected')}`}
                     onClick={() => onClick(id, answer.answer)}
                  >
                     <input
                        type='radio'
                        name={question}
                        value={answer.answer}
                        id={answer.id}
                     />
                     <label htmlFor={answer.id}>{answer.answer}</label>
                  </div>
               )
            })}
         </div >
      </div >
   );

}

export default Question;