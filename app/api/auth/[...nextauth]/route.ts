import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
    providers: [],
})

export { handler as GET, handler as POST }
