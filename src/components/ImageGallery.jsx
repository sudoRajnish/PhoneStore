import { useState } from "react";
import PhoneMockup from "./PhoneMockup.jsx";
import "./ImageGallery.css";

// There's no real product photography yet, so each "view" reuses the same
// PhoneMockup illustration with a different CSS transform to stand in for
// front/back/side angles. Swap this for a real `images: []` array from the
// API later — the thumbnail-switching logic below doesn't need to change.
const VIEWS = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back", flip: true },
  { id: "side", label: "Side", rotate: 18 },
];

function ImageGallery({ color, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeView = VIEWS[activeIndex];

  return (
    <div className="image-gallery">
      <div className="image-gallery__main">
        <PhoneMockup
          accent={color}
          className="image-gallery__phone"
          style={{
            transform: `${activeView.flip ? "scaleX(-1) " : ""}${
              activeView.rotate ? `rotate(${activeView.rotate}deg)` : ""
            }`,
          }}
        />
      </div>

      <div className="image-gallery__thumbs" role="tablist" aria-label={`${productName} views`}>
        {VIEWS.map((view, index) => (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`image-gallery__thumb ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <PhoneMockup
              accent={color}
              style={{
                transform: `${view.flip ? "scaleX(-1) " : ""}${view.rotate ? `rotate(${view.rotate}deg)` : ""}`,
              }}
            />
            <span>{view.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
