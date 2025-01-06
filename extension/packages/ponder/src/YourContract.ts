import { ponder } from "ponder:registry";
import { greeting } from "ponder:schema";

ponder.on("YourContract:GreetingChange", async ({ event, context }) => {
    // Create a new Greeting
    await context.db.insert(greeting).values({
        id: event.log.id,
        text: event.args.newGreeting,
        setterId: event.args.greetingSetter,
        premium: event.args.premium,
        value: event.args.value,
        timestamp: Number(event.block.timestamp),
    });
});
