import placeholder from "@/assets/movie/placeholder.jpg";
import Image from "next/image";
import Link from "next/link";
export default function TopView({ videos }:any) {
  return (
    <>
      {videos
        ? videos.results.slice(1, 2).map((item: any) => (
            <Link
              key={item.id}
              href={`${item?.id}`}
              className="h-[350px] block relative w-full"
            >
              <Image
                fill
                src={
                  item?.poster_path
                    ? `https://image.tmdb.org/t/p/original${item?.poster_path}`
                    : placeholder
                }
                alt="placeholder"
                loading="lazy"
                className="object-cover rounded-md"
                sizes="cover"
              />
              <button
                className="
        rounded-md
      bg-gradient-to-r
    from-[#ec0f4a]
      hover:from-[#ea003d]
     via-[#ec0f4a]
     hover:via-pink-800
    to-[#ec0f4a]
      hover:to-[#ea003d]
      py-2 px-7 absolute bottom-8 left-8"
              >
                watch
              </button>
            </Link>
          ))
        : ""}
    </>
  );
}
