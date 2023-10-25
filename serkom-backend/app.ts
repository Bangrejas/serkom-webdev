import express from "express"
import { Request, Response, NextFunction } from "express"
import cors from "cors"
import { PrismaClient, pendaftaran as Pendaftaran } from "./prisma/client/index.js"
import * as dotenv from "dotenv"
import { PrismaClientKnownRequestError } from "./prisma/client/runtime/library.js"


// Ambil konfigurasi dari file `.env`
dotenv.config()

// Inisiasi client Prisma (untuk ORM)
const prismaClient = new PrismaClient()

// Inisiasi express backend
const app = express()

// Middleware agar express secara otomatis mengubah body request menjadi JSON
app.use(express.json())

// Inisiasi middleware CORS
app.use(cors())


// Middleware untuk error handling secara asynchronous
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack)
  res.status(500).send(`A server error has occured: ${err.message}`)
})


// Route untuk halaman utama
app.get("/", (_, res: Response): void => {
  res.send("Nothing to see here! Go to /api/<table_name> instead.")
})


// Route untuk mengambil semua data dari tabel pendaftaran
app.get("/api/pendaftaran", (req: Request, res: Response) => {
  // Jalankan query SELECT
  prismaClient.pendaftaran.findMany()

    // Jika berhasil
    .then((data) => {
      res.send(data)
    })

    // Jika gagal
    .catch((err: PrismaClientKnownRequestError) => {
      switch (err.code) {
        case "P2002":
          res.status(400).send(`A bad request has occured: ${err.message}`)
          console.log(`A bad request has occured: ${err.message}`)
          break
        default:
          res.status(500).send(`A server error has occured: ${err.message}`)
          console.log(`A server error has occured: ${err.message}`)
      }
    })
})


// Route untuk mengambil saty data dari tabel pendaftaran berdasarkan ID
app.get("/api/pendaftaran/:id", (req: Request, res: Response) => {

  // Ambil ID pendaftaran dari URL
  const { id: idPendaftaran } = req.params

  // Jalankan query SELECT
  prismaClient.pendaftaran.findFirst({ where: { id: parseInt(idPendaftaran) } })

    // Jika berhasil
    .then((data) => {
      res.send(data)
    })

    // Jika gagal
    .catch((err: Error) => {
      res.status(500).send(`A server error has occured: ${err.message}`)
      console.log(`A server error has occured: ${err.message}`)
    })
})


// Route untuk membuat data baru di tabel pendaftaran
app.post("/api/pendaftaran", (req: Request, res: Response) => {

    // Ambil data dari body request
    const { name, email, phone, semester, ipk, scholarship, document }: Pendaftaran = req.body

    // Jalankan query INSERT
    prismaClient.pendaftaran.create({
      data: {
        name,
        email,
        phone,
        semester,
        ipk,
        scholarship,
        document
      }
    })

      // Jika berhasil
      .then((data) => {
        res.send({
          message: "A new `Pendaftaran` record has been created successfully!",
          data
        })
      })

      // Jika gagal
      .catch((err: Error) => {
        res.status(500).send(`A server error has occured: ${err.message}`)
        console.log(`A server error has occured: ${err.message}`)
      })
})


// Route untuk mengubah data di tabel pendaftaran berdasarkan ID
app.patch("/api/pendaftaran/:id", (req: Request, res: Response) => {

  // Ambil ID pendaftaran dari URL
  const id = parseInt(req.params.id)

  // Ambil data dari body request
  const { name, email, phone, semester, ipk, scholarship, document }: Pendaftaran = req.body

  // Jalankan query UPDATE
  prismaClient.pendaftaran.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      semester,
      ipk,
      scholarship,
      document
    }
  })

    // Jika berhasil
    .then((data) => {
      res.send({
        message: `Pendaftaran record with ID ${id} has been updated successfully!`,
        data
      })
    })

    // Jika gagal
    .catch((err: Error) => {
      res.status(500).send(`A server error has occured: ${err.message}`)
      console.log(`A server error has occured: ${err.message}`)
    })
})


// Route untuk menghapus data di tabel pendaftaran berdasarkan ID
app.delete("/api/pendaftaran/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  prismaClient.pendaftaran.delete({
    where: { id }
  })
    .then((data) => {
      res.send({
        message: `Pendaftaran record with ID ${id} has been deleted successfully!`,
        data
      })
    })
    .catch((err: Error) => {
      res.status(500).send(`A server error has occured: ${err.message}`)
      console.log(`A server error has occured: ${err.message}`)
    })
})


// Ambil konfigurasi port dan host dari file `.env`
const port = parseInt(process.env.BACKEND_PORT ?? "") || 8080
const host = process.env.BACKEND_HOST || "localhost"

// Jalankan server (simpan ini di akhir file)
app.listen(port, host, 0, () => {
  const url = `http://${host}:${port}`
  console.log(`Backend server is now online!`)
  console.log(``)
  console.log(`Available endpoint(s):`)
  console.log(`- ${url}/api/pendaftaran`)
  console.log(``)
  console.log(`Press CTRL+C to stop the server.`)
})
