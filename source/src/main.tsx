import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

function fit() {
  const vv = window.visualViewport;
  const w = vv ? vv.width : innerWidth, h = vv ? vv.height : innerHeight;
  const phone = w <= 500, pad = phone ? 0 : 32;
  let s = Math.min((w - pad) / 402, (h - pad) / 874);
  if (!phone) s = Math.min(s, 1);
  document.documentElement.style.setProperty("--fit", s.toFixed(4));
  document.documentElement.classList.toggle("hf-mobile", phone);
}
fit();
addEventListener("resize", fit);
addEventListener("orientationchange", fit);
window.visualViewport?.addEventListener("resize", fit);

createRoot(document.getElementById("root")!).render(<App />);
