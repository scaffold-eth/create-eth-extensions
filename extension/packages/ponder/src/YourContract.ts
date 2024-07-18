import { ponder } from "@/generated";

ponder.on("YourContract:GreetingChange", async ({ event, context }) => {
    const { Greeting } = context.db;

    // Create a new Greeting
    await Greeting.create({
        id: event.log.id,
        data: {
            text: event.args.newGreeting,
            setterId: event.args.greetingSetter,
            premium: event.args.premium,
            value: event.args.value,
            timestamp: Number(event.block.timestamp),
        },
    });
});
