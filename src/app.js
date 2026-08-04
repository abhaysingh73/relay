import "dotenv/config";

import express from "express";
import eventRoutes from "./routes/events.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/events", eventRoutes);

app.listen(port, () => {
    console.log(`Server listining to port ${port}`)
});