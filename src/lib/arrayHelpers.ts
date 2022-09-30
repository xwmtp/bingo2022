export function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  if (chunkSize < 1) {
    throw Error("Chunk size has to be an integer of 1 or larger");
  }

  const chunkArray: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunkArray.push(chunk);
  }
  return chunkArray;
}
