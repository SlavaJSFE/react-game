export default function countTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60 || 0;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const time = `${minutes}:${formattedSeconds}`;

  return time;
}