import { useState } from 'react';
import styles from './App.module.css';

function App() {
	const NUMS = [7, 8, 9, 4, 5, 6, 1, 2, 3];
	const OPERATORS = ['+', '-', '=', 'C'];

	const [display, setDisplay] = useState('');
	const [prevNumber, setPrevNumber] = useState('');
	const [operator, setOperator] = useState('');

	const handleButtonClick = (value) => {
		if (value === 'C') {
			setDisplay('');
			setPrevNumber('');
			setOperator('');
		} else if (!isNaN(value)) {
			setDisplay((prev) => prev + value);
		} else if (OPERATORS.includes(value)) {
			if (value === '=') {
				handleCalculation();
			} else {
				if (prevNumber !== '' && display !== '') {
					handleCalculation();
				}

				setPrevNumber(display);
				setOperator(value);
				setDisplay('');
			}
		}
	};

	const handleCalculation = () => {
		if (prevNumber && operator && display) {
			const num1 = Number(prevNumber);
			const num2 = Number(display);
			let result;

			switch (operator) {
				case '+':
					result = num1 + num2;
					break;
				case '-':
					result = num1 - num2;
					break;
				default:
					return;
			}
			setDisplay(result.toString());
			setPrevNumber(result.toString());
			setOperator('');
		}
	};

	return (
		<div className={styles.calculator}>
			<div className={styles.display}>{display}</div>
			<div className={styles.buttonLocation}>
				<div className={styles.buttonGrid}>
					{NUMS.map((num) => (
						<button className={styles.button} key={num} onClick={() => handleButtonClick(num)}>
							{num}
						</button>
					))}
					<button
						className={`${styles.button} ${styles.buttonZero}`}
						onClick={() => handleButtonClick(0)}
					>
						0
					</button>
				</div>
				<div className={styles.buttonGridOperator}>
					{OPERATORS.map((op) => (
						<button className={styles.button} key={op} onClick={() => handleButtonClick(op)}>
							{op}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
