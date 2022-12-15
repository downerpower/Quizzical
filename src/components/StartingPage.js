const StartingPage = ({ handleCategoryChange, handleDifficultyChange, handleStartQuizClick }) => {
   return (
      <div className="starting-page-container">
         <h1>Quizzical</h1>
         <div className='options'>
            <div className='categories'>
               <p>categories</p>
               <select onChange={handleCategoryChange} defaultValue={'All'}>
                  <option value="All">All</option>
                  <option value="Arts & Literature">Arts & Literature</option>
                  <option value="Film & TV">Film & TV</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Geography">Geography</option>
                  <option value="History">History</option>
                  <option value="Science">Science</option>
                  <option value="Society & Culture">Society & Culture</option>
                  <option value="Sport & Leisure">Sport & Leisure</option>
               </select>
            </div>
            <div className='categories'>
               <p>difficulty</p>
               <select onChange={handleDifficultyChange} defaultValue={'easy'}>
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
               </select>
            </div>
         </div>
         <button onClick={handleStartQuizClick} className='button'>Start quiz</button>
      </div>
   );
}

export default StartingPage;