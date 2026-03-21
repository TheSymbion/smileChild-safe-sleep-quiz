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
    // Insert a new row — SQLite auto-assigns the id
    const result = db.prepare(`
        INSERT INTO sessions (status) VALUES ('in_progress')
    `).run();

    // result.lastInsertRowid is the id SQLite just assigned
    const newSession = db.prepare(`
        SELECT * FROM sessions WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(newSession);
});

// ── ENDPOINT 2: PUT /sessions/:id ───────────────────────
// Updates a session when the game finishes
// :id means "whatever number comes after /sessions/"
// PUT means "update something that exists"

app.put('/sessions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { correctAnswers, totalAttempts, timeSpentSec } = req.body;

    if (typeof correctAnswers !== 'number' || typeof totalAttempts !== 'number') {
        return res.status(400).json({ error: 'correctAnswers and totalAttempts are required numbers' });
    }
    if (correctAnswers > totalAttempts) {
        return res.status(400).json({ error: 'correctAnswers cannot exceed totalAttempts' });
    }

    const session = db.prepare(`
        SELECT * FROM sessions WHERE id = ?
    `).get(id);

    if (!session) {
        return res.scdtatus(404).json({ error: 'Session not found' });
    }

    db.prepare(`
        UPDATE sessions
        SET correctAnswers = ?,
            totalAttempts  = ?,
            timeSpentSec   = ?,
            status         = 'completed'
        WHERE id = ?
    `).run(correctAnswers, totalAttempts, timeSpentSec, id);

    const updated = db.prepare(`
        SELECT * FROM sessions WHERE id = ?
    `).get(id);

    res.json(updated);
});
    

// ── ENDPOINT 3: GET /stats ───────────────────────────────
// Returns aggregated stats across all completed sessions
// GET means "give me data"

app.get('/stats', (req, res) => {
    const stats = db.prepare(`
        SELECT
            COUNT(*)                                         AS totalGames,
            COALESCE(SUM(correctAnswers), 0)                AS totalCorrectAnswers,
            COALESCE(SUM(totalAttempts),  0)                AS totalAttempts,
            ROUND(
                AVG(
                    CAST(correctAnswers AS REAL)
                    / totalAttempts * 100
                ), 0
            )                                               AS averageScore
        FROM sessions
        WHERE status = 'completed'
    `).get();

    res.json({
        totalGames:          stats.totalGames,
        totalCorrectAnswers: stats.totalCorrectAnswers,
        totalAttempts:       stats.totalAttempts,
        averageScore:        stats.averageScore ?? 0
    });
});

app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000');
});