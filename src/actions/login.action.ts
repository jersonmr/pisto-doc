import { defineAction } from "astro:actions";
import { z } from "astro:schema";
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

        return {
            success: true,
            message: "Login successful",
        };
    },
});
