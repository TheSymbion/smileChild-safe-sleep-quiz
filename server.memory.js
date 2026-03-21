const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

// Create (or open) the database file
// This creates smileChild.db in your project folder
const db = new Database('smileChild.db');
const app = express();
app.use(cors());
app.use(express.json());

// Create sessions table if it doesn't exist yet
// This runs every time server starts — IF NOT EXISTS means
// it won't recreate it if it already exists
db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        status          TEXT    DEFAULT 'in_progress',
        correctAnswers  INTEGER DEFAULT 0,
        totalAttempts   INTEGER DEFAULT 0,
        timeSpentSec    INTEGER DEFAULT 0
    )
`);


// Temporary storage — like a Python list of dictionaries
// Later this will be a real database
// let sessions = [];

// ── ENDPOINT 1: POST /sessions ──────────────────────────
// Creates a new game session when a player starts a game
// POST means "create something new"

 app.post('/sessions', (req, res) => {
    const newSession = {
        id: sessions.length + 1,
        status: 'in_progress',
        correctAnswers: 0,
        totalAttempts: 0,
        timeSpentSec: 0
    };
    sessions.push(newSession);
    res.status(201).json(newSession);
});

// ── ENDPOINT 2: PUT /sessions/:id ───────────────────────
// Updates a session when the game finishes
// :id means "whatever number comes after /sessions/"
// PUT means "update something that exists"

app.put('/sessions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { correctAnswers, totalAttempts, timeSpentSec } = req.body;
    // Guard 1: Check required fields exist
if (typeof correctAnswers !== 'number' || typeof totalAttempts !== 'number') {
    return res.status(400).json({ error: 'correctAnswers and totalAttempts are required numbers' });
}

// Guard 2: Check the data makes logical sense
if (correctAnswers > totalAttempts) {
    return res.status(400).json({ error: 'correctAnswers cannot exceed totalAttempts' });
}

    // Find the session with this id — like Python's list comprehension
    const session = sessions.find(s => s.id === id);

    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }

    // Update it
    session.correctAnswers = correctAnswers;
    session.totalAttempts = totalAttempts;
    session.timeSpentSec = timeSpentSec;
    session.status = 'completed';

    res.json(session);
});

// ── ENDPOINT 3: GET /stats ───────────────────────────────
// Returns aggregated stats across all completed sessions
// GET means "give me data"

app.get('/stats', (req, res) => {
    const completed = sessions.filter(s => s.status === 'completed');

    const totalGames = completed.length;
    const totalCorrectAnswers = completed.reduce((sum, s) => sum + s.correctAnswers, 0);
    const totalAttempts = completed.reduce((sum, s) => sum + s.totalAttempts, 0);
    const averageScore = totalAttempts === 0 ? 0 : Math.round(totalCorrectAnswers / totalAttempts * 100);

    res.json({
        totalGames,
        totalCorrectAnswers,
        totalAttempts,
        averageScore
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});