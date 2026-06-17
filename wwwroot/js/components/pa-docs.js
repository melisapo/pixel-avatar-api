class PaDocs extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="docs" class="py-6 md:pb-16 px-2 md:px-6 max-w-6xl mx-auto">
        <div class="pixel-border bg-cornsilk px-4 py-6">
            <h2 class="font-display font-medium text-3xl md:text-4xl pb-3 md:pb-5 text-grape">Docs</h2>
        <div class="space-y-8">
          <div>
            <p class="text-lg md:text-xl font-mono font-bold text-grape tracking-widest mb-3">Endpoint</p>
            <div class="pixel-border-sm p-2 md:px-4 md:py-3 font-mono font-semibold text-sm md:text-lg text-grape/90">
              GET /<span class="text-periwinkle">{name}</span>?size=<span class="text-periwinkle">{size}</span>&amp;bg=<span class="text-periwinkle">{color}</span>
            </div>
          </div>

          <div>
            <p class="text-lg md:text-xl font-mono font-bold text-grape tracking-widest mb-3">Params</p>
            <div class="pixel-border-sm overflow-x-scroll">
              <table class="w-full overflow-hidden">
                <thead>
                  <tr class="border-b-3 border-grape bg-periwinkle/35 md:text-lg">
                    <th class="text-left p-2 md:px-4 md:py-3 text-grape font-mono ">Param</th>
                    <th class="text-left p-2 md:px-4 md:py-3 text-grape font-mono ">Type</th>
                    <th class="text-left p-2 md:px-4 md:py-3 text-grape font-mono ">Default</th>
                    <th class="text-left p-2 md:px-4 md:py-3 text-grape font-mono ">Description</th>
                  </tr>
                </thead>
                <tbody class="font-mono text-sm md:text-lg">
                  <tr class="border-b-3 border-grape">
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-periwinkle">name</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-grape/85">string</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-grape/85">required</td>
                    <td class="px-4 py-3 font-semibold text-wrap text-grape/85">Avatar ID (seed)</td>
                  </tr>
                  <tr class="border-b-3 border-grape">
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-periwinkle">size</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-grape/85">int</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-grape/85">16</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-wrap text-grape/85">Size in pixels (8–512)</td>
                  </tr>
                  <tr>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-periwinkle">bg</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-grape/85">string</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-grape/85">transparent</td>
                    <td class="p-2 md:px-4 md:py-3 font-semibold text-wrap text-grape/85">Predefined color or hex code without #</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            ${this._codeBlock('HTML', `&lt;<span class="text-lavander">img </span><span class="text-coral">src</span>= <span class="text-lime">"https://pixelavatar.onrender.com/luna01?\n  size=128&amp;bg=purple-dark"</span>/&gt;`)}
            ${this._codeBlock('JavaScript', `<span class="text-coral">const</span> <span class="text-lavander">url</span> = <span class="text-lime">\'/luna01?size=128&bg=purple-dark\'</span>;\ndocument.<span class="text-coral">getElementById</span>(<span class="text-lime">"avatar"</span>).src = <span class="text-lavander">url</span>;`)}
            ${this._codeBlock('React', `<span class="text-lime">function</span> Avatar({<span class="text-lavander"> username</span>, <span class="text-lavander">hasPhoto</span>, <span class="text-lavander">photoUrl </span>}) {\n  <span class="text-coral"}>const</span> <span class="text-lavander">fallback</span> = <span class="text-lime">\`/\$<span class="text-coral">{username}</span>?size=128\`</span>;\n  <span class="text-lime">return</span> &lt;<span class="text-lavander">img</span> <span class="text-coral">src</span>=<span class="text-coral">{</span><span class="text-lavander">hasPhoto</span> <span class="text-lime">?</span> <span class="text-lavander">photoUrl</span> <span class="text-lime">:</span> <span class="text-lavander">fallback</span><span class="text-coral">}</span> /&gt;;\n}`)}
            ${this._codeBlock('Python', `<span class="text-lavander">def</span> avatar_url(<span class="text-coral">username</span>, <span class="text-coral">size</span>=<span class="text-lime">128</span>, <span class="text-coral">bg</span>=<span class="text-lime">""</span>):\n    <span class="text-coral">url</span> = <span class="text-lavander">f</span><span class="text-lime">"/</span>{<span class="text-coral">username</span>}<span class="text-lime">?size=</span>{<span class="text-coral">size</span>}<span class="text-lime">"</span>\n    <span class="text-lavander">if</span> <span class="text-coral">bg</span>: <span class="text-coral">url</span> +=<span class="text-lavander"> f</span><span class="text-lime">"&bg=</span>{<span class="text-coral">bg</span>}<span class="text-lime">"</span>\n    <span class="text-lavander">return</span> <span class="text-coral">url</span>`)}
          </div>

        </div>
        </div>
      </section>
    `;
        this._bindCopyButtons();
    }

    _codeBlock(lang, code) {
        return `
    <div>
      <p class="text-lg md:text-xl font-mono font-bold text-grape tracking-widest mb-3">${lang}</p>
      <div class="relative mt-2">
        <button class="pa-copy-code text-cornsilk absolute -top-4 -right-3 bg-grape p-1.5 pixel-border-sm transition-colors cursor-pointer">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M8 6h12v2H8zM4 2h12v2H4zm2 6h2v12H6zM2 4h2v12H2zm6 16h12v2H8zM20 8h2v12h-2zm-4-4h2v2h-2zM4 16h2v2H4z"/></svg>
        </button>
        <pre class="pixel-border-sm p-2 md:px-4 md:py-3 text-sm md:text-[12px] text-cornsilk bg-grape overflow-x-auto"><code class="font-code font-semibold">${code}</code></pre>
      </div>
    </div>
  `;
    }
    
    _bindCopyButtons() {
        this.querySelectorAll('.pa-copy-code').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.nextElementSibling.querySelector('code').textContent;                
                navigator.clipboard.writeText(code).then(() => {
                    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
                    setTimeout(() => {
                        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
                    }, 2000);
                });
            });
        });
    }
}

customElements.define('pa-docs', PaDocs);