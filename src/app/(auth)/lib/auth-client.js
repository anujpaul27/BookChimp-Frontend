import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: `https://bookchimp-frontend.onrender.com/`,

    plugins: [
        adminClient() //  Critical for client-side admin actions
    ]
})

export const { signIn, signUp, useSession } = createAuthClient()