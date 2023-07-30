import { CharacterSchema } from '@/services/characters/charactersService.schema'
import Image from 'next/image'
import Link from 'next/link'
import defaultPathImage from '@/assets/defaultCharacterImage.jpg'

interface CharacterCardPropsSchema {
  character: CharacterSchema
}

export const CharacterCard = ({ character }: CharacterCardPropsSchema) => {
  const thumbnailPath = `${character.thumbnail.path}.${character.thumbnail.extension}`

  const imageNotFound = thumbnailPath.match(/\bimage_not_available\b/g)

  const characterThumbnail = imageNotFound ? defaultPathImage : thumbnailPath

  return (
    <Link
      href={`/${character.id}`}
      key={character.id}
      className="group relative overflow-hidden rounded-md after:absolute after:inset-0  after:top-1/2 after:bg-gradient-to-b after:from-[transparent] after:to-black after:transition-all after:duration-300 after:hover:top-0"
    >
      <Image
        height={800}
        width={400}
        src={characterThumbnail}
        alt={character.name}
        className="aspect-square h-64 w-auto bg-gray-950 object-cover transition-all duration-300 group-hover:scale-125"
      />
      <h3 className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 font-semibold text-white transition-[bottom] duration-300 group-hover:bottom-1/2">
        {character.name}
      </h3>
    </Link>
  )
}
