// ==========================================
// 파스모포비아 뇽자 가이드 사이트 - 메인 애플리케이션 (전체 코드)
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

// [중략된 기존 함수들...]
// (이전 코드의 renderEquipment, renderWeekly, renderMaps 함수를 그대로 유지합니다)

// 6. 아포칼립스 렌더링 (최종 수정: 좌우 2분할, 오른쪽 여백 완전 제거)
function renderApocalypse() {
    const container = document.getElementById('apocalypse-container');
    if (!container || typeof APOCALYPSE_DATA === 'undefined') return;
    container.innerHTML = '';

    const data = APOCALYPSE_DATA;

    const wrapper = document.createElement('div');
    wrapper.className = 'weekly-split-layout';
    wrapper.style.display = 'flex';
    wrapper.style.gap = '20px';
    wrapper.style.alignItems = 'stretch';

    const leftCol = document.createElement('div');
    leftCol.style.flex = '1';
    leftCol.innerHTML = `
        <div class="weekly-detail-card" style="height: 100%;">
            <div class="weekly-detail-header">
                <div>
                    <div style="font-size: 1.65rem; font-weight: 800; color: #fff;">${data.title}</div>
                    <div style="font-size: 0.95rem; color: var(--accent-light); margin-top: 3px; font-weight: 600;">${data.subtitle}</div>
                </div>
                <span class="map-badge Large" style="font-size: 1.0rem; padding: 7px 16px;">💀 ${data.badge}</span>
            </div>
            <div class="dict-section-title" style="margin-top: 16px;">💡 아포칼립스 핵심 개요 (OVERVIEW)</div>
            <div style="background: rgba(109, 76, 251, 0.1); padding: 13px 15px; border-radius: 8px; border-left: 4px solid var(--accent-vibrant); font-size: 0.95rem; line-height: 1.65; color: #f4f4f5; margin-bottom: 16px;">${data.tip}</div>
            <div class="dict-section-title">📋 상세 공략 및 가이드 (DETAILED GUIDE)</div>
            <div style="background: rgba(0, 0, 0, 0.4); padding: 14px 16px; border-radius: 8px; border: 1px solid var(--card-border); font-size: 0.92rem; line-height: 1.65; flex-grow: 1;">${data.detailedHtml}</div>
        </div>
    `;

    const rightCol = document.createElement('div');
    rightCol.style.flex = '0.7';
    rightCol.style.display = 'flex';
    rightCol.style.flexDirection = 'column';
    rightCol.style.gap = '10px';
    
    const ytLinks = [
        {title: "파스모포비아 아포칼립스 통합 공략", sub: "검색 결과 바로 이동", icon: "▶️", url: "https://www.youtube.com/results?search_query=파스모포비아+아포칼립스+뇽자"},
        {title: "아포칼립스 3단계(골드) 실전", sub: "클리어 가이드 영상", icon: "🏆", url: "https://www.youtube.com/results?search_query=파스모포비아+아포칼립스+3단계+뇽자"},
        {title: "써니 메도우 생존 드리블", sub: "은신처 및 루핑 팁", icon: "🏥", url: "https://www.youtube.com/results?search_query=파스모포비아+써니메도우+아포칼립스+뇽자"},
        {title: "15배율 설정 세팅 가이드", sub: "배율 설정 최적화", icon: "⚙️", url: "https://www.youtube.com/results?search_query=파스모포비아+커스텀난이도+15배율+뇽자"},
        {title: "무증거/아포칼립스 속도 판별", sub: "발소리 템포 분석", icon: "👻", url: "https://www.youtube.com/results?search_query=파스모포비아+유령특징+속도구분+뇽자"},
        {title: "3성 사진 미션 요령", sub: "효율적인 촬영 팁", icon: "📸", url: "https://www.youtube.com/results?search_query=파스모포비아+사진미션+공략+뇽자"}
    ];

    rightCol.innerHTML = `
        <div class="guide-card" style="border-left: 4px solid var(--accent-vibrant); padding: 15px;">
            <div class="guide-card-title" style="font-size: 1.12rem;">📺 뇽자의 아포칼립스 실전 공략 영상</div>
            <div class="guide-card-body" style="font-size: 0.9rem; color: var(--text-secondary);">유튜브 공략 영상들입니다.</div>
        </div>
        ${ytLinks.map(item => `
            <a href="${item.url}" target="_blank" class="weekly-yt-banner-btn" style="flex: 1; display: flex; align-items: center; padding: 10px 20px;">
                <span style="font-size: 1.4rem; margin-right: 15px;">${item.icon}</span>
                <div>
                    <div style="font-size: 0.95rem;">${item.title}</div>
                    <div style="font-size: 0.8rem;">${item.sub}</div>
                </div>
                <span style="margin-left: auto;">➔</span>
            </a>
        `).join('')}
    `;

    wrapper.appendChild(leftCol);
    wrapper.appendChild(rightCol);
    container.appendChild(wrapper);
}

// [기타 나머지 함수 renderDrops, renderGuides, renderIdCards, renderNews, switchTab 등은 기존과 동일]
