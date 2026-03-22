class PaHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <header class="p-4 md:px-12 xl:px-20 ">
        <div class="flex items-center justify-between px-4 py-2 md:px-6 md:py-3 pixel-border bg-cornsilk font-display text-2xl md:text-3xl font-bold">
            <a href="/" class="text-grape">
                Pixel Avatar Generator
            </a>
            <div class="flex items-center justify-center gap-4 md:gap-6">
                <a href="#docs" class="text-grape/80 hover:text-grape text-lg md:text-2xl font-display font-bold">Docs</a>
                <a href="https://github.com/melisapo/pixel-avatar-api" class="text-grape/80 hover:text-grape">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M23 9v6h-1v2h-1v2h-1v1h-1v1h-1v1h-2v1h-1v-5h-1v-1h1v-1h2v-1h1v-1h1V9h-1V6h-2v1h-1v1h-1V7h-4v1H9V7H8V6H6v3H5v5h1v1h1v1h2v2H7v-1H6v-1H4v1h1v2h1v1h3v3H8v-1H6v-1H5v-1H4v-1H3v-2H2v-2H1V9h1V7h1V5h1V4h1V3h2V2h2V1h6v1h2v1h2v1h1v1h1v2h1v2z"/></svg>
                </a>
            </div>
        </div>
      </header>
    `;
    }
}

customElements.define('pa-header', PaHeader);