/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
import type { User } from "firebase/auth";

declare global {
    namespace App {
        interface Locals {
            isLoggedIn: boolean;
            user: User | null;
        }
    }
}

export { };
