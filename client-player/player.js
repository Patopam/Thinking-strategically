const form = document.getElementById('player-form');
const moveSelectionDiv = document.getElementById('move-selection');
const timerElement = document.getElementById('timer');

let countdown;
let timeLeft = 10; // timer

form.addEventListener('submit', function (event) {
	event.preventDefault();

	const name = document.getElementById('name').value;

	// Show move selection section
	moveSelectionDiv.classList.remove('hidden');

	// Start the countdown timer
	startTimer(name);
});

function startTimer(name) {
	timerElement.textContent = `Time left: ${timeLeft}s`;

	countdown = setInterval(() => {
		timeLeft--;
		timerElement.textContent = `Time left: ${timeLeft}s`;

		if (timeLeft <= 0) {
			clearInterval(countdown);
			handleTimeout(name);
		}
	}, 1000);

	document.querySelectorAll('#move-selection button').forEach((button) => {
		button.addEventListener('click', () => {
			const move = button.getAttribute('data-move');
			submitMove(name, move);
		});
	});
}

function handleTimeout(name) {
	alert("Time's up! No move selected.");
	submitMove(name, 'none');
}

function submitMove(name, move) {
	clearInterval(countdown); // Stop the timer

	fetch('http://localhost:5050/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, move }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Failed to submit move.');
			}
			return response.json();
		})
		.then((data) => {
			alert(`Move submitted: ${data.move}`);
		})
		.catch((error) => {
			console.error(error);
			alert('Error submitting move.');
		});
}
