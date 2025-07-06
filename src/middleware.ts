import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const publicRoutes = ["/login", "/", "/_actions/"];

export const onRequest = defineMiddleware((context, next) => {
    const { url, locals, redirect } = context;
    if (url.pathname.startsWith("/_actions/")) {
        return next();
    }

    const isPublicRoute = publicRoutes.includes(url.pathname);

    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;

    // if (!isLoggedIn && url.pathname === "/") {
    //     return redirect("/login");
    // }

    locals.isLoggedIn = isLoggedIn;
    locals.user = user;

    if (!isPublicRoute && !isLoggedIn) {
        return redirect("/login");
    }

    if (isPublicRoute && isLoggedIn) {
        return redirect("/version");
    }

    return next();
});
