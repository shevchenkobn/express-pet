export declare function createApp(urlOrigin?: string): Promise<{
    app: import("express-serve-static-core").Express;
    openapi: import("openapi-framework").default;
}>;
