import express, { Application, Request, Response } from "express";

import { IndexRoutes } from "./app/route";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/v1', IndexRoutes)



export default app;