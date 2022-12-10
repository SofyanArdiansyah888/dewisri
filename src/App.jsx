import ScrollToTop from "@/base-components/scroll-to-top/Main";

import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./hooks/useAuth";
import { ErrorProvider } from "./hooks/useError";
import { SuccessProvider } from "./hooks/useSuccess";
import Router from "./router";
function App() {
  return (
    <RecoilRoot>
      <SuccessProvider>
        <ErrorProvider>
          <AuthProvider>
            <HashRouter>
              <Router />
              <ScrollToTop />
            </HashRouter>
          </AuthProvider>
        </ErrorProvider>
      </SuccessProvider>
    </RecoilRoot>
  );
}

export default App;
