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
    renderGuides();
    renderIdCards();
    renderNews();

    fetchVisitorCounts();
});

// [전체 스크립트 생략: 위에서 작성한 renderEquipment, renderWeekly, renderMaps, renderNews, switchTab 등 모든 함수를 포함합니다]

// 8. 📢 패치 소식 (뉴스 그리드 뷰 렌더링 - 전체)
function renderNews() {
    const container = document.getElementById('news-container');
    if (!container || typeof NEWS_DATA === 'undefined') return;
    container.innerHTML = '';

    // 뉴스 헤더
    const headerBox = document.createElement('div');
    headerBox.style.marginBottom = "20px";
    headerBox.innerHTML = `
        <div style="background: rgba(109, 76, 251, 0.1); border-left: 4px solid var(--accent-vibrant); padding: 15px;">
            <div style="font-size: 1.2rem; font-weight: 800; color: #fff;">📢 Kinetic Games 공식 뉴스</div>
            <div style="font-size: 0.95rem; color: var(--text-secondary);">최신 패치 노트 및 개발자 프리뷰입니다.</div>
        </div>
    `;
    container.appendChild(headerBox);

    // 그리드 컨테이너
    const grid = document.createElement('div');
    grid.className = 'news-blog-grid';

    NEWS_DATA.forEach(n => {
        const card = document.createElement('a');
        card.href = n.url;
        card.target = "_blank";
        card.className = 'news-blog-card';

        card.innerHTML = `
            <div class="news-card-thumb-wrap">
                <img src="${n.img}" class="news-card-img" onerror="this.src='images/maps/Sunny_Meadows.webp'">
            </div>
            <div class="news-card-body">
                <div style="font-size: 0.75rem; color: var(--accent-light); margin-bottom: 5px;">${n.date}</div>
                <div class="news-card-title">${n.title}</div>
                <div class="news-card-desc">${n.desc}</div>
                <div class="news-card-footer">READ MORE ➔</div>
            </div>
        `;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}
