/// <reference path="https://cdn.jsdelivr.net/npm/nzjs/index.d.ts" />

import { Application, isHttpError } from "oak";
import { env } from "./env.ts";

const app = new Application();

app.use(async (ctx) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch (error) {
    if (isHttpError(error)) {
      await ctx.send({
        root: `${Deno.cwd()}/public`,
        path: "404.html",
      });
    } else {
      console.error(error);
      await ctx.send({
        root: `${Deno.cwd()}/public`,
        path: "500.html",
      });
    }
  }
});

console.log(`Listening on port ${env("PORT")}`);
await app.listen({ port: env("PORT") });
