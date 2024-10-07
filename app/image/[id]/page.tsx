import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/app/lib/db";

// Assume getData function is imported or defined here

async function getData(id: string) {
  const data = await prisma.nASA.findUnique({
    where: { id: id },
    select: {
      id: true,
      Constellation: true,
      image_url: true,
      image_caption: true,
      object_name: true,
      object_description: true,
      r_a_position: true,
      dec_position: true,
      distance_light: true,
      Instrument: true,
      dimension_arcminutes: true,
      lore: true,
    },
  });

  return data;
}

const ImagePage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 lg:p-8 relative overflow-hidden">
      {/* Star-like background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(white,_rgba(255,255,255,.2)_2px,_transparent_40px)] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Image Card */}
        <Card className="bg-gray-800 border-blue-500 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <Image
                src={data?.image_url || "/placeholder.png"}
                alt={data?.Constellation || "Space image"}
                layout="fill"
                objectFit="cover"
                className="transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-blue-300 text-center">
                Image credit: NASA
              </p>
              {data?.image_caption && (
                <p className="mt-2 text-sm text-blue-300 italic text-center">
                  {data.image_caption}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gray-800 border-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-300">
              {data?.Constellation}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {data?.object_description || "Description not available."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <audio
              controls
              loop
              src={`/sounds/music${params.id}.mp3`}
              className="w-full mb-4 bg-gray-700"
            >
              Your browser does not support the audio element.
            </audio>

            <Separator className="my-4 bg-blue-500" />

            <h3 className="text-lg font-semibold mb-2 text-blue-300">
              Mission Details
            </h3>
            <ScrollArea className="h-48">
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-blue-300">Object Name:</strong>{" "}
                  {data?.object_name || "N/A"}
                </li>
                <li>
                  <strong className="text-blue-300">Right Ascension:</strong>{" "}
                  {data?.r_a_position || "N/A"}
                </li>
                <li>
                  <strong className="text-blue-300">Declination:</strong>{" "}
                  {data?.dec_position || "N/A"}
                </li>
                <li>
                  <strong className="text-blue-300">
                    Distance in light years:
                  </strong>{" "}
                  {data?.distance_light || "N/A"} light-years
                </li>
                <li>
                  <strong className="text-blue-300">
                    Distance in arcminutes:
                  </strong>{" "}
                  {data?.dimension_arcminutes || "N/A"} arcminutes
                </li>
                <li>
                  <strong className="text-blue-300">Instrument:</strong>{" "}
                  {data?.Instrument || "N/A"}
                </li>
              </ul>
            </ScrollArea>

            <Separator className="my-4 bg-blue-500" />

            <h3 className="text-lg font-semibold mb-2 text-blue-300">
              Space Lore
            </h3>
            <ScrollArea className="h-48">
              <p className="text-gray-300">
                {data?.lore || "Lore not available."}
              </p>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImagePage;
