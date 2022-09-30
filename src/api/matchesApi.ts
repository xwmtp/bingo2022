import { getApi } from "./api";
import {
  includesEntrant,
  isMatchResult,
  isScheduledMatch,
  isUnscheduledMatch,
  mapToMatch,
  Match,
  MatchToAdd,
} from "../domain/Match";
import { DateTime } from "luxon";
import { useQuery } from "react-query";
import { NewMatch as NewMatchDto } from "@xwmtp/bingo-tournament";
import { websiteSettings } from "../Settings";
import { mockAllMatches } from "../domain/mocks/MockData";

const getAllMatches = async (): Promise<Match[]> => {
  try {
    const matchDtos = await getApi().getAllMatches();
    return matchDtos.map(mapToMatch);
  } catch (error) {
    if (websiteSettings.USE_MOCK_DATA) {
      return mockAllMatches;
    }
    throw error;
  }
};

export const useAllMatches = () => {
  return useQuery<Match[], Error>("allMatches", getAllMatches);
};

export function useFilteredMatches<T extends Match>(
  filterFn: (match: Match) => match is T,
  entrantId?: string
) {
  return useQuery<Match[], Error, T[]>("allMatches", getAllMatches, {
    select: (data) => {
      const filtered = data.filter(filterFn);
      if (entrantId) {
        return filtered.filter((match) => includesEntrant(match, entrantId));
      }
      return filtered;
    },
  });
}

export const useScheduledMatches = (entrantId?: string) => {
  return useFilteredMatches(isScheduledMatch, entrantId);
};

export const useUnscheduledMatches = (entrantId?: string) => {
  return useFilteredMatches(isUnscheduledMatch, entrantId);
};

export const useMatchResults = (entrantId?: string) => {
  return useFilteredMatches(isMatchResult, entrantId);
};

export const addMatches = async (matchesToAdd: MatchToAdd[]): Promise<Match[]> => {
  const newMatches = matchesToAdd.map(mapToNewMatchDto);
  const addedMatches = await getApi().addMatches({ requestBody: newMatches });
  return addedMatches.map(mapToMatch);
};

export const updateMatchTime = async (updateMatch: {
  matchId: string;
  newTime: DateTime;
}): Promise<Match> => {
  const updatedMatchDto = await getApi().updateMatch({
    matchId: updateMatch.matchId,
    updateMatch: { scheduledTime: updateMatch.newTime.toJSDate() },
  });
  return mapToMatch(updatedMatchDto);
};

export const updateMatchRacetimeId = async (updateMatch: {
  matchId: string;
  newRacetimeId: string;
}): Promise<Match> => {
  const updatedMatchDto = await getApi().updateMatch({
    matchId: updateMatch.matchId,
    updateMatch: { racetimeId: updateMatch.newRacetimeId },
  });
  return mapToMatch(updatedMatchDto);
};

export const updateMatchRestream = async (updateMatch: {
  matchId: string;
  restreamChannelUrl: string;
}): Promise<void> => {
  await getApi().setRestreamChannel({
    matchId: updateMatch.matchId,
    restreamChannel: updateMatch.restreamChannelUrl,
  });
};

export const removeMatchRestream = async (matchId: string): Promise<void> => {
  await getApi().setRestreamChannel({
    matchId: matchId,
    restreamChannel: undefined,
  });
};

export const updateMatchVod = async (updateMatch: {
  matchId: string;
  vodUrl: string;
}): Promise<void> => {
  await getApi().setVodUrl({
    matchId: updateMatch.matchId,
    vodUrl: updateMatch.vodUrl,
  });
};

export const removeMatchVod = async (matchId: string): Promise<void> => {
  await getApi().setVodUrl({
    matchId: matchId,
    vodUrl: undefined,
  });
};

export const deleteMatches = async (matchIds: string[]): Promise<void> => {
  return await getApi().deleteMatches({ requestBody: matchIds });
};

const mapToNewMatchDto = (matchToAdd: MatchToAdd): NewMatchDto => {
  const entrantIds = [];
  if (matchToAdd.entrant1) {
    entrantIds.push(matchToAdd.entrant1.id);
  }
  if (matchToAdd.entrant2) {
    entrantIds.push(matchToAdd.entrant2.id);
  }
  if (entrantIds.length === 0) {
    throw Error("Cannot add match without at least one entrant!");
  }
  return {
    entrantIds: entrantIds,
    round: matchToAdd.round,
  };
};
