import { fetchDeliveries } from "../services/deliveries.js";

export const getDeliveries = async (req, res) => {
    const deliveries = await fetchDeliveries();
    return res.status(200)
        .json({
            deliveries
        });
}