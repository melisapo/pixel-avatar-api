class PaDocs extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="docs" class="px-6 pb-24 max-w-5xl mx-auto border-t border-pixel-border pt-16">
        <h2 class="font-display text-2xl font-semibold text-pixel-text mb-8">Documentación</h2>

        <div class="space-y-8">

          <div>
            <p class="text-xs font-mono text-pixel-muted uppercase tracking-widest mb-3">Endpoint</p>
            <div class="bg-pixel-card border border-pixel-border rounded-xl px-4 py-3 font-mono text-sm text-pixel-accent">
              GET /{name}?size={size}&amp;bg={color}
            </div>
          </div>

          <div>
            <p class="text-xs font-mono text-pixel-muted uppercase tracking-widest mb-3">Parámetros</p>
            <div class="bg-pixel-card border border-pixel-border rounded-xl overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-pixel-border">
                    <th class="text-left px-4 py-3 text-pixel-muted font-mono text-xs">Parámetro</th>
                    <th class="text-left px-4 py-3 text-pixel-muted font-mono text-xs">Tipo</th>
                    <th class="text-left px-4 py-3 text-pixel-muted font-mono text-xs">Por defecto</th>
                    <th class="text-left px-4 py-3 text-pixel-muted font-mono text-xs">Descripción</th>
                  </tr>
                </thead>
                <tbody class="font-mono text-xs">
                  <tr class="border-b border-pixel-border">
                    <td class="px-4 py-3 text-pixel-accent">name</td>
                    <td class="px-4 py-3 text-pixel-muted">string</td>
                    <td class="px-4 py-3 text-pixel-muted">requerido</td>
                    <td class="px-4 py-3 text-pixel-text">Identificador del avatar</td>
                  </tr>
                  <tr class="border-b border-pixel-border">
                    <td class="px-4 py-3 text-pixel-accent">size</td>
                    <td class="px-4 py-3 text-pixel-muted">int</td>
                    <td class="px-4 py-3 text-pixel-muted">16</td>
                    <td class="px-4 py-3 text-pixel-text">Tamaño en píxeles (8–512)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-pixel-accent">bg</td>
                    <td class="px-4 py-3 text-pixel-muted">string</td>
                    <td class="px-4 py-3 text-pixel-muted">transparente</td>
                    <td class="px-4 py-3 text-pixel-text">Nombre predefinido o hex sin #</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${this._codeBlock('HTML', `&lt;img src="https://pixelavatar.onrender.com/luna01?size=128&amp;bg=purple-dark" /&gt;`)}
            ${this._codeBlock('JavaScript', `const url = \`/luna01?size=128&bg=purple-dark\`;\ndocument.getElementById("avatar").src = url;`)}
            ${this._codeBlock('React', `function Avatar({ username, hasPhoto, photoUrl }) {\n  const fallback = \`/\${username}?size=128\`;\n  return &lt;img src={hasPhoto ? photoUrl : fallback} /&gt;;\n}`)}
            ${this._codeBlock('Python', `def avatar_url(username, size=128, bg=""):\n    url = f"/{username}?size={size}"\n    if bg: url += f"&bg={bg}"\n    return url`)}
          </div>

        </div>
      </section>
    `;
    }

    _codeBlock(lang, code) {
        return `
      <div>
        <p class="text-xs font-mono text-pixel-muted uppercase tracking-widest mb-3">${lang}</p>
        <pre class="bg-pixel-card border border-pixel-border rounded-xl px-4 py-3 font-mono text-xs text-pixel-text overflow-x-auto"><code>${code}</code></pre>
      </div>
    `;
    }
}

customElements.define('pa-docs', PaDocs);