// ==========================================
// 메인 애플리케이션 진입점 & 공통 UI 제어
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initEvidenceButtons === 'function') initEvidenceButtons();
    if (typeof renderGhostList === 'function') renderGhostList();
    if (typeof renderGhostDictionary === 'function') renderGhostDictionary();

    renderEquipment();
    renderWeekly();
    renderMaps('ALL');
    renderGuides();
    renderIdCards();
    renderNews();

    fetchVisitorCounts();
});

// 3. 장비 가이드 렌더링 (독립 3열 Flex 분배 및 토글 상세 공략 지원)
function renderEquipment() {
    const container = document.getElementById('equipment-container');
    if (!container || typeof EQUIPMENT_DATA === 'undefined') return;
    container.innerHTML = '';

    const columnsWrapper = document.createElement('div');
    columnsWrapper.className = 'eq-columns-container';

    const colElements = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
    ];

    colElements.forEach(col => {
        col.className = 'eq-col';
        columnsWrapper.appendChild(col);
    });

    EQUIPMENT_DATA.forEach((eq, index) => {
        const card = document.createElement('div');
        card.className = 'eq-card';
        const detailId = `eq-detail-${index}`;

        const detailSection = eq.isDetailed && eq.detailedHtml ? `
            <div style="margin-top: 14px; background: rgba(0, 0, 0, 0.4); border-radius: 8px; padding: 10px 14px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <button type="button" onclick="toggleEqDetail('${detailId}', this)" style="width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: #a78bfa; padding: 0; outline: none;">
                    <span style="font-size: 0.95rem;">🛠️ 장비 스펙 & 심층 사용 가이드</span>
                    <span class="toggle-btn-txt" style="font-size: 0.82rem; color: #a1a1aa; border: 1px solid rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 4px; background: rgba(255,255,255,0.05);">펼치기 ▾</span>
                </button>
                <div id="${detailId}" style="display: none; margin-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; text-align: left;">
                    ${eq.detailedHtml}
                </div>
            </div>
        ` : '';

        card.innerHTML = `
            <div>
                <div class="eq-header">
                    <div class="eq-name">${eq.name}</div>
                    <span class="eq-category">${eq.category}</span>
                </div>
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
            ${detailSection}
        `;

        const targetCol = colElements[index % 3];
        targetCol.appendChild(card);
    });

    container.appendChild(columnsWrapper);
}

function toggleEqDetail(id, btn) {
    const el = document.getElementById(id);
    const txt = btn.querySelector('.toggle-btn-txt');
    if (!el) return;

    if (el.style.display === 'none' || el.style.display === '') {
        el.style.display = 'block';
        if (txt) {
            txt.innerText = '접기 ▴';
            txt.style.color = '#f87171';
            txt.style.borderColor = 'rgba(248, 113, 113, 0.4)';
        }
    } else {
        el.style.display = 'none';
        if (txt) {
            txt.innerText = '펼치기 ▾';
            txt.style.color = '#a1a1aa';
            txt.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    }
}

// 4. 주간 도전 과제 렌더링
function renderWeekly() {
    const container = document.getElementById('weekly-container');
    if (!container || typeof WEEKLY_DATA === 'undefined') return;
    container.innerHTML = '';

    WEEKLY_DATA.forEach(w => {
        const card = document.createElement('div');
        card.className = 'guide-card';
        card.innerHTML = `
            <div class="guide-card-title">${w.title}</div>
            <div class="guide-card-body">${w.body}</div>
        `;
        container.appendChild(card);
    });
}

// 5. 맵 정보 렌더링 (독립 3열 Flex 컬럼 방식)
function renderMaps(category = 'ALL') {
    const container = document.getElementById('maps-container');
    if (!container || typeof MAP_DATA === 'undefined') return;
    container.innerHTML = '';

    const ruleCard = document.createElement('div');
    ruleCard.className = 'guide-card';
    ruleCard.style.cssText = 'border-left: 4px solid #6d4cfb !important; margin-bottom: 20px !important; background: rgba(13, 16, 35, 0.8) !important; padding: 16px !important; border-radius: 8px !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; width: 100% !important; box-sizing: border-box !important;';
    ruleCard.innerHTML = `
        <div style="font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 8px;">📦 난이도 및 인원별 은신처(Hiding Spot) 공통 규칙</div>
        <div style="font-size: 0.95rem; line-height: 1.6; color: #a1a1aa;">
            파스모포비아의 모든 맵은 난이도와 인원수에 따라 <strong>공식 은신처(옷장, 락커, 구석 상자 등)</strong>의 차단 여부가 달라집니다:
            <ul style="margin-top: 8px; padding-left: 20px; color: #d4d4d8;">
                <li><strong style="color: #fff;">초보자 (Amateur):</strong> 차단 없음 (모든 은신처 100% 개방)</li>
                <li><strong style="color: #fff;">중급자 (Intermediate):</strong> 은신처 2곳 무작위 차단</li>
                <li><strong style="color: #fff;">전문가 (Professional):</strong> 은신처 3곳 무작위 차단</li>
                <li><strong style="color: #fff;">악몽 / 광기 (Nightmare / Insanity):</strong> 은신처 4곳 무작위 차단</li>
                <li><strong style="color: #a78bfa;">👥 멀티플레이 인원 보너스:</strong> 3인 플레이 시 <strong>+1곳</strong> / 4인 플레이 시 <strong>+2곳</strong> 추가 개방</li>
            </ul>
        </div>
    `;
    container.appendChild(ruleCard);

    const columnsWrapper = document.createElement('div');
    columnsWrapper.className = 'maps-columns-container';

    const colElements = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
    ];

    colElements.forEach(col => {
        col.className = 'map-column';
        columnsWrapper.appendChild(col);
    });

    const filtered = category === 'ALL' ? MAP_DATA : MAP_DATA.filter(m => m.category === category);

    filtered.forEach((map, index) => {
        const card = document.createElement('div');
        card.className = 'map-card';
        const detailId = `map-detail-${index}`;

        const detailSection = map.isDetailed && map.detailedHtml ? `
            <div style="margin-top: 14px; background: rgba(0, 0, 0, 0.4); border-radius: 8px; padding: 10px 14px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <button type="button" onclick="toggleMapDetail('${detailId}', this)" style="width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: #a78bfa; padding: 0; outline: none;">
                    <span style="font-size: 0.95rem;">🗺️ 룸 목록, 은신처 & 저주 물건 상세 공략</span>
                    <span class="toggle-btn-txt" style="font-size: 0.82rem; color: #a1a1aa; border: 1px solid rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 4px; background: rgba(255,255,255,0.05);">펼치기 ▾</span>
                </button>
                <div id="${detailId}" style="display: none; margin-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; text-align: left;">
                    ${map.detailedHtml}
                </div>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="map-header">
                <div class="map-name">${map.name}</div>
                <span class="map-badge ${map.category}">${map.category}</span>
            </div>
            <div class="map-info-list" style="margin: 10px 0;">
                <div class="map-info-item" style="background: rgba(255, 255, 255, 0.03); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.05);">
                    <strong>구조:</strong> ${map.size} (${map.rooms})
                </div>
            </div>
            <p class="dict-text" style="color: var(--text-secondary, #a1a1aa); margin-bottom: 8px;">💡 ${map.tip}</p>
            ${detailSection}
        `;

        const targetCol = colElements[index % 3];
        targetCol.appendChild(card);
    });

    container.appendChild(columnsWrapper);
}

function toggleMapDetail(id, btn) {
    const el = document.getElementById(id);
    const txt = btn.querySelector('.toggle-btn-txt');
    if (!el) return;

    if (el.style.display === 'none' || el.style.display === '') {
        el.style.display = 'block';
        if (txt) {
            txt.innerText = '접기 ▴';
            txt.style.color = '#f87171';
            txt.style.borderColor = 'rgba(248, 113, 113, 0.4)';
        }
    } else {
        el.style.display = 'none';
        if (txt) {
            txt.innerText = '펼치기 ▾';
            txt.style.color = '#a1a1aa';
            txt.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    }
}

function filterMapCategory(cat) {
    document.querySelectorAll('.map-filter-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.getElementById(`map-btn-${cat}`);
    if (targetBtn) targetBtn.classList.add('active');
    renderMaps(cat);
}

// 6. 핵심 공략 렌더링
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

// 7. ID 카드 & 배지 렌더링
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

// 8. 패치 소식 렌더링
function renderNews() {
    const container = document.getElementById('news-container');
    if (!container || typeof NEWS_DATA === 'undefined') return;
    container.innerHTML = '';

    NEWS_DATA.forEach(n => {
        const card = document.createElement('div');
        card.className = 'guide-card';
        card.innerHTML = `
            <div class="guide-card-title">${n.title}</div>
            <div class="guide-card-body">${n.body}</div>
        `;
        container.appendChild(card);
    });
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
