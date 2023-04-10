import placeholder from "@/assets/movie/placeholder.jpg";
import Image from "next/image";
import Link from "next/link";
import {addToFav} from '@/store/action'
import { useDispatch } from "react-redux";

export default function MovieItem({video}:any) {
  const dispatch = useDispatch()
  const addToFavorite = (id:any) => {
    dispatch(addToFav())
  }
  function handleClick() {
    console.log("increment like count");
  }
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
        <div className="link" onClick={() => dispatch(addToFav(video))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:stroke-[#ec0f4a]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
