class PaGenerator extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="px-6 pb-16 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          <!-- Controls -->
          <div class="bg-pixel-card border border-pixel-border rounded-2xl p-6 space-y-5">
            <div>
              <label class="block text-xs font-mono text-pixel-muted mb-2 uppercase tracking-widest">Nombre</label>
              <input type="text" id="pa-name" placeholder="luna01, max, neo@example..." />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-pixel-muted mb-2 uppercase tracking-widest">Tamaño (px)</label>
                <input type="number" id="pa-size" value="128" min="8" max="512" step="8" />
              </div>
              <div>
                <label class="block text-xs font-mono text-pixel-muted mb-2 uppercase tracking-widest">Fondo</label>
                <select id="pa-bg-select">
                  <option value="">Transparente</option>
                  <optgroup label="Predefinidos">
                    <option value="blue-light">Azul claro</option>
                    <option value="blue-dark">Azul oscuro</option>
                    <option value="green-light">Verde claro</option>
                    <option value="green-dark">Verde oscuro</option>
                    <option value="yellow-light">Amarillo claro</option>
                    <option value="yellow-dark">Amarillo oscuro</option>
                    <option value="red-light">Rojo claro</option>
                    <option value="red-dark">Rojo oscuro</option>
                    <option value="pink-light">Rosa claro</option>
                    <option value="pink-dark">Rosa oscuro</option>
                    <option value="purple-light">Morado claro</option>
                    <option value="purple-dark">Morado oscuro</option>
                    <option value="cyan-light">Cyan claro</option>
                    <option value="cyan-dark">Cyan oscuro</option>
                    <option value="white">Blanco</option>
                    <option value="black">Negro</option>
                  </optgroup>
                  <optgroup label="Personalizado">
                    <option value="__custom__">Personalizado...</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <!-- Custom color picker -->
            <div id="pa-hex-wrap" class="hidden">
              <label class="block text-xs font-mono text-pixel-muted mb-2 uppercase tracking-widest">Color personalizado</label>
              <div class="flex items-center gap-3">
                <input type="color" id="pa-bghex" value="#1a1a2e"
                  style="width:48px; height:40px; padding:2px; border-radius:8px; border:1px solid #2a2a2e; background:#17171a; cursor:pointer;" />
                <span class="font-mono text-xs text-pixel-muted" id="pa-hex-label">#1a1a2e</span>
              </div>
            </div>

            <button id="pa-generate-btn"
              class="w-full bg-pixel-accent text-pixel-bg font-display font-semibold py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all text-sm tracking-wide">
              Generar avatar
            </button>

            <!-- URL generada -->
            <div id="pa-url-wrap" class="hidden">
              <label class="block text-xs font-mono text-pixel-muted mb-2 uppercase tracking-widest">URL</label>
              <div id="pa-url-box" class="font-mono text-xs bg-pixel-bg border border-pixel-border rounded-lg px-3 py-2 text-pixel-muted break-all"></div>
            </div>
          </div>

          <!-- Preview -->
          <div class="bg-pixel-card border border-pixel-border rounded-2xl p-6 flex flex-col items-center justify-center min-h-64 gap-4">
            <div id="pa-placeholder" class="text-center space-y-2">
              <div class="w-16 h-16 bg-pixel-border rounded-xl mx-auto flex items-center justify-center">
                <span class="text-pixel-muted text-2xl">?</span>
              </div>
              <p class="text-pixel-muted text-sm font-mono">Escribe un nombre y genera</p>
            </div>

            <div id="pa-avatar-wrap" class="hidden flex-col items-center gap-4">
              <div class="rounded-xl overflow-hidden">
                <img id="pa-avatar-img" class="avatar-preview block" alt="avatar" />
              </div>
              <a id="pa-download-btn"
                class="text-xs font-mono text-pixel-accent border border-pixel-accent px-4 py-2 rounded-lg hover:bg-pixel-accent hover:text-pixel-bg transition-all"
                download="avatar.png">
                Descargar PNG
              </a>
            </div>
          </div>

        </div>
      </section>
    `;

        this._bindEvents();
    }

    _bindEvents() {
        const bgSelect = this.querySelector('#pa-bg-select');
        const hexWrap  = this.querySelector('#pa-hex-wrap');
        const hexInput = this.querySelector('#pa-bghex');
        const hexLabel = this.querySelector('#pa-hex-label');
        const nameInput = this.querySelector('#pa-name');
        const btn      = this.querySelector('#pa-generate-btn');

        bgSelect.addEventListener('change', () => {
            hexWrap.classList.toggle('hidden', bgSelect.value !== '__custom__');
        });

        hexInput.addEventListener('input', () => {
            hexLabel.textContent = hexInput.value;
        });

        btn.addEventListener('click', () => this.generate());

        nameInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') this.generate();
        });
    }

    generate(prefillName = null, prefillBg = null) {
        const nameInput = this.querySelector('#pa-name');
        const bgSelect  = this.querySelector('#pa-bg-select');
        const hexInput  = this.querySelector('#pa-bghex');

        if (prefillName) nameInput.value = prefillName;
        if (prefillBg)   bgSelect.value  = prefillBg;

        const name = nameInput.value.trim();
        if (!name) { alert('Escribe un nombre primero.'); return; }

        const size = parseInt(this.querySelector('#pa-size').value) || 128;
        const bgVal = bgSelect.value;
        const hex   = hexInput.value.replace('#', '');
        const bg    = bgVal === '__custom__' ? hex : bgVal;

        let url = `/${encodeURIComponent(name)}?size=${size}`;
        if (bg) url += `&bg=${bg}`;

        const img         = this.querySelector('#pa-avatar-img');
        const placeholder = this.querySelector('#pa-placeholder');
        const avatarWrap  = this.querySelector('#pa-avatar-wrap');
        const urlWrap     = this.querySelector('#pa-url-wrap');
        const urlBox      = this.querySelector('#pa-url-box');
        const dlBtn       = this.querySelector('#pa-download-btn');

        img.onload = () => {
            const displaySize = Math.min(size, 200);
            img.style.width  = displaySize + 'px';
            img.style.height = displaySize + 'px';
            placeholder.classList.add('hidden');
            avatarWrap.classList.remove('hidden');
            avatarWrap.classList.add('flex');
            urlBox.textContent = window.location.origin + url;
            urlWrap.classList.remove('hidden');
            dlBtn.href = url;
        };

        img.src = url;
    }
}

customElements.define('pa-generator', PaGenerator);