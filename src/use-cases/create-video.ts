import { MultipartFile } from '@fastify/multipart'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

import { prisma } from '../lib/prisma'
import { AppError } from '../error/app-error'
import { Video } from '@prisma/client'

const pump = promisify(pipeline)

interface ICreateVideo {
  data: MultipartFile | undefined
}

export class CreateVideo {
  public async execute({ data }: ICreateVideo): Promise<Video> {
    if (!data) {
      throw new AppError('Missing file input')
    }
    const extension = path.extname(data.filename)
    if (extension !== '.mp3') {
      throw new AppError('Invalid input type, please upload a MP3')
    }
    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
    const uploadDestination = path.resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      fileUploadName,
    )
    await pump(data.file, fs.createWriteStream(uploadDestination))
    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    })
    return video
  }
}
