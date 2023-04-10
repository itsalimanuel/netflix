import placeholder from "@/assets/movie/placeholder.jpg";
import Image from "next/image";
import Link from "next/link";

export default function MovieItem({video}:any) {
 
  return (
    <div className="relative mt-8 block w-full h-[340px] rounded-sm hover:scale-105 group transition-all">
      <Link href={`${video?.id}`} className="w-full h-[290px] flex relative">
        <Image
          fill
          loading="lazy"
          className="object-cover"
          src={
            video?.poster_path
              ? `https://image.tmdb.org/t/p/original${video?.poster_path}`
              : placeholder
          }
          alt="item"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:z-20 opacity-0 group-hover:opacity-100 rounded-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out group-hover:opacity-80"></div>
        <div className="flex flex-col relative mt-auto z-0 opacity-0 group-hover:opacity-100 p-4 ">
          <span className="text-[12px]">{video?.original_title}</span>
          <span className="text-[12px]">Popularity:{video?.popularity}</span>
        </div>
      </Link>
      <div className="flex justify-between items-center px-4 mt-2">
        <span className="text-[12px] text-[#ec0f4a] font-bold">
          {video?.release_date}
        </span>
      </div>
    </div>
  );
}
