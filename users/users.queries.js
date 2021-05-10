import client from '../client'
export default {
  Query: {
    seeProfile: (_, { userName }) =>
      // fineUniquew는 @unique나 @id만 찾음
      client.user.findUnique({ where: { userName } }),
  },
}
