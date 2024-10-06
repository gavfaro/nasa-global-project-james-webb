import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import Image from "next/image";

async function getData(id: string) {
  const data = await prisma.nASA.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      Constellation: true,

      image_url: true,
    },
  });

  return data;
}

export default async function ImagePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  console.log(data?.Constellation);

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-10 xl:gap-x-16">
      <div className="lg:row-end-1 lg:col-span-4">
        <div>
          <div className="aspect-w-4 aspect-h-4 rounded-lg bg-gray-100 overflow-hidden ">
            <Image
              src={data?.image_url as string}
              alt="Space image"
              fill
              className="object-cover max-w-60  max-h-60 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.Constellation}
        </h1>
        <div className="ml-auto">
          <div></div>
        </div>

        <p className="mt-2 text-muted-foreground">{data?.Constellation}</p>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <Button size="lg" className="w-full mt-10">
              Generate Summary
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-10"></div>
      </div>
    </section>
  );
}
