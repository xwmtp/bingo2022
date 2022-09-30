import { User } from "./User";
import { getEntrantById, includesEntrant, MatchResult } from "./Match";
import { Entrant, hasResult } from "./Entrant";

const BRACKET_SIZES = [2, 4, 8, 16];

export interface BracketSetup {
  roundNames: string[];
  firstRoundMatchUps: { player1Id: string; player2Id: string }[];
}

export interface BracketRound {
  name: string;
  matchUps: MatchUp[];
}

export interface MatchUp {
  player1?: Entrant;
  player2?: Entrant;
}

export const parseToBracketRounds = (
  bracketSetup: BracketSetup,
  allEntrants: User[],
  allResults: MatchResult[]
): BracketRound[] => {
  const { roundNames, firstRoundMatchUps: rawFirstRoundMatchUps } = bracketSetup;

  if (roundNames.length === 0) {
    return [];
  }

  validateBracketSetup(bracketSetup);

  const rounds: BracketRound[] = [];
  let previousRound: BracketRound = { name: "", matchUps: [] };

  for (const roundName of roundNames) {
    const round: BracketRound = { name: roundName, matchUps: [] };
    const isFirstRound = roundName === roundNames[0];
    const numberOfMatchesInRound = isFirstRound
      ? rawFirstRoundMatchUps.length
      : Math.floor(previousRound.matchUps.length / 2);

    for (let i = 0; i < numberOfMatchesInRound; i++) {
      const player1 = isFirstRound
        ? idToEntrant(rawFirstRoundMatchUps[i].player1Id, allEntrants)
        : getWinner(previousRound.matchUps[i * 2]);
      const player2 = isFirstRound
        ? idToEntrant(rawFirstRoundMatchUps[i].player2Id, allEntrants)
        : getWinner(previousRound.matchUps[i * 2 + 1]);

      const matchUp = createMatchUp(roundName, allResults, player1, player2);
      round.matchUps.push(matchUp);
    }
    rounds.push(round);
    previousRound = round;
  }

  return rounds;
};

const createMatchUp = (
  roundName: string,
  allResults: MatchResult[],
  player1?: Entrant,
  player2?: Entrant
): MatchUp => {
  if (!player1 || !player2) {
    return {
      player1: player1,
      player2: player2,
    };
  }
  const matchingResult = allResults.find(
    (result) =>
      result.round?.toLowerCase() === roundName.toLowerCase() &&
      includesEntrant(result, player1.user.id) &&
      includesEntrant(result, player2.user.id)
  );
  if (matchingResult) {
    return {
      player1: getEntrantById(matchingResult, player1?.user.id),
      player2: getEntrantById(matchingResult, player2?.user.id),
    };
  }
  return {
    player1: player1,
    player2: player2,
  };
};

const idToEntrant = (id: string, allEntrants: User[]): Entrant => {
  const matchingEntrant = allEntrants.find((entrant) => entrant.id === id);
  if (!matchingEntrant) {
    throw Error(`Could not find matching entrant for bracket entrant id ${id}`);
  }
  return { user: matchingEntrant };
};

export const getWinner = (matchUp: MatchUp): Entrant | undefined => {
  for (const player of [matchUp.player1, matchUp.player2]) {
    if (player && hasResult(player) && player.result.resultStatus === "win") {
      // only return entrant, without result
      return { user: player.user };
    }
  }
};

export const includesUser = (matchUp: MatchUp, user: User): boolean => {
  return (
    !!matchUp.player1 &&
    !!matchUp.player2 &&
    (matchUp.player1?.user.id === user?.id || matchUp.player2?.user.id === user?.id)
  );
};

const validateBracketSetup = (bracketSetup: BracketSetup) => {
  const { roundNames, firstRoundMatchUps } = bracketSetup;

  const bracketEntrantsIds = firstRoundMatchUps.flat();
  if (!BRACKET_SIZES.includes(bracketEntrantsIds.length)) {
    throw Error("Bracket has to have entrant size of " + BRACKET_SIZES.join(", "));
  }

  const numberOfRounds = roundNames.length;
  const expectedNumberOfFirstRoundMatchUps = 2 ** (numberOfRounds - 1);
  if (firstRoundMatchUps.length !== expectedNumberOfFirstRoundMatchUps) {
    throw Error(
      `Number of first round match ups (${firstRoundMatchUps.length}) has to equal 2**(numberOfRounds - 1), in this case ${expectedNumberOfFirstRoundMatchUps}`
    );
  }

  const lowerCaseRoundNames = roundNames.map((name) => name.toLowerCase());
  if (lowerCaseRoundNames.length !== new Set(lowerCaseRoundNames).size) {
    throw Error(`Each round name has to be unique (ignoring case). Received: ${roundNames}`);
  }
};
