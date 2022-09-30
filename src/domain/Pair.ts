import { User } from "./User";

export type Pair = PairUser[];

export interface PairUser {
  user: User;
  pairPoints: number; // incl virtual point
  pairTourneyPoints: number; // excl virtual point
  pairSeed: number;
}

export interface PairUserDto {
  id: string;
  points: number;
  tourney_points: number;
  seed: number;
}

export const mapToPairs = (pairDtos: PairUserDto[][], allEntrants: User[]): Pair[] => {
  return pairDtos
    .map((pairDto) =>
      pairDto
        .map((pairUserDto) => mapToPair(pairUserDto, allEntrants))
        .filter((entrant): entrant is PairUser => !!entrant)
        .sort((a, b) => {
          if (a.pairPoints !== b.pairPoints) {
            return b.pairPoints - a.pairPoints;
          }
          return b.pairSeed - a.pairSeed;
        })
    )
    .filter((pair) => pair.length > 0)
    .sort((a, b) => {
      if (a[0].pairPoints !== b[0].pairPoints) {
        return a[0].pairPoints - b[0].pairPoints;
      }
      if (a.length !== b.length) {
        return b.length - a.length;
      }
      return a[0].pairSeed - b[0].pairSeed;
    });
};

const mapToPair = (pairUserDto: PairUserDto, allEntrants: User[]) => {
  const matchingUser = allEntrants.find((entrant) => entrant.id === pairUserDto.id);
  if (!matchingUser) {
    return undefined;
  }
  return {
    user: matchingUser,
    pairPoints: pairUserDto.points,
    pairTourneyPoints: pairUserDto.tourney_points,
    pairSeed: pairUserDto.seed,
  };
};
