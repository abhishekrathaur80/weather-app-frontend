export const formatTimestampTo12Hour = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}${period}`;
};

export const formatUnixTimestampToTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = ((hours + 11) % 12 + 1);
  return `${formattedHours}:${minutes} ${period}`;
};