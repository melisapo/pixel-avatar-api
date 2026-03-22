const SAMPLE_NAMES = [
    'luna01', 'neo', 'cupido', 'max', 'aria', 'pixel',
    'zorka', 'eve', 'byte', 'nova', 'rex', 'mochi',
    'ash', 'zara', 'echo', 'finn', 'iris', 'koda'
];

class PaSamples extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="px-2 md:px-6 py-4 md:pb-10 max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-6 px-2">
          <h2 class="font-display font-medium text-3xl md:text-4xl text-grape">Here are some examples</h2>
          <button id="pa-reshuffle"
            class="text-xl md:text-2xl font-medium font-display pixel-border-sm cursor-pointer text-grape px-4 py-1 hover:bg-grape hover:text-cornsilk transition-colors">
            Reshuffle
          </button>
        </div>
        <div id="pa-samples-grid" class="grid grid-cols-3 lg:grid-cols-6 gap-4"></div>
      </section>
    `;

        this.querySelector('#pa-reshuffle').addEventListener('click', () => this._load());
        this._load();
    }

    _load() {
        const grid = this.querySelector('#pa-samples-grid');
        grid.innerHTML = '';

        const picks = [...SAMPLE_NAMES].sort(() => Math.random() - 0.5).slice(0, 6);

        picks.forEach((name, i) => {
            const wrap = document.createElement('div');
            wrap.className = 'flex flex-col items-center gap-2 cursor-pointer group';
            wrap.addEventListener('click', () => {
                const generator = document.querySelector('pa-generator');
                generator.generate(name);
                window.scrollTo({ top: 50, behavior: 'smooth' });
            });

            const img = document.createElement('img');
            img.src = `/${name}?size=64&bg=FDF8E2`;
            img.alt = name;
            img.className = 'w-24 h-24 md:w-28 md:h-28 pixel-border-sm group-hover:scale-105 transition-transform';

            wrap.appendChild(img);
            grid.appendChild(wrap);
        });
    }
}

customElements.define('pa-samples', PaSamples);