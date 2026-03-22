class PaGenerator extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="px-2 md:px-6 py-10 md:py-12 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">

          <!-- Controls -->
          <div class="bg-cornsilk pixel-border p-6 space-y-2 md:space-y-5 pr-8">
            <div>
              <label class="block md:text-lg font-mono font-bold text-grape mb-2 ">Seed</label>
              <input type="text" id="pa-name" placeholder="luna01, 1234, neo@example..." class="text-sm md:text-md w-full text-grape font-mono font-semibold py-1 px-2 focus:outline-none pixel-border-sm"/>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block md:text-lg font-mono font-bold text-grape mb-2 ">Size (px)</label>
                <input type="number" id="pa-size" value="256" min="8" max="512" step="8" class="text-sm md:text-md w-full focus:outline-none pixel-border-sm font-mono font-semibold text-grape/90 py-1 px-2 "/>
              </div>
              <div>
                <label class="block md:text-lg font-mono font-bold text-grape mb-2 ">Background</label>
                <select id="pa-bg-select" class="text-sm md:text-md w-full pixel-border-sm font-mono font-semibold focus:outline-none text-grape/90 py-1 px-2">
                  <option value="">Transparent</option>
                  <optgroup label="Light">
                    <option value="blue-light">Light Blue</option>
                    <option value="green-light">Light Green</option>
                    <option value="yellow-light">Light Yellow</option>
                    <option value="red-light">Light Red</option>
                    <option value="pink-light">Light Pink</option>
                    <option value="purple-light">Light Purple</option>
                    <option value="cyan-light">Light Cyan</option>
                    <option value="white">White</option>
                  </optgroup>
                  <optgroup label="Dark">
                    <option value="blue-dark">Dark Blue</option>
                    <option value="green-dark">Dark Green</option>
                    <option value="yellow-dark">Dark Yellow</option>
                    <option value="red-dark">Dark Red</option>
                    <option value="pink-dark">Dark Pink</option>
                    <option value="purple-dark">Dark Purple</option>
                    <option value="cyan-dark">Dark Cyan</option>
                    <option value="black">Black</option>
                  </optgroup>
                  <optgroup label="Custom">
                    <option value="__custom__">Customize...</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <!-- Custom color picker -->
            <div id="pa-hex-wrap" class="hidden">
              <label class="block md:text-lg font-mono font-bold text-grape mb-2 tracking-widest">Custom Color</label>
              <div class="flex items-center gap-3">
                <input type="color" id="pa-bghex" value="#454365"
                  style="width:48px; height:38px; padding:2px; cursor:pointer;" />
                <span class="font-mono font-semibold text-sm md:text-md text-grape/90" id="pa-hex-label">#454365</span>
              </div>
            </div>

            <button id="pa-generate-btn"
              class="w-full transition-all text-cornsilk bg-grape pixel-border hover:bg-grape/95 font-display font-semibold py-3 px-8 text-lg md:text-2xl tracking-wide cursor-pointer">
              Generate Avatar
            </button>

            <!-- URL generada -->
            <div id="pa-url-wrap" class="hidden mt-6 mb-6 w-full">
              <label class="md:text-lg font-mono font-bold text-grape mb-2 tracking-widest">URL</label>
              <div id="pa-url-box" class="font-mono font-semibold md:text-lg px-3 py-2 pixel-border-sm text-grape/80"></div>
            </div>
          </div>

          <!-- Preview -->
          <div class="bg-cornsilk pixel-border p-6 flex flex-col items-center justify-center min-h-64 gap-4">
            <div id="pa-placeholder" class="text-center flex flex-col justify-center">
              <div class="flex items-center justify-center text-grape mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><path fill="currentColor" d="M17.525 31.24v-1.52h3.04v-1.53h3.05v-1.52h3.05v-1.53h1.52v-1.52h1.53V8.38h-1.53V6.86h-1.52v1.52h-3.05v1.53h-3.05v1.52h-3.04v1.52h-3.05v1.53H16v15.24h-1.52v1.52Zm6.09-18.29h3.05v1.53h-3.05Zm-4.57 9.15H22.1v3.04h-3.05Zm4.57-16.76h3.05v1.52h-3.05Zm-3.05-1.53h3.05v1.53h-3.05Zm-3.04-1.52h3.04v1.52h-3.04Zm-3.05 4.57h3.05v3.05h-3.05Zm0-6.1h3.05v1.53h-3.05Zm-3.05 27.43h3.05v1.53h-3.05Z"/><path fill="currentColor" d="M11.425 11.43h3.05v1.52h-3.05Zm0-9.14h3.05v1.52h-3.05Zm0 19.81h3.05v3.04h-3.05Zm0-6.1h3.05v3.05h-3.05Zm-3.05 10.67h3.05v1.52h-3.05Zm0-16.76h3.05v1.52h-3.05Zm0-6.1h3.05v1.53h-3.05Zm-3.04 21.33h3.04v1.53h-3.04Zm0-16.76h3.04v1.53h-3.04Zm0-3.04h3.04v1.52h-3.04Zm0 13.71h3.04v3.05h-3.04Zm0-6.1h3.04V16h-3.04Zm-1.53 10.67h1.53v1.52h-1.53Zm0-16.76h1.53v1.52h-1.53Zm-1.52 1.52h1.52v15.24h-1.52Z"/></svg>
              </div>
              <p class="text-grape md:text-xl font-mono font-bold">Insert a seed and see what happens</p>
            </div>

            <div id="pa-avatar-wrap" class="hidden flex-col items-center gap-4">
              <div class="rounded-xl overflow-hidden min-h-64 mb-4 flex items-center justify-center">
                <img id="pa-avatar-img" class="avatar-preview block" alt="avatar" />
              </div>
              <a id="pa-download-btn"
                class="flex items-center justify-center gap-2 text-2xl font-display text-grape pixel-border px-8 py-2 hover:bg-grape hover:text-cornsilk transition-colors"
                download="avatar.png">
                Download PNG
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20h16v2H4zm7-18h2v16h-2zm2 12h2v2h-2zm2-2h2v2h-2zm2-2h2v2h-2zm-8 4h2v2H9zm-2-2h2v2H7zm-2-2h2v2H5z"/></svg>
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
        const nameInput= this.querySelector('#pa-name');
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