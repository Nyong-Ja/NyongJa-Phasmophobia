// ==========================================
// 🔍 1. 증거 분석 계산기 로직 (아이콘 에러 방지 & 네온 유튜브 버튼)
// ==========================================

const evidenceStates = {
    "EMF 5": "none",
    "DOTS": "none",
    "손자국": "none",
    "고스트 오브": "none",
    "고스트 라이팅": "none",
    "스피릿 박스": "none",
    "서늘함": "none"
};

const filterStates = {
    hasAccel: false,
    hasSpecialSpeed: false,
    hasForcedEv: false,
    hasTargetRoam: false
};

function initEvidenceButtons() {
    const buttons = document.querySelectorAll('.evidence-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const ev = btn.getAttribute('data-evidence');
            cycleEvidenceState(ev, btn);
            renderGhostList();
        });
    });

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllEvidences);
    }
}

function cycleEvidenceState(ev, btn) {
    const current = evidenceStates[ev];
    if (current === 'none') {
        evidenceStates[ev] = 'included';
        btn.className = 'evidence-btn included';
    } else if (current === 'included') {
        evidenceStates[ev] = 'excluded';
        btn.className = 'evidence-btn excluded';
    } else {
        evidenceStates[ev] = 'none';
        btn.className = 'evidence-btn';
    }
}

function toggleFilter(filterKey) {
    const checkbox = document.getElementById(
        filterKey === 'hasAccel' ? 'filter-accel' :
        filterKey === 'hasSpecialSpeed' ? 'filter-special-speed' :
        filterKey === 'hasForcedEv' ? 'filter-forced-ev' : 'filter-target-roam'
    );
    if (checkbox) {
        filterStates[filterKey] = checkbox.checked;
        renderGhostList();
    }
}

function resetAllEvidences() {
    for (const key in evidenceStates) {
        evidenceStates[key] = 'none';
    }
    for (const key in filterStates) {
        filterStates[key] = false;
        const checkbox = document.getElementById(
            key === 'hasAccel' ? 'filter-accel' :
            key === 'hasSpecialSpeed' ? 'filter-special-speed' :
            key === 'hasForcedEv' ? 'filter-forced-ev' : 'filter-target-roam'
        );
        if (checkbox) checkbox.checked = false;
    }

    document.querySelectorAll('.evidence-btn').forEach(btn => {
        btn.className = 'evidence-btn';
    });

    renderGhostList();
}

function renderGhostList() {
    const container = document.getElementById('ghost-list-container');
    const countEl = document.getElementById('ghost-count');
    if (!container || typeof GHOST_DATA === 'undefined') return;
    container.innerHTML = '';

    const includedEvs = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 'included');
    const excludedEvs = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 'excluded');

    const filteredGhosts = GHOST_DATA.filter(ghost => {
        const hasAllInc = includedEvs.every(ev => ghost.evidences.includes(ev));
        const hasNoExc = excludedEvs.every(ev => !ghost.evidences.includes(ev));

        let matchFilters = true;
        if (filterStates.hasAccel && !ghost.hasAccel) matchFilters = false;
        if (filterStates.hasSpecialSpeed && !ghost.hasSpecialSpeed) matchFilters = false;
        if (filterStates.hasForcedEv && !ghost.hasForcedEv) matchFilters = false;
        if (filterStates.hasTargetRoam && !ghost.hasTargetRoam) matchFilters = false;

        return hasAllInc && hasNoExc && matchFilters;
    });

    if (countEl) {
        countEl.innerText = filteredGhosts.length;
    }

    // 4열 독립 컬럼 레이아웃 생성
    const columnsWrapper = document.createElement('div');
    columnsWrapper.className = 'ghost-columns-container';

    const colElements = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
    ];

    colElements.forEach(col => {
        col.className = 'ghost-col';
        columnsWrapper.appendChild(col);
    });

    filteredGhosts.forEach((ghost, index) => {
        const card = document.createElement('div');
        card.className = 'ghost-card';

        const evTagsHtml = ghost.evidences.map(ev => {
            const isMatched = evidenceStates[ev] === 'included';
            return `<span class="ev-tag ${isMatched ? 'matched' : ''}">${ev}</span>`;
        }).join('');

        // 유튜브 검색: 파스모포비아 + (유령이름) + 공략 + 뇽자
        const ytQuery = encodeURIComponent(`파스모포비아 ${ghost.name} 공략 뇽자`);

        // 아이콘 로딩 에러 시 무한루프 방지 및 안전 처리
        const iconHtml = ghost.icon ? `
            <img src="images/ghosts/${ghost.icon}" 
                 alt="${ghost.name}" 
                 class="ghost-icon" 
                 onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="ghost-icon-fallback" style="display:none; width:64px; height:64px; align-items:center; justify-content:center; font-size:2.2rem; margin-bottom:4px;">👻</div>
        ` : `
            <div class="ghost-icon-fallback" style="width:64px; height:64px; display:flex; align-items:center; justify-content:center; font-size:2.2rem; margin-bottom:4px;">👻</div>
        `;

        card.innerHTML = `
            <div class="ghost-card-header">
                ${iconHtml}
                <div class="ghost-name">${ghost.name}</div>
                <div class="ghost-badge-group">
                    <span class="ghost-sanity">정신력: ${ghost.huntSanity}</span>
                    <span class="ghost-speed">속도: ${ghost.speed}</span>
                </div>
            </div>
            
            <div class="ghost-evidences">
                ${evTagsHtml}
            </div>

            <!-- 네온 유튜브 공략 버튼 -->
            <div class="main-youtube-wrapper" style="margin: 10px 0;">
                <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" class="yt-btn" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 8px 12px; border-radius: 8px; border: 1.5px solid rgba(248, 113, 113, 0.4); background: rgba(248, 113, 113, 0.12); color: #f87171; text-decoration: none; font-weight: 700; font-size: 0.95rem;">
                    <span class="yt-icon" style="color: #f87171; font-size: 1.0rem;">▶️</span>
                    <span>'${ghost.name}' 뇽자 공략 보기</span>
                </a>
            </div>

            <details class="ghost-details">
                <summary class="ghost-summary">
                    <span>💡 핵심 특징 & 감별법</span>
                    <span class="more-btn">자세히 ▾</span>
                </summary>
                <div class="ghost-tip-content">${ghost.tip}</div>
            </details>
        `;

        const targetCol = colElements[index % 4];
        targetCol.appendChild(card);
    });

    container.appendChild(columnsWrapper);
}
