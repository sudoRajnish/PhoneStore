import { useState } from "react";
import "./InfoTabs.css";

// Generic — pass any `tabs: [{ id, label, content }]`. Reusable anywhere a
// page needs a simple tabbed content panel, not just Product Details.
function InfoTabs({ tabs }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === activeId) || tabs[0];

  return (
    <div className="info-tabs">
      <div className="info-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeId}
            className={`info-tabs__tab ${tab.id === activeId ? "is-active" : ""}`}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="info-tabs__panel" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
}

export default InfoTabs;
