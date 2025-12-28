import React, { useEffect, useState } from "react";
import "./Imprint.css";

export default function Imprint({ onClose }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/imprint.html")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load imprint");
        return res.text();
      })
      .then((html) => {
        setContent(html);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="imprint">
      <div className="imprint__header">
        <h1>Imprint</h1>
        <button className="imprint__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <div className="imprint__content">
        {loading && <div>Loading...</div>}
        {error && <div className="imprint__error">{error}</div>}
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
    </div>
  );
}
