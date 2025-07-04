import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const publicRoutes = ["/login", "/"];

export const onRequest = defineMiddleware((context, next) => {
    const { url } = context;
    const isPublicRoute = publicRoutes.includes(url.pathname);

    const authHeader = context.request.headers.get("Authorization") || "";

    if (!isPublicRoute) {
        return checkLocalAuth(authHeader, next);
    }

    return next();
});

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
    if (!authHeaders.startsWith("Basic ")) {
        return createUnauthorizedResponse();
    }

    const auth = Buffer.from(authHeaders.split(" ")[1], "base64").toString();
    const [username, password] = auth.split(":");

    if (username === "pisto" && password === "Passw0rd#") {
        return next();
    }

    return createUnauthorizedResponse();
};

const createUnauthorizedResponse = () => {
    return new Response("Unauthorized", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic real="Secure Area"',
        },
    });
};
