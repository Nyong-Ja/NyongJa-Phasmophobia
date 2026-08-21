// ==========================================
// 메인 애플리케이션 진입점 & 공통 UI 제어
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initEvidenceButtons === 'function') initEvidenceButtons();
    if (typeof renderGhostList === 'function') renderGhostList();
    if (typeof renderGhostDictionary === 'function') renderGhostDictionary();

    renderEquipment('ALL');
    renderWeekly();
    renderMaps('ALL');
    renderApocalypse();
    renderDrops();
    renderGuides();
    renderIdCards();
    renderNews();

    fetchVisitorCounts();
});

// 3. 🛠️ 장비 가이드 렌더링 (좌우 4:6 분할 & 유튜브 배너 통합)
let currentSelectedEqIndex = 0;
let currentEqCategory = 'ALL';

function renderEquipment(category = 'ALL') {
    const container = document.getElementById('equipment-container');
    if (!container || typeof EQUIPMENT_DATA === 'undefined') return;
    container.innerHTML = '';
    currentEqCategory = category;

    const filteredEq = category === 'ALL' 
        ? EQUIPMENT_DATA 
        : EQUIPMENT_DATA.filter(e => e.category.includes(category));

    if (currentSelectedEqIndex >= filteredEq.length) {
        currentSelectedEqIndex = 0;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'weekly-split-layout eq-split-layout';

    const leftCol = document.createElement('div');
    leftCol.className = 'weekly-left-pane';
    leftCol.innerHTML = `
        <div class="guide-card" style="margin-bottom: 12px; border-left: 4px solid var(--accent-vibrant); padding: 12px 14px;">
            <div class="guide-card-title" style="font-size: 1.05rem; margin-bottom: 6px;">🛠️ 티어(Tier)별 장비 업그레이드 시스템</div>
            <div class="guide-card-body" style="font-size: 0.9rem; line-height: 1.55; color: var(--text-secondary);">
                • <strong>1티어:</strong> 아날로그/초기 기본 장비 (낮은 정밀도, 오차 발생)<br>
                • <strong>2티어:</strong> 표준 디지털 장비 (안정적인 탐지 성능과 시야 제공)<br>
                • <strong>3티어:</strong> 최첨단 하이엔드 장비 (원거리 탐색, 스캔 및 고성능 보조)
            </div>
        </div>

        <div class="map-filter-bar" style="margin-bottom: 10px; gap: 6px;">
            <button class="map-filter-btn ${category === 'ALL' ? 'active' : ''}" onclick="filterEqCategory('ALL')">전체 (${EQUIPMENT_DATA.length})</button>
            <button class="map-filter-btn ${category === '증거' ? 'active' : ''}" onclick="filterEqCategory('증거')">증거 수집</button>
            <button class="map-filter-btn ${category === '생존' || category === '시야' ? 'active' : ''}" onclick="filterEqCategory('생존')">생존/시야</button>
        </div>

        <div class="weekly-scroll-list" id="eq-scroll-list">
            ${filteredEq.map((eq, idx) => `
                <button type="button" 
                        class="weekly-list-item ${idx === currentSelectedEqIndex ? 'active' : ''}" 
                        onclick="selectEqItem(${idx})">
                    <span class="eq-category" style="font-size: 0.8rem; padding: 2px 7px;">${eq.category.split('/')[0]}</span>
                    <span class="ch-name-txt" style="font-size: 1.02rem;">${eq.name}</span>
                    <span class="ch-map-tag" style="font-size: 0.8rem;">Tier 1-3</span>
                </button>
            `).join('')}
        </div>
    `;

    const rightCol = document.createElement('div');
    rightCol.className = 'weekly-right-pane';
    rightCol.id = 'eq-detail-pane';

    wrapper.appendChild(leftCol);
    wrapper.appendChild(rightCol);
    container.appendChild(wrapper);

    updateEqDetail(currentSelectedEqIndex);
}

function selectEqItem(index) {
    currentSelectedEqIndex = index;
    document.querySelectorAll('#eq-scroll-list .weekly-list-item').forEach((btn, idx) => {
        if (idx === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    updateEqDetail(index);
}

function filterEqCategory(cat) {
    currentSelectedEqIndex = 0;
    renderEquipment(cat);
}

function updateEqDetail(index) {
    const pane = document.getElementById('eq-detail-pane');
    if (!pane || typeof EQUIPMENT_DATA === 'undefined') return;

    const filteredEq = currentEqCategory === 'ALL' 
        ? EQUIPMENT_DATA 
        : EQUIPMENT_DATA.filter(e => e.category.includes(currentEqCategory));

    const eq = filteredEq[index] || filteredEq[0];
    if (!eq) return;

    const ytQuery = encodeURIComponent(`파스모포비아 ${eq.name.split('(')[0].trim()} 3티어 공략 뇽자`);

    pane.innerHTML = `
        <div class="weekly-detail-card">
            <div class="weekly-detail-header">
                <div>
                    <div style="font-size: 1.65rem; font-weight: 800; color: #fff;">${eq.name}</div>
                    <div style="font-size: 0.95rem; color: var(--accent-light); margin-top: 3px; font-weight: 600;">
                        분류: ${eq.category}
                    </div>
                </div>
                <span class="eq-category" style="font-size: 0.95rem; padding: 5px 12px;">${eq.category}</span>
            </div>

            <div style="margin: 14px 0 16px 0;">
                <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" class="weekly-yt-banner-btn">
                    <span class="yt-banner-icon">🛠️</span>
                    <div class="yt-banner-textbox">
                        <div class="yt-banner-title">📺 유튜브에서 '${eq.name.split('(')[0].trim()}' 3티어 실전 가이드 보기</div>
                        <div class="yt-banner-sub">클릭 시 해당 장비의 뇽자 티어별 스펙 및 활용 팁 영상으로 이동합니다.</div>
                    </div>
                    <span class="yt-banner-arrow">영상 보기 ➔</span>
                </a>
            </div>

            <div class="dict-section-title">1. 티어(Tier)별 기본 스펙 요약</div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                <div class="eq-tier-box">
                    <div class="eq-tier-title">Tier 1</div>
                    <div class="eq-tier-desc">${eq.t1}</div>
                </div>
                <div class="eq-tier-box">
                    <div class="eq-tier-title">Tier 2</div>
                    <div class="eq-tier-desc">${eq.t2}</div>
                </div>
                <div class="eq-tier-box">
                    <div class="eq-tier-title">Tier 3</div>
                    <div class="eq-tier-desc">${eq.t3}</div>
                </div>
            </div>

            <div class="dict-section-title">2. 장비 스펙 & 심층 사용 가이드 (Deep Dive)</div>
            <div style="background: rgba(0, 0, 0, 0.4); padding: 16px; border-radius: 8px; border: 1px solid var(--card-border); font-size: 0.94rem; line-height: 1.65;">
                ${eq.detailedHtml || '<p style="color: var(--text-secondary);">해당 장비의 추가 상세 스펙 데이터가 준비 중입니다.</p>'}
            </div>
        </div>
    `;
}

// 4. 주간 도전 과제 렌더링
let currentSelectedChallengeId = 1;

function renderWeekly() {
    const container = document.getElementById('weekly-container');
    if (!container || typeof WEEKLY_CHALLENGES === 'undefined') return;
    container.innerHTML = '';

    const weeklyWrapper = document.createElement('div');
    weeklyWrapper.className = 'weekly-split-layout';

    const leftCol = document.createElement('div');
    leftCol.className = 'weekly-left-pane';
    leftCol.innerHTML = `
        <div class="guide-card" style="margin-bottom: 14px; border-left: 4px solid var(--accent-vibrant);">
            <div class="guide-card-title" style="font-size: 1.15rem;">🎯 주간 도전 과제 (Challenge Mode) 개요</div>
            <div class="guide-card-body" style="font-size: 0.95rem; line-height: 1.6;">
                • <strong>초기화 주기:</strong> 매주 월요일 오전 9시 (KST / 00:00 UTC)<br>
                • <strong>클리어 보상:</strong> <strong>$5,000 게임 머니 + 5,000 XP</strong> (지정 맵에서 유령 3회 특정 시 완료)<br>
                • <strong>장비 무료 제공:</strong> 요구되는 모든 장비가 무료 지급되며, <strong>사망해도 소지품 손실 패널티가 없습니다.</strong>
            </div>
        </div>

        <div style="font-size: 1.05rem; font-weight: 700; color: var(--accent-light); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span>📜 26종 챌린지 로테이션 목록</span>
            <span style="font-size: 0.88rem; color: var(--text-secondary); font-weight: normal;">* 클릭하여 상세 보기</span>
        </div>

        <div class="weekly-scroll-list" id="weekly-scroll-list">
            ${WEEKLY_CHALLENGES.map(ch => `
                <button type="button" 
                        class="weekly-list-item ${ch.id === currentSelectedChallengeId ? 'active' : ''}" 
                        onclick="selectChallenge(${ch.id})">
                    <span class="ch-id-badge">#${ch.id}</span>
                    <span class="ch-name-txt">${ch.nameKr}</span>
                    <span class="ch-map-tag">${ch.map.split('(')[0]}</span>
                </button>
            `).join('')}
        </div>
    `;

    const rightCol = document.createElement('div');
    rightCol.className = 'weekly-right-pane';
    rightCol.id = 'weekly-detail-pane';

    weeklyWrapper.appendChild(leftCol);
    weeklyWrapper.appendChild(rightCol);
    container.appendChild(weeklyWrapper);

    updateChallengeDetail(currentSelectedChallengeId);
}

function selectChallenge(id) {
    currentSelectedChallengeId = id;
    document.querySelectorAll('#weekly-scroll-list .weekly-list-item').forEach(btn => btn.classList.remove('active'));
    
    const clickedBtn = document.querySelector(`#weekly-scroll-list .weekly-list-item:nth-child(${id})`);
    if (clickedBtn) clickedBtn.classList.add('active');

    updateChallengeDetail(id);
}

function updateChallengeDetail(id) {
    const pane = document.getElementById('weekly-detail-pane');
    if (!pane || typeof WEEKLY_CHALLENGES === 'undefined') return;

    const data = WEEKLY_CHALLENGES.find(c => c.id === id) || WEEKLY_CHALLENGES[0];
    const ytQuery = encodeURIComponent(`파스모포비아 주간 챌린지 ${data.nameEn} 뇽자`);

    pane.innerHTML = `
        <div class="weekly-detail-card">
            <div class="weekly-detail-header">
                <div>
                    <div style="font-size: 0.95rem; color: var(--accent-light); font-weight: 700;">CHALLENGE #${data.id}</div>
                    <div style="font-size: 1.65rem; font-weight: 800; color: #fff; margin-top: 2px;">${data.nameKr}</div>
                    <div style="font-size: 0.92rem; color: #a1a1aa; font-style: italic; margin-top: 4px;">"${data.quote}"</div>
                </div>
                <span class="map-badge Medium" style="font-size: 1.0rem; padding: 7px 16px;">🗺️ ${data.map}</span>
            </div>

            <div style="margin: 14px 0 16px 0;">
                <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" class="weekly-yt-banner-btn">
                    <span class="yt-banner-icon">▶️</span>
                    <div class="yt-banner-textbox">
                        <div class="yt-banner-title">📺 유튜브에서 '${data.nameEn}' 뇽자 공략 영상 보기</div>
                        <div class="yt-banner-sub">클릭 시 해당 주간 챌린지의 뇽자 실전 클리어 및 공략 검색창으로 바로 이동합니다.</div>
                    </div>
                    <span class="yt-banner-arrow">영상 보기 ➔</span>
                </a>
            </div>

            <div class="dict-section-title">1. 게임 환경 & 파라미터 세부 설정 (Status)</div>
            <div style="overflow-x: auto; margin-bottom: 14px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; color: #d4d4d8; text-align: left;">
                    <tbody>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light); width: 22%;">제공 증거 수</td>
                            <td style="padding: 8px 10px; color: #fff; width: 28%;">${data.evidences}</td>
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light); width: 22%;">준비 시간</td>
                            <td style="padding: 8px 10px; color: #fff; width: 28%;">${data.setupTime}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light);">정신력 상태</td>
                            <td style="padding: 8px 10px; color: #fff;">${data.sanity}</td>
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light);">이동 속도</td>
                            <td style="padding: 8px 10px; color: #fff;">${data.speed}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light);">은신처 상태</td>
                            <td style="padding: 8px 10px; color: #fff;">${data.hiding}</td>
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light);">두꺼비집(차단기)</td>
                            <td style="padding: 8px 10px; color: #fff;">${data.breaker}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light);">저주받은 물건</td>
                            <td style="padding: 8px 10px; color: #fff;">${data.cursed}</td>
                            <td style="padding: 8px 10px; font-weight: 700; color: var(--accent-light);">문 상태 & 날씨</td>
                            <td style="padding: 8px 10px; color: #fff;">${data.doors} / ${data.weather}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="dict-section-title">2. 장비 지급 및 누락 조건 (Loadout)</div>
            <div style="background: rgba(0,0,0,0.4); padding: 13px 16px; border-radius: 8px; border: 1px solid var(--card-border); font-size: 0.94rem; line-height: 1.65; margin-bottom: 14px;">
                <div style="color: #f87171; margin-bottom: 6px;">${data.missingItems}</div>
                <div style="color: #34d399;">${data.availableItems}</div>
            </div>

            <div class="dict-section-title">3. 핵심 공략법 및 추천 전략 (Strategy)</div>
            <div style="background: rgba(109, 76, 251, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-vibrant); font-size: 0.96rem; line-height: 1.7; color: #f4f4f5;">
                💡 ${data.strategy}
            </div>
        </div>
    `;
}

// 5. 🗺️ 맵 정보 렌더링
let currentSelectedMapIndex = 0;
let currentMapCategory = 'ALL';

function getMapDisplayName(rawName) {
    const mapNameMap = {
        "6 Tanglewood Drive": "6 탱글우드 드라이브 (6 Tanglewood Drive)",
        "42 Edgefield Road": "42 엣지필드 로드 (42 Edgefield Road)",
        "10 Ridgeview Court": "10 리지뷰 코트 (10 Ridgeview Court)",
        "Nell's Diner": "넬스 다이너 (Nell's Diner)",
        "13 Willow Street": "13 윌로우 스트리트 (13 Willow Street)",
        "Camp Woodwind": "우드윈드 캠프장 (Camp Woodwind)",
        "Grafton Farmhouse": "그라프톤 농가 (Grafton Farmhouse)",
        "Bleasdale Farmhouse": "블리즈데일 농가 (Bleasdale Farmhouse)",
        "Point Hope": "포인트 호프 등대 (Point Hope)",
        "Maple Lodge Campsite": "메이플 롯지 캠프장 (Maple Lodge Campsite)",
        "Prison": "교도소 (Prison)",
        "Brownstone High School": "브라운스톤 고등학교 (Brownstone High School)",
        "Sunny Meadows": "써니 메도우 본관 (Sunny Meadows)",
        "Sunny Meadows Restricted": "써니 메도우 구역제한 (Sunny Meadows Restricted)"
    };

    if (mapNameMap[rawName]) return mapNameMap[rawName];
    if (rawName.includes('(')) return rawName;
    return rawName;
}

function getMapSearchKeyword(rawName) {
    const searchNameMap = {
        "6 Tanglewood Drive": "탱글우드",
        "42 Edgefield Road": "엣지필드",
        "10 Ridgeview Court": "리지뷰",
        "Nell's Diner": "넬스다이너",
        "13 Willow Street": "윌로우",
        "Camp Woodwind": "우드윈드",
        "Grafton Farmhouse": "그라프톤",
        "Bleasdale Farmhouse": "블리즈데일",
        "Point Hope": "포인트호프",
        "Maple Lodge Campsite": "메이플롯지",
        "Prison": "교도소",
        "Brownstone High School": "고등학교",
        "Sunny Meadows": "써니메도우",
        "Sunny Meadows Restricted": "써니메도우"
    };

    return searchNameMap[rawName] || rawName.split(' ')[0];
}

function renderMaps(category = 'ALL') {
    const container = document.getElementById('maps-container');
    if (!container || typeof MAP_DATA === 'undefined') return;
    container.innerHTML = '';
    currentMapCategory = category;

    const filteredMaps = category === 'ALL' 
        ? MAP_DATA 
        : MAP_DATA.filter(m => m.category === category);

    if (currentSelectedMapIndex >= filteredMaps.length) {
        currentSelectedMapIndex = 0;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'weekly-split-layout map-split-layout';

    const leftCol = document.createElement('div');
    leftCol.className = 'weekly-left-pane';
    leftCol.innerHTML = `
        <div class="guide-card" style="margin-bottom: 12px; border-left: 4px solid var(--accent-vibrant); padding: 12px 14px;">
            <div class="guide-card-title" style="font-size: 1.05rem; margin-bottom: 6px;">📦 은신처(Hiding Spot) 공통 규칙</div>
            <div class="guide-card-body" style="font-size: 0.9rem; line-height: 1.55; color: var(--text-secondary);">
                • <strong>초보자:</strong> 차단 없음 (모든 은신처 100% 개방)<br>
                • <strong>중급자/전문가:</strong> 2~3곳 차단 | <strong>악몽/광기:</strong> 4곳 차단<br>
                • <strong>멀티 인원 보너스:</strong> 3인 플레이 시 +1곳 / 4인 시 +2곳 추가 개방
            </div>
        </div>

        <div class="map-filter-bar" style="margin-bottom: 10px; gap: 6px;">
            <button class="map-filter-btn ${category === 'ALL' ? 'active' : ''}" onclick="filterMapCategory('ALL')">전체 (${MAP_DATA.length})</button>
            <button class="map-filter-btn ${category === 'Small' ? 'active' : ''}" onclick="filterMapCategory('Small')">소형</button>
            <button class="map-filter-btn ${category === 'Medium' ? 'active' : ''}" onclick="filterMapCategory('Medium')">중형</button>
            <button class="map-filter-btn ${category === 'Large' ? 'active' : ''}" onclick="filterMapCategory('Large')">대형</button>
        </div>

        <div class="weekly-scroll-list" id="map-scroll-list">
            ${filteredMaps.map((m, idx) => `
                <button type="button" 
                        class="weekly-list-item ${idx === currentSelectedMapIndex ? 'active' : ''}" 
                        onclick="selectMapItem(${idx})">
                    <span class="map-badge ${m.category}" style="font-size: 0.82rem; padding: 2px 8px;">${m.category}</span>
                    <span class="ch-name-txt" style="font-size: 1.02rem;">${getMapDisplayName(m.name)}</span>
                    <span class="ch-map-tag" style="font-size: 0.82rem;">${m.rooms || ''}</span>
                </button>
            `).join('')}
        </div>
    `;

    const rightCol = document.createElement('div');
    rightCol.className = 'weekly-right-pane';
    rightCol.id = 'map-detail-pane';

    wrapper.appendChild(leftCol);
    wrapper.appendChild(rightCol);
    container.appendChild(wrapper);

    updateMapDetail(currentSelectedMapIndex);
}

function selectMapItem(index) {
    currentSelectedMapIndex = index;
    document.querySelectorAll('#map-scroll-list .weekly-list-item').forEach((btn, idx) => {
        if (idx === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    updateMapDetail(index);
}

function filterMapCategory(cat) {
    currentSelectedMapIndex = 0;
    renderMaps(cat);
}

function updateMapDetail(index) {
    const pane = document.getElementById('map-detail-pane');
    if (!pane || typeof MAP_DATA === 'undefined') return;

    const filteredMaps = currentMapCategory === 'ALL' 
        ? MAP_DATA 
        : MAP_DATA.filter(m => m.category === currentMapCategory);

    const map = filteredMaps[index] || filteredMaps[0];
    if (!map) return;

    const mapKey = getMapSearchKeyword(map.name);
    const mapYtQuery = encodeURIComponent(`파스모포비아 ${mapKey} 뺑뺑이 뇽자`);

    const mapImageHtml = map.image ? `
        <div class="map-image-container">
            <img src="${map.image}" alt="${map.name} 지도" class="map-preview-img">
            <span class="map-image-hint">🔍 지도 확대 및 세부 포인트 확인</span>
        </div>
    ` : `
        <div class="map-image-placeholder">
            <span style="font-size: 2.2rem; margin-bottom: 6px;">🗺️</span>
            <div style="font-weight: 700; color: var(--accent-light); font-size: 1.05rem;">${getMapDisplayName(map.name)} 정밀 구조도</div>
            <div style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 2px;">
                층별 룸 배치도, 저주받은 물건 및 차단기 스폰 포인트
            </div>
        </div>
    `;

    pane.innerHTML = `
        <div class="weekly-detail-card">
            <div class="weekly-detail-header">
                <div>
                    <div style="font-size: 1.65rem; font-weight: 800; color: #fff;">${getMapDisplayName(map.name)}</div>
                    <div style="font-size: 0.95rem; color: var(--accent-light); margin-top: 3px; font-weight: 600;">
                        구조: ${map.size} (${map.rooms})
                    </div>
                </div>
                <span class="map-badge ${map.category}" style="font-size: 1.0rem; padding: 7px 16px;">${map.category}</span>
            </div>

            <div style="margin: 14px 0 14px 0;">
                ${mapImageHtml}
            </div>

            <div style="margin-bottom: 16px;">
                <a href="https://www.youtube.com/results?search_query=${mapYtQuery}" target="_blank" class="weekly-yt-banner-btn">
                    <span class="yt-banner-icon">🌀</span>
                    <div class="yt-banner-textbox">
                        <div class="yt-banner-title">📺 유튜브에서 '${mapKey}' 뺑뺑이 & 루핑 공략 영상 보기</div>
                        <div class="yt-banner-sub">클릭 시 해당 맵의 뇽자 은신처 드리블 및 뺑뺑이 가이드 검색 결과로 이동합니다.</div>
                    </div>
                    <span class="yt-banner-arrow">영상 보기 ➔</span>
                </a>
            </div>

            <div class="dict-section-title">💡 맵 핵심 탐색 팁 (Exploration Tip)</div>
            <div style="background: rgba(109, 76, 251, 0.1); padding: 13px 15px; border-radius: 8px; border-left: 4px solid var(--accent-vibrant); font-size: 0.95rem; line-height: 1.65; color: #f4f4f5; margin-bottom: 16px;">
                ${map.tip}
            </div>

            <div class="dict-section-title">📋 룸 목록, 은신처 & 저주 물건 상세 공략</div>
            <div style="background: rgba(0, 0, 0, 0.4); padding: 14px 16px; border-radius: 8px; border: 1px solid var(--card-border); font-size: 0.92rem; line-height: 1.65;">
                ${map.detailedHtml || '<p style="color: var(--text-secondary);">상세 정보 업데이트 준비 중입니다.</p>'}
            </div>
        </div>
    `;
}

// 6. 아포칼립스 렌더링 (내부 좌우 분할 구조 및 관련 클래스 완전 배제, 단일 컨테이너 전체 너비 확장)
function renderApocalypse() {
    const container = document.getElementById('apocalypse-container');
    if (!container || typeof APOCALYPSE_DATA === 'undefined') return;
    container.innerHTML = '';

    const data = APOCALYPSE_DATA;

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = 'none';
    wrapper.style.boxSizing = 'border-box';

    wrapper.innerHTML = `
        <div class="weekly-detail-card" style="width: 100%; max-width: none; box-sizing: border-box;">
            <div class="weekly-detail-header">
                <div>
                    <div style="font-size: 1.65rem; font-weight: 800; color: #fff;">${data.title}</div>
                    <div style="font-size: 0.95rem; color: var(--accent-light); margin-top: 3px; font-weight: 600;">
                        ${data.subtitle}
                    </div>
                </div>
                <span class="map-badge Large" style="font-size: 1.0rem; padding: 7px 16px;">💀 ${data.badge}</span>
            </div>

            <div style="margin: 14px 0 16px 0;">
                <a href="https://www.youtube.com/results?search_query=파스모포비아+아포칼립스+뇽자" target="_blank" class="weekly-yt-banner-btn">
                    <span class="yt-banner-icon">▶️</span>
                    <div class="yt-banner-textbox">
                        <div class="yt-banner-title">📺 유튜브에서 '아포칼립스 15배율' 뇽자 실전 공략 보기</div>
                        <div class="yt-banner-sub">클릭 시 해당 공략 검색 결과로 바로 이동합니다.</div>
                    </div>
                    <span class="yt-banner-arrow">영상 보기 ➔</span>
                </a>
            </div>

            <div class="dict-section-title">💡 아포칼립스 핵심 개요 (OVERVIEW)</div>
            <div style="background: rgba(109, 76, 251, 0.1); padding: 13px 15px; border-radius: 8px; border-left: 4px solid var(--accent-vibrant); font-size: 0.95rem; line-height: 1.65; color: #f4f4f5; margin-bottom: 16px;">
                ${data.tip}
            </div>

            <div class="dict-section-title">📋 상세 공략 및 가이드 (DETAILED GUIDE)</div>
            <div style="background: rgba(0, 0, 0, 0.4); padding: 14px 16px; border-radius: 8px; border: 1px solid var(--card-border); font-size: 0.92rem; line-height: 1.65;">
                ${data.detailedHtml}
            </div>
        </div>
    `;

    container.appendChild(wrapper);
}

// 7. 드롭스 렌더링
function renderDrops() {
    const container = document.getElementById('drops-container');
    if (!container || typeof DROPS_DATA === 'undefined') return;
    container.innerHTML = '';

    DROPS_DATA.forEach(item => {
        const card = document.createElement('div');
        card.className = 'guide-card';
        card.innerHTML = `
            <div class="guide-card-title">🎁 ${item.title}</div>
            <div style="font-size: 0.85rem; color: var(--accent-light); margin-bottom: 8px;">📅 기간: ${item.period} (${item.date})</div>
            <div class="guide-card-body" style="margin-bottom: 12px;">${item.content}</div>
            <a href="${item.url}" target="_blank" class="weekly-yt-banner-btn" style="padding: 8px 12px;">
                <span class="yt-banner-icon">🌐</span>
                <div class="yt-banner-textbox">
                    <div class="yt-banner-title" style="font-size: 0.92rem;">공식 트위치 드롭스 안내 페이지</div>
                </div>
                <span class="yt-banner-arrow" style="font-size: 0.85rem; padding: 4px 8px;">이동 ➔</span>
            </a>
        `;
        container.appendChild(card);
    });
}

// 8. 핵심 공략 렌더링
function renderGuides() {
    const container = document.getElementById('guide-container');
    if (!container || typeof GUIDE_DATA === 'undefined') return;
    container.innerHTML = '';

    GUIDE_DATA.forEach(g => {
        const card = document.createElement('div');
        card.className = 'guide-card';
        card.innerHTML = `
            <div class="guide-card-title">🔥 ${g.title}</div>
            <div class="guide-card-body">${g.body}</div>
        `;
        container.appendChild(card);
    });
}

// 9. ID 카드 & 배지 렌더링
function renderIdCards() {
    const container = document.getElementById('idcard-container');
    if (!container || typeof IDCARD_DATA === 'undefined') return;
    container.innerHTML = '';

    IDCARD_DATA.forEach(id => {
        const card = document.createElement('div');
        card.className = 'eq-card';
        card.innerHTML = `
            <div class="eq-header">
                <div class="eq-name">${id.name}</div>
                <span class="eq-category">${id.category}</span>
            </div>
            <div class="eq-tier-box">
                <div class="eq-tier-title">단계 1</div>
                <div class="eq-tier-desc">${id.t1}</div>
            </div>
            <div class="eq-tier-box">
                <div class="eq-tier-title">단계 2</div>
                <div class="eq-tier-desc">${id.t2}</div>
            </div>
            <div class="eq-tier-box">
                <div class="eq-tier-title">단계 3</div>
                <div class="eq-tier-desc">${id.t3}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 10. 📢 패치 소식 (공식 Kinetic Games 뉴스 그리드 뷰 렌더링)
function renderNews() {
    const container = document.getElementById('news-container');
    if (!container || typeof NEWS_DATA === 'undefined') return;
    container.innerHTML = '';

    const headerBox = document.createElement('div');
    headerBox.style.width = "100%";
    headerBox.style.marginBottom = "14px";
    headerBox.innerHTML = `
        <div class="guide-card" style="border-left: 4px solid var(--accent-vibrant); padding: 14px 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <div class="guide-card-title" style="font-size: 1.18rem; margin-bottom: 4px;">📢 Kinetic Games 공식 최신 뉴스 & 패치 피드</div>
                    <div class="guide-card-body" style="font-size: 0.92rem; color: var(--text-secondary);">
                        공식 개발진이 작성한 최신 패치 노트, 로드맵 및 개발자 프리뷰 원문 링크입니다. 카드를 클릭하면 공식 페이지로 바로 이동합니다.
                    </div>
                </div>
                <a href="https://kineticgames.co.uk/news" target="_blank" class="map-filter-btn active" style="text-decoration: none; padding: 8px 16px; font-size: 0.95rem;">
                    🌐 공식 뉴스 전체보기 ➔
                </a>
            </div>
        </div>
    `;
    container.appendChild(headerBox);

    const grid = document.createElement('div');
    grid.className = 'news-blog-grid';

    NEWS_DATA.forEach(n => {
        const card = document.createElement('a');
        card.href = n.url;
        card.target = "_blank";
        card.className = 'news-blog-card';

        card.innerHTML = `
            <div class="news-card-thumb-wrap">
                <img src="${n.img}" 
                     alt="${n.title}" 
                     class="news-card-img"
                     onerror="this.onerror=null; this.src='images/maps/Sunny_Meadows.webp'">
            </div>
            <div class="news-card-body">
                <div class="news-card-meta">
                    <span class="news-card-cat">${n.icon} ${n.category}</span>
                    <span class="news-card-date">${n.date}</span>
                </div>
                <div class="news-card-title">${n.title}</div>
                <div class="news-card-desc">${n.desc}</div>
                <div class="news-card-footer">
                    <span>READ MORE</span>
                    <span class="news-card-arrow">➔</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

// 네비게이션 탭 전환 로직
function switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const activeContent = document.getElementById(`tab-${tabId}`);
    if (activeContent) {
        activeContent.classList.add('active');
    }

    if (tabId === 'maps') {
        filterMapCategory('ALL');
    }
    if (tabId === 'equipment') {
        filterEqCategory('ALL');
    }
}

// 상단 헤더 검색
function openSearchPanel() {
    toggleQuickPanel('search');
}

function handleHeaderSearch(val) {
    toggleQuickPanel('search');
    const panelInput = document.querySelector('.search-input-box');
    if (panelInput) {
        panelInput.value = val;
    }
    handleQuickSearch(val);
}

// 우측 슬라이드 패널 토글
function toggleQuickPanel(panelType) {
    const panel = document.getElementById('quick-slide-panel');
    const titleEl = document.getElementById('quick-panel-title');
    const contentEl = document.getElementById('quick-panel-content');

    if (!panel) return;

    if (panel.classList.contains('open') && panel.getAttribute('data-type') === panelType) {
        panel.classList.remove('open');
        return;
    }

    panel.setAttribute('data-type', panelType);
    panel.classList.add('open');

    if (panelType === 'search') {
        titleEl.innerText = "🔍 빠른 단어 검색";
        contentEl.innerHTML = `
            <input type="text" class="search-input-box" placeholder="검색어를 입력하세요..." onkeyup="handleQuickSearch(this.value)">
            <div id="quick-search-results"></div>
        `;
    } else if (panelType === 'news') {
        titleEl.innerText = "📢 최근 패치 안내";
        contentEl.innerHTML = "<p>패치 소식 탭에서 최신 패치 및 밸런스 내역을 확인하실 수 있습니다.</p>";
    } else if (panelType === 'stream') {
        titleEl.innerText = "📺 실시간 LIVE 방송";
        contentEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 8px; overflow: hidden; border: 1.5px solid var(--card-border); background-color: #000;">
                    <iframe 
                        src="https://chzzk.naver.com/live/14fd4427ab76277bee9567d27dcbf0e8/player" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; overflow: hidden;" 
                        scrolling="no" 
                        allow="autoplay; fullscreen" 
                        allowfullscreen>
                    </iframe>
                </div>
                <a href="https://chzzk.naver.com/live/14fd4427ab76277bee9567d27dcbf0e8" target="_blank" class="yt-btn" style="text-align: center; text-decoration: none; width: 100%; font-size: 0.95rem;">
                    🟢 치지직 생방송 보러가기
                </a>
                <p style="font-size: 0.88rem; color: var(--text-secondary); text-align: center; line-height: 1.4; margin-top: 4px;">
                    뇽자의 실시간 파스모포비아 방송을 시청하고 함께 소통해 보세요!
                </p>
            </div>
        `;
    } else if (panelType === 'contact') {
        titleEl.innerText = "✉️ 제보 및 공식 채널";
        contentEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 4px;">
                    유령 정보, 신규 패치 데이터, 버그 제보 및 비즈니스 문의는 아래 채널을 이용해 주세요!
                </p>
                <a href="https://www.youtube.com/@nyongja1" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(248, 113, 113, 0.4); background-color: rgba(248, 113, 113, 0.12);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">▶️</span>
                    <div>
                        <div style="color: #f87171; font-size: 0.95rem; font-weight: 700;">뇽자 유튜브</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">파스모포비아 공식 파트너 유튜브</div>
                    </div>
                </a>
                <a href="https://chzzk.me/nyongja" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(52, 211, 153, 0.4); background-color: rgba(6, 8, 20, 0.6);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">🟢</span>
                    <div>
                        <div style="color: #34d399; font-size: 0.95rem; font-weight: 700;">뇽자 치지직 채널</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 실시간 방송 보러가기</div>
                    </div>
                </a>
                <a href="https://discord.gg/YkgM5t6N33" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(109, 76, 251, 0.5); background-color: rgba(109, 76, 251, 0.15);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">💬</span>
                    <div>
                        <div style="color: var(--accent-light); font-size: 0.95rem; font-weight: 700;">너굴단 디스코드</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 & 너굴단 디스코드</div>
                    </div>
                </a>
                <a href="https://www.instagram.com/n_yong_ja" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(248, 113, 113, 0.4); background-color: rgba(248, 113, 113, 0.1);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">📸</span>
                    <div>
                        <div style="color: #f87171; font-size: 0.95rem; font-weight: 700;">뇽스타그램</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 인스타그램</div>
                    </div>
                </a>
                <a href="https://cafe.naver.com/phasmophobia1" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(52, 211, 153, 0.4); background-color: rgba(52, 211, 153, 0.1);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">☕</span>
                    <div>
                        <div style="color: #34d399; font-size: 0.95rem; font-weight: 700;">네이버 팬카페</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 공식 팬카페</div>
                    </div>
                </a>
                <a href="mailto:future2549@naver.com" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(166, 143, 255, 0.35); background-color: rgba(6, 8, 20, 0.6);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">📧</span>
                    <div>
                        <div style="color: #ffffff; font-size: 0.95rem; font-weight: 700;">비즈니스 / 제보 이메일</div>
                        <div style="font-size: 0.8rem; color: var(--accent-light); font-weight: normal;">future2549@naver.com</div>
                    </div>
                </a>
            </div>
        `;
    }
}

function closeQuickPanel() {
    const panel = document.getElementById('quick-slide-panel');
    if (panel) panel.classList.remove('open');
}

function handleQuickSearch(query) {
    const resultsContainer = document.getElementById('quick-search-results');
    if (!resultsContainer || !query.trim()) {
        if (resultsContainer) resultsContainer.innerHTML = '';
        return;
    }

    const q = query.toLowerCase();
    const matched = GHOST_DATA.filter(g => g.name.toLowerCase().includes(q) || g.tip.toLowerCase().includes(q));

    resultsContainer.innerHTML = matched.map(g => `
        <div class="search-result-card">
            <div class="search-result-title">${g.name} (${g.engName})</div>
            <div style="font-size:0.9rem; color:#a3a6c9;">${g.tip}</div>
        </div>
    `).join('');
}

async function fetchVisitorCounts() {
    const todayEl = document.getElementById('today-visitors');
    const totalEl = document.getElementById('total-visitors');
    if (!todayEl || !totalEl) return;

    const todayStr = new Date().toISOString().slice(0, 10);
    const todayKey = `nyong_phasmo_${todayStr}`;
    const totalKey = `nyong_phasmo_total`;

    try {
        const totalRes = await fetch(`https://api.counterapi.dev/v1/nyongja_guide/${totalKey}/up`);
        const totalData = await totalRes.json();
        totalEl.innerText = (totalData.count || 1).toLocaleString() + '명';

        const todayRes = await fetch(`https://api.counterapi.dev/v1/nyongja_guide/${todayKey}/up`);
        const todayData = await todayRes.json();
        todayEl.innerText = (todayData.count || 1).toLocaleString() + '명';
    } catch (err) {
        todayEl.innerText = '-';
        totalEl.innerText = '-';
    }
}
