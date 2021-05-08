import client from '../client'
import bcrypt from 'bcrypt'

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
    ) => {
      // check if username or email are already on DB
      const existingUser = await client.user.findFirst({
        where: { OR: [{ userName }, { email }] },
      })

      if (!existingUser) {
        // hash password
        const hashPassword = await bcrypt.hash(password, 10)

        // save and return user
        return client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: hashPassword,
          },
        })
      }
      return
    },
  },
}
