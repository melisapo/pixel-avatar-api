class PaHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <header class="border-b border-pixel-border px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-pixel-accent rounded flex items-center justify-center">
            <span style="font-size:16px">★</span>
          </div>
          <span class="font-display font-bold text-lg tracking-tight text-pixel-text">PixelAvatar</span>
        </div>
        <a href="#docs" class="text-pixel-muted hover:text-pixel-text text-sm font-mono transition-colors">Docs</a>
      </header>
    `;
    }
}

customElements.define('pa-header', PaHeader);