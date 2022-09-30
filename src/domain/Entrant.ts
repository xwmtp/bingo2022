import { mapToUser, User } from "./User";
import { Duration } from "luxon";
import { Entrant as EntrantDto, EntrantState } from "@xwmtp/bingo-tournament";

export interface Entrant {
  user: User;
}

export interface EntrantWithResult extends Entrant {
  result: EntrantResult;
}

export interface EntrantResult {
  hasForfeited: boolean;
  resultStatus: RankStatus;
  rank: number;
  racetimeRank: number;
  finishTime?: number;
}

export type RankStatus = "win" | "loss" | "tie";

export const hasResult = (entrant: Entrant | EntrantWithResult): entrant is EntrantWithResult => {
  return "result" in entrant && !!entrant.result;
};

export const getResultString = (result: EntrantResult): string => {
  if (result.finishTime) {
    return Duration.fromMillis(result.finishTime * 1000).toFormat("h:mm:ss");
  } else {
    return "dnf";
  }
};

export const mapToEntrant = (
  entrantDto: EntrantDto,
  allEntrantDtos: EntrantDto[],
  rank?: number,
  rankStatus?: RankStatus
): Entrant | EntrantWithResult => {
  const entrant = {
    user: mapToUser(entrantDto.user),
  };
  if (entrantDto.state === EntrantState.PreRace) {
    return entrant;
  } else {
    return {
      ...entrant,
      result: {
        hasForfeited: entrantDto.state === EntrantState.DidNotFinish,
        resultStatus: rankStatus ?? "loss",
        racetimeRank: entrantDto.racetimePlace ?? 0,
        rank: rank ?? 0,
        finishTime:
          entrantDto.state === EntrantState.Finished
            ? entrantDto.finishTimeSeconds ?? 0
            : undefined,
      },
    };
  }
};
