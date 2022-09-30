import { MatchResult, ScheduledMatch, UnscheduledMatch } from "../Match";
import { DateTime } from "luxon";
import { User } from "../User";
import { websiteSettings } from "../../Settings";
import { EntrantState, MatchState, Role } from "@xwmtp/bingo-tournament";
import { Match as MatchDto } from "@xwmtp/bingo-tournament/dist/models/Match";
import { Pair } from "../Pair";
import { BracketSetup } from "../BracketSetup";

const xwillmarktheplace = {
  id: "d17DexWEKg3ak64R",
  roles: [Role.Entrant, Role.Admin],
  name: "xwillmarktheplace",
  avatar: "https://racetime.gg/media/Racetime.png",
  twitchChannel: "https://www.twitch.tv/xwillmarktheplace",
};

const fleush = {
  id: "pRbOXG3ykOWZVKq1",
  roles: [Role.Entrant],
  name: "Fleush",
  avatar: "https://racetime.gg/media/noscara1.png",
  twitchChannel: "https://www.twitch.tv/happyfleush",
};

const jenslang = {
  id: "rZyM4orRvRoqDJX0",
  roles: [Role.Entrant],
  name: "jenslang",
  avatar: "https://racetime.gg/media/e0aaf3c8688abd0e58bed9d9f63de4ad.png",
  twitchChannel: "https://www.twitch.tv/jenslang",
};

const juwk = {
  id: "XGzr7pBMny3kqgyE",
  roles: [Role.Entrant],
  name: "juwk",
  avatar: websiteSettings.DEFAULT_AVATAR,
  twitchChannel: "https://www.twitch.tv/jenslang",
};

const scaramanga = {
  id: "wdm1LPWjGABEnVx6",
  roles: [Role.Entrant],
  name: "scaramanga",
  avatar: "https://racetime.gg/media/feynman_small.jpeg",
  twitchChannel: "https://www.twitch.tv/scaramangado",
};

const matttInTheHat = {
  id: "VXY0eABdn7oLKPnz",
  roles: [Role.Entrant],
  name: "MatttInTheHat",
  avatar: websiteSettings.DEFAULT_AVATAR,
  twitchChannel: "https://www.twitch.tv/matttinthehat",
};

const exodus = {
  id: "ZbpNAaBvn5BJkg04",
  roles: [Role.Entrant],
  name: "Exodus",
  avatar: websiteSettings.DEFAULT_AVATAR,
  twitchChannel: "https://www.twitch.tv/exodus",
};

const adef = {
  id: "ZVa0eMonnbol9pyJ",
  roles: [Role.Entrant],
  name: "Adef",
  avatar: websiteSettings.DEFAULT_AVATAR,
  twitchChannel: "https://www.twitch.tv/adef",
};

export const mockScheduledMatches: ScheduledMatch[] = [
  {
    id: "m1",
    round: "Round 1",
    entrants: [
      {
        user: fleush,
      },
      {
        user: matttInTheHat,
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-02T19:45:03Z"),
    restreamChannel: "xwillmarktheplace",
  },
  {
    id: "m2",
    round: "Round 1",
    entrants: [
      {
        user: xwillmarktheplace,
      },
      {
        user: scaramanga,
      },
    ],
    scheduledTime: DateTime.fromISO("2023-01-01T04:45:03Z"),
    restreamChannel: "ZeldaSpeedruns",
  },
  {
    id: "m3",
    round: "Round 1",
    entrants: [
      {
        user: juwk,
      },
      {
        user: jenslang,
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-04T22:30:03Z"),
  },
  {
    id: "m4",
    round: "Round 1",
    entrants: [
      {
        user: scaramanga,
      },
      {
        user: jenslang,
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-07T12:45:03Z"),
  },
  {
    id: "m5",
    round: "Round 1",
    entrants: [
      {
        user: juwk,
      },
      {
        user: jenslang,
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-04T03:30:03Z"),
  },
  {
    id: "m6",
    round: "Round 2",
    entrants: [
      {
        user: xwillmarktheplace,
      },
      {
        user: juwk,
      },
    ],
    scheduledTime: DateTime.fromISO("2022-02-19T10:30:03Z"),
    restreamChannel: undefined,
  },
];

export const mockUnscheduledMatches: UnscheduledMatch[] = [
  {
    id: "u1",
    round: "Round 1",
    entrants: [
      {
        user: fleush,
      },
      {
        user: matttInTheHat,
      },
    ],
    restreamChannel: "xwillmarktheplace",
  },
  {
    id: "u2",
    round: "Round 1",
    entrants: [
      {
        user: xwillmarktheplace,
      },
      {
        user: scaramanga,
      },
    ],
    restreamChannel: "ZeldaSpeedruns",
  },
  {
    id: "u3",
    round: "Round 1",
    entrants: [
      {
        user: juwk,
      },
      {
        user: jenslang,
      },
    ],
  },
  {
    id: "u4",
    round: "Round 1",
    entrants: [{ user: scaramanga }, { user: jenslang }],
  },
];

export const mockMatchResults: MatchResult[] = [
  {
    id: "r1",
    round: "Round 1",
    entrants: [
      {
        user: fleush,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4976,
          rank: 1,
          racetimeRank: 1,
        },
      },
      {
        user: matttInTheHat,
        result: {
          resultStatus: "loss",
          hasForfeited: true,
          rank: 2,
          racetimeRank: 2,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-02T19:45:03Z"),
    restreamChannel: "xwillmarktheplace",
    vodUrl: "https://twitch.tv/videos/1234",
    racetimeId: "pretty-malon-1234",
  },
  {
    id: "r2",
    round: "Round 1",
    entrants: [
      {
        user: xwillmarktheplace,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4511,
          rank: 1,
          racetimeRank: 1,
        },
      },
      {
        user: scaramanga,
        result: {
          resultStatus: "loss",
          hasForfeited: false,
          finishTime: 4739,
          rank: 2,
          racetimeRank: 2,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-04T04:45:03Z"),
    restreamChannel: "ZeldaSpeedruns",
    racetimeId: "weird-talon-1234",
  },
  {
    id: "r3",
    round: "Round 1",
    entrants: [
      {
        user: juwk,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4497,
          rank: 1,
          racetimeRank: 1,
        },
      },
      {
        user: jenslang,
        result: {
          resultStatus: "loss",
          hasForfeited: false,
          finishTime: 4497,
          rank: 2,
          racetimeRank: 2,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-04T22:30:03Z"),
    racetimeId: "funny-impa-1234",
  },
  {
    id: "r4",
    round: "Round 1",
    entrants: [
      {
        user: scaramanga,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4710,
          rank: 1,
          racetimeRank: 1,
        },
      },

      {
        user: jenslang,
        result: {
          resultStatus: "loss",
          hasForfeited: false,
          finishTime: 4756,
          rank: 2,
          racetimeRank: 2,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-07T12:45:03Z"),
    racetimeId: "interesting-zelda-1234",
  },
  {
    id: "r5",
    round: "Round 2",
    entrants: [
      {
        user: scaramanga,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4610,
          rank: 1,
          racetimeRank: 1,
        },
      },
      {
        user: jenslang,
        result: {
          resultStatus: "loss",
          hasForfeited: false,
          finishTime: 4766,
          rank: 2,
          racetimeRank: 2,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-14T12:45:03Z"),
    vodUrl: "https://twitch.tv/videos/5678",
  },
  {
    id: "b1",
    round: "Eights",
    entrants: [
      {
        user: scaramanga,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4499,
          rank: 1,
          racetimeRank: 1,
        },
      },
      {
        user: fleush,
        result: {
          resultStatus: "loss",
          hasForfeited: false,
          finishTime: 4611,
          rank: 2,
          racetimeRank: 2,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-14T12:45:03Z"),
    vodUrl: "https://twitch.tv/videos/5678",
  },
  {
    id: "b2",
    round: "Eights",
    entrants: [
      {
        user: exodus,
        result: {
          resultStatus: "loss",
          hasForfeited: false,
          finishTime: 4822,
          rank: 2,
          racetimeRank: 2,
        },
      },
      {
        user: adef,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4800,
          rank: 1,
          racetimeRank: 1,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-14T12:45:03Z"),
    vodUrl: "https://twitch.tv/videos/5678",
  },
  {
    id: "b3",
    round: "Quarters",
    entrants: [
      {
        user: adef,
        result: {
          resultStatus: "loss",
          hasForfeited: true,
          finishTime: 9999,
          rank: 2,
          racetimeRank: 2,
        },
      },
      {
        user: scaramanga,
        result: {
          resultStatus: "win",
          hasForfeited: false,
          finishTime: 4455,
          rank: 1,
          racetimeRank: 1,
        },
      },
    ],
    scheduledTime: DateTime.fromISO("2023-02-14T12:45:03Z"),
    vodUrl: "https://twitch.tv/videos/5678",
  },
];

const mockMatchResultDto: MatchDto = {
  id: "2198ea9b-e3f6-49a5-8194-c6e059a90ceb",
  round: "Round 1",
  entrants: [
    {
      user: {
        id: "qOkXxyE6YNdpPz69",
        name: "Sheik",
        roles: [Role.Entrant],
        avatar: "http://localhost:8000/media/Sheik.png",
      },
      state: EntrantState.DidNotFinish,
      finishTime: "1:03:20",
      finishTimeSeconds: 1000,
      racetimePlace: 2,
    },
    {
      user: {
        id: "xbZJYyoanPj8PMQe",
        name: "Zelda",
        roles: [Role.Entrant],
        avatar: "http://localhost:8000/media/Zelda.png",
      },
      state: EntrantState.Finished,
      finishTime: "1:10:20",
      finishTimeSeconds: 2000,
      racetimePlace: 1,
    },
  ],
  state: MatchState.Finished,
  scheduledTime: new Date("2022-07-08T23:00:00.000Z"),
};

export const mockPairs: Pair[] = [
  [
    { user: xwillmarktheplace, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
    { user: scaramanga, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
  ],
  [
    { user: fleush, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
    { user: jenslang, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
  ],
  [
    { user: juwk, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
    { user: matttInTheHat, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
  ],
  [
    { user: exodus, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
    { user: adef, pairPoints: 1, pairTourneyPoints: 1, pairSeed: 110 },
  ],
];

export const mockBracketSetup: BracketSetup = {
  roundNames: ["Eights", "Quarters", "Semis", "Finals"],
  firstRoundMatchUps: [
    { player1Id: xwillmarktheplace.id, player2Id: jenslang.id },
    { player1Id: fleush.id, player2Id: scaramanga.id },
    { player1Id: juwk.id, player2Id: matttInTheHat.id },
    { player1Id: xwillmarktheplace.id, player2Id: jenslang.id },
    { player1Id: adef.id, player2Id: exodus.id },
    { player1Id: fleush.id, player2Id: scaramanga.id },
    { player1Id: juwk.id, player2Id: matttInTheHat.id },
    { player1Id: adef.id, player2Id: exodus.id },
  ],
};

export const mockAllUsers: User[] = [
  xwillmarktheplace,
  jenslang,
  fleush,
  scaramanga,
  juwk,
  matttInTheHat,
  exodus,
  adef,
];

export const mockAllMatches = [
  ...mockUnscheduledMatches,
  ...mockScheduledMatches,
  ...mockMatchResults,
];

export const mockLoggedInUser: User = xwillmarktheplace;
