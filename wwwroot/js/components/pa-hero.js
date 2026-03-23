class PaHero extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="pt-12 px-6 md:pt-20 md:pb-16 max-w-7xl mx-auto text-center">
        <h1 class="font-display font-medium text-3xl md:text-5xl text-grape mb-4 md:mb-8">
          Turn anything into a pixel identity.
        </h1>
        <p class="text-grape/90 font-mono max-w-lg mx-auto text-md md:text-lg lg:text-xl font-bold">
            Drop any word, name, or weird string and watch it turn into its own little pixel character.        
        </p>
      </section>
    `;
    }
}

customElements.define('pa-hero', PaHero);