import { Oak } from "./serverDeps.tsx";

export const publicMiddleware =
    // deno-lint-ignore ban-types
    (exposedPath: string) => async (ctx: Oak.Context, next: Function) => {
        const rootPath = `${Deno.cwd()}/client/${exposedPath}`;
        const path = `${rootPath}${ctx.request.url.pathname}`;

        if (await fileExists(path)) {
            await Oak.send(ctx, ctx.request.url.pathname, {
                root: rootPath,
            });
        } else {
            await next();
        }
    };

const fileExists = async (path: string): Promise<boolean> => {
    try {
        const stats = await Deno.lstat(path);
        return stats && stats.isFile;
    } catch (e) {
        if (e && e instanceof Deno.errors.NotFound) {
            return false;
        }

        throw e;
    }
};
