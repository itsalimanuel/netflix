import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import placeholder from '@/assets/movie/placeholder.jpg'
import Image from "next/image";

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of movie IDs from the API
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=ad3a1564ccec2469eacf89680773b645"
  );
  const movies = response.data;

  // Generate the paths for each movie ID
  const paths = movies.results.map((movie: any) => ({
    params: { id: String(movie.id) },
  }));

  return { paths, fallback: true };
};
interface Params extends ParsedUrlQuery {
  id: string;
}
interface MovieProps {
  data: {
    // type definition for movieData
  };
}

export const getStaticProps: GetStaticProps<
  MovieProps,
  ParsedUrlQuery
> = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=ad3a1564ccec2469eacf89680773b645`
  );
  const movieData = response.data;

  return { props: { data: movieData } };
};

export default function Video({ data }: any) {
  const [vid, setVid] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${data?.id}/videos?api_key=ad3a1564ccec2469eacf89680773b645`
      )
      .then((res) => {
        console.log(res.data.results[0]);
        setVid(res.data.results[0].key);
      });
  }, []);
  return (
    <div className="w-full h-full px-8">
      <Head>
        <title>Netflix v2 - {data?.original_title}</title>
        <meta property="description" content={data?.overview} key="title" />
        <meta
          name="keywords"
          content="watch movies, movies online, watch TV, TV online, TV shows online, watch TV shows, stream movies, stream tv, instant streaming, watch online, movies, watch movies United Arab Emirates, watch TV online, no download, full length movies"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-full h-[500px] max-[475px]:h-[320px]">
        {vid ? (
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            fallback={<Image src={placeholder} fill alt='placeholder'/>}
            url={
              vid && vid
                ? `https://www.youtube.com/embed/${vid}?rel=0`
                : ""
            }
            playing
          />
        ) : (
          ""
        )}
        <div className=" absolute bottom-6 left-6 px-3 py-2 bg-orange-500 rounded-md cursor-pointer">
          vote: <span>{data?.vote_average}</span>
        </div>
      </div>
      <div className="flex items-center flex-col mt-4">
        <h1 className="font-bold text-lg text-center">
          {data?.original_title}
        </h1>
        <p className="text-md w-[80%]  max-[475px]:w-[100%] mt-4">
          {data?.overview}
        </p>
      </div>
    </div>
  );
}
