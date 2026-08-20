// ==========================================
// 🔍 1. 증거 분석 & 유령 계산기 전용 스크립트 (4열 독립 고정 분배 방식)
// ==========================================

let includedEvidences = [];
let excludedEvidences = [];
let activeFilters = {
    hasAccel: false,
    hasSpecialSpeed: false,
    hasForcedEv: false,
    hasTargetRoam: false
};

// 증거 버튼 클릭 상태 토글 초기화
function initEvidenceButtons() {
    const buttons = document.querySelectorAll('.evidence-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const ev = btn.getAttribute('data-evidence');
            if (!includedEvidences.includes(ev) && !excludedEvidences.includes(ev)) {
                includedEvidences.push(ev);
                btn.classList.add('included');
            } else if (includedEvidences.includes(ev)) {
                includedEvidences = includedEvidences.filter(e => e !== ev);
                btn.classList.remove('included');
                excludedEvidences.push(ev);
                btn.classList.add('excluded');
            } else {
                excludedEvidences = excludedEvidences.filter(e => e !== ev);
                btn.classList.remove('excluded');
            }
            renderGhostList();
        });
    });

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            includedEvidences = [];
            excludedEvidences = [];
            buttons.forEach(btn => {
                btn.classList.remove('included', 'excluded');
            });
            activeFilters = { hasAccel: false, hasSpecialSpeed: false, hasForcedEv: false, hasTargetRoam: false };
            document.querySelectorAll('.filter-chip input').forEach(input => input.checked = false);
            renderGhostList();
        });
    }
}

// 특수 필터 토글
function toggleFilter(filterKey) {
    activeFilters[filterKey] = !activeFilters[filterKey];
    renderGhostList();
}

// 증거 분석 유령 카드 렌더링 (독립 4열 Flex 분배)
function renderGhostList() {
    const container = document.getElementById('ghost-list-container');
    const countEl = document.getElementById('ghost-count');
    if (!container || typeof GHOST_DATA === 'undefined') return;

    container.innerHTML = '';

    const filtered = GHOST_DATA.filter(ghost => {
        for (let ev of includedEvidences) {
            if (!ghost.evidences.includes(ev)) return false;
        }
        for (let ev of excludedEvidences) {
            if (ghost.evidences.includes(ev)) return false;
        }
        if (activeFilters.hasAccel && !ghost.hasAccel) return false;
        if (activeFilters.hasSpecialSpeed && !ghost.hasSpecialSpeed) return false;
        if (activeFilters.hasForcedEv && !ghost.hasForcedEv) return false;
        if (activeFilters.hasTargetRoam && !ghost.hasTargetRoam) return false;

        return true;
    });

    if (countEl) countEl.innerText = filtered.length;

    // 4열을 감싸는 메인 래퍼
    const columnsWrapper = document.createElement('div');
    columnsWrapper.className = 'ghost-columns-container';

    // 4개의 독립 컬럼 생성 (1열, 2열, 3열, 4열)
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

    filtered.forEach((ghost, index) => {
        const card = document.createElement('div');
        card.className = 'ghost-card';

        const evidencesHtml = ghost.evidences.map(ev => {
            const isMatched = includedEvidences.includes(ev) ? 'matched' : '';
            return `<span class="ev-tag ${isMatched}">${ev}</span>`;
        }).join(' ');

        card.innerHTML = `
            <div class="ghost-card-header">
                <img src="images/ghosts/${ghost.engName}.webp" 
                     onerror="this.onerror=null; this.src='images/ghosts/Spirit.webp'" 
                     class="ghost-icon" 
                     alt="${ghost.name}">
                <div class="ghost-name">${ghost.name}</div>
                <div class="ghost-badge-group">
                    <span class="ghost-speed">속도: ${ghost.speed}</span>
                    <span class="ghost-sanity">정신력: ${ghost.sanity}</span>
                </div>
            </div>
            <div class="ghost-evidences">${evidencesHtml}</div>
            <div class="main-youtube-wrapper">
                <a href="${ghost.ytUrl}" target="_blank" class="yt-btn">
                    <span class="yt-icon">▶</span> 특징 & 공략 영상 보기
                </a>
            </div>
            <details class="ghost-details">
                <summary class="ghost-summary">
                    <span>💡 상세 정보 및 특징</span>
                    <span class="more-btn">더보기 ▾</span>
                </summary>
                <div class="ghost-tip-content" style="font-size:0.95rem; line-height:1.6; margin-top:8px;">${ghost.tip}</div>
            </details>
        `;

        // 4개 열에 순환 배분 (0 -> 1열, 1 -> 2열, 2 -> 3열, 3 -> 4열)
        const targetCol = colElements[index % 4];
        targetCol.appendChild(card);
    });

    container.appendChild(columnsWrapper);
}
