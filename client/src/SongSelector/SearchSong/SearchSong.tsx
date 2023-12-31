import React from "react";
import { useSearchTracks } from "@app/Spotify/searchHooks";
import { Input } from "@core/Input";
import { Loader } from "@core/Loader";
import * as TrackVisualizer from "@app/SpotifyTree/SpotifyTree/TrackVisualizer";
import { useSpotifyTree } from "@app/SpotifyTree/hooks";

export const SearchSong: React.FC = () => {
  const [searchData, setSearchTerm] = useSearchTracks();
  const tracks = searchData.data?.tracks.items;
  const loading = searchData.isLoading;
  const [isOpen, setIsOpen] = React.useState(false);
  const tree = useSpotifyTree();

  return (
    <>
      <button
        className={
          isOpen
            ? "hidden"
            : "text-primary-light tw-w-full flex justify-end px-6 py-4"
        }
        style={{ width: "1024px", maxWidth: "100vw" }}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            transform: "scale(1.2)",
          }}
          className="drop-shadow-lg fill-current"
        >
          <path d="M5 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 5h14l.001 14H5V5z"></path>
          <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
        </svg>
      </button>
      <div
        className={`
          ${isOpen ? "" : "h-0 overflow-hidden"}
          ${isOpen ? "fixed" : "hidden"}
          justify-center flex-col 
          transition-all 
          bg-background
          border border-primary-light
          drop-shadow-md
          border-b-0
        `}
        style={{
          width: "1024px",
          maxWidth: "97vw",
          height: isOpen ? "calc(100vh - 300px)" : "",
          top: "300px",
          left: "50%",
          transform: "translate(-50%,0)",
        }}
      >
        <button
          className={
            !isOpen
              ? "hidden"
              : "text-primary-light tw-w-full flex justify-end ml-auto m-2"
          }
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{
              transform: "scale(1.2)",
            }}
            className="drop-shadow-lg fill-current"
          >
            <path d="M5 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 5h14l.001 14H5V5z"></path>
            <path d="M12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707-1.414-1.414z"></path>
          </svg>
        </button>

        <div className="flex justify-center flex-col h-full gap-2 p-6">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="remind you of anything?"
          />
          <Loader isLoading={loading} className="h-full w-full">
            <div className="overflow-auto gap-12 flex flex-wrap pb-24 justify-center px-2 h-full w-full ">
              {!tracks?.length && !loading ? (
                <div className="p-4">
                  <p>no results!</p>
                </div>
              ) : undefined}
              {tracks?.map((track) => (
                <div key={track.id} className="w-full md:w-max pt-6 ">
                  <TrackVisualizer.AlbumContainer
                    track={track}
                    size={"w-full md:w-max h-24 px-4 pointer"}
                    onClick={() => {
                      tree?.addSuggestion({
                        name: track.name,
                        spotify_id: track.id,
                      });
                    }}
                  >
                    <TrackVisualizer.TrackTitle track={track} />
                    <div className="h-2 w-full"></div>
                    <TrackVisualizer.TrackArtists track={track} />
                  </TrackVisualizer.AlbumContainer>
                </div>
              ))}
            </div>
          </Loader>
        </div>
      </div>
    </>
  );
};
