import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


// const url = 'https://powerpay-africa-backend.onrender.com' //  process.env.NEXT_PUBLIC_BACKEND_URL

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
            email: { label: "Email", type: "email", placeholder: "Enter Email" },
            password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const { phone_number, password } = credentials
                const res = await fetch(`${url}/users/login`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        phone_number,
                        password
                    })
                })
                let user;
                if (res.ok) {
                    user = await res.json()
                }else{
                    user = null
                }
                return user
            }
        })
    ],

    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {

            user && (token.user = user);
            return Promise.resolve(token)
        },

        async session({ session, token, user }) {
          session.user = token.user.user
          
          return session
        }
      },

    pages: {
        signIn: "/account/login",
        // error: '/account/login',
    }
}

export default NextAuth(authOptions)

