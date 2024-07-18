import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Greeting: p.createTable({
    id: p.string(),
    text: p.string(),
    setterId: p.hex(),
    premium: p.boolean(),
    value: p.bigint(),
    timestamp: p.int(),
  }),
}));
