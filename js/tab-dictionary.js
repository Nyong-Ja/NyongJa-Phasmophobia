function renderGhostDictionary() {
    const container = document.getElementById('ghost-dictionary-container');
    if (!container) return;
    container.innerHTML = '';

    GHOST_DATA.forEach(ghost => {
        const details = document.createElement('details');
        details.className = 'dict-details';

        const detailBodyHtml = ghost.isCustomDetailed && ghost.detailedHtml ? ghost.detailedHtml : `
            <div class="dict-section-title">증거 목록</div>
            <p class="dict-text">${ghost.evidences.join(', ')}</p>
            <div class="dict-section-title">고유 특성 & 대응법</div>
            <p class="dict-text">${ghost.specialTrait}</p>
        `;

        details.innerHTML = `
            <summary class="dict-summary-btn">
                <div class="dict-btn-left">
                    <img src="images/ghosts/${ghost.engName}.webp" 
                         onerror="this.onerror=null; this.src='images/ghosts/Spirit.webp'" 
                         class="dict-btn-icon" 
                         alt="${ghost.name}">
                    <div>
                        <span class="dict-btn-title">${ghost.name}</span>
                        <span class="dict-btn-eng">(${ghost.engName})</span>
                    </div>
                </div>
                <div class="dict-btn-right">
                    <span class="dict-toggle-badge">상세 공략 ▾</span>
                </div>
            </summary>
            <div class="dict-content-body">
                <div class="dict-spec-bar">
                    <div class="dict-spec-item"><strong>헌팅 정신력:</strong> ${ghost.huntSanity}</div>
                    <div class="dict-spec-item"><strong>이동 속도:</strong> ${ghost.speed}</div>
                    <div class="dict-spec-item"><strong>고정 증거:</strong> ${ghost.forcedEvidence}</div>
                </div>
                ${detailBodyHtml}
            </div>
        `;
        container.appendChild(details);
    });
}
