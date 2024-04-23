import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"

console.log("clientId", process.env.GOOGLE_CLIENT_ID)
console.log("clientSecret", process.env.GOOGLE_CLIENT_SECRET)

export default NextAuth({
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      // ...add more providers here
    ],
  })