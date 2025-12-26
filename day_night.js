class DayNight extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" })
    const icon = document.createElement("div")
    
    icon.setAttribute("class", "darkmode_icon")
    for (let i = 0; i < 8; i++) {
      const ray = document.createElement("span")
      ray.setAttribute("class", "ray")
      icon.appendChild(ray)
    }

    const style = document.createElement("style")
    style.textContent = `
      .darkmode_icon {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: var(--header);
        transform-origin: center center;
        transition: transform 0.75s ease-in-out, var(--page-color-transition);
        cursor: pointer;
      }

      .darkmode_icon::after {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        left: 8px;
        bottom: 4px;
        border-radius: 10px;
        background: var(--background);
        transform-origin: center center;
        transition: transform 0.5s ease, left 0.25s ease, bottom 0.25s ease, var(--page-color-transition);
      }

      .darkmode_icon .ray {
        position: absolute;
        left: 7px;
        top: 7px;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: var(--header);
        transform-origin: center;
        transition: transform 0.5s ease-in-out, var(--page-color-transition);
      }

      .ray:nth-child(1) {
        transform: rotate(45deg) translateX(0);
      }
      .ray:nth-child(2) {
        transform: rotate(90deg) translateX(0);
      }
      .ray:nth-child(3) {
        transform: rotate(135deg) translateX(0);
      }
      .ray:nth-child(4) {
        transform: rotate(180deg) translateX(0);
      }
      .ray:nth-child(5) {
        transform: rotate(225deg) translateX(0);
      }
      .ray:nth-child(6) {
        transform: rotate(270deg) translateX(0);
      }
      .ray:nth-child(7) {
        transform: rotate(315deg) translateX(0);
      }
      .ray:nth-child(8) {
        transform: rotate(360deg) translateX(0);
      }

      :host-context([data-theme="dark"]) {
        & .darkmode_icon {
          transform: scale(0.6);
        }
        & .darkmode_icon::after {
          left: 15px;
          bottom: 8px;
          transform: scale(0);
        }
        & .ray:nth-child(1) {
          transform: rotate(45deg) translateX(-16px);
        }
        & .ray:nth-child(2) {
          transform: rotate(90deg) translateX(-16px);
        }
        & .ray:nth-child(3) {
          transform: rotate(135deg) translateX(-16px);
        }
        & .ray:nth-child(4) {
          transform: rotate(180deg) translateX(-16px);
        }
        & .ray:nth-child(5) {
          transform: rotate(225deg) translateX(-16px);
        }
        & .ray:nth-child(6) {
          transform: rotate(270deg) translateX(-16px);
        }
        & .ray:nth-child(7) {
          transform: rotate(315deg) translateX(-16px);
        }
        & .ray:nth-child(8) {
          transform: rotate(360deg) translateX(-16px);
        }
      }
    `

    shadow.appendChild(icon)
    shadow.appendChild(style)
  }
}

customElements.define("day-night", DayNight)
