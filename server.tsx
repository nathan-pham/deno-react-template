import { Oak, ReactDOMServer } from "./serverDeps.tsx";
import { React } from "./deps.ts";
import App from "./client/app.tsx";

import { publicMiddleware } from "./publicMiddleware.ts";

const app = new Oak.Application();
const router = new Oak.Router();

const port = 3000;

// build main.bundle.js
await Deno.run({
    cmd: [
        "deno",
        "bundle",
        "client/main.tsx",
        "--config",
        "deno.tsconfig.json",
        "client/public/main.bundle.js",
    ],
}).status();

// serve index.html
const clientHTML = await Deno.readTextFile("./client/index.html");
router.get("/", (ctx: Oak.Context) => {
    try {
        const body = ReactDOMServer.renderToString(<App />);
        ctx.response.headers.set("content-type", "text/html; charset=utf-8");
        ctx.response.body = clientHTML.replace("{{ body }}", body);
    } catch (e: unknown) {
        ctx.response.body = (e as Error).message;
    }
});

app.use(publicMiddleware("public"));
app.use(router.routes());
app.use(router.allowedMethods());

// start server
app.addEventListener("listen", () => {
    console.log(`🚀 http://localhost:${port}`);
});

await app.listen({ port });
