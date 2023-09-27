import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Home from "./components/Home";


ReactDOM.render(
    <RecoilRoot>
        <Home />
    </RecoilRoot>,
  document.getElementById("root")
);