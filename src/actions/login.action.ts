import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
// import { redirect } from "astro:router";
// import { zfd } from "zod-form-data";

export const loginAction = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, password, remember_me }, { cookies }) => {
        console.log({ email, password, remember_me });

        if (remember_me) {
            cookies.set("email", email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
                path: "/",
            });
        } else {
            cookies.delete("email", {
                path: "/",
            });
        }

        try {
            const userCredentials = await signInWithEmailAndPassword(
                firebase.auth,
                email,
                password
            );
            const user = userCredentials.user;
            console.log(user);

            // if (user) {
            //     redirect("/");
            // }
        } catch (error) {
            console.error(error);
            const firebaseError = error as FirebaseError;

            if (firebaseError.code === "auth/invalid-credential") {
                throw new Error("Credenciales inválidas");
            } else if (firebaseError.code === "auth/invalid-email") {
                throw new Error("Email inválido");
            } else if (firebaseError.code === "auth/user-not-found") {
                throw new Error("Usuario no encontrado");
            } else if (firebaseError.code === "auth/wrong-password") {
                throw new Error("Contraseña incorrecta");
            } else {
                throw new Error("Error al iniciar sesión");
            }
        }

        return {
            success: true,
            message: "Login successful",
        };
    },
});
