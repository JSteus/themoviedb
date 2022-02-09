export function formatDate(date) {
  const movieDate = new Date(date);
  const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const formatedDate = `${movieDate.getDate()} ${
    months[movieDate.getMonth()]
  } ${movieDate.getFullYear()}`;

  return !isNaN(movieDate) ? formatedDate : 'Data indisponível';
}

export function detailsDate(date) {
  const movieDate = new Date(date);

  return `${movieDate.getDate()}/${
    movieDate.getMonth() + 1
  }/${movieDate.getFullYear()}`;
}

export function minutesToHours(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
}
