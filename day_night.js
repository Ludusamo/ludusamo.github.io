class DayNight extends HTMLElement {
  static get observedAttributes() {
    return ["theme"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
    this.setupAccessibility();
  }

  toggleTheme() {
    const current = this.getAttribute("theme") || "light";
    const newTheme = current === "light" ? "dark" : "light";
    
    this.setAttribute("theme", newTheme);

    this.dispatchEvent(new CustomEvent("theme-change", {
      detail: { theme: newTheme },
      bubbles: true,
      composed: true
    }));
  }

  setupEvents() {
    this.addEventListener("click", () => this.toggleTheme());

    this.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  setupAccessibility() {
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "Toggle dark mode");
  }

  render() {
    const style = document.createElement("style");
    style.textContent = `
      .darkmode_icon {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--toggle-night-color, #4A4E69);
        transform-origin: center center;
        transition: transform 0.75s ease-in-out;
        cursor: pointer;
      }

      .darkmode_icon::after {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        left: 8px;
        bottom: 4px;
        border-radius: 50%;
        background: var(--toggle-bg-color, #F0F0F0);
        transition: transform 0.5s ease, left 0.25s ease, bottom 0.25s ease;
      }

      .ray {
        position: absolute;
        left: 7px;
        top: 7px;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: var(--toggle-day-color, #c9ada7);
        transition: transform 0.5s ease-in-out;
        opacity: 0;
      }

      /* Generated Rays via CSS loops aren't possible, so hardcoded children */
      .ray:nth-child(1) { transform: rotate(45deg) translateX(0); }
      .ray:nth-child(2) { transform: rotate(90deg) translateX(0); }
      .ray:nth-child(3) { transform: rotate(135deg) translateX(0); }
      .ray:nth-child(4) { transform: rotate(180deg) translateX(0); }
      .ray:nth-child(5) { transform: rotate(225deg) translateX(0); }
      .ray:nth-child(6) { transform: rotate(270deg) translateX(0); }
      .ray:nth-child(7) { transform: rotate(315deg) translateX(0); }
      .ray:nth-child(8) { transform: rotate(360deg) translateX(0); }

      /* Dark Mode State */
      :host([theme="dark"]) .darkmode_icon { 
        transform: scale(0.6); 
        background: var(--toggle-day-color, #c9ada7);
      }
      :host([theme="dark"]) .darkmode_icon::after { 
        opacity: 0;
        transform: scale(0);
        left: 15px;
        bottom: 8px; 
        background: var(--toggle-day-color, #c9ada7);
      }
      :host([theme="dark"]) .ray { opacity: 1; }
      :host([theme="dark"]) .ray:nth-child(1) { transform: rotate(45deg) translateX(-16px); }
      :host([theme="dark"]) .ray:nth-child(2) { transform: rotate(90deg) translateX(-16px); }
      :host([theme="dark"]) .ray:nth-child(3) { transform: rotate(135deg) translateX(-16px); }
      :host([theme="dark"]) .ray:nth-child(4) { transform: rotate(180deg) translateX(-16px); }
      :host([theme="dark"]) .ray:nth-child(5) { transform: rotate(225deg) translateX(-16px); }
      :host([theme="dark"]) .ray:nth-child(6) { transform: rotate(270deg) translateX(-16px); }
      :host([theme="dark"]) .ray:nth-child(7) { transform: rotate(315deg) translateX(-16px); }
      :host([theme="dark"]) .ray:nth-child(8) { transform: rotate(360deg) translateX(-16px); }
    `;

    const icon = document.createElement("div");
    icon.className = "darkmode_icon";
    
    // Create rays
    for (let i = 0; i < 8; i++) {
      const ray = document.createElement("span");
      ray.className = "ray";
      icon.appendChild(ray);
    }

    this.shadowRoot.replaceChildren(style, icon);
  }
}

customElements.define("day-night", DayNight);
