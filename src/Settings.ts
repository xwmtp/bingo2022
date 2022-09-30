import { BracketSetup } from "./domain/BracketSetup";

export const tournamentSettings = {
  RACETIME_CATEGORY: "oot",
  FORFEIT_TIME: 4 * 3600,
  CAN_WITHDRAW: false,
  CAN_SIGNUP: false,
  WIN_POINTS: 3,
  TIE_POINTS: 1,
  LOSE_POINTS: 0,
} as const;

export const websiteSettings = {
  DEFAULT_AVATAR:
    "https://github.com/xwmtp/bingo2022/blob/assets/images/avatars/neutralAvatar.png?raw=true",
  LOGIN_URL: process.env.REACT_APP_LOGIN_URL,
  LOGOUT_URL: process.env.REACT_APP_LOGOUT_URL,
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA_FALLBACK === "true",
  MAX_TAB_SELECTOR_ITEMS: 4,
} as const;

export const leaderboardSettings = {
  // list of round names, or undefined if all rounds are relevant for the leaderboard
  RELEVANT_ROUNDS: ["Round 1", "Round 2", "Round 3", "Round 4"],
};

// Add Bracket to LeaderboardPage, only if roundNames is non-empty
export const bracketSetup: BracketSetup = {
  roundNames: ["Eights", "Quarters", "Semis", "Finals"],
  firstRoundMatchUps: [
    { player1Id: "XGzr7pBMny3kqgyE", player2Id: "jb8GPMWwDLB1nEk0" },
    { player1Id: "kzM65aWX6b31y8q0", player2Id: "OR6ym83myb3Pd1Xr" },
    { player1Id: "ZbpNAaBvn5BJkg04", player2Id: "vrZyM4orbEoqDJX0" },
    { player1Id: "LxldAMBlnboaOP57", player2Id: "wNZ1KRBOV8W4qAyj" },
    { player1Id: "5rNGD3DKVaB9blOy", player2Id: "R8QGZrB2k03Ngk4V" },
    { player1Id: "Va0eMongz6Wl9pyJ", player2Id: "JXzVwZWqElW5k8eb" },
    { player1Id: "rZyM4orRvRoqDJX0", player2Id: "kzM65aWXgxo1y8q0" },
    { player1Id: "jQbq4dBp7yWvlrG0", player2Id: "LxldAMBlYV3aOP57" },
  ],
};
