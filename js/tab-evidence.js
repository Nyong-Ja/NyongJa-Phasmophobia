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

// 👻 공식 24종 유령 대표 고유 확정 특징 매핑
const GHOST_SIGNATURE_SKILLS = {
    "스피릿": "정화향초 피격 시 180초(3분) 동안 사냥 불가",
    "레이스": "소금을 절대 밟지 않으며 UV 발자국을 남기지 않음",
    "팬텀": "사진 촬영 시 즉시 투명화 (사냥 시 깜빡임 투명 시간 김)",
    "폴터가이스트": "주변 여러 물건을 한 번에 사방으로 동시 투척 (폴터 샷)",
    "밴시": "지향성 마이크 전용 비명 소리 & 타겟 단독 스토킹",
    "지니": "차단기 On 시 원거리 2.5m/s 고속 돌진 (3m 앞 감속)",
    "매어": "플레이어가 켠 방 전등 스위치를 0.1초 만에 즉시 끔",
    "레버넌트": "시야 미포착 시 1.0m/s ➔ 플레이어 발견 시 3.0m/s 폭주 돌진",
    "셰이드": "플레이어와 같은 방에 머물 때 상호작용 및 사냥 0%",
    "데몬": "정신력 무관 즉시 특수 사냥 & 향초 저지 시간 60초",
    "유레이": "열린 문을 '쾅' 끝까지 닫으며 정신력 15% 즉시 감소",
    "오니": "연기 구체 이벤트 불가 & 사냥 시 실체가 내내 뚜렷하게 노출",
    "요괴": "목소리 반응 사냥(80%) & 사냥 중 2.5m 밖 전자기기 감지 불가",
    "하투": "추운 방에서 2.7m/s 가속 & 사냥 중 유령 입에서 냉기 입김",
    "고료": "방 변경 불가 & 육안 불가 비디오 카메라로만 DOTS 노출",
    "밀링": "사냥 발소리가 전자기기 깜빡임 거리(10m) 안에서만 들림",
    "온료": "불씨 3개 끄면 즉시 사냥 & 십자가보다 촛불 먼저 소모",
    "트윈스": "원거리 동시 상호작용 & 본체(1.5m/s)·분신(1.9m/s) 이원화",
    "라이주": "켜진 전자기기 근처 통과 시 2.5m/s 즉시 급가속",
    "오바케": "6손가락 특수 지문 & 사냥 중 6.66% 확률 외형 변신",
    "미믹": "항상 4번째 단서로 고스트 오브 방출 & 타 유령 능력 복사",
    "모로이": "정신력 0% 시 최대 2.25m/s 폭주 & 주파수 박스 저주",
    "데오겐": "벽 관통 상시 추적(3.0m/s) ➔ 2.5m 접근 시 0.4m/s 극감속",
    "타예": "초반 2.75m/s 극초고속 ➔ 룸 상주 노화 시 1.0m/s 굼벵이 둔화"
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

        // 고유 확정 특징
        const signatureSkill = GHOST_SIGNATURE_SKILLS[ghost.name] || ghost.tip;

        // 유튜브 검색 쿼리: 파스모포비아 (유령이름) 공략 필살기 뇽자
        const ytQuery = encodeURIComponent(`파스모포비아 ${ghost.name} 공략 필살기 뇽자`);

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

            <!-- 🔥 대표 고유 확정 특징 강조 박스 -->
            <div class="ghost-signature-box">
                <span class="ghost-signature-tag">확정 특징</span>
                <div class="ghost-signature-desc">${signatureSkill}</div>
            </div>

            <!-- 📺 유튜브 배너 버튼 -->
            <div class="main-youtube-wrapper" style="margin: 8px 0 10px 0;">
                <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" class="ghost-yt-banner-btn">
                    <span class="ghost-yt-title">${ghost.name} 공략 및 필살기 보러가기 ➔</span>
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
