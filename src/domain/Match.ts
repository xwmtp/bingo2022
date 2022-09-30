import { DateTime, Duration } from "luxon";
import { Entrant, EntrantWithResult, hasResult, mapToEntrant, RankStatus } from "./Entrant";
import { mapToUser, User } from "./User";
import { Match as MatchDto } from "@xwmtp/bingo-tournament/dist/models/Match";
import { EntrantState, MatchState } from "@xwmtp/bingo-tournament";
import { Entrant as EntrantDto } from "@xwmtp/bingo-tournament/dist/models/Entrant";
import { tournamentSettings } from "../Settings";

interface BaseMatch<T extends Entrant> {
  id: string;
  entrants: T[];
  round?: string;
  restreamer?: User;
  restreamChannel?: string;
  vodUrl?: string;
  racetimeId?: string;
}

interface Scheduled {
  scheduledTime: DateTime;
}

export type Match = UnscheduledMatch | ScheduledMatch | MatchResult;

export interface UnscheduledMatch extends BaseMatch<Entrant> {}

export interface ScheduledMatch extends BaseMatch<Entrant>, Scheduled {}

export interface MatchResult extends BaseMatch<EntrantWithResult>, Scheduled {}

// matches with 1 entrant are allowed
export interface MatchToAdd {
  entrant1: User;
  entrant2?: User;
  round: string;
}

export const standardMatchDuration = Duration.fromObject({
  hours: 1,
  minutes: 10,
});

export function isScheduled(match: any): match is Scheduled {
  return !!match.scheduledTime;
}

export function isUnscheduledMatch(match: Match): match is UnscheduledMatch {
  return !isScheduled(match);
}

export function isScheduledMatch(match: Match): match is ScheduledMatch {
  return isScheduled(match) && !isMatchResult(match);
}

export function isMatchResult(match: Match): match is MatchResult {
  return match.entrants.length > 0 && match.entrants.every((entrant) => "result" in entrant);
}

export function includesEntrant<T extends Entrant>(match: BaseMatch<T>, id: string): boolean {
  return match.entrants.some((entrant) => entrant.user.id === id);
}

export function isInProgress(match: ScheduledMatch): boolean {
  const now = DateTime.local();
  return match.scheduledTime < now && now < match.scheduledTime.plus(standardMatchDuration);
}

export function isFinished(match: ScheduledMatch): boolean {
  const now = DateTime.local();
  return match.scheduledTime.plus(standardMatchDuration) < now;
}

export function isNotFinished(match: ScheduledMatch): boolean {
  return !isFinished(match);
}

export function getEntrantById(match: Match, id: string): Entrant | undefined {
  return match.entrants.find((entrant) => entrant.user.id === id);
}

export function sortByScheduledTime<T extends Scheduled>(
  scheduledItems: T[],
  descending?: boolean
): T[] {
  return [...scheduledItems].sort((itemA, itemB) => {
    const difference = itemA.scheduledTime.toMillis() - itemB.scheduledTime.toMillis();
    if (descending) {
      return -difference;
    }
    return difference;
  });
}

export const mapToMatch = (matchDto: MatchDto): Match => {
  const entrantRanks =
    matchDto.state === MatchState.Finished ? calculateRanks(matchDto.entrants) : {};

  const entrants = matchDto.entrants.map((entrant) =>
    mapToEntrant(
      entrant,
      matchDto.entrants,
      entrantRanks[entrant.user.id],
      calculateRankStatus(entrant, matchDto.entrants)
    )
  );

  return {
    id: matchDto.id,
    entrants: [...entrants].sort((a, b) =>
      hasResult(a) && hasResult(b) ? a.result.rank - b.result.rank : 0
    ),
    round: matchDto.round,
    restreamer: matchDto.restreamUser && mapToUser(matchDto.restreamUser),
    restreamChannel: matchDto.restreamChannel,
    racetimeId: matchDto.racetimeId,
    vodUrl: matchDto.vodUrl,
    scheduledTime: matchDto.scheduledTime ? DateTime.fromJSDate(matchDto.scheduledTime) : undefined,
  };
};

const calculateRankStatus = (
  entrantDto: EntrantDto,
  allEntrantDtos: EntrantDto[]
): RankStatus | undefined => {
  const timeEntrant =
    entrantDto.state === EntrantState.Finished
      ? entrantDto.finishTimeSeconds ?? 0
      : tournamentSettings.FORFEIT_TIME;
  if (!timeEntrant) {
    return undefined;
  }
  const timesOpponents = allEntrantDtos
    .filter((entrant) => entrant.user.id !== entrantDto.user.id)
    .map((entrant) =>
      entrant.state === EntrantState.Finished
        ? entrant.finishTimeSeconds ?? 0
        : tournamentSettings.FORFEIT_TIME
    );
  if (timesOpponents.every((opponentTime) => (opponentTime ?? Number.MAX_VALUE) > timeEntrant)) {
    return "win";
  }
  if (timesOpponents.some((opponentTime) => (opponentTime ?? Number.MAX_VALUE) === timeEntrant)) {
    return "tie";
  }
  return "loss";
};

const calculateRanks = (allEntrantDtos: EntrantDto[]) => {
  const ranksByEntrantId: { [key: string]: number } = {};
  for (const entrantDto of allEntrantDtos) {
    ranksByEntrantId[entrantDto.user.id] = 0;
  }

  const sortObjects = allEntrantDtos.map((entrantDto) => {
    return {
      id: entrantDto.user.id,
      time:
        entrantDto.state === EntrantState.Finished
          ? entrantDto.finishTimeSeconds ?? 0
          : tournamentSettings.FORFEIT_TIME,
    };
  });

  const sortedObjects = sortObjects.sort((a, b) => a.time - b.time);

  let rank = 1;
  let prevObject = undefined;
  for (const obj of sortedObjects) {
    if (prevObject && obj.time !== prevObject.time) {
      rank += 1;
    }
    ranksByEntrantId[obj.id] = rank;

    prevObject = obj;
  }

  return ranksByEntrantId;
};
