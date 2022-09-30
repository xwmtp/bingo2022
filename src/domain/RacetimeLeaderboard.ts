import { DateTime } from "luxon";

// Bingo Leaderboard (using racetime data)

export interface RacetimeLeaderboardDto {
  lastUpdated: DateTime;
  numEntries: number;
  entries: RacetimeLeaderboardEntryDto[];
}

interface RacetimeLeaderboardEntryDto {
  playerName: string;
  playerId: string;
  racetimePoints: number;
  leaderboardScore: number;
  leaderboardTime: string;
  average: string;
  effectiveAverage: string;
  effectiveMedian: string;
  lastRaced: string;
  finishedRacesCount: number;
  includedRacesCount: number;
  finishedRacesFraction: string;
  rank: number;
}

export type RacetimeLeaderboard = { [id: string]: RacetimeLeaderboardEntry };

export interface RacetimeLeaderboardEntry {
  id: string;
  rank: number;
  leaderboardScore: number;
  leaderboardTime: number;
  average: number;
  effectiveMedian: number;
  lastRaceDate: DateTime;
}

export const mapToRacetimeLeaderboard = (
  racetimeLeaderboardDto: RacetimeLeaderboardDto
): RacetimeLeaderboard => {
  const leaderboard: RacetimeLeaderboard = {};

  for (const entry of racetimeLeaderboardDto.entries) {
    leaderboard[entry.playerId] = {
      id: entry.playerId,
      rank: entry.rank,
      leaderboardScore: entry.leaderboardScore,
      leaderboardTime: hmsToSeconds(entry.leaderboardTime),
      average: hmsToSeconds(entry.average),
      effectiveMedian: hmsToSeconds(entry.effectiveMedian),
      lastRaceDate: DateTime.fromISO(entry.lastRaced),
    };
  }

  return leaderboard;
};

const hmsToSeconds = (hms: string): number => {
  const a = hms.split(":");
  return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
};
