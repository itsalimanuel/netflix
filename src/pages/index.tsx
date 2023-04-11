import Image from "next/image";
import { Inter } from "next/font/google";
import TopView from "./components/topView";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./components/movieItem";
import FavItem from "./components/Favtem";
import { useSelector } from "react-redux";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=ad3a1564ccec2469eacf89680773b645"
  );
  let videosList = res.data;
  return { props: { videosList } };
}
export default function Home({ videosList }: any) {
  interface Video {
    // define the properties of a Video object
  }

  interface VideosResponse {
    results: Video[];
    // define other properties of the response object if any
  }

  const [videos, setVideos] = useState<VideosResponse | undefined>(undefined);
  useEffect(() => {
    setVideos(videosList);
  }, []);
  interface RootState {
    favoriteList: {
      // define the type of the favoriteList property
    };
  }
  const result = useSelector((state: RootState) => state?.favoriteList);

  const searchVideo = async (e: any) => {
    const query = e.target.value;
    console.log(e.target.value);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=ad3a1564ccec2469eacf89680773b645&query=${query}`
      );
      if(res && res.data) {
        setVideos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Netflix v2</title>
        <meta
          property="description"
          content="Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
          key="title"
        />
        <meta
          name="keywords"
          content="watch movies, movies online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv, instant streaming, watch online, movies, watch movies United Arab Emirates, watch TV online, no download, full length movies"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main className={`px-[24px] ${inter.className}`}>
        {/* Top show - best movie */}
        <TopView videos={videosList} />
        {/* ads */}
        <Link
          href="#"
          className="w-full mt-8 h-[44px] rounded-md flex justify-center items-center bg-[#1f1b2e] hover:bg-[#ec0f4a] relative"
        >
          30 days free subscription
        </Link>
        <div className="relative w-full mt-8">
          <input
            onChange={(e) => {
              searchVideo(e);
            }}
            type="text"
            className="text-white w-full bg-transparent px-3 py-1 border rounded-md focus-within:outline-none
        "
            placeholder="search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        {/* moveis list */}
        <div className="mt-8">
          <h2 className="text-[22px] font-bold">Top Movie:</h2>
          <div className="grid grid-cols-6 max-xl:grid-cols-6 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[475px]:grid-cols-1 gap-5 w-full">
            {videos && videos.results ? (
              videos.results.map((video: any) => (
                <MovieItem video={video} key={video.id} />
              ))
            ) : (
              <p>No videos found</p>
            )}
          </div>
        </div>
        {/* Favorite movies */}
        <div className="mt-8">
          <h2 className="text-[22px] font-bold">
            Favorite Movie: {result ? (result as string[]).length : ""}
          </h2>
          <div className="grid grid-cols-6 max-xl:grid-cols-6 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[475px]:grid-cols-1 gap-5 w-full">
            {(result as string[]).length > 0
              ? (result as any[]).map((item: any) => (
                  <FavItem key={item.id} video={item} />
                ))
              : ""}
          </div>
        </div>
      </main>
    </>
  );
}
