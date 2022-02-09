import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { CastCard } from "../../components/castCard";
import { MovieRating } from "../../components/movieRating";
import Navbar from "../../components/navbar";
import { api } from "../../services/api";
import { detailsDate, minutesToHours } from "../../utils/formatDate";

import blank from "../../assets/blank.png";
import noposter from "../../assets/noposter.png";
import "./styles.scss";
import { MovieListItem } from "../../components/movieListItem";

const crewMembersJob = ["director", "producer", "screenplay"];

export function Details() {
  const { id } = useParams();

  const [details, setDetails] = useState({});
  const [releaseData, setReleaseData] = useState({
    country: "",
    ageRestriction: "",
    releaseDate: "",
    year: "",
  });
  const [cast, setCast] = useState([]);
  const [crewMembers, setCrewMembers] = useState([]);
  const [trailer, setTrailer] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  function ratingColor(votes) {
    const average = votes * 10;

    if (average < 50) return "#ff0000";

    if (average >= 50 && average < 70) return "#ffff00";

    if (average >= 70) return "#14FF00";
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const { data } = await api.get(`movie/${id}`, {
          params: {
            append_to_response: "videos,credits,release_dates,recommendations",
          },
        });
        const detailsResult = {
          title: data.title,
          poster: data.poster_path,
          genres: data.genres,
          runtime: data.runtime,
          overview: data.overview,
          votes: data.vote_average,
        };
        const creditsResult = data.credits;
        const recommendationsResult = data.recommendations.results.slice(0, 6);
        const releaseDatesResult = data.release_dates.results;
        const trailerResult = data.videos.results.filter(
          (video) => video.type === "Trailer"
        );
        const releasedInBrasil = releaseDatesResult.some(
          (e) => e.iso_3166_1 === "BR"
        );
        const filterCrewMembers = creditsResult.crew.filter((item) =>
          crewMembersJob.includes(item.job.toLowerCase())
        );

        if (releasedInBrasil) {
          const release = releaseDatesResult.filter(
            (e) => e.iso_3166_1 === "BR"
          );

          setReleaseData({
            country: release[0].iso_3166_1,
            ageRestriction: release[0].release_dates[0].certification,
            releaseDate: release[0].release_dates[0].release_date,
            year: new Date(release[0].release_dates[0].release_date)
              .getFullYear()
              .toString(),
          });
        }

        if (!releasedInBrasil && releaseDatesResult.length > 0) {
          setReleaseData({
            country: releaseDatesResult[0].iso_3166_1,
            ageRestriction:
              releaseDatesResult[0].release_dates[0].certification,
            releaseDate: releaseDatesResult[0].release_dates[0].release_date,
            year: new Date(releaseDatesResult[0]).getFullYear().toString(),
          });
        }

        if (releaseDatesResult.length === 0) {
          setReleaseData(null);
        }

        setDetails(detailsResult);
        setCrewMembers(filterCrewMembers);
        setCast(creditsResult.cast);
        setTrailer(trailerResult[0]);
        setRecommendations(recommendationsResult);
      } catch (e) {
        console.log(e);
      }
    }

    getMovieDetails();
  }, [id]);

  return (
    <>
      <Navbar />

      <header className="detailsHeaderContainer">
        <div className="detailsHeader">
          <div className="imgContainer">
            <img
              src={
                details.poster
                  ? `https://image.tmdb.org/t/p/original${details.poster}`
                  : noposter
              }
              alt={details?.title}
            />
          </div>
          <div className="descriptionContainer">
            <h1>
              {details?.title} {releaseData.year && `(${releaseData.year})`}
            </h1>
            {releaseData ? (
              <ul>
                <li key="1">{releaseData?.ageRestriction}</li>
                <li key="2">
                  {detailsDate(releaseData?.releaseDate)} (
                  {releaseData?.country})
                </li>
                <li key="3">
                  {details?.genres
                    ?.map((genre) => genre.name)
                    .join()
                    .replace(/,/g, ", ")}
                </li>
                <li key="4">{minutesToHours(details?.runtime)}</li>
              </ul>
            ) : (
              <p>Não há dados disponíveis</p>
            )}

            <div className="ratingChart">
              <MovieRating
                percentage={details.votes * 10}
                color={ratingColor(details.votes)}
                radius={30}
                stroke="0.7rem"
                svgSize={100}
                transform={"50 100"}
                fontSize={"1rem"}
              />
              <p>
                Avaliação dos <br /> usuários
              </p>
            </div>
            <div className="overview">
              {details.overview && <h2>Sinopse</h2>}
              <p>{details?.overview}</p>
            </div>
            <div className="crewDetail">
              {crewMembers.map((crewMember) => (
                <div
                  key={`${crewMember.id.toString()}_${crewMember.job}`}
                  className="crewMembersContainer"
                >
                  <h2>{crewMember.name}</h2>
                  <p>{crewMember.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="detailsContent">
        <div className="castContainer">
          <h2>Elenco Original</h2>
          <div className="cards">
            {cast.map((item) => (
              <CastCard
                key={item.id}
                image={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                    : blank
                }
                name={item.name}
                character={item.character}
              />
            ))}
          </div>
          <div className="trailerContainer">
            <h2>Trailer</h2>
            {trailer ? (
              <div className="iframeContainer">
                <iframe
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            ) : (
              <h3>Não há trailers disponíveis.</h3>
            )}
          </div>
          <div className="recommendationsContainer">
            <h2>Recomendações</h2>
            <div className="recommendationsList">
              {recommendations?.map((movie) => (
                <MovieListItem
                  activeGenres={[]}
                  key={movie.id}
                  movieId={movie.id}
                  genreId={movie.genre_ids}
                  title={movie.title}
                  date={movie.release_date}
                  poster={movie.poster_path}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
