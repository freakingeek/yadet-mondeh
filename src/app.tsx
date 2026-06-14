import "./app.css";
import Nav from "@/components/Nav";
import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { GameProvider } from "@/game/state";

export default function App() {
  return (
    <GameProvider>
      <Router
        root={props => (
          <>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </GameProvider>
  );
}
