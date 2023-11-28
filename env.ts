import { load } from "dotenv";
import { parse } from "zodenv";

await load({
  export: true,
});

export const [parsed, env] = parse((e) => ({
  PORT: e.port(),
}));
