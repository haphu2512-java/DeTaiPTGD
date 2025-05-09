import Image from "next/image"

export default function Banner() {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
      <Image
        src="/img/banner.jpg"
        alt="Thức ăn cá cảnh banner"
        width={1200}
        height={400}
        className="w-full h-full object-cover"
      />

    </div>
  )
}
