import Image from "next/image"

export type ProfileProps = {
  src?: string | null
  name?: string | null 
}

export default function ProfileImg({src, name}: ProfileProps) {
  return (
    <div className="flex flex-row items-center space-x-2"> 
      <div className="relative h-10 w-10 overflow-hidden rounded-full " >
        {src == null ? null: <Image src={src} alt="Profile Image" quality={100} fill/>}
      </div>
      <p className="font-medium text-xl">{name}</p>
    </div>
  )
}