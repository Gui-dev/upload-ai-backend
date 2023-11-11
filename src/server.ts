import { fastify } from 'fastify'

const app = fastify()
const PORT = 3333 || process.env.PORT

app.get('/', () => {
  return 'Hello World'
})

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server Running http://localhost:${PORT}`)
  })
  .catch((error) => {
    console.log('ERROR: ', error)
  })
