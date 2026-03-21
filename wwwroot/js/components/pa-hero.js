class PaHero extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="px-6 pt-16 pb-10 max-w-5xl mx-auto text-center">
        <p class="text-pixel-accent font-mono text-xs tracking-widest uppercase mb-4">Avatar generator</p>
        <h1 class="font-display text-5xl font-bold leading-tight text-pixel-text mb-4">
          Tu nombre,<br/>tu avatar.
        </h1>
        <p class="text-pixel-muted text-base max-w-md mx-auto">
          Avatares pixel art únicos y determinísticos. El mismo nombre produce siempre el mismo resultado.
        </p>
      </section>
    `;
    }
}

customElements.define('pa-hero', PaHero);