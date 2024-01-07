function convertEpochStringToDate(epochString: string): Date | null {
  const epochValue = parseInt(epochString, 10);

  // Check if the conversion was successful
  if (isNaN(epochValue)) {
    console.error("Invalid epoch value");
    return null;
  }

  const date = new Date(0); // The 0 here represents the epoch date
  date.setTime(epochValue * 1000); // Multiply by 1000 to convert seconds to milliseconds

  return date;
}

export {convertEpochStringToDate};
