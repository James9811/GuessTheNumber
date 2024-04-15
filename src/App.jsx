import { useEffect, useState } from 'react'
import './App.css'
import { MdQuestionMark } from "react-icons/md";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { IoHeartSharp } from "react-icons/io5";
import { GiDeadHead } from "react-icons/gi";
function App() {

	const [lives, setLives] = useState(3);
	const [livesMessage, setLivesMessage] = useState(<IoHeartSharp/>);
	const [selectedNumber, setSelectedNumber] = useState();
	const [secretNumber, setSecretNumber] = useState();
	const [gameMessage, setGameMessage] = useState("");
	const [icons, setIcons] = useState(<MdQuestionMark />);
	const [success, setSuccess] = useState(false);
	const numbers = [0,1,2,3,4,5,6,7,8,9];
	const min = 0 
	const max = 9

	const randomNumber = () => {
		return Math.floor(Math.random() * (max - min +1) + min )
	}

	const startGame = () => {
		setSuccess(false);
		const number = randomNumber();
		setSecretNumber(number);
		setGameMessage("Guess the Number");
		setIcons(<MdQuestionMark />);
		setLives(3);
	}

	const handleClick = (number) => {
		setSelectedNumber(number)
	}

	useEffect(() => {
		if(secretNumber){
			if(selectedNumber === secretNumber){
				setGameMessage("You guessed the number");
				setSuccess(true)
			} 
			else if (selectedNumber > secretNumber){
				setGameMessage("A little bit lower");
				setIcons(<FiArrowDown/>);
				setLives(lives - 1);
			}
			else {
				setGameMessage("A little bit up");
				setIcons(<FiArrowUp/>);
				setLives(lives - 1);
			}
		}
	}, [selectedNumber])

	useEffect(() => {
		if (lives > 0) {
		  const hearts = Array.from({ length: lives }, (_, index) => (
			<IoHeartSharp key={index} />
		  ));
		  setLivesMessage(hearts);
		} 
		else {
		  setLivesMessage(<GiDeadHead />);
		  setIcons(<GiDeadHead />);
		  setGameMessage("Game Over")
		}
	  }, [lives]);

   	return (
    	<>
			<div className='container'>
				<div className='lives-container'>
					<div>{livesMessage}</div>
				</div>
				<div className='game-header'>
					<h1>GUESS THE NUMBER</h1>
				</div>
				<div className='secret-container'>
					<div className='secret-number'>
						<label>{success ? secretNumber : icons}</label>
					</div>
					<div className='numbers-container'>
						{
							numbers.map((number, index) => {
								return <div key={index} onClick={() => handleClick(index)} 
								className='secret-number'>
								<label>{number}</label>
									</div>
							})
						}
					</div>
					<div className='messages-container'>
						<p>{gameMessage}</p>
					</div>
					<div className='button-game'>
						<button onClick={startGame}>Start Game</button>
					</div>
				</div>
		</div>

    </>
  )
}

export default App
