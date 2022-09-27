import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genres } from '../assets/constants';
import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';

export default function Discover() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player,
  );
  // const { data, isFetching, error } = useGetTopChartsQuery();

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || 'POP',
  );

  if (isFetching) {
    return <Loader title="Loading songs..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full  flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-white font-bold text-3xl text-left">Discover</h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}