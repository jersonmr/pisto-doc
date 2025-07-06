import { defineAction } from "astro:actions";
import { signOut } from "firebase/auth";
import { firebase } from "@/firebase/config";

export const logoutAction = defineAction({
    accept: "json",
    handler: async (_, { cookies }) => {
        cookies.delete("email", {
            path: "/",
        });

        return await signOut(firebase.auth);
    },
});
