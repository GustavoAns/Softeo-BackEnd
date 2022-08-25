import dotenv from 'dotenv'

dotenv.config()

const { env } = process

export default {
  api: {
    port: Number(env.API_PORT || env.PORT || 3001)
  },
  mongodb_connect_url: env.MONGO_URL || process.env.MONGO_URL || 'mongodb+srv://zer0:0XLi9EM8tX5vtCwi@cluster0.shnne.mongodb.net/escriBotDB?retryWrites=true&w=majority'
}