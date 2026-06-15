import { createContext, useContext, type ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { DEFAULT_SETTINGS } from "@/game/constants";
import { clearStoredPlayerNames, saveStoredPlayerNames } from "@/game/player-names-storage";
import { createEmptyPlayer } from "@/game/players";
import { createQuestion } from "@/game/questions";
import { canChangeQuestion, getPointsAfterQuestionChange } from "@/game/scoring";
import { createDefaultSettings, createDefaultSetupDraft } from "@/game/settings";
import type { GameSession, GameSettings, Player, SetupDraft, TurnResult } from "@/game/types";

function persistSetupPlayerNames(players: Player[]) {
  saveStoredPlayerNames(players.map(player => player.name));
}

type GameState = {
  session?: GameSession;
  setupDraft: SetupDraft;
};

type GameContextValue = {
  readonly session: GameSession | undefined;
  readonly setupDraft: SetupDraft;
  currentPlayer: () => Player | undefined;
  isLastTurn: () => boolean;
  setSetupPlayers: (players: Player[]) => void;
  updateSetupPlayerName: (id: string, name: string) => void;
  setSetupSettings: (settings: GameSettings) => void;
  resetSetupDraft: () => void;
  startGame: (players: Player[], settings: GameSettings) => void;
  beginTurn: () => void;
  changeQuestion: () => void;
  markSuccess: () => void;
  markFail: () => void;
  nextTurn: () => void;
  restartSameSettings: () => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextValue>();

function makeInitialScores(players: Player[]) {
  return players.reduce<Record<string, number>>((scores, player) => {
    scores[player.id] = 0;
    return scores;
  }, {});
}

function createSession(players: Player[], settings: GameSettings): GameSession {
  return {
    players,
    settings,
    scores: makeInitialScores(players),
    roundIndex: 0,
    playerTurnIndex: 0,
    phase: "turn-intro",
    currentTurnPoints: settings.basePoints,
    changesUsedThisTurn: 0,
    usedQuestionIds: [],
    results: [],
  };
}

export function GameProvider(props: ParentProps) {
  const [state, setState] = createStore<GameState>({
    setupDraft: createDefaultSetupDraft(),
  });

  const currentPlayer = () => {
    const session = state.session;
    if (!session) return undefined;
    return session.players[session.playerTurnIndex];
  };

  const isLastTurn = () => {
    const session = state.session;
    if (!session) return false;

    return (
      session.roundIndex === session.settings.rounds - 1 &&
      session.playerTurnIndex === session.players.length - 1
    );
  };

  const beginTurn = () => {
    const session = state.session;
    const player = currentPlayer();
    if (!session || !player) return;

    const question = createQuestion({
      players: session.players,
      currentPlayer: player,
      usedQuestionIds: session.usedQuestionIds,
    });

    setState("session", {
      phase: "question",
      currentQuestion: question,
      currentTurnPoints: session.settings.basePoints,
      changesUsedThisTurn: 0,
    });
  };

  const addResult = (outcome: TurnResult["outcome"], pointsAwarded: number) => {
    const session = state.session;
    const player = currentPlayer();
    const question = session?.currentQuestion;
    if (!session || !player || !question || session.phase !== "question") return;

    const result: TurnResult = {
      playerId: player.id,
      roundNumber: session.roundIndex + 1,
      questionId: question.id,
      pointsAwarded,
      outcome,
    };

    setState("session", {
      scores: {
        ...session.scores,
        [player.id]: (session.scores[player.id] ?? 0) + pointsAwarded,
      },
      phase: outcome === "success" ? "success" : "fail",
      usedQuestionIds: [...session.usedQuestionIds, question.id],
      results: [...session.results, result],
    });
  };

  const value: GameContextValue = {
    get session() {
      return state.session;
    },
    get setupDraft() {
      return state.setupDraft;
    },
    currentPlayer,
    isLastTurn,
    setSetupPlayers(players) {
      setState("setupDraft", "players", players);
      persistSetupPlayerNames(players);
    },
    updateSetupPlayerName(id, name) {
      const playerIndex = state.setupDraft.players.findIndex(player => player.id === id);
      if (playerIndex === -1) return;
      setState("setupDraft", "players", playerIndex, "name", name);
      persistSetupPlayerNames(
        state.setupDraft.players.map((player, index) =>
          index === playerIndex ? { ...player, name } : player,
        ),
      );
    },
    setSetupSettings(settings) {
      setState("setupDraft", "settings", settings);
    },
    resetSetupDraft() {
      clearStoredPlayerNames();
      setState("setupDraft", {
        players: [createEmptyPlayer(1), createEmptyPlayer(2)],
        settings: createDefaultSettings(),
      });
    },
    startGame(players, settings) {
      setState("session", createSession(players, { ...DEFAULT_SETTINGS, ...settings }));
    },
    beginTurn,
    changeQuestion() {
      const session = state.session;
      const player = currentPlayer();
      if (!session || !player || session.phase !== "question") return;
      if (!canChangeQuestion(session.settings.changeQuestionMode, session.changesUsedThisTurn)) return;

      const question = createQuestion({
        players: session.players,
        currentPlayer: player,
        usedQuestionIds: [...session.usedQuestionIds, session.currentQuestion?.id ?? ""],
      });

      setState("session", {
        currentQuestion: question,
        changesUsedThisTurn: session.changesUsedThisTurn + 1,
        currentTurnPoints: getPointsAfterQuestionChange(
          session.settings.changeQuestionMode,
          session.currentTurnPoints,
          session.settings.changePenalty,
        ),
      });
    },
    markSuccess() {
      const session = state.session;
      if (!session) return;
      addResult("success", session.currentTurnPoints);
    },
    markFail() {
      addResult("fail", 0);
    },
    nextTurn() {
      const session = state.session;
      if (!session) return;

      if (isLastTurn()) {
        setState("session", {
          phase: "finished",
          currentQuestion: undefined,
        });
        return;
      }

      const nextPlayerIndex = session.playerTurnIndex + 1;
      const startsNextRound = nextPlayerIndex >= session.players.length;

      setState("session", {
        phase: "turn-intro",
        currentQuestion: undefined,
        currentTurnPoints: session.settings.basePoints,
        changesUsedThisTurn: 0,
        playerTurnIndex: startsNextRound ? 0 : nextPlayerIndex,
        roundIndex: startsNextRound ? session.roundIndex + 1 : session.roundIndex,
      });
    },
    restartSameSettings() {
      const session = state.session;
      if (!session) return;
      setState("session", createSession(session.players, session.settings));
    },
    resetGame() {
      setState("session", undefined);
    },
  };

  return <GameContext.Provider value={value}>{props.children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }

  return context;
}
