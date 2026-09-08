(async function () {
  var SRC = 'https://cdn.jsdelivr.net/gh/hydrogenbondss/pabepabe-preview@5ca894a6ce3d4c9daffabaf2a95f9140b5910457/v5/index.html';
  var POLISH = [
    ":root{--serif:'Instrument Serif','Times New Roman',Times,serif}",
    'body{font-size:15px;line-height:1.55;text-rendering:optimizeLegibility}',
    '.orbit__star{filter:none!important}',
    ".journey__title .eyebrow{opacity:.9!important;letter-spacing:.12em}",
    ".journey__title h2{font-family:var(--serif)!important;letter-spacing:.005em;text-shadow:0 1px 24px rgba(14,27,61,.35)}",
    '.journey__line{font-weight:700!important;letter-spacing:.14em!important;line-height:1.85!important;',
    'text-shadow:0 0 12px rgba(14,27,61,.85),0 0 28px rgba(14,27,61,.55),0 1px 2px rgba(14,27,61,.5)!important}',
    ".journey__line::before{content:'';position:absolute;z-index:-1;pointer-events:none;left:50%;top:50%;width:140%;height:220%;",
    'transform:translate(-50%,-50%);background:radial-gradient(ellipse at center,rgba(14,27,61,.62) 0%,rgba(14,27,61,.28) 48%,transparent 72%)}',
    '.journey__line--serif{font-family:var(--serif)!important;font-size:22px!important;font-weight:400!important}',
    '.journey__glow{width:58vh!important;background:radial-gradient(circle,rgba(245,239,221,.22) 0%,rgba(245,239,221,.08) 38%,transparent 68%)!important}',
    '.journey__knob{transition:filter .3s cubic-bezier(.25,.46,.45,.94)!important}',
    '.journey__knob:hover{filter:none!important}',
    '.journey__knob:hover img{transform:rotate(-3deg) scale(1.015)!important;filter:drop-shadow(14px 22px 34px rgba(14,27,61,.52))!important}',
    '.journey__hint{bottom:calc(28px + env(safe-area-inset-bottom))!important;gap:12px!important;animation:hintBreath 3.8s ease-in-out infinite}',
    '.journey__hint.is-gone{animation:none!important}',
    '.journey__hint-knob{width:26px!important;height:26px!important;opacity:.92}',
    '.journey__hint-turn{animation:hintTurn 3.6s cubic-bezier(.45,0,.2,1) infinite!important}',
    '.journey__hint-text{font-size:10px!important;font-weight:600!important;letter-spacing:.22em!important;opacity:.7!important}',
    '@keyframes hintTurn{0%{transform:rotate(0)}18%{transform:rotate(72deg)}48%{transform:rotate(72deg)}72%,100%{transform:rotate(0)}}',
    '@keyframes hintBreath{0%,100%{opacity:.72}50%{opacity:1}}',
    '.journey__landing::before{top:-18vh!important;height:18vh!important;',
    '-webkit-mask-image:linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.35) 42%,#000 88%)!important;',
    'mask-image:linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.35) 42%,#000 88%)!important}',
    '.journey__grain{opacity:.045!important}',
    '.floater img{filter:drop-shadow(16px 22px 40px rgba(14,27,61,.36))!important}',
    '@keyframes bob{from{transform:translateY(-5px)}to{transform:translateY(5px)}}',
    '.stockists__label,.stockists__name{color:var(--ink)!important}',
    '.stockists__star{color:var(--ink)!important;opacity:.35}',
    '.stories__hero .eyebrow{opacity:.88!important}',
    '.stories__hero h1{font-family:var(--serif)!important;font-weight:400!important;text-transform:none!important;letter-spacing:.005em!important;line-height:.98!important}',
    '.stories__hero p,.story__body p{font-size:15px!important;opacity:.92!important;color:var(--cream)!important}',
    '.story__title{font-family:var(--serif)!important;font-weight:400!important;text-transform:none!important;letter-spacing:.01em!important}',
    '@media (max-width:900px){',
    '.journey__hint{bottom:calc(48px + env(safe-area-inset-bottom))!important}',
    '.journey__hint-knob{width:24px!important;height:24px!important}',
    '.journey__title h2{white-space:normal!important}',
    '}'
  ].join('\n');

  try {
    var res = await fetch(SRC, { mode: 'cors' });
    if (!res.ok) throw new Error('fetch ' + res.status);
    var html = await res.text();

    // Expressive gallery face
    html = html.replace(
      /family=IBM\+Plex\+Mono:wght@400;500&display=swap/g,
      'family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap'
    );

    // Title clearance + caption line position
    html = html.replace(
      'class="journey__title" data-p0=".24" data-p1=".58" data-v="-.28" style="--x:7%;--y:9%"',
      'class="journey__title" data-p0=".24" data-p1=".52" data-v="-.18" style="--x:7%;--y:12%"'
    );
    html = html.replace(
      'class="journey__line" data-p0=".44" data-p1=".70" data-v="-.9" style="--x:52%;--y:44%"',
      'class="journey__line" data-p0=".44" data-p1=".70" data-v="-.9" style="--x:52%;--y:38%"'
    );

    // Polished knob-door (local on this repo) — kill cream glow / noisy sparks
    html = html.replace(
      'src="https://pabe-v5-code.vercel.app/js/knob-door.min.js"',
      'src="js/knob-door.min.js"'
    );

    // Inject polish overrides after main stylesheet
    html = html.replace(
      '<link rel="stylesheet" href="https://pabe-v5-code.vercel.app/css/main.min.css">',
      '<link rel="stylesheet" href="https://pabe-v5-code.vercel.app/css/main.min.css">\n<style id="pabe-polish">\n' + POLISH + '\n</style>'
    );

    document.open();
    document.write(html);
    document.close();
  } catch (e) {
    document.body.innerHTML =
      '<pre style="padding:24px;font:14px/1.45 ui-sans-serif,system-ui">PabePabe v5 failed to load.\n' +
      String(e) +
      '</pre>';
  }
})();
