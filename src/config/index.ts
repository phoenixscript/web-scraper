import { config } from 'dotenv';

//Defining the path to the enviornmet file
const path = `.env.${process.env.NODE_ENV || 'development'}.local`
config({ path });

export const { NODE_ENV, PORT } = process.env;