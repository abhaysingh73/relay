import "dotenv/config";
import { parseArgs } from "node:util";

import { createTenant } from "../services/tenants.js";
import { createApiKey } from "../services/apiKeys.js";
import { generateKey, hash } from "../utils/crypto.js";

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

    const rawApiKey = generateKey("apiKey");
    const keyHash = hash(rawApiKey);
    await createApiKey(tenant.id, keyHash);

    console.log(`------------- API KEY -------------\n${rawApiKey}\n------------- API KEY -------------`);
}

registerTenant().catch((error) => {
    console.error(error);
    process.exit(1);
});