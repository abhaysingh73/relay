import "dotenv/config";
import { parseArgs } from "node:util";
import crypto from "node:crypto";

import { createTenant } from "../services/tenants.js";
import { createApiKey } from "../services/apiKeys.js";

const { values } = parseArgs({
    options: {
        name: {
            type: 'string'
        }
    }
});

const registerTenant = async () => {
    if (!values.name) {
        throw new Error("Tenant name is required.");
    }

    const tenant = await createTenant(values.name);

    const rawApiKey = `relay_${crypto.randomBytes(32).toString('hex')}`;
    const keyHash = crypto.createHash("sha256").update(rawApiKey).digest("hex");
    await createApiKey(tenant.id, keyHash);

    console.log(`------------- API KEY -------------\n${rawApiKey}\n------------- API KEY -------------`);
}

registerTenant().catch((error) => {
    console.error(error);
    process.exit(1);
});