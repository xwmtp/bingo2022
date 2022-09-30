import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Content } from "./components/Content";
import { AboutPage } from "./pages/AboutPage";
import { ModalProvider } from "styled-react-modal";
import { ResultsPage } from "./pages/ResultsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { Page } from "./components/Page";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 3,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={"/"}>
        <ModalProvider>
          <Header />
          <Content>
            <Routes>
              <Route path={"/"} element={<Page children={<LeaderboardPage />} />} />
              <Route path={"/leaderboard"} element={<Page children={<LeaderboardPage />} />} />
              {/*<Route path={"/schedule"} element={<Page children={<SchedulePage />} />} />*/}
              <Route path={"/results"} element={<Page children={<ResultsPage />} />} />
              <Route path={"/about"} element={<Page children={<AboutPage />} />} />
              {/*<Route path={"/profile"} element={<Page children={<ProfilePage />} />}>*/}
              {/*  <Route path={"settings"} element={<Page children={<ProfileSettingsPage />} />} />*/}
              {/*  <Route path={"matches"} element={<Page children={<MyMatchesPage />} />} />*/}
              {/*  <Route path={"admin"} element={<Page children={<AdminPage />} />} />*/}
              {/*</Route>*/}

              {/*<Route*/}
              {/*  path={"pairing"}*/}
              {/*  element={<Page width={"100%"} children={<PairingPage />} />}*/}
              {/*/>*/}
              {/*<Route path={"stats"} element={<Page children={<StatsPage />} />} />*/}
            </Routes>
          </Content>
        </ModalProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
