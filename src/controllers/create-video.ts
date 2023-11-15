import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createTranscriptionBodyValidation,
  createTranscriptionParamsValidation,
} from '../validations/create-transcription-validation'

import { CreateVideo } from '../use-cases/create-video'
import { CreateVideoTranscription } from '../use-cases/create-video-transcription'

export class CreateVideoController {
  public async store(request: FastifyRequest, reply: FastifyReply) {
    const data = await request.file()
    const createVideo = new CreateVideo()
    const video = await createVideo.execute({ data })

    reply.status(201).send({ video })
  }

  public async update(request: FastifyRequest, reply: FastifyReply) {
    const { video_id } = createTranscriptionParamsValidation.parse(
      request.params,
    )
    const { prompt } = createTranscriptionBodyValidation.parse(request.body)
    const createVideoTranscription = new CreateVideoTranscription()
    const video = await createVideoTranscription.execute({ video_id, prompt })

    reply.status(201).send({ video })
  }
}
