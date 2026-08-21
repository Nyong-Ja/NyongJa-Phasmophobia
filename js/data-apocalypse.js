// ==========================================
// 💀 아포칼립스 챌린지 (Apocalypse Challenge) 상세 데이터베이스
// ==========================================

const APOCALYPSE_DATA = [
    {
        id: 1,
        title: "Apocalypse I (1단계)",
        nameKr: "아포칼립스 1단계 (Apocalypse I)",
        difficulty: "배율 6x 이상",
        quote: "극악의 난이도에 발을 들여놓는 첫 번째 단계입니다.",
        tip: "진입 전 입구 복도에 십자가, 향초, 카메라 등을 미리 세팅해 두어 기습 헌팅에 대비하세요.",
        detailedHtml: `
            <div class="dict-section-title">1. 개요 및 목표 (OVERVIEW)</div>
            <p class="dict-text">
                • <strong>대상 맵:</strong> 써니 메도우 정신병원 (Sunny Meadows) 본관 풀맵<br>
                • <strong>요구 배율:</strong> 커스텀 난이도 배율 6x 이상<br>
                • <strong>클리어 조건:</strong> 유령 종류 특정 + 부가 목표 3개 완수 + 유령 사진 촬영 + 생존 탈출
            </p>
            <div class="dict-section-title" style="margin-top: 1.2rem;">2. 핵심 공략 및 생존 전략 (STRATEGY)</div>
            <p class="dict-text">
                • 넓은 병원 복도에서 지향성 마이크를 활용해 유령의 소리를 추적하고 방을 빠르게 특정하세요.<br>
                • 첫 사냥이 시작되기 전 빠르게 부가 목표를 확인하고 안전하게 완수하는 것이 중요합니다.
            </p>
        `
    },
    {
        id: 2,
        title: "Apocalypse II (2단계)",
        nameKr: "아포칼립스 2단계 (Apocalypse II)",
        difficulty: "배율 10x 이상",
        quote: "장비와 정신력의 압박이 거세지는 중급 도전 단계입니다.",
        tip: "정신력 약이 부족하므로 초반 타이밍에 신속히 방 위치를 특정해야 합니다.",
        detailedHtml: `
            <div class="dict-section-title">1. 개요 및 목표 (OVERVIEW)</div>
            <p class="dict-text">
                • <strong>대상 맵:</strong> 써니 메도우 정신병원 (Sunny Meadows) 본관 풀맵<br>
                • <strong>요구 배율:</strong> 커스텀 난이도 배율 10x 이상<br>
                • <strong>제약 사항:</strong> 정신력 회복 약 제한, 은신처 감소, 유령 활동성 증가
            </p>
            <div class="dict-section-title" style="margin-top: 1.2rem;">2. 핵심 공략 및 생존 전략 (STRATEGY)</div>
            <p class="dict-text">
                • 사냥 중 유령의 깜빡임 주기와 이동 속도 템포를 면밀히 관찰하여 유령의 종류를 좁혀나가세요.<br>
                • 고스트 이벤트 발생 시 침착하게 카메라를 들어 유령 사진을 반드시 촬영해 두어야 합니다.
            </p>
        `
    },
    {
        id: 3,
        title: "Apocalypse III (3단계 - 골드 트로피)",
        nameKr: "아포칼립스 3단계 (골드 트로피)",
        difficulty: "배율 15x 이상",
        quote: "모든 제약이 극에 달한 최종 단계, 전설의 골드 트로피를 획득하세요!",
        tip: "원하는 부가 목표나 차단기 위치가 아닐 경우 과감하게 재시작(Restart)하여 최적의 조건을 뽑으세요.",
        detailedHtml: `
            <div class="dict-section-title">1. 개요 및 목표 (OVERVIEW)</div>
            <p class="dict-text">
                • <strong>대상 맵:</strong> 써니 메도우 정신병원 (Sunny Meadows) 본관 풀맵<br>
                • <strong>요구 배율:</strong> 커스텀 난이도 배율 15x 이상<br>
                • <strong>최종 보상:</strong> <strong>골드 트로피 (Gold Trophy)</strong> 및 로비 ID 카드 커스텀 해금<br>
                • <strong>극한 조건:</strong> 증거 0개, 유령 속도 150%, 은신처 없음, 헌팅 유예 0초
            </p>
            <div class="dict-section-title" style="margin-top: 1.2rem;">2. 핵심 공략 및 생존 전략 (STRATEGY)</div>
            <p class="dict-text">
                • <strong>발소리 속도 추리:</strong> 증거가 없으므로 데오겐(발소리 감속), 레버넌트(시야 닿을 시 3.0m/s 폭주) 등의 고유 속도 변화를 귀 기울여 듣고 판별하세요.<br>
                • <strong>진입 전 세팅:</strong> 입구 복도에 향초와 라이터, 십자가를 완벽히 구비해 두고 진입 즉시 십자가를 배치해 초반 기습 사냥을 방어하세요.
            </p>
        `
    }
];
