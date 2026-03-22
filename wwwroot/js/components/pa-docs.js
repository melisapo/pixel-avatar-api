class PaDocs extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="docs" class="py-10 px-6 max-w-6xl mx-auto">
        <div class="pixel-border bg-cornsilk px-8 py-6">
            <h2 class="font-display text-4xl text-grape pb-4">Docs</h2>
        <div class="space-y-8">
          <div>
            <p class="text-xl font-mono font-bold text-grape tracking-widest mb-3">Endpoint</p>
            <div class="pixel-border-sm px-4 py-3 font-mono font-semibold text-md text-grape/90">
              GET /<span class="text-periwinkle">{name}</span>?size=<span class="text-periwinkle">{size}</span>&amp;bg=<span class="text-periwinkle">{color}</span>
            </div>
          </div>

          <div>
            <p class="text-xl font-mono font-bold text-grape tracking-widest mb-3">Params</p>
            <div class="pixel-border-sm overflow-hidden">
              <table class="w-full text-md">
                <thead>
                  <tr class="border-b-2 border-grape bg-periwinkle/25">
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Param</th>
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Type</th>
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Default</th>
                    <th class="text-left px-4 py-3 text-grape font-mono text-lg">Description</th>
                  </tr>
                </thead>
                <tbody class="font-mono text-md">
                  <tr class="border-b-2 border-grape">
                    <td class="px-4 py-3 font-semibold text-periwinkle">name</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">string</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">required</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">Avatar ID (seed)</td>
                  </tr>
                  <tr class="border-b-2 border-grape">
                    <td class="px-4 py-3 font-semibold text-periwinkle">size</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">int</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">16</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">Size in pixels (8–512)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold text-periwinkle">bg</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">string</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">transparent</td>
                    <td class="px-4 py-3 font-semibold text-grape/90">Predefined color or hex code without #</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${this._codeBlock('HTML', `<span class="text-periwinkle">&lt;img src=</span>"https://pixelavatar.onrender.com/luna01?\n  size=128&amp;bg=purple-dark"<span class="text-periwinkle">/&gt;</span>`)}
            ${this._codeBlock('JavaScript', `const url = \`/luna01?size=128&bg=purple-dark\`;\ndocument.getElementById("avatar").src = url;`)}
            ${this._codeBlock('React', `function Avatar({ username, hasPhoto, photoUrl }) {\n  const fallback = \`/\${username}?size=128\`;\n  return &lt;img src={hasPhoto ? photoUrl : fallback} /&gt;;\n}`)}
            ${this._codeBlock('Python', `def avatar_url(username, size=128, bg=""):\n    url = f"/{username}?size={size}"\n    if bg: url += f"&bg={bg}"\n    return url`)}
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
        <pre class="pixel-border-sm px-4 py-3 font-mono font-semibold text-lg text-grape/80 overflow-x-auto"><code>${code}</code></pre>
      </div>
    `;
    }
}

customElements.define('pa-docs', PaDocs);