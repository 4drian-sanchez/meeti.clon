import { DynamicMeetiLocation } from "@/src/features/meetis/components/DynamicMeetiLocation";
import { meetiService } from "@/src/features/meetis/services/meetiService";
import Heading from "@/src/shared/components/typography/Heading";
import { displayDate } from "@/src/shared/utils/date";
import generatePageTitle from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import OrganizerCard from "@/src/features/meetis/components/OrganizerCard";


export async function generateMetadata(props: PageProps<'/meeti/[id]'>): Promise<Metadata> {
  const { id } = await props.params
  const { title, image } = await meetiService.getMeetiById(id)

  return {
    title: `Meeti: ${generatePageTitle(title)}`,
    openGraph: {
      title: `Meeti ${title}`,
      siteName: 'Meeti',
      images: [
        {
          url: image,
          width: 1000,
          height: 600,
          alt: `Imagen del meeti ${title}`
        }
      ],
      locale: 'es_ES',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Meeti: ${title}`,
      description: 'Únete a nuestro meeti',
      images: [image]
    }

  }
}


export default async function MeetiPage(props: PageProps<'/meeti/[id]'>) {

  const { id } = await props.params
  const meeti = await meetiService.getMeetiWithDetails(id)
  if (!meeti.data) throw new Error('Meeti no encontrado')

  const { data: { title, image, details, virtual: isVirtual, date, time, location, category, community, admin } } = meeti

  return (
    <>
      <nav className="py-5 border-b border-gray-200 px-5 lg:px-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-3  items-start lg:flex-row lg:justify-between lg:gap-0">
          <p className=" text-gray-600">Categoría: {''}
            <Link
              href={`/categories/${category.id}`}
            >{category.name}</Link>
          </p>
          <p className=" text-gray-600">Comunidad: {''}
            <Link
              href={`/communities/${community.id}`}
            >{community.name}</Link>
          </p>
        </div>
      </nav>

      <Heading className="text-center mt-10">{title}</Heading>

      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 p-5 lg:px-0 mt-10">
        <section className="lg:col-span-2">
          <Image
            alt={`Imagen del meeti ${title}`}
            src={image}
            width={600}
            height={900}
            priority
          />
          <p className="mt-5 text-lg break-all">{details}</p>
        </section>

        <aside className="bg-slate-100 rounded-2xl">
          {isVirtual && (
            <p className="bg-orange-500 py-3 w-full text-white text-center text-lg rounded-lg font-bold">Este Meeti es virtual</p>
          )}
          {
            !isVirtual && location && (
              <DynamicMeetiLocation
                address={location.address}
                lat={location.lat}
                lng={location.lng}
                placeName={location.placeName}
              />
            )
          }

          <section className="space-y-5 p-10 ">
            <Heading level={2}>Información del Meeti</Heading>
            <p>
              <span className="font-bold"> Fecha: {''}
              </span>
              {displayDate(date)}
            </p>

            <p>
              <span className="font-bold"> Hora: {''}
              </span>
              {time}
            </p>
            <OrganizerCard user={admin} />
          </section>

        </aside>
      </main>
    </>
  );
}