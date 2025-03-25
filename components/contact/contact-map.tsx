"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use Google Maps, Mapbox, or another map provider
    if (mapRef.current) {
      const mapElement = mapRef.current
      mapElement.style.backgroundImage =
        "url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/18.0686,59.3293,12,0/800x600?access_token=pk.placeholder')"
      mapElement.style.backgroundSize = "cover"
      mapElement.style.backgroundPosition = "center"
    }
  }, [])

  return (
    <Card className="h-full overflow-hidden">
      <div ref={mapRef} className="w-full h-full min-h-[400px] bg-muted flex items-center justify-center">
        <div className="text-center p-6 bg-background/80 backdrop-blur-sm rounded-lg">
          <h3 className="text-xl font-bold mb-2">Barberhaus Stockholm</h3>
          <p>Storgatan 1, 111 23 Stockholm</p>
        </div>
      </div>
    </Card>
  )
}

