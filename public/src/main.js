import { bootstrap } from "https://cdn.jsdelivr.net/npm/nzjs/lib/core/bootstrap.js";
import * as components from "./components/export.js";
import * as layouts from "./layouts/export.js";
import * as pages from "./pages/export.js";

await bootstrap(Object.values({ ...components, ...layouts, ...pages }));
