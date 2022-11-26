import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./hooks/useAuth";
import Router from "./router";

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <Router />
          <ScrollToTop />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
