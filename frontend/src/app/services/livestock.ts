import { livestockData } from "../types/animalOverview";

// simulate delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const livestockService = {

  async getStats() {
    await delay(500)
    return livestockData.stats
  },

  async getConceptionRate() {
    await delay(500)
    return livestockData.conceptionRate
  },

  async getEvents() {
    await delay(500)
    return livestockData.events
  },

  async getAlerts() {
    await delay(500)
    return livestockData.alerts
  },

  async getPerformers() {
    await delay(500)
    return livestockData.performers
  },

  async getMetrics() {
    await delay(500)
    return {
      mortalityRate: livestockData.mortalityRate,
      feedConversion: livestockData.feedConversion
    }
  }

}