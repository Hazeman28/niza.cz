import { Application } from "oak";
import { env } from "./env.ts";

const app = new Application();

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    next();
  }
});

await app.listen({ port: env("PORT") });
