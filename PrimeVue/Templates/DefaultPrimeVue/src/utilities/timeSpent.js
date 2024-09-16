function timeSince(pastDateStr) {
  const pastDate = new Date(pastDateStr);
  const currentDate = new Date();

  let diff = Math.abs(currentDate - pastDate) / 1000; // Diferencia en segundos

  const days = Math.floor(diff / 86400);
  diff -= days * 86400;

  const hours = Math.floor(diff / 3600) % 24;
  diff -= hours * 3600;

  const minutes = Math.floor(diff / 60) % 60;
  diff -= minutes * 60;

  const seconds = Math.floor(diff % 60);

  let timeParts = [];
  if (days > 0) timeParts.push(`${days}d`);
  if (hours > 0) timeParts.push(`${hours}h`);
  if (minutes > 0) timeParts.push(`${minutes}m`);
  if (seconds > 0) timeParts.push(`${seconds}s`);

  return timeParts.join("");
}

export const getTimeSince = (date) => timeSince(date);