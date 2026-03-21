class PaFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <footer class="border-t border-pixel-border px-6 py-6 text-center text-pixel-muted font-mono text-xs">
        PixelAvatar — ASP.NET Core 9 — MIT License
      </footer>
    `;
    }
}

customElements.define('pa-footer', PaFooter);