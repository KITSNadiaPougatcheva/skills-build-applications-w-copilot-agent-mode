import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
  city: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  description: string;
  members: Types.ObjectId[];
}

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  distanceKm: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  name: string;
  rank: number;
  score: number;
  streak: number;
}

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
  equipment: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
  city: { type: String, required: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  distanceKm: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  equipment: [{ type: String }],
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
