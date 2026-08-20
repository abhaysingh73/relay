import "dotenv/config";

import express from "express";
import eventRoutes from "./routes/events.js";
import endpointRoutes from "./routes/endpoints.js"
import webhookSubscriptionRoutes from "./routes/webhookSubscription.js";
import deliveryRoutes from "./routes/delivery.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/events", eventRoutes);
app.use("/endpoint", endpointRoutes);
app.use("/webhookSubscription", webhookSubscriptionRoutes);
app.use("/delivery", deliveryRoutes);

app.use((err, req, res, next) => {
    console.error('app error', err);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
    })
});

app.listen(port, () => {
    console.log(`Server listining to port ${port}`)
});