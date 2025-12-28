import React, { useEffect, useState } from "react";
import "./Article.css";

const TAG_MAP = {
  title: "h1",
  subtitle: "h2",
  paragraph: "p",
  p: "p",
  image: "img",
  img: "img",
  list: "ul",
  ul: "ul",
  ol: "ol",
  li: "li",
  gallery: "div",
  images: "div",
  media: "video",
  video: "video",
};

function xmlNodeToJsx(node, key) {
  if (!node) return null;
  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;
  if (node.nodeType === TEXT_NODE) {
    const txt = node.nodeValue;
    return txt && txt.trim() ? txt : null;
  }
  if (node.nodeType !== ELEMENT_NODE) return null;

  const tag = node.nodeName.toLowerCase();
  const mappedTag = TAG_MAP[tag] || "div";

  // special handling for <media/> or <video/>
  if (tag === "media" || tag === "video") {
    const src = node.getAttribute("src") || "";
    const type = node.getAttribute("type") || "video/mp4";
    const poster = node.getAttribute("poster") || "";
    return (
      <div key={key} className="media_video">
        <video controls autoPlay poster={poster}>
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // special handling for <image/>
  if (tag === "image") {
    const src = node.getAttribute("src") || "";
    const alt = node.getAttribute("alt") || "";
    return (
      <div key={key} className="image_single">
        <img src={src} alt={alt} />
      </div>
    );
  }

  // gallery -> grid of images
  if (tag === "gallery" || tag === "images") {
    const children = Array.from(node.childNodes)
      .map((n, i) => {
        if (
          n.nodeType === ELEMENT_NODE &&
          (n.nodeName.toLowerCase() === "image" ||
            n.nodeName.toLowerCase() === "img")
        ) {
          const src = n.getAttribute("src") || "";
          const alt = n.getAttribute("alt") || "";
          return (
            <div key={`${key}-img-${i}`} className="image_split_item">
              <img src={src} alt={alt} />
            </div>
          );
        }
        return null;
      })
      .filter(Boolean);

    return (
      <div key={key} className="image_split">
        {children}
      </div>
    );
  }

  const Tag = mappedTag;

  const props = {};
  if (node.attributes) {
    for (let i = 0; i < node.attributes.length; i++) {
      const a = node.attributes[i];
      const name = a.name;
      const value = a.value;
      if (name === "src" || name === "href" || name === "alt")
        props[name] = value;
      else props[`data-${name}`] = value;
    }
  }

  const children = Array.from(node.childNodes)
    .map((n, i) => xmlNodeToJsx(n, `${key}-${i}`))
    .filter(Boolean);

  return (
    <Tag key={key} {...props}>
      {children.length ? children : null}
    </Tag>
  );
}

export default function Article({ isOpen, onClose, children, xml }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [xmlReact, setXmlReact] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchXml() {
      if (!isOpen || !xml) {
        setXmlReact(null);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setXmlReact(null);

      try {
        const res = await fetch(xml);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const text = await res.text();

        if (cancelled) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "application/xml");
        const parseError = doc.querySelector("parsererror");
        if (parseError) throw new Error("Invalid XML");

        const root = doc.documentElement;
        const jsx = Array.from(root.childNodes)
          .map((n, i) => xmlNodeToJsx(n, `root-${i}`))
          .filter(Boolean);

        setXmlReact(jsx);
      } catch (e) {
        if (!cancelled) setError(e.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchXml();

    return () => {
      cancelled = true;
    };
  }, [isOpen, xml]);

  if (!isOpen) return null;

  return (
    <div className="article__container">
      <div className="header">
        <div className="header-content">
          <div className="article__center">
            <div className="article__title"></div>
          </div>
          <div className="article__controls">
            <button className="exit-menu" onClick={onClose}>
              <span className="exit-line active" />
              <span className="exit-line active" />
            </button>
          </div>
        </div>
      </div>

      <div className="content">
        {loading && <div className="article__status">Loading...</div>}
        {error && (
          <div className="article__status article__status--error">{error}</div>
        )}

        <div className="article__render base_text">{xmlReact}</div>

        {!xml && !loading && !xmlReact && (
          <div className="base_text">No XML selected.</div>
        )}

        {!xmlReact && children}
      </div>
    </div>
  );
}
