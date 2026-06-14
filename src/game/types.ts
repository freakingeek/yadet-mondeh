export type TimerDuration = 10 | 15 | 30 | 45 | "unlimited";
export type RoundCount = 3 | 5 | 10;
export type ChangeQuestionMode = 1 | 2 | "unlimited";

export type Player = {
  id: string;
  name: string;
};

export type GameSettings = {
  timerSeconds: TimerDuration;
  rounds: RoundCount;
  changeQuestionMode: ChangeQuestionMode;
  basePoints: number;
  changePenalty: number;
};

export type Question = {
  id: string;
  text: string;
  answer: string;
  targetPlayerId?: string;
  templateId: string;
};

export type SetupDraft = {
  players: Player[];
  settings: GameSettings;
};

export type TurnResult = {
  playerId: string;
  roundNumber: number;
  questionId: string;
  pointsAwarded: number;
  outcome: "success" | "fail";
};

export type GamePhase = "turn-intro" | "question" | "success" | "fail" | "finished";

export type GameSession = {
  players: Player[];
  settings: GameSettings;
  scores: Record<string, number>;
  roundIndex: number;
  playerTurnIndex: number;
  phase: GamePhase;
  currentQuestion?: Question;
  currentTurnPoints: number;
  changesUsedThisTurn: number;
  usedQuestionIds: string[];
  results: TurnResult[];
};
