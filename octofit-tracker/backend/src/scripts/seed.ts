import { connectToDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const createdUsers = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava.chen@example.com',
        role: 'captain',
        fitnessGoal: 'Marathon training',
        city: 'Seattle',
      },
      {
        name: 'Noah Patel',
        email: 'noah.patel@example.com',
        role: 'member',
        fitnessGoal: 'Strength building',
        city: 'Austin',
      },
      {
        name: 'Maya Ortiz',
        email: 'maya.ortiz@example.com',
        role: 'member',
        fitnessGoal: 'Cycling endurance',
        city: 'Denver',
      },
    ]);

    const createdTeams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        sport: 'Running',
        description: 'Weekend trail runners building endurance together.',
        members: [createdUsers[0]._id, createdUsers[1]._id],
      },
      {
        name: 'Peak Performers',
        sport: 'Cross-training',
        description: 'A balanced team focused on strength and mobility.',
        members: [createdUsers[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: createdUsers[0]._id,
        type: 'run',
        duration: 35,
        calories: 320,
        distanceKm: 5.8,
        date: new Date('2026-07-10T06:30:00.000Z'),
      },
      {
        userId: createdUsers[1]._id,
        type: 'strength',
        duration: 45,
        calories: 410,
        distanceKm: 0,
        date: new Date('2026-07-11T18:00:00.000Z'),
      },
      {
        userId: createdUsers[2]._id,
        type: 'cycle',
        duration: 60,
        calories: 540,
        distanceKm: 24,
        date: new Date('2026-07-09T07:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: createdUsers[0]._id,
        name: createdUsers[0].name,
        rank: 1,
        score: 980,
        streak: 12,
      },
      {
        userId: createdUsers[1]._id,
        name: createdUsers[1].name,
        rank: 2,
        score: 915,
        streak: 8,
      },
      {
        userId: createdUsers[2]._id,
        name: createdUsers[2].name,
        rank: 3,
        score: 892,
        streak: 6,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility',
        difficulty: 'easy',
        durationMinutes: 20,
        focus: 'mobility',
        equipment: ['mat'],
      },
      {
        title: 'Interval Cardio',
        difficulty: 'moderate',
        durationMinutes: 30,
        focus: 'cardio',
        equipment: ['timer', 'running shoes'],
      },
      {
        title: 'Power Circuit',
        difficulty: 'hard',
        durationMinutes: 40,
        focus: 'strength',
        equipment: ['dumbbells', 'bench'],
      },
    ]);

    console.log('Database seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
