import fs from 'fs'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Employee from "../models/Employee.js";
import connectDB from '../config/db.js';

/**
 * The purpose of this file is to initialize the DB
 * Running it with npm run init will clear the 'employee' collection
 *   and fill it with data from data.json
 */

dotenv.config();
connectDB();

await Employee.deleteMany({});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const employees = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf8'));
await Employee.insertMany(employees.employees);

console.log('Database successfully initialized');
process.exit();
