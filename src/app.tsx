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
          <div class="flex h-full min-h-0 flex-col overflow-hidden">
            <Nav />
            <div class="flex-1 min-h-0 overflow-hidden">
              <Suspense>{props.children}</Suspense>
            </div>
          </div>
        )}
      >
        {FileRoutes()}
      </Router>
    </GameProvider>
  );
}
