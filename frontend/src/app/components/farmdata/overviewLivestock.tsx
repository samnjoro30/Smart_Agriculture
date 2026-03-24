"use client"

import { useEffect, useState } from "react"
import { livestockService } from "../../services/livestock";

export default function LivestockOverview() {

  const [stats, setStats] = useState<any>(null)
  const [alerts, setAlerts] = useState<string[]>([])
  const [events, setEvents] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchData = async () => {
      try {

        const [statsData, alertsData, eventsData] = await Promise.all([
          livestockService.getStats(),
          livestockService.getAlerts(),
          livestockService.getEvents()
        ])

        setStats(statsData)
        setAlerts(alertsData)
        setEvents(eventsData)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }, [])


  if (loading) {
    return <p className="text-gray-500">Loading livestock data...</p>
  }

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Animals" value={stats.total} />
        <Card title="Pregnant" value={stats.pregnant} />
        <Card title="Sick" value={stats.sick} />
        <Card title="Recently Added" value={stats.recent} />
      </div>

      {/* Alerts + Events */}
      <div className="grid md:grid-cols-2 gap-4">

        <Box title="Heat Alerts">
          {alerts.map((a, i) => (
            <p key={i}>⚠️ {a}</p>
          ))}
        </Box>

        <Box title="Upcoming Events">
          {events.map((e, i) => (
            <p key={i}>📅 {e}</p>
          ))}
        </Box>

      </div>

    </div>
  )
}


/* Reusable */
function Card({ title, value }: any) {
  return (
    <div className="bg-green-50 p-4 rounded-xl text-center">
      <p className="text-2xl font-bold text-green-600">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function Box({ title, children }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="text-green-700 font-semibold mb-2">{title}</h3>
      {children}
    </div>
  )
}