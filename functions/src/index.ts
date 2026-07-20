import { getApps, initializeApp } from 'firebase-admin/app'
import * as functions from 'firebase-functions'
import cors from 'cors'

if (!getApps().length) initializeApp()

const corsHandler = cors({ origin: true })

export const generateMealPlan = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).send('Method Not Allowed')
      return
    }

    try {
      response.status(200).json({ message: 'Function ready' })
    } catch {
      response.status(500).json({ error: 'Internal Error' })
    }
  })
})
