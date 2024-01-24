import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login'
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      authorize (credentials: any) {
        return null
      }
    })
  ]
})