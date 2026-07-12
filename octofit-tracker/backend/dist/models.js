import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    city: { type: String, required: true },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    equipment: [{ type: String }],
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
