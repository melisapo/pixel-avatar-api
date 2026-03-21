const SAMPLE_NAMES = [
    'luna01', 'neo', 'cupido', 'max', 'aria', 'pixel',
    'zorka', 'eve', 'byte', 'nova', 'rex', 'mochi',
    'ash', 'zara', 'echo', 'finn', 'iris', 'koda'
];

const SAMPLE_BGS = [
    'purple-dark', 'blue-dark', 'cyan-dark',
    'green-dark', 'pink-dark', 'yellow-dark'
];

class PaSamples extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="px-6 pb-20 max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display text-xl font-semibold text-pixel-text">Ejemplos</h2>
          <button id="pa-reshuffle"
            class="text-xs font-mono text-pixel-muted border border-pixel-border px-3 py-1.5 rounded-lg hover:border-pixel-accent hover:text-pixel-accent transition-all">
            Regenerar
          </button>
        </div>
        <div id="pa-samples-grid" class="grid grid-cols-3 sm:grid-cols-6 gap-4"></div>
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
            const bg = SAMPLE_BGS[i];

            const wrap = document.createElement('div');
            wrap.className = 'flex flex-col items-center gap-2 cursor-pointer group';
            wrap.addEventListener('click', () => {
                const generator = document.querySelector('pa-generator');
                generator.generate(name, bg);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            const img = document.createElement('img');
            img.src = `/${name}?size=64&bg=${bg}`;
            img.alt = name;
            img.className = 'sample-avatar rounded-xl w-16 h-16 group-hover:scale-110 transition-transform';

            const label = document.createElement('span');
            label.className = 'text-xs font-mono text-pixel-muted group-hover:text-pixel-accent transition-colors truncate w-full text-center';
            label.textContent = name;

            wrap.appendChild(img);
            wrap.appendChild(label);
            grid.appendChild(wrap);
        });
    }
}

customElements.define('pa-samples', PaSamples);