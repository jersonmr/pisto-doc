import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebase } from "@/firebase/config";

export const loginGoogleAction = defineAction({
    accept: "json",
    input: z.any(),
    handler: async (credentials) => {
        console.log(credentials);
        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if (!credential) {
            throw new Error("No se pudo obtener las credenciales desde Google");
        }

        await signInWithCredential(firebase.auth, credential);

        return {
            ok: true,
        }
    },
});
