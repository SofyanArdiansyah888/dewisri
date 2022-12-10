import ScrollToTop from "@/base-components/scroll-to-top/Main";

import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./hooks/useAuth";
import { ErrorProvider } from "./hooks/useError";
import Router from "./router";
function App() {

  return (
    <RecoilRoot>
      <ErrorProvider>
        <AuthProvider>
          <HashRouter>
            <Router />
            <ScrollToTop />
        
          </HashRouter>
        </AuthProvider>
      </ErrorProvider>
    </RecoilRoot>
  );
}

export default App;
