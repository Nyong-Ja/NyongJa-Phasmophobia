// ==========================================
// 파스모포비아 유령 데이터베이스 (고정 30종) & 로직
// ==========================================

const GHOST_DATA = [
    {
        name: "스피릿",
        engName: "Spirit",
        evidences: ["EMF 5", "스피릿 박스", "고스트 라이팅"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+스피릿+공략",
        tip: `<strong>1. 사냥 및 정화향초 메커니즘</strong><br>
              • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
              • <strong>이동 속도 및 시야 가속:</strong> 기본 이동 속도는 <strong>1.7 m/s</strong>이며, 표준 시야 가속(LOS Accel)이 정상 적용되어 최대 2.25 m/s까지 가속합니다.<br>
              • <strong>향초 봉인 특수 룰:</strong> 정화향초(Smudge Stick)에 정화될 경우, 일반 유령(90초)과 달리 <strong>180초(3분) 동안 사냥이 완전히 봉인</strong>됩니다.`,
        huntSanity: "50%",
        specialTrait: "향초 방어 시간이 기본(90초)의 2배인 180초입니다.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 메커니즘 (Hunt)</div>
            <p class="dict-text">
                • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
                • <strong>이동 속도 및 시야 가속:</strong> 기본 이동 속도는 <strong>1.7 m/s</strong>이며, 플레이어를 시야(LOS)에 둘 경우 표준 시야 가속이 정상 적용되어 최대 2.25 m/s까지 증가합니다.<br>
                • <strong>향초 봉인 특수 룰:</strong> 정화향초(Smudge Stick)를 피워 스피릿을 정화할 경우, 일반 유령(90초)과 달리 <strong>180초(3분) 동안 사냥이 완전히 봉인</strong>됩니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 스피릿 박스 (Spirit Box)<br>
                • 고스트 라이팅 (Ghost Writing)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 특수 능력이 없어 상호작용이나 행동만으로는 쉽게 특징을 드러내지 않습니다.<br>
                • <strong>약점 (Weakness):</strong> 정화향초에 노출되면 매우 긴 시간 동안 사냥 능력이 무력화됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>향초 타이머 감별법 (가장 확정적):</strong> 정신력 0% 상태에서 향초를 태운 직후 타이머를 잽니다. 90초~180초 사이에 사냥이 절대 터지지 않고 정확히 180초 이후 첫 사냥이 시작된다면 스피릿입니다.<br>
                • <strong>소거법 활용:</strong> 특수 속도 변화나 시각적 기믹이 전혀 없는 가장 표준적인 유령이므로, 다른 특수 유령들의 가능성을 모두 배제한 뒤 향초 타이머로 최종 확정짓는 것이 좋습니다.
            </p>
        `
    },
    {
        name: "레이스",
        engName: "Wraith",
        evidences: ["EMF 5", "스피릿 박스", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+레이스+공략",
        tip: `<strong>1. 사냥 및 특수 이동 메커니즘</strong><br>
              • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
              • <strong>소금 면역 (절대 밟지 않음):</strong> 공중에 떠다니므로 <strong>소금을 절대로 밟지 않으며, 발자국 자외선 흔적도 남기지 않습니다.</strong><br>
              • <strong>플레이어 순간이동 능력:</strong> 사냥 중이 아닐 때 무작위 플레이어 위치로 순간이동(Teleport)하며, 직후 출발 지점에 EMF 2 또는 5가 발생합니다.`,
        huntSanity: "50%",
        specialTrait: "소금을 절대 밟지 않음, 순간이동 능력(EMF 2/5 발생), 벽/바닥 투과 이동.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: true,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 및 특수 이동 메커니즘 (Hunt & Movement)</div>
            <p class="dict-text">
                • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
                • <strong>소금 면역 (절대 밟지 않음):</strong> 레이스는 설정상 땅에 발이 닿지 않고 떠다니므로 <strong>소금을 절대로 밟지 않으며, 발자국 손자국 자외선 흔적도 남기지 않습니다.</strong><br>
                • <strong>플레이어 순간이동 능력:</strong> 사냥 중이 아닐 때, 맵 내 무작위 플레이어 한 명의 바로 옆 위치로 순간이동(Teleport)을 수행할 수 있습니다. 순간이동 직후 유령이 출발한 지점에 EMF 2 또는 EMF 5 신호가 발생합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 스피릿 박스 (Spirit Box)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 소금을 통해 이동 동선을 파악하거나 위치를 감지하기 불가능합니다.<br>
                • <strong>약점 (Weakness):</strong> 소금에 노출되었을 때 상호작용 반응이 전혀 나타나지 않으므로 즉시 정체가 탄로납니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>소금 테스트 (100% 확정):</strong> 고스트 룸이나 동선에 소금을 까놓고 유령을 유도했을 때, 소금 덩어리가 전혀 흐트러지지 않거나 발자국 자국이 남지 않는다면 레이스입니다.<br>
                • <strong>기습 EMF 반응:</strong> 고스트 룸과 멀리 떨어진 방에 서 있는데 갑자기 내 발밑에서 EMF 2 또는 EMF 5가 울린다면 레이스가 나에게 순간이동을 한 것입니다.
            </p>
        `
    },
    {
        name: "팬텀",
        engName: "Phantom",
        evidences: ["스피릿 박스", "손자국", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+팬텀+공략",
        tip: `<strong>1. 시각적 특성 및 사냥 메커니즘</strong><br>
              • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
              • <strong>직시 정신력 차감:</strong> 실체화된 팬텀을 바라볼 경우 <strong>초당 약 0.4%의 정신력이 급감</strong>합니다.<br>
              • <strong>사진 촬영 시 소멸:</strong> 사진을 찍으면 <strong>모습이 즉시 사라지며</strong>(사진 판정 정상), 사냥 시 <strong>투명하게 숨는 깜빡임 주기(1~2초)가 매우 깁니다.</strong>`,
        huntSanity: "50%",
        specialTrait: "직시 시 초당 정신력 0.4% 차감, 카메라인식 시 모습 소멸, 사냥 중 투명 시간 긺(1~2초).",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: true,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 시각적 특성 및 사냥 메커니즘 (Visual & Hunt)</div>
            <p class="dict-text">
                • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
                • <strong>직시 정신력 차감:</strong> 실체화된 팬텀을 조준선에 두고 바라볼 경우 <strong>초당 약 0.4%의 정신력이 급격하게 차감</strong>됩니다.<br>
                • <strong>사진 촬영 시 소멸:</strong> 고스트 이벤트나 상호작용 중 팬텀의 사진을 찍으면 <strong>셔터 소리와 함께 유령 모습이 즉시 사라지고 오디오음만 남습니다.</strong> (저장된 사진 앨범에는 유령 형태가 비치지 않고 '유령 사진'으로 정상 판정)<br>
                • <strong>사냥 중 긴 투명 상태 (Blink Rate):</strong> 사냥 시 깜빡이는 주기 중 <strong>투명(Invisible)하게 숨는 시간이 1초~2초 정도로 매우 길어</strong> 유령의 형상을 보기 힘듭니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box)<br>
                • 자외선 / 손자국 (Ultraviolet)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 유령을 오래 바라보는 것만으로 조사팀의 정신력을 순식간에 소진시킵니다.<br>
                • <strong>약점 (Weakness):</strong> 카메라로 사진을 찍히는 순간 실체화 형태가 강제로 소멸합니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>사진 찍기 테스트:</strong> 고스트 이벤트 시 사진을 찍었을 때 유령이 피식 사라지고 앨범에 유령 형체가 노이즈 없이 깨끗한 배경으로 나온다면 팬텀입니다.<br>
                • <strong>사냥 시 깜빡임 관찰:</strong> 유령이 보였다 안 보였다 하는 주기에서 안 보이는 유예시간이 유독 길다면 팬텀을 의심할 수 있습니다.
            </p>
        `
    },
    {
        name: "폴터가이스트",
        engName: "Poltergeist",
        evidences: ["스피릿 박스", "손자국", "고스트 라이팅"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+폴터가이스트+공략",
        tip: `<strong>1. 물건 투척 및 사냥 메커니즘</strong><br>
              • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
              • <strong>다중 물건 폭발 투척 (Polter Bomb):</strong> 물건이 모여 있을 때 <strong>여러 물건을 동시에 폭발하듯 던지는 특수 능력</strong>을 사용합니다.<br>
              • <strong>정신력 차감 & 0.5초 투척:</strong> 폭발 시 던져진 <strong>물건 1개당 정신력이 2%씩 차감</strong>되며, 사냥 중에도 0.5초마다 물건을 던집니다.`,
        huntSanity: "50%",
        specialTrait: "다중 물건 동시 투척, 사냥 시 0.5초마다 물건 투척, 투척 물건 1개당 정신력 2% 차감.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 물건 투척 및 사냥 메커니즘 (Polter Throw)</div>
            <p class="dict-text">
                • <strong>기본 사냥 조건:</strong> 평균 정신력이 <strong>50% 이하</strong>일 때 사냥을 시작합니다.<br>
                • <strong>다중 물건 폭발 투척 (Polter Bomb):</strong> 고스트 룸 주위에 물건이 뭉쳐 있을 때, <strong>여러 개의 물건을 동시에 큰 소리를 내며 사방으로 강하게 던지는 특수 능력</strong>을 씁니다.<br>
                • <strong>정신력 폭발 차감:</strong> 특수 능력으로 물건을 던질 때, <strong>던져진 물건 1개당 근처 플레이어의 정신력이 2%씩 무더기로 차감</strong>됩니다.<br>
                • <strong>사냥 시 빈번한 물건 투척:</strong> 사냥 중에도 0.5초마다 100% 확률로 주변 물건을 던지며 지나갑니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box)<br>
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 고스트 라이팅 (Ghost Writing)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 물건이 쌓인 곳에서 폭발 능력을 쓰면 정신력이 순식간에 바닥납니다.<br>
                • <strong>약점 (Weakness):</strong> 물건이 없는 텅 빈 방에서는 능력을 쓰지 못해 무력해집니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>물건 모으기 테스트 (폴터 탑):</strong> 컵, 접시, 촛대 등을 한곳에 수십 개 모아두었을 때 사방으로 한 번에 '쾅!' 하고 튀어 나간다면 폴터가이스트입니다.<br>
                • <strong>사냥 중 발소리와 투척음:</strong> 사냥 중 걸어올 때 끊임없이 물건이 요란하게 던져진다면 폴터가이스트를 확정할 수 있습니다.
            </p>
        `
    },
    {
        name: "밴시",
        engName: "Banshee",
        evidences: ["손자국", "고스트 오브", "DOTS"],
        sanity: "타겟 정신력 50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+밴시+공략",
        tip: `<strong>1. 사냥 및 타겟팅 메커니즘</strong><br>
              • <strong>단일 타겟 지정:</strong> 무작위 1명을 타겟으로 지정하며, <strong>오직 타겟의 정신력이 50% 이하</strong>일 때만 사냥을 시작합니다.<br>
              • <strong>비타겟 무시 (몸통 통과):</strong> 사냥 중 오직 타겟만 추격하며, <strong>비타겟 플레이어와 부딪히거나 통과해도 절대 죽지 않습니다.</strong><br>
              • <strong>지향성 마이크 비명:</strong> 지향성 마이크로 소리 감지 시 약 33% 확률로 <strong>특유의 날카로운 고유 비명(Wail)</strong>을 들려줍니다.`,
        huntSanity: "타겟 정신력 50%",
        specialTrait: "사냥 시 오직 타겟만을 추적하고 타겟이 아닌 플레이어는 통과함. 지향성 마이크 특수 비명(Wail) 확률.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: true,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 및 타겟팅 메커니즘 (Hunt & Target)</div>
            <p class="dict-text">
                • <strong>단일 타겟 지정:</strong> 게임 시작 시 무작위로 1명의 플레이어를 '타겟(Target)'으로 지정하며 타겟이 사망하거나 집 밖으로 나가지 않는 한 타겟이 바뀌지 않습니다.<br>
                • <strong>사냥 기준 정신력:</strong> 전체 평균 정신력이 아니라 <strong>오직 지정된 타겟의 정신력이 50% 이하</strong>일 때만 사냥을 시작합니다.<br>
                • <strong>비타겟 플레이어 무시:</strong> 사냥 중 밴시는 오직 타겟만을 쫓으며, 비타겟 플레이어와 직접 부딪히거나 통과해도 <strong>비타겟 플레이어는 절대 죽지 않습니다.</strong><br>
                • <strong>타겟 부재 시 룰:</strong> 타겟이 집(조사 구역) 밖에 머물러 있다면 사냥 시 일반 유령처럼 근처에 있는 다른 플레이어를 추적합니다.<br>
                • <strong>모델 룰:</strong> 밴시는 설정상 항상 여성 유령 모델만 사용합니다.
            </p>
            <div class="dict-section-title">2. 상호작용 및 고유 행동 (Interaction)</div>
            <p class="dict-text">
                • <strong>스토킹 로밍 (Stalking Roam):</strong> 평소에 타겟이 위치한 곳으로 끊임없이 방을 이동(배회)하는 성향이 강합니다.<br>
                • <strong>지향성 마이크 고유 비명:</strong> 지향성 마이크로 소리를 감지할 때, 약 33% 확률로 특유의 <strong>날카로운 비명/탄식 소리(Banshee's Wail)</strong>를 들려줍니다.
            </p>
            <div class="dict-section-title">3. 증거 (Evidence)</div>
            <p class="dict-text">
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 고스트 오브 (Ghost Orb)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">4. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 타겟으로 지정된 사냥감을 집중적으로 약화시킨 후 기습합니다.<br>
                • <strong>약점 (Weakness):</strong> 지향성 마이크를 사용하면 고유의 비명 소리로 정체를 즉시 특정당합니다.
            </p>
            <div class="dict-section-title">5. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>지향성 마이크 테스트 (가장 확실):</strong> 마이크를 켜두고 특수 비명 소리가 들리는지 체크합니다.<br>
                • <strong>몸통 박치기 테스트:</strong> 사냥 시 유령이 자신을 보고도 무시하고 지나가거나 몸을 겹쳐도 죽지 않는다면 100% 밴시입니다.
            </p>
        `
    },
    {
        name: "다얀",
        engName: "Dayan",
        evidences: ["EMF 5", "스피릿 박스", "고스트 오브"],
        sanity: "50%",
        speed: "반경 10m 내 이동 시 2.5 m/s / 정지 시 1.4 m/s (기본 1.7 m/s)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+다얀+공략",
        tip: `<strong>1. 사냥 및 움직임 감지 메커니즘</strong><br>
              • <strong>움직임 감지 반경:</strong> <strong>반경 10m 이내</strong>에 플레이어가 있을 때 속도가 실시간 변화합니다.<br>
              • <strong>가속 조건 (2.5 m/s):</strong> 10m 내의 플레이어가 걷거나 뛰면 시야 여부와 무관하게 <strong>2.5 m/s로 대폭 가속</strong>합니다.<br>
              • <strong>감속 조건 (1.4 m/s):</strong> 10m 내의 플레이어가 제자리에 가만히 멈춰 서 있으면 <strong>1.4 m/s로 크게 감속</strong>합니다. (시야 가속 없음)`,
        huntSanity: "50%",
        specialTrait: "10m 이내 플레이어의 이동 여부에 따라 속도가 실시간 변화 (층수 무관 반경 적용).",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 메커니즘 (Hunt)</div>
            <p class="dict-text">
                • <strong>기본 이동 속도:</strong> 플레이어가 10m 범위 밖에 있을 때는 일반 유령과 동일한 <strong>1.7 m/s</strong>로 순찰합니다.<br>
                • <strong>가속 조건 (2.5 m/s):</strong> 10m 이내의 플레이어가 걷거나 달리는 등 이동 중일 경우 <strong>2.5 m/s로 대폭 가속</strong>합니다.<br>
                • <strong>감속 조건 (1.4 m/s):</strong> 10m 이내의 플레이어가 제자리에 가만히 멈춰 서 있으면 <strong>1.4 m/s로 크게 감속</strong>합니다.<br>
                • <strong>시야 가속(LOS Accel) 없음:</strong> 플레이어를 오래 바라보아도 일반 유령처럼 점진적으로 빨라지지 않습니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 스피릿 박스 (Spirit Box)<br>
                • 고스트 오브 (Ghost Orb)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 근처에서 도망치는 플레이어를 매우 빠른 속도로 따라잡아 사살합니다.<br>
                • <strong>약점 (Weakness):</strong> 근처에 있는 플레이어가 움직이지 않고 정지해 있으면 발걸음이 극도로 둔해집니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>은신처 정지 감별:</strong> 은신처에 숨어 완전히 멈춰 있을 때, 유령이 접근하면서 <strong>발소리가 갑자기 둔해지는 현상</strong>을 관찰하면 다얀입니다.
            </p>
        `
    },
    {
        name: "데일드가스트",
        engName: "Deildegast",
        evidences: ["EMF 5", "고스트 라이팅", "DOTS"],
        sanity: "50%",
        speed: "초기 3.0 m/s ➔ 물건 투척 시 감소 (최저 0.4 m/s)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+데일드가스트+공략",
        tip: `<strong>1. 사냥 및 물건 투척 감속 메커니즘</strong><br>
              • <strong>초기 사냥 속도 (3.0 m/s):</strong> 사냥 시작 첫 순간에는 <strong>3.0 m/s라는 폭발적인 초고속</strong>으로 스폰합니다.<br>
              • <strong>투척 연동 감속:</strong> 사냥 중 주변 물건을 하나씩 던질 때마다 속도가 점차 깎여 나갑니다.<br>
              • <strong>최저 속도 (0.4 m/s):</strong> 물건을 총 26개 던지면 <strong>최저 0.4 m/s까지 둔화</strong>됩니다. (시야 가속 없음)`,
        huntSanity: "50%",
        specialTrait: "초기 속도 3.0m/s, 물건 던질 때마다 속도 감소 (26개 던지면 최저 0.4m/s).",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 메커니즘 (Hunt)</div>
            <p class="dict-text">
                • <strong>초기 사냥 속도:</strong> 사냥이 터지는 첫 순간에는 <strong>3.0 m/s라는 폭발적인 초고속</strong>으로 스폰합니다.<br>
                • <strong>상호작용 연동 감속:</strong> 사냥 중 주변 오브젝트(물건)를 하나씩 던질 때마다 이동 속도가 단계적으로 깎여 나갑니다.<br>
                • <strong>최저 속도 한계:</strong> 사냥 동안 물건을 총 26개 이상 던지게 되면 이동 속도가 <strong>최저 0.4 m/s까지 둔화</strong>됩니다.<br>
                • <strong>시야 가속 없음:</strong> 시야 가속(LOS Accel)은 적용되지 않습니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 사냥 초반 물건을 던지기 전에는 레버넌트에 비견되는 위험한 속도로 돌진합니다.<br>
                • <strong>약점 (Weakness):</strong> 물건이 수두룩하게 쌓여 있는 방에서는 스스로 물건을 연달아 던지며 속도를 크게 낮춰버립니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>초반 정화향초 생존:</strong> 사냥 극초반에는 3.0m/s로 즉사 수준이므로 즉시 향초를 피우고 물건이 많은 곳으로 유도해야 합니다.
            </p>
        `
    },
    {
        name: "데오겐",
        engName: "Deogen",
        evidences: ["스피릿 박스", "고스트 라이팅", "DOTS"],
        sanity: "40%",
        speed: "원거리 3.0 m/s / 2.5m 이내 근접 시 0.4 m/s (시야가속 X)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+데오겐+공략",
        tip: `<strong>1. 사냥 및 은신 파괴 메커니즘</strong><br>
              • <strong>위치 자동 감지 (은신 불가):</strong> 사냥 시 맵 전체 플레이어 위치를 영구 감지하여 <strong>은신처에 숨어도 무조건 직진</strong>해옵니다.<br>
              • <strong>거리별 극단적 속도:</strong> 멀리 있을 때는 <strong>3.0 m/s</strong>로 빠르게 다가오지만, <strong>2.5m 이내로 들어오면 0.4 m/s</strong>로 극도로 느려집니다.<br>
              • <strong>스피릿 박스 고유 반응:</strong> 1m 내 스피릿 박스 사용 시 33% 확률로 <strong>'후욱- 후욱-' 하는 거친 중저음 숨소리</strong>를 냅니다. [고정 증거]`,
        huntSanity: "40%",
        specialTrait: "은신 파괴(숨기 불가), 2.5m 내 0.4m/s 감속, 스피릿 박스 거친 중저음 숨소리 반응.",
        forcedEvidence: "스피릿 박스",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: true,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 메커니즘 (Hunt)</div>
            <p class="dict-text">
                • <strong>위치 자동 감지 (은신 파괴):</strong> 사냥 시 맵 전체의 모든 플레이어 위치를 영구적으로 감지하며, <strong>옷장/라커/벽 뒤 등 은신처에 숨어도 무조건 은신을 무시하고 직진</strong>해옵니다.<br>
                • <strong>거리별 가속/감속 극단화:</strong> 타겟과 멀리 떨어져 있을 때는 <strong>3.0 m/s</strong>로 격렬하게 다가오지만, 타겟과의 거리가 2.5m 이내로 들어오는 순간 <strong>0.4 m/s</strong>라는 달팽이 속도로 느려집니다.<br>
                • <strong>시야 가속 없음:</strong> 플레이어를 계속 주시해도 추가적인 시야 가속이 붙지 않습니다.
            </p>
            <div class="dict-section-title">2. 고유 스피릿 박스 반응 (Heavy Breathing)</div>
            <p class="dict-text">
                • 데오겐에게 1m 이내에서 스피릿 박스를 사용할 경우, 33% 확률로 대답 대신 <strong>'후욱- 후욱-' 하는 거칠고 기괴한 중저음 숨소리 반응</strong>이 수신됩니다. (데오겐 고정 증거)
            </p>
            <div class="dict-section-title">3. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box) - <strong>[고정 증거]</strong><br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">4. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 위치를 완벽히 알아내므로 어설프게 숨으면 무조건 사망합니다.<br>
                • <strong>약점 (Weakness):</strong> 근처에 다가오면 걸음걸이가 0.4m/s가 되므로 식탁이나 테이블을 끼고 원을 그리며 돌면 절대로 플레이어를 잡지 못합니다.
            </p>
            <div class="dict-section-title">5. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>절대 숨지 않기:</strong> 데오겐으로 확인되거나 발소리가 멀리서 3.0m/s로 나를 향해 일직선으로 달려온다면 넓은 공간으로 나와 빙글빙글 카이트(Looping)해야 합니다.
            </p>
        `
    },
    {
        name: "데몬",
        engName: "Demon",
        evidences: ["손자국", "고스트 라이팅", "서늘함"],
        sanity: "기본 70% (특수 능력 사용 시 정신력 100% 사냥 가능)",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+데몬+공략",
        tip: `<strong>1. 사냥 및 무차별 기습 메커니즘</strong><br>
              • <strong>높은 기본 사냥 (70%):</strong> 평균 정신력 <strong>70% 이하</strong>부터 일반 사냥을 시작합니다.<br>
              • <strong>정신력 100% 기습 능력:</strong> 특수 능력으로 <strong>정신력이 100%여도 즉시 강제 사냥</strong>을 시작할 수 있습니다.<br>
              • <strong>사냥 쿨타임 20초 & 향초 60초:</strong> 사냥 쿨타임이 <strong>20초</strong>로 짧고, 향초 방어 시간이 <strong>60초</strong>에 불과합니다. (십자가 반경은 5m로 확대)`,
        huntSanity: "70% (능력 시 100%)",
        specialTrait: "정신력 100% 능 사냥, 사냥 쿨타임 20초, 향초 효과 60초 제한, 십자가 효과 범위 5m로 확대.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 메커니즘 (Hunt)</div>
            <p class="dict-text">
                • <strong>기본 높은 사냥 정신력:</strong> 평균 정신력이 <strong>70% 이하</strong>가 되면 일반 사냥을 시작합니다.<br>
                • <strong>정신력 100% 무차별 기습 능력:</strong> 데몬 고유 능력으로 정신력이 100%인 극초반 상태에서도 <strong>정신력을 무시하고 즉시 사냥을 강제 시작</strong>할 수 있습니다.<br>
                • <strong>짧은 사냥 재사용 쿨타임:</strong> 다음 사냥을 시작하기까지의 쿨타임이 <strong>20초</strong>로 매우 짧습니다.<br>
                • <strong>향초 디버프 저항:</strong> 정화향초에 노출되었을 때 사냥 봉인 시간이 <strong>60초</strong>에 불과합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 예고 없이 끊임없이 사냥을 터뜨려 조사팀을 기습합니다.<br>
                • <strong>약점 (Weakness):</strong> 십자가의 유효 방어 반경이 일반 3m에서 <strong>5m로 대폭 증가</strong>합니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>초반 기습 사냥 타임 체크:</strong> 집에 들어간 지 1분도 안 되었는데 사냥이 터졌다면 데몬의 특수 능력입니다.
            </p>
        `
    },
    {
        name: "갈루",
        engName: "Gallu",
        evidences: ["EMF 5", "스피릿 박스", "손자국"],
        sanity: "50%",
        speed: "기본 1.7 m/s / 분노 상태 1.96 m/s / 약화 상태 1.44 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+갈루+공략",
        tip: `<strong>1. 3단계 상태 변환 메커니즘</strong><br>
              • <strong>상태 순환:</strong> [일반(1.7m/s) ➔ 분노(1.96m/s) ➔ 약화(1.44m/s)] 순서로 성격이 변화합니다.<br>
              • <strong>분노 트리거:</strong> 방어 장비(소금, 십자가, 향초)에 자극받으면 즉시 분노 상태가 됩니다.<br>
              • <strong>분노 시 소금 면역:</strong> 분노 상태에서는 <strong>1.96 m/s로 빨라지며 소금을 밟아도 자국을 전혀 남기지 않습니다.</strong>`,
        huntSanity: "50%",
        specialTrait: "일반 ➔ 분노(1.96m/s) ➔ 약화(1.44m/s) 3단계 상태 변화. 분노 시 소금 밟아도 자국 안 남김.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 및 상태 변환 메커니즘 (State Cycle)</div>
            <p class="dict-text">
                • <strong>3단계 상태 순환:</strong> [일반 상태(1.7m/s) ➔ 분노 상태(1.96m/s) ➔ 약화 상태(1.44m/s)] 순서로 성격이 변화합니다.<br>
                • <strong>분노 트리거:</strong> 방어 장비(소금 밟기, 십자가 태우기, 정화향초 노출)에 자극을 받으면 즉시 분노 상태로 전환됩니다.<br>
                • <strong>분노 상태 특성:</strong> 속도가 <strong>1.96 m/s로 상승</strong>하며, 사냥 중 소금을 밟아도 <strong>소금 자국/손자국을 전혀 남기지 않습니다.</strong>
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 스피릿 박스 (Spirit Box)<br>
                • 자외선 / 손자국 (Ultraviolet)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 방어 장비를 사용하면 할수록 더 빠르고 위협적으로 변합니다.<br>
                • <strong>약점 (Weakness):</strong> 분노 사냥을 버텨내고 나면 다음 사냥에서 현저히 느려집니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>소금 자국 체크:</strong> 소금을 밟는 소리는 나지만 UV 라이트로 보았을 때 소금 자국이 안 남는다면 분노 상태의 갈루입니다.
            </p>
        `
    },
    {
        name: "고료",
        engName: "Goryo",
        evidences: ["EMF 5", "손자국", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+고료+공략",
        tip: `<strong>1. DOTS 상호작용 및 룸 고정 특수 룰</strong><br>
              • <strong>비디오 카메라 전용 관찰:</strong> DOTS는 <strong>육안으로 볼 수 없으며 오직 비디오 카메라 화면을 통해서만</strong> 모습을 드러냅니다.<br>
              • <strong>플레이어 부재 필수:</strong> 방 안에 플레이어가 1명이라도 서 있으면 DOTS를 절대 발동하지 않습니다.<br>
              • <strong>고스트 룸 변경 없음:</strong> 고스트 룸을 절대 변경하지 않는 강한 애착을 보입니다. [DOTS 고정 증거]`,
        huntSanity: "50%",
        specialTrait: "DOTS 고정 증거, 사람이 방에 없어야 카메라로만 DOTS 관찰 가능, 고스트 룸을 거의 변경하지 않음.",
        forcedEvidence: "DOTS",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: true,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. DOTS 상호작용 특수 룰 (Goryo DOTS)</div>
            <p class="dict-text">
                • <strong>비디오 카메라 전용 관찰:</strong> 고료의 DOTS는 <strong>육안으로 절대 볼 수 없으며, 오직 비디오 카메라 화면을 통해서만</strong> 모습을 드러냅니다.<br>
                • <strong>부재 조건 필수:</strong> 같은 방에 플레이어가 단 한 명이라도 서 있으면 DOTS를 절대로 발동하지 않습니다.<br>
                • <strong>고스트 룸 변경 없음:</strong> 고료는 고스트 룸을 절대 변경하지 않는 강한 애착 성향을 보입니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 자외선 / 손자국 (Ultraviolet)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector) - <strong>[고정 증거]</strong>
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 방 안에서 직접 관찰할 때는 DOTS 증거를 완전히 숨깁니다.<br>
                • <strong>약점 (Weakness):</strong> 고스트 룸 이탈률이 낮아 방 변경에 따른 혼선이 없습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>트럭 모니터 관찰:</strong> 카메라인 상태로 방에서 모두 나온 뒤 트럭 모니터로 관찰하는 것이 정석입니다.
            </p>
        `
    },
    {
        name: "한투",
        engName: "Hantu",
        evidences: ["손자국", "고스트 오브", "서늘함"],
        sanity: "50%",
        speed: "온도에 따라 1.4 m/s ~ 2.7 m/s (시야 가속 없음)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+한투+공략",
        tip: `<strong>1. 온도 기반 이동 속도 & 입김 메커니즘</strong><br>
              • <strong>온도 비례 속도:</strong> 방의 온도가 낮을수록 극단적으로 빨라집니다. (15°C 이상: 1.4 m/s ➔ <strong>0°C 이하: 2.7 m/s</strong>)<br>
              • <strong>시야 가속 없음:</strong> 플레이어를 오래 바라보아도 추가 시야 가속이 오르지 않습니다.<br>
              • <strong>입김 가시화:</strong> 두꺼비집이 꺼진 사냥 중 <strong>입에서 차가운 흰 입김 가스</strong>가 뿜어져 나옵니다. [서늘함 고정 증거]`,
        huntSanity: "50%",
        specialTrait: "서늘함 고정 증거, 온도가 낮은 방에서 최대 2.7m/s, 두꺼비집 내림 선호, 헌팅 시 입김 가시화, 시야 가속 없음.",
        forcedEvidence: "서늘함",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 온도 기반 이동 속도 (Temperature Speed)</div>
            <p class="dict-text">
                • <strong>온도 비례 속도:</strong> 지나가는 위치의 온도가 낮을수록 극단적으로 빨라집니다.<br>
                • <strong>15°C 이상:</strong> 1.4 m/s (극도로 느림)<br>
                • <strong>0°C 이하 (서늘한 방):</strong> <strong>2.7 m/s (매우 빠름)</strong><br>
                • <strong>시야 가속 없음:</strong> 플레이어를 오래 바라보아도 추가 시야 가속이 적용되지 않습니다.<br>
                • <strong>입김 가시화:</strong> 두꺼비집이 꺼진 사냥 중 입에서 차가운 흰 입김 가스가 뿜어져 나옵니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 고스트 오브 (Ghost Orb)<br>
                • 빙점 이하의 온도 (Freezing Temperatures) - <strong>[고정 증거]</strong>
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 차가운 어두운 복도나 방에서는 가속 없이도 2.7m/s로 기습 사살합니다.<br>
                • <strong>약점 (Weakness):</strong> 두꺼비집을 꺼두면 온도가 높으면 1.4m/s로 쉽게 도망칠 수 있습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>두꺼비집 전원 유지:</strong> 두꺼비집을 무조건 켜두어 집 전체 온도를 높이는 것이 살길입니다.
            </p>
        `
    },
    {
        name: "진",
        engName: "Jinn",
        evidences: ["EMF 5", "손자국", "서늘함"],
        sanity: "50%",
        speed: "3m 이내 접근 전 2.5 m/s ➔ 3m 이내 감속 1.7 m/s (두꺼비집 켜짐 시)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+진+공략",
        tip: `<strong>1. 두꺼비집 돌진 & 정신력 차감 메커니즘</strong><br>
              • <strong>두꺼비집 켜짐 필수:</strong> 두꺼비집이 켜져 있을 때만 가속 능력이 발동합니다.<br>
              • <strong>원거리 돌진 (2.5 m/s):</strong> 3m 이상 떨어져 있으면 <strong>즉시 2.5 m/s로 돌진</strong>하며, <strong>3m 이내로 들어오면 1.7 m/s로 감속</strong>합니다.<br>
              • <strong>두꺼비집 차단 불가:</strong> 진은 두꺼비집 전원을 수동으로 내리지 못하며, 플레이어 정신력 25% 즉시 차감 능력을 씁니다.`,
        huntSanity: "50%",
        specialTrait: "두꺼비집을 절대 내리지 못함, 두꺼비집 켜짐 시 먼 거리에서 2.5m/s 도달 가속, 근처 플레이어 정신력 25% 차감 능력.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 두꺼비집 돌진 메커니즘 (Jinn Charge)</div>
            <p class="dict-text">
                • <strong>두꺼비집 활성화 필수:</strong> 두꺼비집이 켜져 있을 때만 특수 가속이 작동합니다.<br>
                • <strong>장거리 시야 가속 (2.5 m/s):</strong> 거리 3m 이상 떨어져 있으면 <strong>즉시 2.5 m/s로 돌진</strong>합니다.<br>
                • <strong>근접 감속 (1.7 m/s):</strong> 3m 이내로 들어오는 순간 <strong>1.7 m/s로 발소리가 둔해집니다.</strong><br>
                • <strong>두꺼비집 차단 불가:</strong> 진은 두꺼비집 전원을 수동으로 내리지 못합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 멀리 있는 먹잇감을 순식간에 추격합니다.<br>
                • <strong>약점 (Weakness):</strong> 두꺼비집을 꺼두면 가속 능력이 완전히 상실됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>발소리 패턴 감별:</strong> 멀리서 빠르게 달려오다가 코앞에서 둔해지는 발소리를 들으면 진입니다.
            </p>
        `
    },
    {
        name: "메어",
        engName: "Mare",
        evidences: ["스피릿 박스", "고스트 오브", "고스트 라이팅"],
        sanity: "어둠 속 60% / 불 켜진 방 40%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+메어+공략",
        tip: `<strong>1. 어둠 및 사냥 정신력 메커니즘</strong><br>
              • <strong>어둠 속 사냥 (60%):</strong> 불이 꺼진 방에서는 <strong>정신력 60% 이하</strong>부터 사냥을 시작합니다.<br>
              • <strong>불 켜진 방 억제 (40%):</strong> 방의 불이 켜져 있으면 <strong>정신력이 40% 이하로 떨어지기 전까지 사냥을 시작하지 못합니다.</strong><br>
              • <strong>스위치 즉시 끄기:</strong> 플레이어가 켠 전등 스위치를 0초 만에 '딸깍' 하고 즉시 꺼버리는 능력을 자주 씁니다.`,
        huntSanity: "불 꺼짐 60% / 켜짐 40%",
        specialTrait: "전등 스위치 즉시 끄기 능력, 불이 켜진 방에서 사냥 불가능(40% 이하 제외), 두꺼비집 내림 선호.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 어둠 및 사냥 정신력 메커니즘 (Darkness Hunt)</div>
            <p class="dict-text">
                • <strong>어둠 속 사냥 정신력 (60%):</strong> 고스트 룸의 불이 꺼져 있으면 <strong>정신력 60% 이하</strong>부터 사냥을 터뜨릴 수 있습니다.<br>
                • <strong>불 켜진 방 사냥 억제 (40%):</strong> 고스트 룸의 전등이 켜져 있으면 <strong>정신력이 40% 이하로 떨어지기 전까지 사냥을 시작할 수 없습니다.</strong><br>
                • <strong>전등 스위치 즉시 끄기 (Instant Switch Off):</strong> 플레이어가 전등 스위치를 켜는 순간, <strong>0초만에 즉시 '딸깍' 하고 스위치를 다시 꺼버리는 고유 능력</strong>을 자주 사용합니다.<br>
                • <strong>전등 켜기 불가:</strong> 메어는 절대로 전등 스위치를 스스로 켜지 않습니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box)<br>
                • 고스트 오브 (Ghost Orb)<br>
                • 고스트 라이팅 (Ghost Writing)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 어둠 속에서 상주할 경우 높은 정신력에서도 연속 사냥을 시도합니다.<br>
                • <strong>약점 (Weakness):</strong> 고스트 룸의 전등을 지속적으로 켜두면 사냥을 매우 효과적으로 차단할 수 있습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>스위치 즉시 끄기 밀당 테스트:</strong> 방 불을 켰을 때 1초도 안 되어 유령이 켜자마자 바로 꺼버린다면 메어일 가능성이 99%입니다.<br>
                • <strong>불 켜두기 공략:</strong> 메어 상대 시 고스트 룸과 이동 동선의 전등을 항상 켜두어 정신력 40% 전까지 사냥을 봉인해야 합니다.
            </p>
        `
    },
    {
        name: "마일링",
        engName: "Myling",
        evidences: ["EMF 5", "손자국", "고스트 라이팅"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+마일링+공략",
        tip: `<strong>1. 정숙한 사냥 발소리 메커니즘</strong><br>
              • <strong>기본 사냥 조건:</strong> 평균 정신력 <strong>50% 이하</strong>에서 사냥을 시작합니다.<br>
              • <strong>발소리 가청 범위 차단:</strong> 일반 유령과 달리 <strong>전자기기 교란 범위(약 10m 이내)로 바짝 다가와야만 발소리가 들리기 시작</strong>합니다.<br>
              • <strong>손전등 깜빡임과 동기화:</strong> 바닥에 둔 손전등이 깜빡거리기 시작하는 순간에야 비로소 발소리가 울립니다.`,
        huntSanity: "50%",
        specialTrait: "정숙한 발소리(전자기기 교란 범위인 10m 내에서만 발소리 들림), 지향성 마이크 상호작용 소리 빈도 높음.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 정숙한 사냥 발소리 메커니즘 (Silent Footsteps)</div>
            <p class="dict-text">
                • <strong>기본 사냥 조건:</strong> 평균 정신력 <strong>50% 이하</strong>에서 사냥을 시작합니다.<br>
                • <strong>사냥 발소리 가청 범위 차단:</strong> 일반 유령의 발소리는 약 20m 거리까지 또렷하게 들리지만, 마일링은 <strong>전자기기 교란 범위(약 10m 이내)로 바짝 다가와야만 비로소 발소리가 들리기 시작합니다.</strong><br>
                • <strong>괴성/웅얼거림 오디오:</strong> 유령의 입에서 나는 웅얼거리는 사냥 소리는 정상 거리에서 들리지만, '발소리'만 유독 닿는 거리에서 조용합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 고스트 라이팅 (Ghost Writing)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 발소리가 조용해 유령이 벽 너머나 코앞까지 걸어오는 줄 모르고 방심하다 기습당하기 쉽습니다.<br>
                • <strong>약점 (Weakness):</strong> 손전등이 깜빡이기 시작하는 거리와 발소리가 들리기 시작하는 타이밍이 정확히 일치하여 감별하기 쉽습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>손전등 & 발소리 동기화 테스트:</strong> 켜둔 손전등이 미친 듯이 노이즈를 일으키는 10m 거리 안으로 들어왔을 때 비로소 발소리가 뚜벅뚜벅 들린다면 마일링입니다.
            </p>
        `
    },
    {
        name: "모로이",
        engName: "Moroi",
        evidences: ["스피릿 박스", "고스트 라이팅", "서늘함"],
        sanity: "50%",
        speed: "정신력 감소에 따라 1.5 m/s ➔ 최대 2.25 m/s (시야 가속 별도 추가)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+모로이+공략",
        tip: `<strong>1. 저주 시스템 & 정신력 비례 가속 메커니즘</strong><br>
              • <strong>저주 부여 (Curse):</strong> 스피릿 박스로 응답을 들으면 <strong>불 켜진 곳에서도 정신력이 2배 빠른 속도로 지속 감소</strong>합니다.<br>
              • <strong>정신력 연동 기본 속도:</strong> 정신력이 낮을수록 기본 발소리가 빨라집니다. (50%: 1.5m/s ➔ <strong>0%: 2.25m/s</strong>)<br>
              • <strong>시야 가속 중첩 & 향초 12초:</strong> 시야 가속이 별도로 중첩(최대 3.71m/s)되며, 향초 피격 시 <strong>12초간 시야가 마비</strong>됩니다. [스피릿 박스 고정 증거]`,
        huntSanity: "50%",
        specialTrait: "스피릿 박스 고정 증거, 음성 대화 수신 시 2배 저주, 정신력 비례 사냥 속도 증가(최대 2.25m/s), 정화향초 실명 시간 12초.",
        forcedEvidence: "스피릿 박스",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 저주 시스템 & 정신력 비례 가속 메커니즘</div>
            <p class="dict-text">
                • <strong>저주 부여 (Curse):</strong> 스피릿 박스로 대답을 들은 플레이어는 저주에 걸려 <strong>조명이 켜진 곳에 있어도 정신력이 2배 속도로 연속 감소</strong>합니다.<br>
                • <strong>정신력 연동 기본 속도:</strong> 조사팀의 정신력이 낮아질수록 사냥 기본 이동 속도가 지속적으로 상승합니다.<br>
                &nbsp;&nbsp;- 정신력 50%일 때: 1.5 m/s<br>
                &nbsp;&nbsp;- 정신력 0%일 때: <strong>2.25 m/s (기본 발소리가 엄청나게 빠름)</strong><br>
                • <strong>시야 가속 보너스:</strong> 정신력 저하에 따른 기본 가속에 더해, <strong>시야 가속(LOS Accel)이 별도로 중첩</strong>되어 시야에 포착되면 최대 3.71 m/s까지 도달합니다.<br>
                • <strong>정화향초 패시브 약점:</strong> 사냥 중 향초를 맞으면 일반 유령(6초)보다 2배 긴 <strong>12초 동안 시야가 차단되어 기절</strong>합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box) - <strong>[고정 증거]</strong><br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 저주와 저정신력이 결합하면 시야 가속까지 붙어 도망치는 것이 불가능해집니다.<br>
                • <strong>약점 (Weakness):</strong> 정화향초에 피격 시 무려 12초간 정지하므로 도망칠 시간이 넉넉하게 확보됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>스피릿 박스 후 양약 복용:</strong> 스피릿 박스로 응답을 들은 즉시 저주를 풀기 위해 정신력 약을 복용해야 합니다.<br>
                • <strong>정화향초 타이머:</strong> 사냥 중 향초를 피우고 유령이 방황하는 시간을 쟀을 때 12초 동안 멍때린다면 모로이입니다.
            </p>
        `
    },
    {
        name: "오바케",
        engName: "Obake",
        evidences: ["EMF 5", "손자국", "고스트 오브"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+오바케+공략",
        tip: `<strong>1. 형체 변신 및 손자국 특수 룰</strong><br>
              • <strong>사냥 중 형체 변신 (Shape-Shift):</strong> 사냥 깜빡임 중 6.6% 확률로 <strong>다른 외형 모델로 순간 변신했다가 복귀</strong>합니다. (헌팅당 최소 1회 발동)<br>
              • <strong>6손가락 특수 지문:</strong> 자외선 손자국을 남길 때 <strong>16.7% 확률로 독특한 6손가락 지문</strong>을 생성합니다.<br>
              • <strong>손자국 감추기/단축:</strong> 상호작용 시 25% 확률로 손자국을 안 남기거나, 수명을 절반(1분)으로 줄여 지웁니다. [손자국 고정 증거]`,
        huntSanity: "50%",
        specialTrait: "손자국 고정 증거, 16.7% 확률 6손가락 표식, 손자국 수명 절반 단축, 사냥 중 깜빡임 시 6.6% 확률 모델 변신(Shape-shift).",
        forcedEvidence: "손자국",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: true,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 형체 변신 및 손자국 특수 룰 (Shapeshifter)</div>
            <p class="dict-text">
                • <strong>사냥 중 형체 변신 (Shape-Shift):</strong> 사냥 시 유령이 깜빡이는 순간 중 6.6% 확률로 <strong>다른 외형 모델(남성/여성/아이 등)로 순간적으로 변신했다가 원래 모습으로 돌아옵니다.</strong> (헌팅당 최소 1회 이상 무조건 발동)<br>
                • <strong>6손가락 지문 (Special Fingerprint):</strong> 문, 창문, 스위치 등에 자외선 손자국을 남길 때 <strong>16.7% 확률로 독특한 6손가락 지문</strong>을 생성합니다.<br>
                • <strong>손자국 안 남기기 & 지우기:</strong> 상호작용 시 25% 확률로 손자국을 남기지 않거나, 남은 손자국 수명을 절반(1분)으로 줄여 일찍 지워버립니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 자외선 / 손자국 (Ultraviolet) - <strong>[고정 증거]</strong><br>
                • 고스트 오브 (Ghost Orb)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 손자국을 가끔 남기지 않거나 일찍 지워 증거 수집을 혼란스럽게 합니다.<br>
                • <strong>약점 (Weakness):</strong> 사냥 시 변신하는 순간을 목격하거나 6손가락 자국을 발견하는 즉시 확정됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>사냥 관찰 (변신 목격):</strong> 안전지대에서 사냥 중인 오바케를 유심히 바라보며 깜빡일 때 유령 겉모습이 순간적으로 바뀌는지 체크합니다.<br>
                • <strong>6손가락 사진:</strong> 자외선 라이트로 문을 찍었을 때 손가락 마디가 6개라면 100% 오바케입니다.
            </p>
        `
    },
    {
        name: "오밤보",
        engName: "Obambo",
        evidences: ["손자국", "고스트 라이팅", "DOTS"],
        sanity: "50%",
        speed: "공격적 상태 1.9 m/s / 차분함 상태 1.4 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+오밤보+공략",
        tip: `<strong>1. 주기적 성격 및 속도 변환 메커니즘</strong><br>
              • <strong>2분 성격 교체:</strong> 정확히 <strong>2분 간격</strong>으로 '공격적 상태'와 '차분한 상태'를 번갈아 바꿉니다.<br>
              • <strong>공격적 상태 (1.9 m/s):</strong> 발소리가 일반보다 또렷하게 빠른 <strong>1.9 m/s</strong>로 이동합니다.<br>
              • <strong>차분함 상태 (1.4 m/s):</strong> 발소리가 <strong>1.4 m/s</strong>로 확연하게 느려집니다. (시야 가속 정상 적용)`,
        huntSanity: "50%",
        specialTrait: "2분 주기 상태 변화 (공격적 1.9m/s vs 차분함 1.4m/s), 시야 가속 적용.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 주기적 성격 및 속도 변환 메커니즘</div>
            <p class="dict-text">
                • <strong>2분 성격 교체 (State Cycle):</strong> 정확히 <strong>2분 간격</strong>으로 '공격적 상태'와 '차분한 상태'를 번갈아가며 주기를 바꿉니다.<br>
                • <strong>공격적 상태 (1.9 m/s):</strong> 발소리가 일반(1.7m/s)보다 또렷하게 빠른 <strong>1.9 m/s</strong>로 이동하며, 상호작용 빈도가 늘어납니다.<br>
                • <strong>차분함 상태 (1.4 m/s):</strong> 발소리가 <strong>1.4 m/s</strong>로 확연하게 느려져 유유히 걸어 다닙니다.<br>
                • <strong>시야 가속 정상 적용:</strong> 어떤 상태이든 플레이어를 바라보면 추가 시야 가속이 오릅니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 공격적 주기에는 빠른 속도로 플레이어를 압박합니다.<br>
                • <strong>약점 (Weakness):</strong> 차분함 주기 사냥 시 속도가 1.4m/s로 떨어져 안전하게 도망칠 수 있습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>연속 사냥 발소리 비교:</strong> 방어 장비 자극과 무관하게, 사냥마다 발소리가 약간 빠른 발소리(1.9m/s)와 확 느린 발소리(1.4m/s)로 2분 주기로 달라진다면 오밤보입니다.
            </p>
        `
    },
    {
        name: "오니",
        engName: "Oni",
        evidences: ["EMF 5", "서늘함", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+오니+공략",
        tip: `<strong>1. 왕성한 활동 & 사냥 실체화 메커니즘</strong><br>
              • <strong>사냥 중 긴 실체화 (Short Blink):</strong> 사냥 시 <strong>투명하게 숨는 시간이 극도로 짧고 실체화된 모습을 훨씬 길게 노출</strong>합니다.<br>
              • <strong>강력한 고스트 이벤트:</strong> 상호작용 및 이벤트를 매우 자주 일으키며, 이벤트 접촉 시 <strong>정신력을 20% 차감</strong>합니다.<br>
              • <strong>안개 이벤트 불가능:</strong> '귓속말 입김(Air Ball)' 안개 형태 이벤트를 절대 하지 못하고 무조건 실체로 나타납니다.`,
        huntSanity: "50%",
        specialTrait: "고스트 이벤트 시 정신력 20% 차감, 안개 형태 이벤트 불가능, 사냥 중 깜빡임 투명 시간 극단적으로 짧음(실체화 길게 유지).",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 왕성한 활동 & 사냥 실체화 메커니즘</div>
            <p class="dict-text">
                • <strong>사냥 중 긴 실체화 (Short Blink):</strong> 팬텀과 반대로, 오니는 사냥 중 <strong>투명하게 숨는 시간이 극도로 짧고 실체화된 모습을 훨씬 오랫동안 노출</strong>합니다.<br>
                • <strong>강력한 고스트 이벤트:</strong> 플레이어 근처에 나타나는 상호작용 및 고스트 이벤트를 엄청나게 자주 터뜨리며, 이벤트 접촉 시 <strong>정신력을 20%나 깎아냅니다.</strong><br>
                • <strong>입김/안개 이벤트 불가능:</strong> 오니는 '귓가에 '귓속말 입김(Air Ball)'을 불어넣어 정신력을 깎는 안개 실체화 이벤트를 절대 하지 못하며, 무조건 실체 형태로 나타납니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 이벤트 공격으로 조사팀의 정신력을 매우 빠르게 깎아냅니다.<br>
                • <strong>약점 (Weakness):</strong> 사냥 시 모습을 거의 계속 드러내므로 깜빡이는 형상만 보고도 즉시 오니임을 특정할 수 있습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>깜빡임 관찰 (가장 쉬움):</strong> 사냥 중인 유령의 모습을 보았을 때 다른 유령처럼 안 보이고 깜빡이기보다 거의 실시간으로 또렷하게 계속 보인다면 오니입니다.
            </p>
        `
    },
    {
        name: "원령",
        engName: "Onryo",
        evidences: ["스피릿 박스", "고스트 오브", "서늘함"],
        sanity: "60%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+원령+공략",
        tip: `<strong>1. 불빛 방어 & 3번째 불 끄기 강제 사냥</strong><br>
              • <strong>불빛 = 십자가 판정:</strong> 불이 켜진 양초/라이터 범위(4m) 내에서는 <strong>불빛이 십자가 역할을 수행하여 사냥을 차단</strong>합니다.<br>
              • <strong>3번째 불 꺼짐 강제 사냥 (100%):</strong> 불을 3번째 끄는 순간 <strong>정신력과 무관하게 100% 확률로 즉시 강제 사냥</strong>을 시작합니다.<br>
              • <strong>어둠 속 사냥 정신력 (60%):</strong> 불빛이 없는 어둠 속에서는 정신력 <strong>60% 이하</strong>부터 사냥이 가능합니다.`,
        huntSanity: "60%",
        specialTrait: "불빛 근처 사냥 억제(불빛 = 십자가 역할), 3번째 불 꺼짐 시 강제 사냥 유발, 불을 자주 끔.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 불빛 방어 & 3번째 불 끄기 강제 사냥</div>
            <p class="dict-text">
                • <strong>불빛 = 십자가 판정:</strong> 불이 켜진 양초/라이터/캠프파이어 범위(4m) 내에서는 <strong>불빛이 십자가 역할을 수행하여 사냥을 차단</strong>합니다.<br>
                • <strong>3번째 불 꺼짐 강제 사냥 (100%):</strong> 원령이 불을 불어서 끌 때마다 십자가가 태워진 것으로 간주되며, <strong>정확히 3번째 불이 꺼지는 순간 정신력과 무관하게 100% 확률로 즉시 사냥을 강제 시작</strong>합니다.<br>
                • <strong>기본 높은 사냥 정신력 (60%):</strong> 불빛이 없는 어둠 속에서는 정신력 <strong>60% 이하</strong>부터 사냥이 가능합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box)<br>
                • 고스트 오브 (Ghost Orb)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 양초 불이 꺼질 때 예상치 못한 기습 사냥이 터집니다.<br>
                • <strong>약점 (Weakness):</strong> 양초와 십자가를 함께 세팅하면 사냥 억제 및 원령 확정 테스트가 매우 쉽습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>양초 + 십자가 테스트:</strong> 십자가 위에 켜진 양초를 올려놓습니다. 양초 불이 3번째 꺼졌을 때 십자가가 즉시 탄다면 100% 원령입니다.
            </p>
        `
    },
    {
        name: "라이주",
        engName: "Raiju",
        evidences: ["EMF 5", "고스트 오브", "DOTS"],
        sanity: "작동 전자기기 근처 65% / 기본 50%",
        speed: "전자기기 근처 2.5 m/s (시야가속 중첩)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+라이주+공략",
        tip: `<strong>1. 전자기기 연동 사냥 & 초고속 돌진</strong><br>
              • <strong>사냥 정신력 상승 (65%):</strong> 작동 중인 전자기기 근처에 있을 때 <strong>정신력 65% 이하</strong>부터 조기 사냥을 시작합니다.<br>
              • <strong>전자기기 가속 (2.5 m/s):</strong> 켜진 전자기기 범위 안으로 들어오면 <strong>즉시 2.5 m/s로 쏜살같이 가속</strong>합니다.<br>
              • <strong>전자기기 교란 (15m):</strong> 일반 유령(10m)보다 훨씬 넓은 <strong>15m 범위</strong>에서 전등과 전자기기를 깜빡거리게 만듭니다.`,
        huntSanity: "전자기기 근처 65%",
        specialTrait: "켜진 전자기기 감지 시 사냥 정신력 65%, 전자기기 근처 2.5m/s 돌진, 사냥 시 전자기기 교란 범위 15m 확대.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 전자기기 연동 사냥 & 초고속 돌진</div>
            <p class="dict-text">
                • <strong>사냥 정신력 조기 상승 (65%):</strong> 작동 중인 전자기기(손전등, 카메라, EMF 등) 근처에 있을 때 <strong>정신력 65% 이하</strong>부터 조기 사냥을 터뜨립니다.<br>
                • <strong>전자기기 가속 (2.5 m/s):</strong> 사냥 시 켜진 전자기기 범위(소형 6m, 대형 10m) 안으로 들어오면 <strong>즉시 2.5 m/s로 쏜살같이 가속</strong>합니다.<br>
                • <strong>광범위 전자기기 교란 (15m):</strong> 일반 유령의 교란 범위(10m)보다 넓은 <strong>15m 범위</strong>에서 전등과 전자기기를 깜빡거리게 만듭니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 고스트 오브 (Ghost Orb)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 장비를 많이 깔아둔 고스트 룸 근처에서는 레버넌트급 속도로 플레이어를 도륙합니다.<br>
                • <strong>약점 (Weakness):</strong> 전자기기를 모두 꺼두면 평범한 1.7m/s 유령으로 무력화됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>장비 끄기 공략:</strong> 라이주가 의심될 때는 고스트 룸에 바닥 장비를 켜두지 말고 최소한으로 회수하거나 꺼두어야 합니다.
            </p>
        `
    },
    {
        name: "레버넌트",
        engName: "Revenant",
        evidences: ["고스트 오브", "고스트 라이팅", "서늘함"],
        sanity: "50%",
        speed: "시야 밖 1.0 m/s ➔ 플레이어 시야 확인 시 즉시 3.0 m/s (시야 가속 없음)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+레버넌트+공략",
        tip: `<strong>1. 시야 감지 극단적 속도 변화</strong><br>
              • <strong>시야 밖 배회 (1.0 m/s):</strong> 플레이어를 찾지 못했거나 시야에 없을 때는 <strong>1.0 m/s라는 극도로 둔한 발소리</strong>로 걷습니다.<br>
              • <strong>시야 포착 즉시 (3.0 m/s):</strong> 플레이어를 보거나 위치를 인지한 순간 점진적 가속 없이 <strong>즉시 3.0 m/s 초고속으로 직진 돌진</strong>합니다.<br>
              • <strong>엄폐 후 감속:</strong> 플레이어가 은신처로 숨어 시야에서 사라지면 해당 지점 도달 후 다시 1.0m/s로 감속합니다. (시야 가속 없음)`,
        huntSanity: "50%",
        specialTrait: "시야 확도시 즉시 3.0m/s 가속, 시야 상실 시 1.0m/s로 감속, 시야 가속 메커니즘 없음.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 시야 감지 극단적 속도 변화 (Speed Switch)</div>
            <p class="dict-text">
                • <strong>시야 밖/배회 시 (1.0 m/s):</strong> 플레이어를 찾지 못했거나 시야(LOS)에 잡히지 않을 때는 <strong>1.0 m/s라는 극도로 둔한 발소리</strong>로 엉금엉금 걸어다닙니다.<br>
                • <strong>시야 포착 즉시 (3.0 m/s):</strong> 플레이어의 형상을 보거나 전자기기/음성으로 위치를 인지한 순간, 점진적 가속이 아니라 <strong>즉시 3.0 m/s라는 최악의 초고속으로 직진 돌진</strong>합니다.<br>
                • <strong>엄폐 후 감속:</strong> 플레이어가 코너 뒤나 은신처로 숨어 시야에서 사라지면, 해당 지점까지 도착한 뒤 다시 1.0m/s로 둔화됩니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 고스트 오브 (Ghost Orb)<br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 탁 트인 직선 복도에서 눈이 마주치면 향초 없이는 무조건 사망합니다.<br>
                • <strong>약점 (Weakness):</strong> 시야만 주지 않고 엄폐물 뒤에 빠르게 숨으면 느릿느릿한 발소리로 인해 위치 확인 및 도망이 쉽습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>극단적 발소리 패턴:</strong> '뚜... 뚜...' 하고 매우 천천히 걷다가 시야가 트이자마자 '타다다다닥!' 하고 3.0m/s로 돌진해온다면 레버넌트입니다.
            </p>
        `
    },
    {
        name: "셰이드",
        engName: "Shade",
        evidences: ["EMF 5", "고스트 라이팅", "서늘함"],
        sanity: "35%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+셰이드+공략",
        tip: `<strong>1. 수줍음 & 낮은 사냥 정신력 메커니즘</strong><br>
              • <strong>낮은 사냥 시작 (35%):</strong> 평균 정신력이 <strong>35% 이하</strong>로 떨어지지 않으면 사냥을 시작하지 않습니다.<br>
              • <strong>동일 공간 활동 차단:</strong> 셰이드와 <strong>같은 방에 플레이어가 1명이라도 서 있으면 사냥 및 상호작용이 차단</strong>됩니다.<br>
              • <strong>그림자 형체 선호:</strong> 고스트 이벤트 시 완전한 실체보다는 검은 그림자나 투명 형태로 나타날 확률이 높습니다.`,
        huntSanity: "35%",
        specialTrait: "같은 방 사람이 있을 때 사냥/상호작용 안 함, 사냥 시작 정신력 35%, 실체화 시 그림자/투명 형태 선호, 십자가 생성 소모 적음.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 수줍음 & 낮은 사냥 정신력 메커니즘</div>
            <p class="dict-text">
                • <strong>낮은 사냥 시작 정신력 (35%):</strong> 평균 정신력이 <strong>35% 이하</strong>로 떨어지지 않으면 절대로 사냥을 시작하지 않습니다.<br>
                • <strong>동일 공간 활동 차단 (Shy Ghost):</strong> 셰이드와 <strong>같은 방에 플레이어가 한 명이라도 서 있으면, 사냥을 절대로 시작하지 못하고 상호작용 빈도도 극단적으로 감소</strong>합니다.<br>
                • <strong>그림자 형체 선호:</strong> 고스트 이벤트 발생 시 완전한 실체보다는 검은 그림자나 투명한 형태로 나타날 확률이 높습니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 활동량이 적어 EMF 5나 라이팅 등 증거를 얻기가 꽤 까다롭습니다.<br>
                • <strong>약점 (Weakness):</strong> 고스트 룸에 다 같이 모여 서 있으면 정신력이 0%여도 사냥을 시작하지 못합니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>방 비워두기 증거 수집:</strong> 셰이드 방에 카메라나 책을 설치하고 모두 방 밖으로 나와줘야 비로소 글씨를 쓰거나 활동하기 시작합니다.
            </p>
        `
    },
    {
        name: "타예",
        engName: "Thaye",
        evidences: ["고스트 오브", "고스트 라이팅", "DOTS"],
        sanity: "초기 75% ➔ 나이듦에 따라 최소 15%",
        speed: "초기 2.75 m/s ➔ 나이듦에 따라 최소 1.0 m/s (시야 가속 없음)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+타예+공략",
        tip: `<strong>1. 나이듦(Aging) 및 스펙 노화 메커니즘</strong><br>
              • <strong>나이듦 조건:</strong> 같은 방에 플레이어가 머무르면 1~2분마다 나이를 먹어 <strong>총 10단계까지 노화</strong>합니다.<br>
              • <strong>젊은 상태 (0세):</strong> 사냥 정신력 <strong>75%</strong>, 이동 속도 <strong>2.75 m/s (극도로 위험)</strong><br>
              • <strong>늙은 상태 (10세):</strong> 사냥 정신력 <strong>15%</strong>, 이동 속도 <strong>1.0 m/s (극도로 느려짐)</strong>. (시야 가속 없음)`,
        huntSanity: "초기 75% -> 15%",
        specialTrait: "나이듦(Aging) 메커니즘 (총 10단계), 나이가 들수록 사냥 정신력/속도/상호작용 감소, 시야 가속 없음.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 나이듦(Aging) 및 스펙 노화 메커니즘</div>
            <p class="dict-text">
                • <strong>나이듦 조건:</strong> 타예가 있는 방에 플레이어가 머무르면 1~2분마다 나이를 한 살씩 먹어 <strong>총 10단계까지 노화</strong>합니다.<br>
                • <strong>초기 젊은 상태 (0세):</strong> 사냥 시작 정신력 <strong>75%</strong>, 이동 속도 <strong>2.75 m/s (극도로 빨라 위험함)</strong><br>
                • <strong>최종 늙은 상태 (10세):</strong> 사냥 시작 정신력 <strong>15%</strong>, 이동 속도 <strong>1.0 m/s (극도로 느려짐)</strong><br>
                • <strong>시야 가속 없음:</strong> 플레이어를 아무리 오래 바라보아도 추가 시야 가속이 오르지 않습니다.<br>
                • <strong>위자드 보드 나이 변화:</strong> 위자드 보드로 나이를 물어보면 시간이 지나면서 답변하는 나이가 실제로 많아집니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 고스트 오브 (Ghost Orb)<br>
                • 고스트 라이팅 (Ghost Writing)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 극초반 양초/정신력이 높은 상태에서 2.75m/s 초고속 사냥으로 팀을 전멸시킵니다.<br>
                • <strong>약점 (Weakness):</strong> 방에서 시간을 보내 나이를 먹이고 나면 1.0m/s 달팽이가 되어 완벽하게 무력화됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>사냥 속도 저하 관찰:</strong> 첫 사냥 때는 2.75m/s로 엄청 빨랐던 발소리가, 고스트 룸 조사를 마친 뒤 후반 사냥 때는 1.0m/s로 현저히 느려졌다면 타예입니다.
            </p>
        `
    },
    {
        name: "미믹",
        engName: "The_Mimic",
        evidences: ["스피릿 박스", "손자국", "서늘함", "고스트 오브(가짜 증거)"],
        sanity: "복제 중인 유령에 따라 실시간 변동",
        speed: "복제 중인 유령에 따라 실시간 변동",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+미믹+공략",
        tip: `<strong>1. 유령 복제 & 가짜 고스트 오브 메커니즘</strong><br>
              • <strong>다른 유령 완벽 복제:</strong> 30초~2분마다 무작위 다른 유령을 지정하여 <strong>속도, 사냥 정신력, 특수 능력을 그대로 복사</strong>합니다.<br>
              • <strong>항시 가짜 고스트 오브 생성 (4증거 유령):</strong> 정식 증거 3개 외에도 <strong>난이도와 무관하게 항상 가짜 고스트 오브가 관찰</strong>됩니다.`,
        huntSanity: "복제 유령에 따름",
        specialTrait: "다른 유령 특성 완전 복사(데오겐 감지, 레버넌트 가속 등), 가짜 고스트 오브 항시 생성(4증거 유령).",
        forcedEvidence: "고스트 오브(가짜)",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 유령 복제 & 가짜 고스트 오브 메커니즘</div>
            <p class="dict-text">
                • <strong>다른 유령 완벽 복제:</strong> 30초~2분마다 무작위 다른 유령(데오겐, 레버넌트, 데몬 등)을 지정하여 <strong>해당 유령의 속도, 사냥 정신력, 특수 능력을 그대로 복사</strong>합니다.<br>
                • <strong>항시 가짜 고스트 오브 생성 (4증거 유령):</strong> 미믹은 정식 증거 3개(스피릿박스/손자국/서늘함) 외에도 <strong>난이도와 상관없이 항상 고스트 오브를 가짜로 관찰되게 만듭니다.</strong>
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box)<br>
                • 자외선 / 손자국 (Ultraviolet)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)<br>
                • 고스트 오브 (Ghost Orb) - <strong>[가짜 고정 표시 증거]</strong>
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 갑자기 데몬이나 레버넌트로 변해 기습 사냥을 터뜨리므로 행동 예측이 어렵습니다.<br>
                • <strong>약점 (Weakness):</strong> 증거가 4개(노증거 난이도에서도 오브 관찰) 나오므로 고스트 오브를 확인하면 쉽게 감별됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>'노증거' 난이도 오라 테스트:</strong> 증거가 안 나오는 악몽/광기/커스텀 난이도에서 카메라로 고스트 오브가 보인다면 100% 미믹입니다.
            </p>
        `
    },
    {
        name: "트윈스",
        engName: "The_Twins",
        evidences: ["EMF 5", "스피릿 박스", "서늘함"],
        sanity: "50%",
        speed: "본체 1.5 m/s / 분신 1.87 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+트윈스+공략",
        tip: `<strong>1. 본체/분신 이원화 & 사냥 속도 메커니즘</strong><br>
              • <strong>본체와 분신 시스템:</strong> 방에 있는 '본체'와 맵을 배회하는 '분신'이 동시에 또는 교대로 상호작용합니다.<br>
              • <strong>본체 사냥 (1.5 m/s):</strong> 본체가 사냥을 시작하면 <strong>1.5 m/s로 약간 느리게</strong> 이동합니다.<br>
              • <strong>분신 사냥 (1.87 m/s):</strong> 분신 위치에서 사냥이 터지면 <strong>1.87 m/s로 약간 빠르게</strong> 돌진합니다. (트윈스 커브 그래프 발생)`,
        huntSanity: "50%",
        specialTrait: "본체(1.5m/s - 약간 느림) vs 분신(1.87m/s - 약간 빠름) 사냥 속도 이원화, 교차 상호작용(Twins Curve) 그래프.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 본체/분신 이원화 & 사냥 속도 메커니즘</div>
            <p class="dict-text">
                • <strong>본체와 분신 시스템:</strong> 고스트 룸에 있는 '본체'와 맵을 배회하는 '분신'이 동시에 또는 교대로 상호작용을 터뜨립니다.<br>
                • <strong>본체 사냥 속도 (1.5 m/s):</strong> 본체가 사냥을 시작하면 일반 속도(1.7m/s)보다 약간 느린 <strong>1.5 m/s</strong>로 걸어다닙니다.<br>
                • <strong>분신 사냥 속도 (1.87 m/s):</strong> 분신이 있던 자리에서 사냥이 터지면 일반 속도보다 약간 빠른 <strong>1.87 m/s</strong>로 돌진합니다.<br>
                • <strong>트윈스 커브 그래프:</strong> 트럭 EMF 활동 그래프에서 본체와 분신 상호작용이 동시에 터질 때 꺾이는 곡선 표식이 나타납니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • EMF 5단계 (EMF Level 5)<br>
                • 스피릿 박스 (Spirit Box)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 고스트 룸과 멀리 떨어진 예기치 못한 곳에서 분신 사냥이 터져 기습당할 위험이 있습니다.<br>
                • <strong>약점 (Weakness):</strong> 사냥 때마다 발소리가 약간 느리거나 약간 빠른 두 가지 패턴으로 명확히 나뉩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>발소리 속도 비교:</strong> 첫 사냥 때는 약간 느렸는데 다음 사냥 때는 살짝 빠른 발소리로 교대된다면 트윈스입니다.
            </p>
        `
    },
    {
        name: "요괴",
        engName: "Yokai",
        evidences: ["스피릿 박스", "고스트 오브", "DOTS"],
        sanity: "근처 음성 대화 시 80% / 기본 50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+요괴+공략",
        tip: `<strong>1. 음성 자극 사냥 & 좁은 감지 메커니즘</strong><br>
              • <strong>음성 대화 조기 사냥 (80%):</strong> 요괴 근처(3m 이내)에서 마이크로 말을 많이 하면 <strong>정신력 80% 이하</strong>부터 조기 사냥을 시작합니다.<br>
              • <strong>사냥 중 좁은 감지 (2.5m):</strong> 사냥 시 <strong>2.5m 이내의 아주 가까운 거리에서 나오는 음성/전자기기 신호만 감지</strong>할 수 있습니다.<br>
              • <strong>원거리 안전:</strong> 3m만 떨어져 있어도 손전등을 켜거나 말을 해도 플레이어를 인지하지 못합니다.`,
        huntSanity: "근처 대화 시 80%",
        specialTrait: "근처 음성 감지 시 사냥 정신력 80% 상승, 사냥 중 청각/전자기기 감지 반경 2.5m 제한(바보 청각).",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 음성 자극 사냥 & 사냥 중 좁은 청각 범위</div>
            <p class="dict-text">
                • <strong>음성 대화 조기 사냥 (80%):</strong> 요괴 근처(3m 이내)에서 마이크로 말을 많이 하면 <strong>정신력 80% 이하</strong>부터 조기 사냥을 시작합니다.<br>
                • <strong>사냥 중 좁은 감지 범주 (2.5m):</strong> 사냥 시 일반 유령(9m)과 달리 <strong>2.5m 이내의 바짝 다가온 거리에서 나오는 음성/전자기기 신호만 감지</strong>할 수 있습니다.<br>
                • <strong>멀리서 안전함:</strong> 3m만 떨어져 있어도 플레이어가 손전등을 켜고 마이크로 고함을 질러도 요괴는 감지하지 못하고 그냥 지나쳐 갑니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 스피릿 박스 (Spirit Box)<br>
                • 고스트 오브 (Ghost Orb)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 고스트 룸에서 보이스 대화를 많이 나눌 경우 생각지도 못한 높은 정신력에서 사냥당합니다.<br>
                • <strong>약점 (Weakness):</strong> 사냥 시 약간만 떨어져 있어도 전자기기 신호를 못 잡아 바보가 됩니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>사냥 중 도발 테스트:</strong> 사냥 시 같은 방 구석에 서서 손전등을 켜고 마이크로 말을 걸었을 때 3m 이상 떨어진 요괴가 나를 못 찾고 지나쳐 간다면 요괴입니다.
            </p>
        `
    },
    {
        name: "유레이",
        engName: "Yurei",
        evidences: ["고스트 오브", "서늘함", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+유레이+공략",
        tip: `<strong>1. 문 상호작용 정신력 차감 & 향초 봉인 메커니즘</strong><br>
              • <strong>문 닫기 능력 (Door Slam):</strong> 고스트 이벤트 없이 <strong>문을 끝까지 강하게 닫으며 정신력을 15% 기습 차감</strong>합니다.<br>
              • <strong>정화향초 방 봉인:</strong> 정화향초를 맞으면 90초 동안 사냥이 차단될 뿐만 아니라 <strong>90초 동안 고스트 룸 밖으로 나가지 못하게 방에 갇힙니다.</strong>`,
        huntSanity: "50%",
        specialTrait: "특수 문 닫기 능력 사용 시 정신력 15% 차감, 정화향초 피격 시 90초간 고스트 룸 밖으로 이탈 불가 봉인.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 문 상호작용 정신력 차감 & 향초 봉인 메커니즘</div>
            <p class="dict-text">
                • <strong>특수 문 닫기 능력 (Door Slam):</strong> 고스트 이벤트를 일으키지 않고도 <strong>문을 끝까지 강하게 닫는 상호작용</strong>을 쓰며, 이때 <strong>근처 플레이어의 정신력을 15% 기습 차감</strong>합니다.<br>
                • <strong>정화향초 방 봉인:</strong> 유레이에게 정화향초를 태우면 90초 동안 사냥이 차단될 뿐만 아니라 <strong>90초 동안 고스트 룸 밖으로 절대로 나가지 못하도록 방에 갇히게 됩니다.</strong>
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 고스트 오브 (Ghost Orb)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)<br>
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 문 닫기 능력으로 나도 모르는 사이에 정신력이 바닥납니다.<br>
                • <strong>약점 (Weakness):</strong> 향초를 태우면 90초간 고스트 룸에 예쁘게 갇혀 쉽게 장비 세팅을 완료할 수 있습니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>문 닫힘 소리 관찰:</strong> 고스트 이벤트 소리가 없는데 열려 있던 문이 '꽝!' 하고 완전히 닫혔다면 유레이의 능력입니다.
            </p>
        `
    },
    {
        name: "아스왕",
        engName: "Aswang",
        evidences: ["DOTS", "서늘함", "고스트 라이팅"],
        sanity: "50%",
        speed: "기본 1.53 m/s ➔ 최고 2.53 m/s (폭발적 가속)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+아스왕+공략",
        tip: `<strong>1. 사냥 및 은신처 상호작용 메커니즘</strong><br>
              • <strong>이동 속도 & 가속:</strong> 기본 속도는 <strong>1.53 m/s</strong>로 느리지만, 높은 시야 가속률로 <strong>8.67초 만에 최고 속도 2.53 m/s에 도달</strong>합니다.<br>
              • <strong>은신처 도달 시 강제 종료:</strong> 공식 은신처(옷장/사물함) 안의 플레이어에게 도달 시 <strong>사냥이 즉시 강제 종료</strong>됩니다.<br>
              • <strong>위치 추적 페널티:</strong> 이 방식으로 종료 시 다음 사냥 유예 시간에도 <strong>해당 위치로 곧장 이동</strong>합니다.`,
        huntSanity: "50%",
        specialTrait: "기본 속도 1.53 m/s, 8.67초 만에 최고 속도 2.53 m/s 도달. 공식 은신처 도달 시 헌팅 즉시 강제 종료.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: true,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 메커니즘 (Hunt)</div>
            <p class="dict-text">
                • <strong>기본 속도:</strong> 1.53 m/s (일반 유령 1.7 m/s 대비 느림)<br>
                • <strong>시야 가속률:</strong> 초당 가속률이 높아서 <strong>8.67초 만에 최고 속도인 2.53 m/s에 도달</strong>합니다.<br>
                • <strong>은신처 강제 종료:</strong> 유효한 공식 은신처(옷장/사물함) 안의 플레이어에게 도달 시 <strong>사냥이 즉시 강제 종료</strong>됩니다.<br>
                • <strong>위치 추적 페널티:</strong> 이 방식으로 사냥이 종료되면 다음 사냥 유예 시간에도 <strong>해당 플레이어 위치로 곧장 이동</strong>합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)<br>
                • 고스트 라이팅 (Ghost Writing)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 목표물을 발견하면 추격 속도가 매우 빠릅니다.<br>
                • <strong>약점 (Weakness):</strong> 공식 은신처에 숨은 플레이어를 절대 죽이지 못합니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>은신처 활용:</strong> 사냥 시 옷장/락커 안으로 들어가면 사냥을 안전하게 종료시킬 수 있습니다. 단, 종료 후 즉시 자리를 옮겨야 합니다.
            </p>
        `
    },
    {
        name: "코르모스",
        engName: "Kormos",
        evidences: ["고스트 오브", "스피릿 박스", "손자국"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+코르모스+공략",
        tip: `<strong>1. 사냥 및 시각 차단 메커니즘</strong><br>
              • <strong>완전 시각 차단 (Blind Ghost):</strong> 완전히 눈이 멀어 있어 <strong>플레이어가 바로 앞을 지나가거나 시야에 보여도 눈으로 인지하지 못합니다.</strong><br>
              • <strong>시야 가속 없음:</strong> 플레이어를 볼 수 없으므로 시야 가속(LOS Accel)이 전혀 붙지 않습니다.<br>
              • <strong>청각 & 전자기기 감지 극대화:</strong> <strong>손전등/장비 전자기기 신호 및 마이크 음성 감지 범위가 훨씬 넓게 확장</strong>되어 소리와 신호로 추적합니다.`,
        huntSanity: "50%",
        specialTrait: "시각적 시야(LOS) 없음, 시야 가속 없음, 전자기기/음성 감지 범위 넓음.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false,
        isCustomDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 사냥 및 시각 차단 메커니즘 (Blind Hunt)</div>
            <p class="dict-text">
                • <strong>완전 시각 차단 (Blind Ghost):</strong> 완전히 눈이 멀어 있어 <strong>플레이어가 유령 바로 앞을 지나가거나 노출되어도 눈으로 인지하지 못합니다.</strong><br>
                • <strong>시야 가속 없음:</strong> 플레이어를 볼 수 없으므로 시야 가속(LOS Accel)이 전혀 붙지 않습니다.<br>
                • <strong>청각 & 전자기기 감지 극대화:</strong> <strong>손전등/장비 전자기기 신호 및 마이크 음성 감지 범위가 훨씬 넓게 확장</strong>되어 소리와 신호로 추적합니다.
            </p>
            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • 고스트 오브 (Ghost Orb)<br>
                • 스피릿 박스 (Spirit Box)<br>
                • 자외선 / 손자국 (Ultraviolet)
            </p>
            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 멀리서 손전등을 켜거나 마이크로 말을 하면 은신처에서도 들킵니다.<br>
                • <strong>약점 (Weakness):</strong> 모든 전자기기를 끄고 침묵을 유지하면, 바로 옆을 지나가도 플레이어를 공격하지 못합니다.
            </p>
            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>장비 차단 및 침묵:</strong> 사냥 시 손전등과 손에 든 장비를 모두 끄고 마이크를 조용히 하면 안전합니다.
            </p>
        `
    }
];

// 장비 가이드 데이터
const EQUIPMENT_DATA = [
    { name: "EMF 측정기", category: "정보 수집", t1: "T1: 아날로그 바늘형 (범위 좁음)", t2: "T2: 디지털 수치형 (소리 명확)", t3: "T3: 3D 서라운드 다중 탐지기" },
    { name: "DOTS 프로젝터", category: "증거 확인", t1: "T1: 손전등형 수동 거치", t2: "T2: 고정 설치 레이저 그리드", t3: "T3: 광범위 회전형 스캔 레이저" },
    { name: "자외선 라이트", category: "증거 확인", t1: "T1: 형광봉 (시간 경과 시 빛 약해짐)", t2: "T2: 손전등형 UV 라이트", t3: "T3: 광범위 UV 차징 랜턴" },
    { name: "비디오 카메라", category: "증거 확인", t1: "T1: 구형 흑백 비디오", t2: "T2: HD 컬러 카메라", t3: "T3: 고화질 스마트 노이즈 캔슬링 카메라" },
    { name: "스피릿 박스", category: "음성 대화", t1: "T1: 라디오 신호 혼선형 (노이즈 심함)", t2: "T2: 스피커 탑재 오디오 박스", t3: "T3: 고성능 노이즈 필터링 스피릿 박스" },
    { name: "향초 (정화)", category: "방어/안전", t1: "T1: 일반 향초 (범위 좁음)", t2: "T2: 정화 향 스틱 (이동 시용)", t3: "T3: 훈증용 연막 향초 (유령 정지 효과)" }
];

// 주간 도전 과제 데이터
const WEEKLY_DATA = [
    { title: "🎯 이번 주 주간 도전 과제 공략", body: "도전 과제 모드에서는 정해진 장비와 고정 배율로 게임이 진행됩니다. 증거가 0~1개로 제한되는 경우가 많으므로 발소리 BPM 스피드와 고유 헌팅 특징을 통해 유령을 특정하세요." },
    { title: "💡 도전 과제 팁", body: "사망해도 장비가 소실되지 않으므로 부담 없이 헌팅을 유도하여 유령의 가속 및 특수 능력을 테스트하는 것이 빠른 클리어의 핵심입니다." }
];

// ==========================================
// 맵 정보 데이터 (전체 맵 위키 기반 상세 공략)
// ==========================================
const MAP_DATA = [
    { 
        name: "6 Tanglewood Drive", 
        category: "Small", 
        rooms: "11개 룸", 
        size: "소형 주택 (지상 1층 + 지하 1층)", 
        tip: "파스모포비아의 가장 기본이 되는 표준 조사 맵입니다. 리워크로 룸 명칭 및 가구 배치가 개편되었습니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map / Small House)<br>
                • <strong>총 룸(구역) 수:</strong> 11개<br>
                • <strong>층수:</strong> 지상 1층(Ground Floor) + 지하실(Basement)<br>
                • <strong>조명 스위치 수:</strong> 9개<br>
                • <strong>특징 및 변경점:</strong> 파스모포비아에서 가장 기본적이고 대표적인 맵입니다. 리워크를 통해 룸 명칭 및 가구 배치가 개편되었습니다. (기존 주방 아일랜드 식탁 루핑 스팟 제거, 지하실 기차 모형 테이블 루핑 추가, 옷장 문 틈새 슬릿 시야 적용 등)
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                <strong>[지상 1층 (Ground Floor)]</strong><br>
                • <strong>Foyer (현관 / 메인 복도):</strong> 거실로 이어지는 앞쪽 복도와 방들로 이어지는 안쪽 복도가 하나의 구역으로 판정됩니다.<br>
                • <strong>Living Room (거실):</strong> 소파 및 TV 구역<br>
                • <strong>Kitchen (주방):</strong> 조리대 및 싱크대<br>
                • <strong>Dining Room (식당):</strong> 다이닝 테이블 및 장식장<br>
                • <strong>Garage (차고):</strong> 차량, 공구 선반 및 사물함<br>
                • <strong>Utility Room (세탁실 / 유틸리티 룸):</strong> 차고와 복도를 연결하는 세탁 구역<br>
                • <strong>Master Bedroom (안방 / 마스터 침실):</strong> 더블 침대 및 수납공간<br>
                • <strong>Ensuite (안방 전용 욕실):</strong> 안방 안쪽에 별도 분리된 전용 욕실<br>
                • <strong>Hobby Room (취미방):</strong> 기존 Boy's Bedroom 위치가 개편된 퍼즐/뜨개질 취미방<br>
                • <strong>Nancy's Room (낸시의 방 / 유아실):</strong> 기존 Nursery 위치<br>
                • <strong>Bathroom (복도 공용 욕실):</strong> 복도 쪽에 위치한 메인 욕실<br><br>
                <strong>[지하 (Basement)]</strong><br>
                • <strong>Basement (지하실):</strong> 보관 선반, 냉동고, 장난감 기차 트랙 테이블
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 장애물로 막히는 공식 은신처들입니다:<br><br>
                • <strong>Foyer (현관):</strong> 거실로 들어가는 입구 바로 옆 벽장 (Closet next to living room)<br>
                • <strong>Hobby Room (취미방):</strong> 방 내부 붙박이 옷장 (Closet)<br>
                • <strong>Nancy's Room (낸시의 방):</strong> 방 내부/맞은편 복도 옷장 (Closet)<br>
                • <strong>Ensuite (안방 전용 욕실):</strong> 안방 안쪽 전용 옷장/수납 공간 (Closet)<br>
                • <strong>Garage (차고):</strong><br>
                &nbsp;&nbsp;- 파란색 철제 락커 (Blue Lockers)<br>
                &nbsp;&nbsp;- 차고 안쪽 구석 쓰레기통/상자 뒤<br>
                • <strong>Basement (지하실):</strong><br>
                &nbsp;&nbsp;- 지하실 계단 내려오는 통로 바로 옆 구석<br>
                &nbsp;&nbsp;- 냉동고 및 기차 트랙 뒤편 공간
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 거실 창가 쪽 작은 테이블 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 지하실 뒤쪽 선반/테이블 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 지하실 흔들의자 및 냉동고 인근 바닥 중앙<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 차고 락커 옆 쓰레기통 위 (또는 세탁실 선반)<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 식당(Dining Room) 유리 장식장(Hutch) 내부<br>
                • <strong>음악 상자 (Music Box):</strong> 낸시의 방(Nancy's Room) 좌측 벽 선반 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 마스터 침실(Master Bedroom) 문 바깥 복도 벽면<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 차고(Garage) 우측 벽 또는 지하실(Basement) 벽면 중 1곳<br>
                • <strong>차량 열쇠 (Car Key):</strong> 현관 콘솔 테이블 위<br>
                • <strong>이스터에그 (Easter Egg):</strong> 주방 카운터의 소리 나는 감자(Potato)
            </p>
        `
    },
    { 
        name: "42 Edgefield Road", 
        category: "Small", 
        rooms: "16개 룸", 
        size: "2층 주택 (지상 2층 + 지하 1층)", 
        tip: "방과 화장실이 많고 복도가 좁아 밀실 공포를 유발하는 맵입니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map / Small House)<br>
                • <strong>총 룸(구역) 수:</strong> 16개 룸 (침실 6개, 화장실/욕실 6개 포함)<br>
                • <strong>층수:</strong> 1층(Ground Floor) + 2층(First/Second Floor) + 지하실(Basement)<br>
                • <strong>조명 스위치 수:</strong> 16개<br>
                • <strong>특징:</strong> 복도가 매우 좁고 코너가 많아 시야가 가리기 쉬우나, 곳곳에 방과 옷장이 빽빽하게 배치되어 있어 문 상호작용 체크와 빠른 은신에 유리합니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                <strong>[지상 1층 (Ground Floor)]</strong><br>
                • <strong>Foyer (현관 / 메인 복도):</strong> 2층 계단 및 거실/지하실 입구를 연결하는 통로<br>
                • <strong>Living Room (거실):</strong> 소파, TV, 피아노 구역<br>
                • <strong>Kitchen (주방):</strong> 조리대, 냉장고 및 싱크대<br>
                • <strong>Dining Room (식당):</strong> 다이닝 테이블 및 식기장<br>
                • <strong>Utility Room (세탁실):</strong> 주방과 차고를 잇는 통로 겸 세탁실<br>
                • <strong>Garage (차고):</strong> 차량 1대 및 작업 도구 선반<br>
                • <strong>Master Bedroom (1층 안방):</strong> 더블 침대 및 옷장<br>
                • <strong>Master Bathroom (1층 안방 욕실):</strong> 1층 안방 내부 연결 욕실<br><br>
                <strong>[지상 2층 (Upstairs)]</strong><br>
                • <strong>Upstairs Hallway (2층 복도):</strong> 2층 중앙 복도 및 코너<br>
                • <strong>Large Blue Bedroom (큰 파란 방):</strong> 더블 침대 및 전용 욕실 연결<br>
                • <strong>Large Blue Bathroom (큰 파란 방 욕실):</strong> 큰 파란 방 안쪽 욕실<br>
                • <strong>Small Blue Bedroom (작은 파란 방):</strong> 싱글 침대 및 책상<br>
                • <strong>Green Bedroom (초록 방):</strong> 싱글 침대 및 옷장<br>
                • <strong>Orange Bedroom / Nursery (오렌지색 아기방):</strong> 유아용 침대 및 기저귀 교환대<br>
                • <strong>Hallway Bathroom (2층 공용 욕실):</strong> 2층 복도 측 공용 욕실<br><br>
                <strong>[지하 (Basement)]</strong><br>
                • <strong>Basement (지하실):</strong> 보관 선반, 박스 더미 및 안쪽 창고
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>1층 세탁실 (Utility Room):</strong> 세탁기와 선반 사이 안쪽 구석 틈새<br>
                • <strong>1층 차고 (Garage):</strong> 차고 안쪽 벽면 파란색 철제 락커 (Lockers)<br>
                • <strong>1층 안방 (Master Bedroom):</strong> 침대 맞은편 붙박이 옷장 2개 (Closets)<br>
                • <strong>지하실 (Basement):</strong> 냉장고 및 보관 선반 옆 철제 락커 (Lockers)<br>
                • <strong>2층 복도 (Upstairs Hallway):</strong> 초록 방 맞은편 벽장 2개 (Hallway Closets)<br>
                • <strong>2층 작은 파란 방 (Small Blue Bedroom):</strong> 방 내부 붙박이 옷장 (Closet)<br>
                • <strong>2층 큰 파란 방 (Large Blue Bedroom):</strong> 방 안쪽 구석 옷장 (Closet)
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 현관문 바로 앞 서랍장 콘솔 테이블 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 현관 복도에서 2층으로 올라가는 계단 입구 벽면<br>
                • <strong>음악 상자 (Music Box):</strong> 1층 거실(Living Room) 스탠드 조명 옆 작은 협탁 위<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 2층 큰 파란 침실(Large Blue Bedroom) 침대 위<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 2층 오렌지색 아기방(Nursery) 기저귀 교환대 서랍 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 1층 세탁실(Utility Room) 철제 선반 아래 바닥<br>
                • <strong>소환진 (Summoning Circle):</strong> 지하실(Basement) 안쪽 분리된 창고 바닥 중앙<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 차고(Garage) 우측 벽면 또는 지하실(Basement) 벽면 중 1곳<br>
                • <strong>차량 열쇠 (Car Key):</strong> 현관 입구 복도 테이블 위
            </p>
        `
    },
    { 
        name: "10 Ridgeview Court", 
        category: "Small", 
        rooms: "12개 룸", 
        size: "2층 주택 (지상 2층 + 지하 1층)", 
        tip: "지하실과 차고가 넓게 트여 있고, 2층으로 올라가는 긴 복도가 특징입니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map / Small House)<br>
                • <strong>총 룸(구역) 수:</strong> 12개 룸<br>
                • <strong>층수:</strong> 1층(Ground Floor) + 2층(First/Second Floor) + 지하실(Basement)<br>
                • <strong>조명 스위치 수:</strong> 13개<br>
                • <strong>특징:</strong> 1층 메인 홀과 거실/주방 동선이 길며, 2층에는 침실 3개와 욕실이 모여 있어 계단 진입 시 퇴로 확보가 중요합니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                <strong>[지상 1층 (Ground Floor)]</strong><br>
                • <strong>Foyer & Hallway (현관 및 복도):</strong> 피아노가 놓여 있는 1층 메인 복도 통로<br>
                • <strong>Living Room (거실):</strong> 소파 및 벽걸이 TV 구역<br>
                • <strong>Kitchen (주방):</strong> 조리 카운터 및 냉장고<br>
                • <strong>Dining Area (식당):</strong> 주방과 이어진 식사 공간<br>
                • <strong>Utility Room (세탁실):</strong> 차고와 주방을 잇는 세탁실<br>
                • <strong>Garage (차고):</strong> 대형 차고 (차량 2대 주차 공간 및 공구함)<br>
                • <strong>Master Bedroom (1층 안방):</strong> 더블 침대 구역<br>
                • <strong>Master Bathroom (1층 안방 욕실):</strong> 안방 내부 연결 욕실<br><br>
                <strong>[지상 2층 (Upstairs)]</strong><br>
                • <strong>Upstairs Hallway (2층 복도):</strong> 2층 계단 상단 및 침실 연결 통로<br>
                • <strong>Girl's Bedroom (소녀 방):</strong> 보라색 톤 침실<br>
                • <strong>Boy's Bedroom (소년 방):</strong> 청록색 톤 침실<br>
                • <strong>Teen / Guest Bedroom (청소년/게스트 방):</strong> 2층 안쪽 침실<br>
                • <strong>Bathroom (2층 공용 욕실):</strong> 2층 복도 측 욕실<br><br>
                <strong>[지하 (Basement)]</strong><br>
                • <strong>Basement (지하실):</strong> 보관 선반, 파이프 및 창고 공간
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>1층 복도 (Foyer / Hallway):</strong> 세탁실 복도 측 벽장 (Closet)<br>
                • <strong>1층 차고 (Garage):</strong> 차고 안쪽 벽면 파란색 철제 락커 (Lockers)<br>
                • <strong>지하실 (Basement):</strong> 계단 아래 구석 및 지하실 안쪽 보관 선반 뒤편<br>
                • <strong>2층 복도 (Upstairs Hallway):</strong> 2층 계단 올라오자마자 우측 벽장 (Closet)<br>
                • <strong>2층 소년 방 (Boy's Bedroom):</strong> 방 내부 붙박이 옷장 (Closet)<br>
                • <strong>2층 소녀 방 (Girl's Bedroom):</strong> 방 내부 붙박이 옷장 (Closet)
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 현관문 입장 시 열쇠 그릇 옆 작은 테이블 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 지하실 내려가는 계단 맞은편 복도 벽면<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 1층 복도 피아노(Piano) 옆 긴 벤치 의자 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 1층 세탁실(Utility Room) 안쪽 선반 위<br>
                • <strong>음악 상자 (Music Box):</strong> 2층 보라색 소녀 방(Girl's Bedroom) 출입문 옆 협탁 위<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 2층 청록색 소년 방(Boy's Bedroom) 책상 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 지하실(Basement) 계단 내려오자마자 정면 바닥 중앙<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 차고(Garage) 또는 지하실(Basement) 벽면 중 1곳<br>
                • <strong>차량 열쇠 (Car Key):</strong> 현관 콘솔 테이블 위
            </p>
        `
    },
    { 
        name: "Nell's Diner", 
        category: "Small", 
        rooms: "8개 룸", 
        size: "소형 다이너 (단층 매장 + 야외)", 
        tip: "버려진 고속도로 식당 맵으로, 오픈형 홀과 조리실/창고가 연결되어 있습니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map)<br>
                • <strong>배경 설정:</strong> 인적 없는 고속도로변에 방치된 폐식당(다이너)<br>
                • <strong>총 룸(구역) 수:</strong> 8개 룸<br>
                • <strong>층수:</strong> 지상 1층 단층 건물 (Ground Floor Only)<br>
                • <strong>특징:</strong> 오픈형 다이닝 홀과 좁은 주방/냉동창고 동선으로 이루어져 있어 은신처와 차단 시야를 빠르게 파악해야 합니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                • <strong>Dining Area (홀 / 다이닝 구역):</strong> 손님용 테이블 부스, 카운터 좌석 및 주방 앞 통로<br>
                • <strong>Kitchen (주방):</strong> 조리 카운터, 그릴, 튀김기 및 싱크대 구역<br>
                • <strong>Cooler Room (냉동창고 / 워크인 쿨러):</strong> 대형 식자재 냉동 보관실<br>
                • <strong>Storage Room (창고):</strong> 식자재 박스, 부품 및 선반 보관실<br>
                • <strong>Manager's Office (매니저 사무실):</strong> 책상, 파일 캐비닛 및 금고<br>
                • <strong>Break Room (직원 휴게실):</strong> 직원용 락커, 소파 및 티 테이블<br>
                • <strong>Utility Room (세탁/유틸리티실):</strong> 청소 도구, 보일러 및 배전반 구역<br>
                • <strong>Restrooms (화장실):</strong> 남성 화장실(Men's) 및 여성 화장실(Women's)
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>직원 휴게실 (Break Room):</strong> 벽면 철제 사물함 (Lockers)<br>
                • <strong>냉동창고 (Cooler Room):</strong> 대형 식자재 운반 카트 (Food Cart) 뒤편 구석<br>
                • <strong>창고 (Storage Room):</strong> 보관 선반 및 음식 운반 카트 (Food Cart) 뒤편<br>
                • <strong>복도 (Hallway):</strong> 파란색 음료 자판기 (Blue Vending Machine) 뒤편 틈새
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 주방 카운터 계산대(Cash Register) 뒤편 선반 위<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 식당 홀(Dining Area) 좌측 뒤쪽 구석 부스 좌석 위<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 주방(Kitchen) 도마 위 (대형 식칼 옆)<br>
                • <strong>음악 상자 (Music Box):</strong> 매니저 사무실(Manager's Office) 책상 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 직원 휴게실(Break Room) 벽면<br>
                • <strong>위자보드 (Ouija Board):</strong> 유틸리티실(Utility Room) 상자 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 남자 화장실(Men's Bathroom) 바닥 중앙<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 유틸리티실(Utility Room) 또는 창고(Storage) 벽면 중 1곳
            </p>
        `
    },
    { 
        name: "13 Willow Street", 
        category: "Small", 
        rooms: "10개 룸", 
        size: "소형 주택 (지상 1층 + 지하 1층)", 
        tip: "옷장이 없는 대신 가구와 파티션 뒤에 숨어야 하는 구조였으나, 리워크를 통해 지하 오픈 구조 및 신규 방이 개편되었습니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map / Small House)<br>
                • <strong>총 룸(구역) 수:</strong> 10개 룸<br>
                • <strong>층수:</strong> 지상 1층(Ground Floor) + 지하실(Basement)<br>
                • <strong>조명 스위치 수:</strong> 11개<br>
                • <strong>특징:</strong> 기존 붙박이 옷장 대신 방마다 비치된 다양한 가구, 파티션, 보관함 뒤편 공간을 공식 은신처로 활용합니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                <strong>[지상 1층 (Ground Floor)]</strong><br>
                • <strong>Living Room (거실):</strong> 전면 유리문 및 소파 구역<br>
                • <strong>Kitchen & Dining (주방 및 식당):</strong> 조리대, 냉장고, 식탁 및 팬트리<br>
                • <strong>Gym / Fitness Room (체육실):</strong> 덤벨, 운동 기구 배치 구역<br>
                • <strong>Art Studio (화실 / 작업실):</strong> 이젤, 캔버스 및 물감 보관함<br>
                • <strong>Master Bedroom (침실):</strong> 더블 침대 및 옷장 파티션<br>
                • <strong>Bathroom (욕실):</strong> 1층 공용 욕실<br><br>
                <strong>[지하 (Basement)]</strong><br>
                • <strong>Bar & Game Room (바 및 게임룸):</strong> 지하 바 카운터, 소파, 당구대 구역<br>
                • <strong>Laundry Room (세탁실):</strong> 세탁기, 건조기 및 플라스틱 수납함<br>
                • <strong>Basement Bathroom (지하 욕실):</strong> 지하실 내부 욕실
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>거실 (Living Room):</strong> 유리문 좌측 나무 파티션(Screen) 뒤편<br>
                • <strong>식당 (Dining Room):</strong> 식탁 뒤쪽 팬트리 선반(Pantry Shelves) 뒤<br>
                • <strong>화실 (Art Studio):</strong> 구석에 세워진 대형 캔버스 및 보관함 뒤<br>
                • <strong>침실 (Master Bedroom):</strong> 침실 내부 옷장 파티션 뒤편<br>
                • <strong>지하실 (Basement):</strong> 지하 계단 아래 구석 틈새<br>
                • <strong>지하 세탁실 (Laundry Room):</strong> 검은색 대형 보관함(Containers) 뒤편
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>음악 상자 (Music Box):</strong> 1층 거실 책장 선반 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 1층 주방 & 식당 바닥 중앙<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 1층 체육실(Gym) 벽면<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 1층 침실 고양이 방석 위<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 1층 화실(Art Studio) 선반 위<br>
                • <strong>타로 카드 (Tarot Cards):</strong> 지하실 바(Bar) 테이블 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 지하실 욕실 문 옆 수납 선반 위<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 체육실(Gym) 또는 지하 세탁실(Laundry) 벽면 중 1곳
            </p>
        `
    },
    { 
        name: "Camp Woodwind", 
        category: "Small", 
        rooms: "야외 텐트 구역", 
        size: "소형 야외 캠핑장", 
        tip: "동선이 매우 짧고 중앙 모닥불을 끼고 있어 빠른 파밍 및 고스트 스피드/헌팅 테스트의 성지입니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 야외 맵 (Small Map / Level 13 해금)<br>
                • <strong>총 룸(구역) 수:</strong> 10개 야외 구역<br>
                • <strong>특징:</strong> 탁 트인 원형 야외 구조로, 헌팅 시 시야 차단 엄폐물이 한정되어 있어 모닥불 및 텐트 주변을 빠르게 도는 루핑 컨트롤이 핵심입니다. 눈 날씨가 아닐 때 모닥불을 켜면 주변 온도가 20°C로 유지됩니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Zones)</div>
            <p class="dict-text">
                • <strong>Entrance Gate (정문 입구):</strong> 트럭에서 진입하는 출입문 구역<br>
                • <strong>Campfire (중앙 모닥불):</strong> 맵 정중앙 캠프파이어 및 통나무 벤치<br>
                • <strong>Picnic Area (피크닉 구역):</strong> 나무 피크닉 테이블 및 벤치<br>
                • <strong>Yellow Tent (노란 텐트):</strong> 대형 노란색 텐트 내부<br>
                • <strong>White / Food Tent (음식 텐트):</strong> 화이트 텐트 및 음식 조리대<br>
                • <strong>Blue Tent (파란 텐트):</strong> 중형 파란색 텐트 내부<br>
                • <strong>Red Tent (빨간 텐트):</strong> 중형 빨간색 텐트 내부<br>
                • <strong>Kids' Area (어린이 구역):</strong> 주황/청록 소형 텐트 및 장난감 구역<br>
                • <strong>Bathroom (야외 화장실):</strong> 남/녀 분리된 목조 공용 화장실<br>
                • <strong>Lovers Bench (연인의 벤치):</strong> 맵 좌측 안쪽 구석 벤치 구역
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>모닥불 (Campfire):</strong> 모닥불 옆 드럼통 및 통나무 더미 뒤<br>
                • <strong>파란 텐트 (Blue Tent):</strong> 텐트 외벽 옆 대형 아이스박스 쿨러 뒤<br>
                • <strong>음식 텐트 (Food Tent):</strong> 텐트 외벽 옆 쿨러 및 테이블 뒤편<br>
                • <strong>노란 텐트 (Yellow Tent):</strong> 텐트 내부 우측 침낭 및 상자 뒤<br>
                • <strong>어린이 구역 (Kids' Area):</strong> 주황색 및 청록색 소형 텐트 내부<br>
                • <strong>화장실 앞 (Bathroom):</strong> 화장실 건물 옆 나무 펜스 구석
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 피크닉 구역 나무 테이블 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 음식 텐트(Food Tent) 바닥 중앙<br>
                • <strong>음악 상자 (Music Box):</strong> 노란 텐트(Yellow Tent) 안 작은 협탁 위<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 빨간 텐트 옆 소형 청록 텐트 앞 바닥<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 연인의 벤치(Lovers Bench) 좌측 좌석 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 야외 화장실 건물 외벽<br>
                • <strong>위자보드 (Ouija Board):</strong> 피크닉 구역 체스판 옆 테이블 위<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 야외 화장실 건물 외벽 또는 발전기 박스
            </p>
        `
    },
    { 
        name: "Grafton Farmhouse", 
        category: "Small", 
        rooms: "13개 룸", 
        size: "소형 목조 농가 (지상 2층 + 다락방)", 
        tip: "나무 바닥이라 발소리가 또렷하게 울리며, 넓은 1층과 다락방(Attic)이 포함된 목조 가옥입니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map / Small Farmhouse)<br>
                • <strong>총 룸(구역) 수:</strong> 13개 룸 (1층 8개, 2층 5개, 다락방 1개)<br>
                • <strong>층수:</strong> 1층(Ground) + 2층(Upstairs) + 다락방(Attic)<br>
                • <strong>조명 스위치 수:</strong> 13개<br>
                • <strong>특징:</strong> 바닥이 목조로 되어 있어 유령의 발소리가 매우 크고 선명하게 들리며, 1층 거실과 식당 사이의 시야 차단 가구가 많습니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                <strong>[지상 1층 (Ground Floor)]</strong><br>
                • <strong>Foyer (현관):</strong> 메인 출입문 및 2층 계단 연결 통로<br>
                • <strong>Living Room (거실):</strong> 소파 및 벽난로 구역<br>
                • <strong>Dining Room (식당):</strong> 다이닝 테이블 및 수납장<br>
                • <strong>Kitchen (주방):</strong> 조리대, 냉장고 및 팬트리<br>
                • <strong>Utility Room (세탁실):</strong> 세탁기 및 뒷마당 연결문<br>
                • <strong>Work Room (작업실):</strong> 작업 공구대 및 선반<br>
                • <strong>Master Bedroom (1층 안방):</strong> 더블 침대 및 옷장<br>
                • <strong>Master Bathroom (1층 안방 욕실):</strong> 안방 전용 욕실<br>
                • <strong>Storage (1층 창고):</strong> 보관 선반 구역<br><br>
                <strong>[지상 2층 (Upstairs)]</strong><br>
                • <strong>Upstairs Hallway (2층 복도):</strong> 2층 침실들을 연결하는 복도<br>
                • <strong>Child Bedroom (어린이방):</strong> 유아용 침대 및 장난감 상자<br>
                • <strong>Twin Bedroom (트윈 침실):</strong> 2개의 싱글 침대 배치 침실<br>
                • <strong>Upstairs Bathroom (2층 욕실):</strong> 2층 공용 욕실<br>
                • <strong>Library (서재):</strong> 책장, 소파 및 서재 책상<br><br>
                <strong>[다락방 (Attic)]</strong><br>
                • <strong>Attic (다락방):</strong> 2층 사다리/계단으로 연결된 넓은 지붕 밑 창고
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>1층 주방 (Kitchen):</strong> 대형 냉장고 문 뒤편 구석<br>
                • <strong>1층 세탁실 (Utility Room):</strong> 세워진 매트리스 뒤편<br>
                • <strong>1층 식당 (Dining Room):</strong> 보관 선반 및 파티션 뒤<br>
                • <strong>1층 작업실 (Work Room):</strong> 커튼 및 공구 선반 뒤편<br>
                • <strong>1층 안방 (Master Bedroom):</strong> 침대 옆 나무 파티션 뒤<br>
                • <strong>2층 복도 (Upstairs Hallway):</strong> 안락의자 옆 쌓인 상자 뒤<br>
                • <strong>2층 어린이방 (Child Bedroom):</strong> 방 내부 붙박이 옷장 (Closet)<br>
                • <strong>2층 트윈 침실 (Twin Bedroom):</strong> 방 내부 붙박이 옷장 (Closet)<br>
                • <strong>다락방 (Attic):</strong> 다락방 안쪽 벽장 (Closet)
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 2층 서재(Library) 책상 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 1층 안방(Master Bedroom) 침대 옆 벽면<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 2층 복도 계단 난간 옆 바닥<br>
                • <strong>음악 상자 (Music Box):</strong> 2층 트윈 침실(Twin Bedroom) 선반 위<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 1층 식당(Dining Room) 선반 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 다락방(Attic) 수납장 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 2층 어린이방(Child Bedroom) 바닥 중앙<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 세탁실(Utility) 또는 작업실(Work Room) 벽면 중 1곳
            </p>
        `
    },
    { 
        name: "Bleasdale Farmhouse", 
        category: "Small", 
        rooms: "16개 룸", 
        size: "소형 목조 대농가 (지상 2층 + 다락방)", 
        tip: "목조 3층 구조의 대형 팜하우스로, 다락방(Attic)과 야외 정원 테라스가 연결되어 있습니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map / 구조상 중형급 이동 동선)<br>
                • <strong>총 룸(구역) 수:</strong> 16개 룸<br>
                • <strong>층수:</strong> 1층(Ground) + 2층(Upstairs) + 다락방(Attic)<br>
                • <strong>조명 스위치 수:</strong> 16개<br>
                • <strong>특징:</strong> 그래프톤보다 규모가 크며 방과 복도가 복잡하게 얽혀 있습니다. 특히 다락방으로 도망칠 때 외길 계단에 갇히지 않도록 주의해야 합니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                <strong>[지상 1층 (Ground Floor)]</strong><br>
                • <strong>Foyer (현관):</strong> 메인 출입문 및 중앙 계단 홀<br>
                • <strong>Tea Room (티룸):</strong> 티 테이블 및 장식장<br>
                • <strong>Living Room (거실):</strong> 소파 및 벽난로<br>
                • <strong>Dining Room (식당):</strong> 대형 식탁 구역<br>
                • <strong>Kitchen (주방):</strong> 주방 카운터 및 싱크대<br>
                • <strong>Utility Room (세탁실):</strong> 세탁기 및 보일러실<br>
                • <strong>Workshop (워크샵):</strong> 작업대 및 공구 보관실<br>
                • <strong>Office (사무실):</strong> 책상 및 책장<br>
                • <strong>Toilet (1층 화장실):</strong> 1층 공용 화장실<br><br>
                <strong>[지상 2층 (Upstairs)]</strong><br>
                • <strong>Upstairs Hallway (2층 복도):</strong> 침실들을 잇는 긴 복도<br>
                • <strong>Master Bedroom (안방):</strong> 대형 침대 구역<br>
                • <strong>Girl's Bedroom (소녀 방):</strong> 싱글 침대 및 인형<br>
                • <strong>Boy's Bedroom (소년 방):</strong> 싱글 침대 및 장난감<br>
                • <strong>Trophy Room (트로피룸):</strong> 박제 및 트로피 진열실<br>
                • <strong>Study (서재):</strong> 서재 책상 및 책장<br>
                • <strong>Bathroom (2층 욕실):</strong> 2층 대형 욕실<br><br>
                <strong>[다락방 (Attic)]</strong><br>
                • <strong>Attic (다락방):</strong> 3층 전체를 차지하는 넓은 지붕 밑 수납 공간
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>1층 티룸 (Tea Room):</strong> 나무 파티션(Screen) 뒤편<br>
                • <strong>1층 작업장 (Workshop):</strong> 작업장 안쪽 선반 뒤 구석<br>
                • <strong>1층 세탁실 (Utility Room):</strong> 세탁기 옆 상자 더미 뒤<br>
                • <strong>2층 복도 (Upstairs Hallway):</strong> 복도 끝 붙박이 벽장 (Closet)<br>
                • <strong>2층 소녀 방 (Girl's Bedroom):</strong> 방 내부 옷장 (Closet)<br>
                • <strong>2층 소년 방 (Boy's Bedroom):</strong> 방 내부 옷장 (Closet)<br>
                • <strong>2층 트로피룸 (Trophy Room):</strong> 박제 장식장 구석 틈새<br>
                • <strong>다락방 (Attic):</strong> 다락방 계단 옆 틈새 및 안쪽 상자 뒤편
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 다락방(Attic) 제단 테이블 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 2층 트로피룸(Trophy Room) 수납장 벽면<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 2층 안방(Master Bedroom) 침대 발치 바닥<br>
                • <strong>음악 상자 (Music Box):</strong> 1층 티룸(Tea Room) 접시 선반 아래 협탁<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 2층 서재(Study) 책장 선반 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 1층 거실(Living Room) 소파 옆 테이블<br>
                • <strong>소환진 (Summoning Circle):</strong> 1층 세탁실(Utility Room) 바닥 중앙<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 워크샵(Workshop) 또는 다락방(Attic) 벽면 중 1곳
            </p>
        `
    },
    { 
        name: "Point Hope", 
        category: "Medium", 
        rooms: "16개 룸", 
        size: "10층 등대 타워 (Medium Map)", 
        tip: "파스모포비아 최초의 10층 수직 원형 타워형 등대 맵입니다. 나선형 계단으로 도주로가 제한되므로 정화향초가 필수입니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 중형 맵 (Medium Map / Level 15 해금)<br>
                • <strong>구조:</strong> 총 10개 층 수직 타워 구조 (1층 로비부터 10층 발코니까지 16개 룸 분할)<br>
                • <strong>조명 스위치 수:</strong> 13개<br>
                • <strong>특징:</strong> 모든 층이 단 하나의 나선형 계단으로만 연결되어 있어 유령이 계단에서 사냥을 시작하면 층간 이동이 원천 차단됩니다. 각 층별 은신처 위치를 숙지하는 것이 필수입니다.
            </p>
            
            <div class="dict-section-title">2. 층별 룸 구성 (Floor-by-Floor)</div>
            <p class="dict-text">
                • <strong>1층 (Ground Floor):</strong> Entrance Hallway(현관) & 1층 소형 화장실<br>
                • <strong>2층:</strong> Kitchen & Dining Room (주방 및 식당)<br>
                • <strong>3층:</strong> Living Room (거실)<br>
                • <strong>4층:</strong> Games Room (당구대 게임룸)<br>
                • <strong>5층:</strong> Main Bathroom (대형 메인 욕실)<br>
                • <strong>6층:</strong> Master Bedroom (안방 침실)<br>
                • <strong>7층:</strong> Child Bedroom (파란색 어린이방)<br>
                • <strong>8층:</strong> Maintenance Room (유지보수실/작업실)<br>
                • <strong>9층:</strong> Lantern Room Bottom (등대 램프 하부 제어실)<br>
                • <strong>10층:</strong> Lantern Room Top & Balcony (등대 등명기 상부 및 야외 발코니)
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>1층 현관 (Entrance):</strong> 화장실 옆 계단 밑 틈새 구석<br>
                • <strong>4층 게임룸 (Games Room):</strong> 당구대 벽면 나무 파티션(Screen) 뒤<br>
                • <strong>5층 메인 욕실 (Main Bathroom):</strong> 샤워 커튼 뒤편 욕조 안<br>
                • <strong>6층 안방 (Master Bedroom):</strong> 침실 안쪽 전용 옷장 (Closet)<br>
                • <strong>7층 어린이방 (Child Bedroom):</strong> 방 내부 옷장 (Closet)<br>
                • <strong>8층 정비실 (Maintenance Room):</strong> 벽면 철제 락커 (Lockers)
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 3층 거실(Living Room) 소파 옆 원형 테이블 위<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 2층 식당(Dining Room) 찬장 벽면<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 7층 어린이방(Child Bedroom) 서랍장 위<br>
                • <strong>음악 상자 (Music Box):</strong> 6층 안방(Master Bedroom) 화장대(Vanity) 위<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 8층 유지보수실(Maintenance) 목마 장식 옆 책상 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 4층 게임룸(Games Room) 벽 선반 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 5층 대형 욕실(Main Bathroom) 중앙 바닥<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 현관 계단 옆 또는 8층 유지보수실 벽면 중 1곳
            </p>
        `
    },
    { 
        name: "Prison", 
        category: "Medium", 
        rooms: "31개 룸 (조사 구역 29개)", 
        size: "중형 폐교도소 (지상 2층 + 야외 안뜰)", 
        tip: "A동/B동 수감구역과 행정구역, 식당, 의무실로 나뉩니다. 모든 저주받은 물건이 입구 현관 복도(Entrance Hallway)에 모여 스폰됩니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 중형 맵 (Medium Map / Level 10 해금)<br>
                • <strong>총 룸 수:</strong> 31개 룸 (1층 19개, 2층 12개 / 유령방 가능 29개)<br>
                • <strong>층수:</strong> 지상 1층 + 지상 2층<br>
                • <strong>조명 스위치 수:</strong> 20개<br>
                • <strong>특징:</strong> A블록 및 B블록 수감동은 2개 층이 개방된 높은 층고 구조이며, 수감동 끝 비상문을 통해 야외 안뜰(Courtyard)로 탈출할 수 있습니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                <strong>[지상 1층 (Ground Floor)]</strong><br>
                • Entrance (입구 현관 복도), Main Hallway (중앙 복도), Office Hallway, Warden's Office (소장실), Chief Security (보안실), Main Office (행정실), Inspection, Visitation (면회실), Cafeteria (식당), Cell Block A (1F 좌/우/중앙), Cell Block B (1F 좌/우/중앙)<br><br>
                <strong>[지상 2층 (Upstairs)]</strong><br>
                • Infirmary (의무실), Infirmary Hallway, Cafeteria Security (식당 보안 발코니), Cell Block A (2F 좌/우), Cell Block B (2F 좌/우)
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>Entrance:</strong> 현관 맨 뒤쪽 철제 락커 (Lockers)<br>
                • <strong>Cafeteria:</strong> 식당 좌측 쓰레기통 4개 뒤편 틈새<br>
                • <strong>Infirmary:</strong> 2층 의무실 첫 번째 방 맨 우측 철제 락커 (Lockers)<br>
                • <strong>Cafeteria Security:</strong> 식당 보안 발코니 우측 쓰레기통 2개 뒤편<br>
                • <em>비공식 팁: 감옥 감방(Cell) 안쪽 침대 뒤는 유령이 시야를 잃기 쉬워 사냥 회피에 유용합니다.</em>
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>모든 저주받은 물건은 Entrance Hallway(현관 복도)에 집결 스폰됩니다:</strong><br>
                &nbsp;&nbsp;- <strong>타로 카드:</strong> 파란색 플라스틱 상자 안<br>
                &nbsp;&nbsp;- <strong>유령 거울:</strong> 의자 열(Row of chairs) 아래 바닥<br>
                &nbsp;&nbsp;- <strong>부두 인형:</strong> 상자들 사이 작은 테이블 위<br>
                &nbsp;&nbsp;- <strong>원숭이 손:</strong> 테이블 위 파란 상자 옆<br>
                &nbsp;&nbsp;- <strong>음악 상자:</strong> 검은색 플라스틱 상자 안<br>
                &nbsp;&nbsp;- <strong>위자보드:</strong> 상자가 놓인 테이블 뒤편 바닥<br>
                &nbsp;&nbsp;- <strong>소환진:</strong> 복도 끝 바닥 중앙<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 소장실 통로, 2층 의무실 복도 소형룸, 또는 A/B 블록 제어실 중 1곳
            </p>
        `
    },
    { 
        name: "Maple Lodge Campsite", 
        category: "Medium", 
        rooms: "대형 야외 캠핑장 (통나무집 포함)", 
        size: "중형 야외 리조트 캠핑장", 
        tip: "호숫가와 2층 통나무 캐빈(Cabin)이 포함된 야외 맵입니다. 날씨와 안개에 주의하며 캠프파이어 주변을 활용하세요.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 중형 야외 맵 (Medium Map / Level 19 해금)<br>
                • <strong>구조:</strong> 중앙 캠핑장, 리셉션 빌딩, 화장실 건물, 호숫가 부두, 2층 통나무 캐빈(Cabin J. & D.)<br>
                • <strong>특징:</strong> 비나 눈, 안개 등 기상 조건에 따라 시야 차이가 극심하며, 캠핑 구역과 호숫가 캐빈 간의 거리가 멉니다.
            </p>
            
            <div class="dict-section-title">2. 주요 구역 목록 (Zones)</div>
            <p class="dict-text">
                • <strong>Reception Building (안내소):</strong> 리셉션 카운터 및 장비실<br>
                • <strong>Storage Tent (창고 텐트):</strong> 발전기 및 캠핑 보관실<br>
                • <strong>Restrooms (공용 화장실):</strong> 남/녀 화장실 건물<br>
                • <strong>Campfire Area (중앙 모닥불):</strong> 대형 캠프파이어 및 통나무 좌석<br>
                • <strong>Tents A / B / C / D:</strong> 각 구역별 캠핑 텐트<br>
                • <strong>Lake & Dock (호수 및 부두):</strong> 호숫가 낚시터 및 보트 선착장<br>
                • <strong>2-Story Cabin (2층 통나무집):</strong> 1층 거실/주방 + 2층 침실 및 발코니
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>리셉션 빌딩:</strong> 건물 뒤편 발전기 및 상자 옆 틈새<br>
                • <strong>창고 텐트:</strong> 내부 대형 철제 선반 뒤편<br>
                • <strong>2층 통나무집 (Cabin):</strong> 2층 안방 옷장 (Closet)<br>
                • <strong>호숫가 부두:</strong> 선착장 보트 및 통나무 더미 뒤<br>
                • <strong>텐트 구역:</strong> Blue Tent 및 Green Tent 내부 침낭 뒤
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>타로 카드 (Tarot Cards):</strong> 2층 통나무집(Cabin) 1층 거실 탁자 위<br>
                • <strong>소환진 (Summoning Circle):</strong> 2층 통나무집(Cabin) 1층 바닥 중앙<br>
                • <strong>유령 거울 (Haunted Mirror):</strong> 리셉션 빌딩 외벽<br>
                • <strong>부두 인형 (Voodoo Doll):</strong> 중앙 캠프파이어 옆 통나무 벤치 위<br>
                • <strong>원숭이 손 (Monkey Paw):</strong> 호숫가 부두(Dock) 맨 끝 의자 위<br>
                • <strong>음악 상자 (Music Box):</strong> 안내소(Reception) 카운터 위<br>
                • <strong>위자보드 (Ouija Board):</strong> 공용 화장실 세면대 선반 위<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 리셉션 건물 뒤 외벽 또는 통나무집 1층 외벽 중 1곳
            </p>
        `
    },
    { 
        name: "Brownstone High School", 
        category: "Large", 
        rooms: "64개 룸 (교실 58개)", 
        size: "대형 폐학교 (지상 2층 + 체육관)", 
        tip: "수많은 교실과 긴 복도(Corridor), 대형 체육관(Basketball Court)으로 구성된 클래식 대형 맵입니다. 모든 저주받은 물건이 중앙 로비(Lobby)에 모여 있습니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 대형 맵 (Large Map / Level 5 해금)<br>
                • <strong>총 룸 수:</strong> 64개 룸 (1층 34개, 2층 30개 / 교실 58개)<br>
                • <strong>층수:</strong> 지상 1층 + 지상 2층<br>
                • <strong>조명 스위치 수:</strong> 33개<br>
                • <strong>특징:</strong> 1층과 2층 복도가 각각 3개의 Corridor 구역으로 나뉘어 있으며, 모든 교실마다 유령이 벨을 울릴 수 있는 전화기가 배치되어 있습니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 구역 목록 (Rooms)</div>
            <p class="dict-text">
                • <strong>Main Lobby:</strong> 1층 중앙 현관 로비<br>
                • <strong>Corridors 1F / 2F:</strong> 1층 및 2층 중앙/좌측/우측 복도<br>
                • <strong>Library 1F / 2F:</strong> 1층 및 2층 도서관<br>
                • <strong>Basketball Court:</strong> 실내 체육관, 관람석 스탠드 및 라커룸<br>
                • <strong>Classrooms 1 ~ 32:</strong> 총 32개의 일반 교실 및 과학실/미술실<br>
                • <strong>Restrooms 1F / 2F:</strong> 1층 및 2층 남/여 화장실
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • <strong>1층 도서관 (Library):</strong> 책장 사이 상자 더미 뒤<br>
                • <strong>6, 8, 12, 20번 교실:</strong> 교실 내부 서랍장(Drawer units) 뒤편<br>
                • <strong>11, 15, 27, 31번 교실:</strong> 넘어진 책장(Bookshelves) 뒤편<br>
                • <em>비공식 팁: 복도 화장실 칸막이 안쪽이나 체육관 스탠드 구석도 시야 차단에 유용합니다.</em>
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>모든 저주받은 물건은 1층 Main Lobby(중앙 로비)에 집결 스폰됩니다:</strong><br>
                &nbsp;&nbsp;- <strong>타로 카드:</strong> 로비 좌측 벽면 벤치 위<br>
                &nbsp;&nbsp;- <strong>음악 상자:</strong> 로비 우측 벽면 벤치 위<br>
                &nbsp;&nbsp;- <strong>부두 인형:</strong> 로비 안쪽 끝 벤치 위<br>
                &nbsp;&nbsp;- <strong>원숭이 손:</strong> 로비 우측 기둥 앞 상자 위<br>
                &nbsp;&nbsp;- <strong>위자보드:</strong> 로비 좌측 기둥 뒤 바닥<br>
                &nbsp;&nbsp;- <strong>유령 거울:</strong> 로비 우측 기둥 뒤 바닥<br>
                &nbsp;&nbsp;- <strong>소환진:</strong> 로비 안쪽 중앙 바닥<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 좌측 복도 끝, 1층 우측 복도 끝, 또는 2층 복도 벽면 중 1곳
            </p>
        `
    },
    { 
        name: "Sunny Meadows Mental Institution", 
        category: "Large", 
        rooms: "69개 룸 전체 개방", 
        size: "초대형 정신병원 (지상 1층 + 지하 1층)", 
        tip: "파스모포비아 최대 규모의 초대형 맵입니다. 4개 대형 병동과 안뜰, 지하 영안실/격리구역 전체가 열립니다. 모든 저주받은 물건은 중앙 예배당(Chapel)에 집결합니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Overview)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 초대형 맵 (Large Map / Level 20 해금)<br>
                • <strong>총 룸 수:</strong> 69개 룸 전체 개방<br>
                • <strong>층수:</strong> 1층 지상 병동 구역 + 안뜰(Courtyard) + 지하 격리/영안 구역<br>
                • <strong>조명 스위치 수:</strong> 39개<br>
                • <strong>특징:</strong> 크기가 방대하여 지향성 마이크(Parabolic Mic)와 온도계 탐색이 필수이며, 불이 꺼진 상태의 복도는 정신력을 급격히 소모시킵니다.
            </p>
            
            <div class="dict-section-title">2. 공식 룸 및 5대 핵심 구역 목록 (Rooms)</div>
            <p class="dict-text">
                • <strong>중앙 구역:</strong> Foyer(로비), Chapel(중앙 예배당), Courtyard(중앙 야외 안뜰)<br>
                • <strong>1층 남성 병동 (Male Wing):</strong> 1층 서쪽 병동 및 휴게실<br>
                • <strong>1층 여성 병동 (Female Wing):</strong> 1층 동쪽 병동 및 욕실<br>
                • <strong>1층 병원/수술실 병동 (Hospital Wing):</strong> 1층 북쪽 집중 치료실<br>
                • <strong>지하 격리 구역 (Basement Restricted Wing):</strong> 지하 서쪽 독방 및 고문실<br>
                • <strong>지하 영안실 구역 (Basement Morgue Wing):</strong> 지하 동쪽 부검실 및 시신 안치실
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                난이도 및 플레이어 수에 따라 무작위로 열리거나 막히는 공식 은신처들입니다:<br><br>
                • 중앙 복도 및 예배당 앞 이동침대(Gurney) 뒤편<br>
                • 각 병실 내부 철제 사물함(Lockers) 및 휠체어/스크린 파티션 뒤<br>
                • 지하 영안실(Morgue) 시신 보관 냉동고(Morgue cooler) 내부<br>
                • 안뜰 외벽 선반 틈새 및 계단 아래 창고
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>모든 저주받은 물건 7종은 중앙 Chapel(예배당) 내부 제단과 바닥에 집결 스폰됩니다:</strong><br>
                &nbsp;&nbsp;- <strong>소환진:</strong> 예배당 바닥 중앙 붉은 마법진<br>
                &nbsp;&nbsp;- <strong>원숭이 손:</strong> 십자가 제단 아래<br>
                &nbsp;&nbsp;- <strong>타로 카드, 오르골, 부두 인형, 위자보드, 유령 거울:</strong> 예배당 제단 및 촛대 주변 선반<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 로비 복도, 예배당 유틸리티실, 안뜰 외벽, 지하 보일러실 중 1곳
            </p>
        `
    },
    { 
        name: "Sunny Meadows Mental Institution - Restricted", 
        category: "Small", 
        rooms: "15~20개 룸 (구역별 가변)", 
        size: "제한된 소형 정신병원 (5개 변형 구역 중 1곳)", 
        tip: "대형 써니 메도우 전체가 아닌, 중앙 예배당(Chapel)과 무작위 1개 병동(총 5개 변형)만 열리는 소형(Small) 전용 맵입니다.",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 기본 개요 (Restricted 전용 시스템)</div>
            <p class="dict-text">
                • <strong>공식 분류:</strong> 소형 맵 (Small Map / Level 17 해금)<br>
                • <strong>총 룸(구역) 수:</strong> 약 15~20개 (열리는 윙에 따라 상이)<br>
                • <strong>맵 작동 방식:</strong> 69개 룸 전체가 열리는 일반 대형 써니 메도우와 달리, <strong>중앙 진입 복도 + 중앙 예배당(Chapel) + 5개 구역 중 무작위 1개 윙(Wing)</strong>만 문이 열리고 나머지 통로는 쇠사슬과 바리케이드로 영구 차단됩니다.<br>
                • <strong>5가지 무작위 오픈 변형:</strong><br>
                &nbsp;&nbsp;1) 1층 남성 병동 (Male Wing)<br>
                &nbsp;&nbsp;2) 1층 여성 병동 (Female Wing)<br>
                &nbsp;&nbsp;3) 1층 입원/수술 병동 (Hospital Wing)<br>
                &nbsp;&nbsp;4) 지하 격리구역 (Basement Restricted Area)<br>
                &nbsp;&nbsp;5) 지하 영안실 구역 (Basement Morgue)
            </p>

            <div class="dict-section-title">2. 공식 룸 및 오픈 구역 판정 (Rooms)</div>
            <p class="dict-text">
                • <strong>고정 오픈 구역:</strong> Entrance Foyer (입구 로비), Chapel (중앙 예배당)<br>
                • <strong>가변 오픈 구역:</strong> 매 게임마다 선택된 1개 윙의 복도, 입원실, 처치실, 화장실만 진입 가능
            </p>

            <div class="dict-section-title">3. 공식 은신처 상세 목록 (Sanctioned Hiding Spots)</div>
            <p class="dict-text">
                • 중앙 복도/예배당 앞 이동식 이동침대(Gurney) 뒤편<br>
                • 오픈된 각 병실(Room) 내부 철제 락커 및 휠체어/스크린 파티션 뒤<br>
                • 영안실(Morgue) 오픈 시: 시신 보관 냉동고(Morgue Cooler) 내부
            </p>

            <div class="dict-section-title">4. 저주받은 물건 및 주요 오브젝트 고정 위치 (Cursed Possessions & Props)</div>
            <p class="dict-text">
                • <strong>모든 저주받은 물건 7종은 오픈된 병동 위치와 무관하게 중앙 Chapel(예배당) 내부에 모여서 스폰됩니다:</strong><br>
                &nbsp;&nbsp;- <strong>소환진:</strong> 예배당 바닥 붉은 마법진<br>
                &nbsp;&nbsp;- <strong>원숭이 손:</strong> 십자가 제단 아래<br>
                &nbsp;&nbsp;- <strong>타로 카드, 오르골, 부두 인형, 위자보드, 거울:</strong> 제단 및 촛대 주변<br>
                • <strong>두꺼비집 (Fuse Box):</strong> 1층 중앙 진입 복도 좌측 벽면, 예배당 옆 유틸리티실, 안뜰 외벽, 또는 열린 지하 병동 출구 벽면 중 1곳
            </p>
        `
    }
];

// ==========================================
// 맵 정보 렌더링 (빈 공간 자동 채움 Masonry 완벽 적용)
// ==========================================
function renderMaps(category = 'ALL') {
    const container = document.getElementById('maps-container');
    if (!container) return;
    container.innerHTML = '';

    // 1. 규칙 배너 (상단 단독 100% 영역)
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

    // 2. 맵 카드 전용 Masonry 래퍼 생성
    const masonryWrapper = document.createElement('div');
    masonryWrapper.style.cssText = 'column-count: 2; column-gap: 20px; width: 100%;';

    const filtered = category === 'ALL' ? MAP_DATA : MAP_DATA.filter(m => m.category === category);

    filtered.forEach((map, index) => {
        const card = document.createElement('div');
        card.className = 'map-card';
        card.style.cssText = 'break-inside: avoid; margin-bottom: 20px; display: inline-block; width: 100%; vertical-align: top; box-sizing: border-box;';

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
        masonryWrapper.appendChild(card);
    });

    container.appendChild(masonryWrapper);
}

// 상세 토글 클릭 핸들러 (전역 함수)
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

// 6. 맵 필터 카테고리 버튼 처리 (중복 제거 완료)
function filterMapCategory(cat) {
    document.querySelectorAll('.map-filter-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.getElementById(`map-btn-${cat}`);
    if (targetBtn) targetBtn.classList.add('active');
    renderMaps(cat);
}

// 핵심 공략 데이터
const GUIDE_DATA = [
    { title: "헌팅 속도로 유령 구분하기 (BPM 스피드 팁)", body: "기본 1.7m/s보다 또렷하게 빠른 경우: 진(두꺼비집 켜짐), 라이주(전자기기 근처), 모로이(저정신력), 데오겐(원거리). 기본보다 느린 경우: 레버넌트(시야 밖), 데오겐(근접)." },
    { title: "십자가 및 향초 방어 활용 법", body: "십자가는 유령이 헌팅을 시작하려는 '지점'이 범위를 덮어야 작동합니다. 향초는 유령 근처에서 피우면 시야를 6초간 마비시키고 안전지대로 이탈할 수 있게 해줍니다." },
    { title: "정신력 관리와 커스텀 아이템 활용", body: "양초 불빛 아래 있으면 정신력이 감소하지 않습니다. 타로 카드, 위자드 보드 등 커스텀 아이템 사용 시 즉시 헌팅 위험에 노출되므로 주의하세요." }
];

// ID 카드 & 배지 데이터
const IDCARD_DATA = [
    { name: "프레스티지 배지 (Prestige Badges)", category: "프로필", t1: "Tier 1: 기본 조사관 배지", t2: "Tier 2: 숙련된 고스트 헌터 배지", t3: "Tier 3: 마스터 고스트 바스터 배지" },
    { name: "이벤트 한정 배지 (Event Badges)", category: "업적", t1: "할로윈 이벤트 한정 클리어 배지", t2: "크리스마스 홀리데이 이벤트 배지", t3: "이스터 에그 헌트 기념 배지" }
];

// 패치 소식 데이터
const NEWS_DATA = [
    { title: "📢 최신 업데이트 & 패치 노트 안내", body: "파스모포비아 최신 업데이트 패치 내역 및 밸런스 조정 사항이 정기적으로 반영됩니다. 유령들의 헌팅 AI 변경점 및 버그 수정 사항을 확인하세요." }
];

// 탭 상태 관리
let includedEvidences = [];
let excludedEvidences = [];
let activeFilters = {
    hasAccel: false,
    hasSpecialSpeed: false,
    hasForcedEv: false,
    hasTargetRoam: false
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initEvidenceButtons();
    renderGhostList();
    renderGhostDictionary();
    renderEquipment();
    renderWeekly();
    renderMaps('ALL');
    renderGuides();
    renderIdCards();
    renderNews();
    fetchVisitorCounts();
});

// 1. 증거 버튼 클릭 상태 토글
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

// 필터 토글
function toggleFilter(filterKey) {
    activeFilters[filterKey] = !activeFilters[filterKey];
    renderGhostList();
}

// 2. 유령 메인 추론 목록 렌더링
function renderGhostList() {
    const container = document.getElementById('ghost-list-container');
    const countEl = document.getElementById('ghost-count');
    if (!container) return;

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

    filtered.forEach(ghost => {
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
        container.appendChild(card);
    });
}

// 3. 유령 도감 렌더링 (아코디언 버튼 형식)
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

// 4. 장비 가이드 렌더링
function renderEquipment() {
    const container = document.getElementById('equipment-container');
    if (!container) return;
    container.innerHTML = '';

    EQUIPMENT_DATA.forEach(eq => {
        const card = document.createElement('div');
        card.className = 'eq-card';
        card.innerHTML = `
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
        `;
        container.appendChild(card);
    });
}

// 5. 주간 도전 과제 렌더링
function renderWeekly() {
    const container = document.getElementById('weekly-container');
    if (!container) return;
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

// 7. 핵심 공략 렌더링
function renderGuides() {
    const container = document.getElementById('guide-container');
    if (!container) return;
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

// 8. ID 카드 & 배지 렌더링
function renderIdCards() {
    const container = document.getElementById('idcard-container');
    if (!container) return;
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

// 9. 패치 소식 렌더링
function renderNews() {
    const container = document.getElementById('news-container');
    if (!container) return;
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

// 탭 전환 함수
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

// 상단 헤더 검색 연동
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

                <!-- 1. 유튜브 채널 배너 -->
                <a href="https://www.youtube.com/@nyongja1" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(248, 113, 113, 0.4); background-color: rgba(248, 113, 113, 0.12);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">▶️</span>
                    <div>
                        <div style="color: #f87171; font-size: 0.95rem; font-weight: 700;">뇽자 유튜브</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">파스모포비아 공식 파트너 유튜브</div>
                    </div>
                </a>

                <!-- 2. 치지직 채널 배너 -->
                <a href="https://chzzk.me/nyongja" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(52, 211, 153, 0.4); background-color: rgba(6, 8, 20, 0.6);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">🟢</span>
                    <div>
                        <div style="color: #34d399; font-size: 0.95rem; font-weight: 700;">뇽자 치지직 채널</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 실시간 방송 보러가기</div>
                    </div>
                </a>

                <!-- 3. 디스코드 배너 -->
                <a href="https://discord.gg/YkgM5t6N33" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(109, 76, 251, 0.5); background-color: rgba(109, 76, 251, 0.15);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">💬</span>
                    <div>
                        <div style="color: var(--accent-light); font-size: 0.95rem; font-weight: 700;">너굴단 디스코드</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 & 너굴단 디스코드</div>
                    </div>
                </a>

                <!-- 4. 인스타그램 배너 -->
                <a href="https://www.instagram.com/n_yong_ja" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(248, 113, 113, 0.4); background-color: rgba(248, 113, 113, 0.1);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">📸</span>
                    <div>
                        <div style="color: #f87171; font-size: 0.95rem; font-weight: 700;">뇽스타그램</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 인스타그램</div>
                    </div>
                </a>

                <!-- 5. 네이버 팬카페 배너 -->
                <a href="https://cafe.naver.com/phasmophobia1" target="_blank" class="yt-btn" style="text-align: left; justify-content: flex-start; padding: 10px 14px; text-decoration: none; border-color: rgba(52, 211, 153, 0.4); background-color: rgba(52, 211, 153, 0.1);">
                    <span style="font-size: 1.2rem; margin-right: 6px;">☕</span>
                    <div>
                        <div style="color: #34d399; font-size: 0.95rem; font-weight: 700;">네이버 팬카페</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: normal;">뇽자 공식 팬카페</div>
                    </div>
                </a>

                <!-- 6. 공식 이메일 배너 -->
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

// ==========================================
// 실시간 방문자 카운터 집계 로직
// ==========================================
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
