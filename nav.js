/* =====================================================================
   DRB C2B — 공통 사이드바 내비게이션 (단일 소스)
   ▶ 페이지를 추가/수정할 때는 아래 NAV 배열만 고치면
     모든 HTML 페이지의 nav에 자동 반영됩니다.
   ▶ 각 HTML 페이지에는 <script src="nav.js"></script> 한 줄만 두면 됩니다.
   ===================================================================== */
(function () {
  const NAV = [
    { item: { href: 'index.html',  label: '1차 보고 자료' } },
    { item: { href: 'C2B_P1.html', label: '진행사항 점검 및 향후 방향검토' } },
    { group: '3월 진행사항', items: [
      { href: 'C2B_P2.html', label: 'Chain → Belt 전환단계', status: ['done', '완료'] },
      { href: 'C2B_P3.html', label: '타겟시장 분석',          status: ['review', '검토중'] },
    ]},
    { group: '4월 진행사항', items: [
      { href: 'C2B_P3.html', label: '타겟시장 분석 (산업군)',                 status: ['review', '검토중'] },
      { href: 'C2B_P4.html', label: 'DRB 유통망 기반 실차 테스트 (특약점대상)', status: ['review', '검토중'] },
      { href: 'C2B_P5.html', label: '실차 테스트 진행사항',                   status: ['review', '검토중'] },
    ]},
    { group: '6월 진행사항', items: [
      { href: 'C2B_P6.html', label: '업체 조사 (자전거 · 지게차 어태치먼트 · 이륜차)', status: ['review', '조사중'] },
    ]},
  ];

  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isActive = (href) => href.toLowerCase() === here;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
  const CHEV = '<svg class="chev" viewBox="0 0 12 12"><path d="M2 4 L6 8 L10 4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const itemHTML = (it) => {
    const act = isActive(it.href) ? ' active' : '';
    const st  = it.status ? `<span class="nav-status ${it.status[0]}">${esc(it.status[1])}</span>` : '';
    return `<a class="nav-i${act}" href="${it.href}"><div class="nav-dot"></div>${esc(it.label)}${st}</a>`;
  };

  let groups = '';
  NAV.forEach((g) => {
    if (g.item) {
      groups += `<div class="nav-grp">${itemHTML(g.item)}</div>`;
    } else {
      const open = g.items.some((it) => isActive(it.href));
      const col  = open ? '' : ' collapsed';
      groups += `<div class="nav-grp">`
        + `<div class="nav-grp-t clickable${col}" onclick="togGrp(this)"><span>${esc(g.group)}</span>${CHEV}</div>`
        + `<div class="nav-sub${col}">${g.items.map(itemHTML).join('')}</div>`
        + `</div>`;
    }
  });

  const HTML =
`<button class="sb-btn shifted" onclick="togSB()">
  <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
</button>
<aside class="sidebar" id="sb">
  <div class="sidebar-hd">
    <div><div class="sidebar-logo">DRB <span>C2B</span></div><div class="sidebar-sub">Chain to Belt 전환 프로젝트</div></div>
  </div>
  <nav class="sidebar-nav">${groups}</nav>
</aside>`;

  const mount = () => document.body.insertAdjacentHTML('afterbegin', HTML);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  // 사이드바 토글 동작 (전역)
  window.togSB = function () {
    const s = document.getElementById('sb'),
          m = document.getElementById('mn'),
          b = document.querySelector('.sb-btn');
    s.classList.toggle('closed'); m.classList.toggle('exp'); b.classList.toggle('shifted');
  };
  window.togGrp = function (el) {
    el.classList.toggle('collapsed');
    el.nextElementSibling.classList.toggle('collapsed');
  };
})();
