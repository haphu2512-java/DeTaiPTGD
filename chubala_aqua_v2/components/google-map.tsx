"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "lucide-react"

export default function GoogleMapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    // Tạo một hàm để khởi tạo bản đồ
    const initMap = () => {
      if (!mapRef.current) return

      try {
        // Tọa độ cửa hàng (ví dụ cho TP.HCM)
        const storeLocation = { lat: 10.7769, lng: 106.6983 }

        // Tạo bản đồ
        const map = new google.maps.Map(mapRef.current, {
          center: storeLocation,
          zoom: 15,
          mapTypeControl: false,
          fullscreenControl: true,
          streetViewControl: false,
        })

        // Thêm marker cho vị trí cửa hàng
        const marker = new google.maps.Marker({
          position: storeLocation,
          map: map,
          title: "Cá Cảnh Chubala Aqua",
          animation: google.maps.Animation.DROP,
        })

        // Thêm info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">Cá Cảnh Chubala Aqua</h3>
              <p style="margin: 0;">123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
              <p style="margin: 5px 0 0;">Điện thoại: 0123.456.789</p>
            </div>
          `,
        })

        // Mở info window khi click vào marker
        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })

        // Mở info window mặc định
        infoWindow.open(map, marker)

        setIsLoading(false)
      } catch (error) {
        console.error("Error initializing map:", error)
        setMapError("Không thể tải bản đồ. Vui lòng thử lại sau.")
        setIsLoading(false)
      }
    }

    // Tải Google Maps API bằng iframe thay vì script
    const loadMapInIframe = () => {
      if (!mapRef.current) return

      const iframe = document.createElement("iframe")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.style.border = "none"
      iframe.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197667!2d106.69601731471184!3d10.776902992321536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d1bb3%3A0x42ecf2949d52533f!2zMTIzIMSQxrDhu51uZyBBQkMsIFBoxrDhu51uZyBYWVosIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1620123456789!5m2!1svi!2s"

      // Xóa tất cả các phần tử con hiện tại
      while (mapRef.current.firstChild) {
        mapRef.current.removeChild(mapRef.current.firstChild)
      }

      // Thêm iframe vào container
      mapRef.current.appendChild(iframe)
      setIsLoading(false)
    }

    // Sử dụng iframe thay vì JavaScript API
    loadMapInIframe()

    // Không cần cleanup vì iframe sẽ được xóa khi component unmount
  }, [])

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <div className="flex items-center">
            <Loader className="h-6 w-6 animate-spin mr-2" />
            <span>Đang tải bản đồ...</span>
          </div>
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-red-500 text-center p-4">
            <p>{mapError}</p>
            <button
              className="mt-2 px-4 py-2 bg-[#00335f] text-white rounded hover:bg-green-700"
              onClick={() => window.location.reload()}
            >
              Tải lại
            </button>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />

      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md z-10 text-sm">
        <div className="font-bold mb-1">Cá Cảnh Chubala Aqua</div>
        <div>123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</div>
        <div className="mt-1">
          <a
            href="https://goo.gl/maps/YourGoogleMapsLink"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#194f91] hover:underline"
          >
            Chỉ đường
          </a>
        </div>
      </div>
    </div>
  )
}
