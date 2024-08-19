document.getElementById('fetch-button').addEventListener('click', fetchData);
document.getElementById('reset-button').addEventListener('click', resetGame);

async function fetchData() {
	renderLoadingState();
	try {
		const response = await fetch('http://localhost:5050/result');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderData(data);
	} catch (error) {
		console.error(error);
		renderErrorState();
	}
}

async function resetGame() {
	try {
		const response = await fetch('http://localhost:5050/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		console.log(data.message); 
		renderData({});
	} catch (error) {
		console.error(error);
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Limpiar datos anteriores
	container.innerHTML = '<p>Waiting for two players</p>';
	console.log('Failed to load data');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Limpiar datos anteriores
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

function getMoveIcon(move) {
	switch (move.toLowerCase()) {
		case 'rock':
			return '<i class="fas fa-hand-rock"></i>';
		case 'paper':
			return '<i class="fas fa-hand-paper"></i>';
		case 'scissors':
			return '<i class="fas fa-hand-scissors"></i>';
		default:
			return move;
	}
}

function renderData(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = ''; // Limpiar datos anteriores

	if (data.player1 && data.player2) {
		const div1 = document.createElement('div');
		div1.className = 'item';
		div1.innerHTML = `<p>${data.player1.name}: ${getMoveIcon(data.player1.move)}</p>`;
		container.appendChild(div1);

		const div2 = document.createElement('div');
		div2.className = 'item';
		div2.innerHTML = `<p>${data.player2.name}: ${getMoveIcon(data.player2.move)}</p>`;
		container.appendChild(div2);

		const resultDiv = document.createElement('div');
		resultDiv.className = 'item';
		resultDiv.innerHTML = `<p>Winner: ${data.winner}</p>`;
		container.appendChild(resultDiv);
	} else {
		container.innerHTML = '<p>Waiting for players...</p>';
	}
}
