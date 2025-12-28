import React from "react";
import "./Grid.css";
import Article from "./Article";

const items = [
  {
    id: 1,
    aspect: "9_16",
    image: "build_01_v02.gif",
    title: "BUILD EINS",
    xml: "build_eins.xml",
    text: "A hand-built gravel bicycle frame distinguished by silver fillet brazing and meticulous craftsmanship",
  },
  {
    id: 2,
    aspect: "16_9",
    image: "cenurion_loop.gif",
    title: "CENTURION RESURRECTION #1",
    xml: "rec_centurion.xml",
    text: "An ’90s bicycle rescued from the scrapyard, refined into excellence.",
  },
  {
    id: 3,
    aspect: "1_1",
    image: "",
    title: "WE LOVE",
    title_color: "#585858ff",
    text: "We craft custom bicycles and breathe new life into old ones, blending timeless design with modern performance to create rides as unique as their riders",
  },
  {
    id: 4,
    aspect: "1_1",
    image: "pigeon_head.gif",
    title: "",
    text: "The underestimated pigeon: gritty, street-smart, and quietly unstoppable.",
  },
  {
    id: 5,
    aspect: "9_16",
    image: "",
    title: "",
    text: "",
  },
];

export default function Grid({
  onItemClick,
  articleIsOpen,
  articleOnClose,
  articleXml,
}) {
  return (
    <div className={`grid-container ${articleIsOpen ? "article-open" : ""}`}>
      {items.map((it) => (
        <GridItem key={it.id} props={it} onItemClick={onItemClick} />
      ))}
      <Article
        isOpen={articleIsOpen}
        onClose={articleOnClose}
        xml={articleXml}
      />
    </div>
  );
}

function GridItem({ props, onItemClick }) {
  const box_class = "aspect_" + props.aspect;
  const image_name = "images/" + props.image;
  const hasXml = props.xml && props.xml.trim() !== "";

  return (
    <div
      className={`grid-item ${box_class} ${!hasXml ? "grid-item--disabled" : ""}`}
      onClick={() => hasXml && onItemClick && onItemClick(props.xml)}
    >
      <div className="inside_box">
        <div className="image_container">
          {props.image ? <img src={`${image_name}`} alt="" /> : null}
        </div>
        {props.title ? (
          <div className="title_container">
            <div
              className="text"
              style={
                props.title_color ? { color: props.title_color } : undefined
              }
            >
              {props.title}
            </div>
          </div>
        ) : null}

        {props.text ? (
          <div className="text_container">
            <div className="text">
              <span>{props.text}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
