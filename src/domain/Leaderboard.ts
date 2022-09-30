import { User } from "./User";
import { MatchResult } from "./Match";
import { RankStatus } from "./Entrant";
import { tournamentSettings } from "../Settings";
import { calculateMedian } from "../lib/timeHelpers";
import { RacetimeLeaderboard, RacetimeLeaderboardEntry } from "./RacetimeLeaderboard";

const RESULT_POINTS: { [key in RankStatus]: number } = {
  win: tournamentSettings.WIN_POINTS,
  tie: tournamentSettings.TIE_POINTS,
  loss: tournamentSettings.LOSE_POINTS,
} as const;

export interface LeaderboardEntry {
  user: User;
  roundsPlayed: number;
  forfeits: number;
  points: number;
  median?: number;
  wins: number;
  ties: number;
  losses: number;
  finishTimes: number[];
  opponents: User[];
  racetimeStats?: RacetimeLeaderboardEntry;
}

const createEmptyEntry = (user: User): LeaderboardEntry => {
  return {
    user: user,
    roundsPlayed: 0,
    forfeits: 0,
    points: 0,
    median: undefined,
    wins: 0,
    ties: 0,
    losses: 0,
    finishTimes: [],
    opponents: [],
    racetimeStats: undefined,
  };
};

export const toLeaderboardEntries = (
  allEntrantsUsers: User[],
  allResults: MatchResult[],
  racetimeLeaderboard?: RacetimeLeaderboard
): LeaderboardEntry[] => {
  let entries: { [id: string]: LeaderboardEntry } = {};

  for (const entrantUser of allEntrantsUsers) {
    entries[entrantUser.id] = createEmptyEntry(entrantUser);
  }

  for (const result of allResults) {
    for (const entrant of result.entrants) {
      const entry = entries[entrant.user.id];
      if (!entry) {
        continue;
      }
      entry.roundsPlayed++;
      entry.points += RESULT_POINTS[entrant.result.resultStatus];
      entry.forfeits += entrant.result.hasForfeited ? 1 : 0;
      entry.finishTimes.push(
        entrant.result.hasForfeited ? tournamentSettings.FORFEIT_TIME : entrant.result.finishTime!
      );
      for (const opponent of result.entrants) {
        if (opponent.user.id !== entrant.user.id) {
          entry.opponents.push(opponent.user);
        }
      }
      if (entrant.result.resultStatus === "win") {
        entry.wins++;
      }
      if (entrant.result.resultStatus === "tie") {
        entry.ties++;
      }
      if (entrant.result.resultStatus === "loss") {
        entry.losses++;
      }
    }
  }
  for (const entrantId in entries) {
    entries[entrantId].median = calculateMedian(entries[entrantId].finishTimes);
    if (racetimeLeaderboard) {
      const racetimeEntry = racetimeLeaderboard[entrantId];
      if (racetimeEntry) {
        entries[entrantId].racetimeStats = racetimeEntry;
      }
    }
  }
  return Object.values(entries);
};

export const toLeaderboardEntry = (
  user: User,
  allResults: MatchResult[],
  racetimeLeaderboard?: RacetimeLeaderboard
): LeaderboardEntry | undefined => {
  const entries = toLeaderboardEntries([user], allResults, racetimeLeaderboard);
  return entries.filter((entry) => entry.user.id === user.id)[0];
};

export const sortLeaderboardEntries = (entries: LeaderboardEntry[]) => {
  const emptyMedian = tournamentSettings.FORFEIT_TIME;

  return [...entries].sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    if (a.median !== b.median) {
      return (a.median ?? emptyMedian) - (b.median ?? emptyMedian);
    }
    if (a.racetimeStats?.leaderboardTime !== b.racetimeStats?.leaderboardTime) {
      return (
        (a.racetimeStats?.leaderboardTime ?? emptyMedian) -
        (b.racetimeStats?.leaderboardTime ?? emptyMedian)
      );
    }
    return a.user.name.toLowerCase().localeCompare(b.user.name.toLowerCase());
  });
};

// export for pairing calculations
export const toPairingEntries = (entries: LeaderboardEntry[]) => {
  const sortedEntries = sortLeaderboardEntries(entries);
  return sortedEntries.map((entry) => {
    return {
      name: entry.user.name,
      id: entry.user.id,
      opponents: entry.opponents.map((opponent) => {
        return { name: opponent.name, id: opponent.id };
      }),
      points: entry.points,
      current_seed: entry.racetimeStats?.leaderboardScore ?? null,
    };
  });
};
