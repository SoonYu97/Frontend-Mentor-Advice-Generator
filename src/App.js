import { useState, useEffect } from "react"

import "./App.css"
import "./Loading.css"
import iconDice from "./icon-dice.svg"
import mobileDivider from "./pattern-divider-mobile.svg"
import desktopDivider from "./pattern-divider-desktop.svg"

function App() {
	const [advice, setAdvice] = useState(null)
	const [loading, setLoading] = useState(true)

	const GetNewAdvice = () => {
		setLoading(true)
		fetch("https://api.adviceslip.com/advice")
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
				throw response
			})
			.then(({ slip }) => setAdvice(slip))
			.catch((err) => console.error("Error fetching data: ", err))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		GetNewAdvice()
	}, [])

	return (
		<main className="App">
			<section className="Card">
				<h1 className="Card-title">
					{loading ? "Loading" : `ADVICE #${advice?.id}`}
				</h1>
				{loading ? (
					<div class="lds-circle">
						<div></div>
					</div>
				) : (
					<p className="Card-advice">"{advice?.advice}"</p>
				)}
				<img
					src={mobileDivider}
					className="Mobile-divider"
					alt="Mobile Divider"
				/>
				<img
					src={desktopDivider}
					className="Desktop-divider"
					alt="Desktop Divider"
				/>
				<button
					className="Next-button"
					aria-label="next advice"
					onClick={GetNewAdvice}
				>
					<img src={iconDice} alt="dice icon" />
				</button>
			</section>
		</main>
	)
}

export default App
