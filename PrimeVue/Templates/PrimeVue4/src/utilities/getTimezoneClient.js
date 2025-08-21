export default function getTimezoneClient() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return timezone
}
