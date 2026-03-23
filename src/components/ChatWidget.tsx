import { useEffect, useState } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const track = (type: string) => {
    if ((window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: `G-W9MPECEH43/${type}`,
      });
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-box">
         <div className="chat-header">
  <div className="chat-title">
    <span>Kontaktirajte nas</span>
    <div className="status">
      <span className="dot"></span>
      Online sada
    </div>
  </div>

  <button onClick={() => setOpen(false)}>×</button>
</div>

          <div className="chat-body">
      <p>Pišite nam za ponudu ili demo uređaja 👇</p>

       <a
  href="https://wa.me/381640137706?text=Zdravo,%20zanima%20me%20GPS%20tracking"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => track("whatsapp")}
  className="btn whatsapp"
>
  WhatsApp
</a>

            <a
              href="viber://chat?number=%2B381640137706"
              onClick={() => track("viber")}
              className="btn viber"
            >
              Viber
            </a>

            <a
              href="tel:+381640137706"
              onClick={() => track("phone")}
              className="btn phone"
            >
              Pozovi
            </a>
          </div>
        </div>
      )}

      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>
    </div>
  );
}