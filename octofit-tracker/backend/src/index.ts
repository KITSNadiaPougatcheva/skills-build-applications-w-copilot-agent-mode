import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl, port, database: mongoUri });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const payload = req.body;
  const user = await User.create(payload);
  res.status(201).json({ message: 'User created', data: user });
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const payload = req.body;
  const team = await Team.create(payload);
  res.status(201).json({ message: 'Team created', data: team });
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find().populate('userId').lean();
  res.json(activities);
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const payload = req.body;
  const activity = await Activity.create(payload);
  res.status(201).json({ message: 'Activity logged', data: activity });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const payload = req.body;
  const workout = await Workout.create(payload);
  res.status(201).json({ message: 'Workout created', data: workout });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);

    app.listen(port, () => {
      console.log(`API listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

startServer();
