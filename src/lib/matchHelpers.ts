import { EntrantWithResult } from "../domain/Entrant";

export const getRanks = (entrants: EntrantWithResult[]) => {
  const times = entrants.map((entrant) => entrant.result.finishTime ?? 9999999);
  const sorted = times.slice().sort(function (a, b) {
    return b - a;
  });
  return times.map(function (v) {
    return sorted.indexOf(v) + 1;
  });
};
