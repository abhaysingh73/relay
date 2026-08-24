import { fetchDeliveries, fetchDeliveryHistory } from "../services/deliveries.js";

export const getDeliveries = async (req, res) => {
    const deliveries = await fetchDeliveries();
    return res.status(200)
        .json({
            deliveries
        });
}

export const getDeliveryHistory = async (req, res) => {
    const deliveryHistory = await fetchDeliveryHistory(parseInt(req.params.id));
    return res.status(200)
        .json({
            deliveryHistory
        })
}