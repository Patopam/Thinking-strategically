const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = {
	players: [],
};

app.get('/users', (request, response) => {
	response.send(db);
});

app.post('/user', (request, response) => {
	const { body } = request;
	if (db.players.length < 2) {
		db.players.push(body);
		response.status(201).send(body);
	} else {
		response.status(400).send({ message: 'Game already has two players' });
	}
});

app.get('/result', (request, response) => {
	if (db.players.length === 2) {
		const [player1, player2] = db.players;
		const winner = determineWinner(player1.move, player2.move);
		response.send({ player1, player2, winner });
	} else {
		response.status(400).send({ message: 'Waiting for two players' });
	}
});

app.post('/reset', (request, response) => {
	db.players = [];
	response.status(200).send({ message: 'Game reset successfully' });
});

function determineWinner(move1, move2) {
	if (move1 === move2) {
		return 'Draw';
	}
	if (
		(move1 === 'rock' && move2 === 'scissors') ||
		(move1 === 'scissors' && move2 === 'paper') ||
		(move1 === 'paper' && move2 === 'rock')
	) {
		return 'Player 1 wins';
	} else {
		return 'Player 2 wins';
	}
}

app.listen(5050, () => {
	console.log(`Server is running on http://localhost:${5050}`);
});
