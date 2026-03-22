class PaDocs extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="docs" class="pt-10 pb-20 px-6 max-w-6xl mx-auto">
        <div class="pixel-border bg-cornsilk px-4 py-6">
            <h2 class="font-display text-4xl text-grape pb-4">Docs</h2>
        <div class="space-y-8">
          <div>
            <p class="text-xl font-mono font-bold text-grape tracking-widest mb-3">Endpoint</p>
            <div class="pixel-border-sm px-4 py-3 font-mono font-semibold text-lg text-grape/90">
              GET /<span class="text-periwinkle">{name}</span>?size=<span class="text-periwinkle">{size}</span>&amp;bg=<span class="text-periwinkle">{color}</span>
            </div>
          </div>

          <div>
            <p class="text-xl font-mono font-bold text-grape tracking-widest mb-3">Params</p>
            <div class="pixel-border-sm overflow-x-scroll">
              <table class="w-full text-lg overflow-hidden">
                <thead>
                  <tr class="border-b-2 border-grape bg-periwinkle/35">
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Param</th>
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Type</th>
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Default</th>
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Description</th>
                  </tr>
                </thead>
                <tbody class="font-mono text-lg">
                  <tr class="border-b-2 border-grape">
                    <td class="px-4 py-3 font-semibold text-periwinkle">name</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">string</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">required</td>
                    <td class="px-4 py-3 font-semibold text-wrap text-grape/90">Avatar ID (seed)</td>
                  </tr>
                  <tr class="border-b-2 border-grape">
                    <td class="px-4 py-3 font-semibold text-periwinkle">size</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">int</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">16</td>
                    <td class="px-4 py-3 font-semibold text-wrap text-grape/90">Size in pixels (8–512)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold text-periwinkle">bg</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">string</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">transparent</td>
                    <td class="px-4 py-3 font-semibold text-wrap text-grape/90">Predefined color or hex code without #</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${this._codeBlock('HTML', `&lt;<span class="text-lavander">img </span><span class="text-coral">src= </span><span class="text-lime">"https://pixelavatar.onrender.com/luna01?\n  size=128&amp;bg=purple-dark"</span>/&gt;`)}
            ${this._codeBlock('JavaScript', `<span class="text-coral">const</span> <span class="text-lavander">url</span> = <span class="text-lime">\'/luna01?size=128&bg=purple-dark\'</span>;\ndocument.<span class="text-coral">getElementById</span>(<span class="text-lime">"avatar"</span>).src = <span class="text-lavander">url</span>;`)}
            ${this._codeBlock('React', `<span class="text-lime">function</span> Avatar({<span class="text-lavander"> username</span>, <span class="text-lavander">hasPhoto</span>, <span class="text-lavander">photoUrl </span>}) {\n  <span class="text-coral"}>const</span> <span class="text-lavander">fallback</span> = <span class="text-lime">\`/\$<span class="text-coral">{username}</span>?size=128\`</span>;\n  <span class="text-lime">return</span> &lt;<span class="text-lavander">img</span> <span class="text-coral">src</span>=<span class="text-coral">{</span><span class="text-lavander">hasPhoto</span> <span class="text-lime">?</span> <span class="text-lavander">photoUrl</span> <span class="text-lime">:</span> <span class="text-lavander">fallback</span><span class="text-coral">}</span> /&gt;;\n}`)}
            ${this._codeBlock('Python', `<span class="text-lavander">def</span> avatar_url(<span class="text-coral">username</span>, <span class="text-coral">size</span>=<span class="text-lime">128</span>, <span class="text-coral">bg</span>=<span class="text-lime">""</span>):\n    <span class="text-coral">url</span> = <span class="text-lavander">f</span><span class="text-lime">"/</span>{<span class="text-coral">username</span>}<span class="text-lime">?size=</span>{<span class="text-coral">size</span>}<span class="text-lime">"</span>\n    <span class="text-lavander">if</span> <span class="text-coral">bg</span>: <span class="text-coral">url</span> +=<span class="text-lavander"> f</span><span class="text-lime">"&bg=</span>{<span class="text-coral">bg</span>}<span class="text-lime">"</span>\n    <span class="text-lavander">return</span> <span class="text-coral">url</span>`)}
          </div>

        </div>
        </div>
      </section>
    `;
    }

    _codeBlock(lang, code) {
        return `
      <div>
        <p class="text-xl font-mono font-bold text-grape tracking-widest mb-3">${lang}</p>
        <pre class="pixel-border-sm px-4 py-3 font-mono font-semibold text-lg text-cornsilk bg-grape overflow-x-auto"><code>${code}</code></pre>
      </div>
    `;
    }
}

customElements.define('pa-docs', PaDocs);