class PaHero extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="pt-12 px-6 md:pt-20 md:pb-16 max-w-7xl mx-auto text-center">
        <h1 class="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-grape mb-4">
          Tu nombre, tu avatar.
        </h1>
        <p class="text-grape/90 font-mono max-w-lg mx-auto text-md md:text-lg lg:text-xl font-bold">
          Avatares pixel art únicos y determinísticos. El mismo nombre produce siempre el mismo resultado.
        </p>
      </section>
    `;
    }
}

customElements.define('pa-hero', PaHero);