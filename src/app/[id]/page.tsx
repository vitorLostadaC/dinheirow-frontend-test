import { getCharacter } from '@/services/characters/charactersService'
import { getCharacterImagePath } from '@/utils/getCharacterImagePath/getCharacterImagePath'
import Image from 'next/image'
import { CharacterInfo } from './components/CharacterInfo'
import { CharacterInfoPropsSchema } from './components/CharacterInfo.schema'
import { data } from 'autoprefixer'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { HeroPropsSchema } from './page.schema'

export default async function Hero({ params }: HeroPropsSchema) {
  try {
    const getCharacterResponse = await getCharacter({ id: params.id })

    const character = getCharacterResponse.data.results[0]

    const description = character.description || 'descrição não informada'

    const characterInfos: CharacterInfoPropsSchema[] = [
      {
        title: 'Histórias',
        items: character.stories.items
      },
      {
        title: 'Quadrinhos',
        items: character.comics.items
      },
      {
        title: 'Séries',
        items: character.series.items
      },
      {
        title: 'Eventos',
        items: character.events.items
      }
    ]

    const thumbnailPath = `${character.thumbnail.path}.${character.thumbnail.extension}`

    const characterThumbnail = getCharacterImagePath({ thumbnailPath })

    return (
      <div>
        <Link
          href={'/'}
          className="mb-5 flex w-max items-center gap-2 rounded-lg bg-red-700 px-2 py-1 text-white"
        >
          <ArrowLeft size={18} /> Voltar
        </Link>
        <div className="flex flex-col items-center gap-10 text-center text-white lg:flex-row lg:items-start lg:justify-around lg:text-left ">
          <Image
            height={800}
            width={400}
            src={characterThumbnail}
            alt={character.name}
            className="h-96 w-72 bg-gray-950 object-cover lg:sticky lg:top-14"
          />
          <div className="flex max-w-3xl flex-col gap-3">
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="max-w-lg">{description}</p>

            <div className="flex flex-col gap-3">
              {characterInfos.map((characterInfo) => (
                <CharacterInfo
                  key={characterInfo.title}
                  items={characterInfo.items}
                  title={characterInfo.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <h1 className="mt-10 w-full text-center text-xl text-white">
        Nenhum Herói encontrado.
      </h1>
    )
  }
}
