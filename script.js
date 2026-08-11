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
        tip: "향초에 정화되면 180초 동안 헌팅을 시작하지 못합니다.",
        huntSanity: "50%",
        specialTrait: "향초 방어 시간이 기본(90초)의 2배인 180초입니다.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "레이스",
        engName: "Wraith",
        evidences: ["EMF 5", "스피릿 박스", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+레이스+공략",
        tip: "소금을 절대 밟지 않으며 플레이어 위치로 순간이동 능력을 사용합니다.",
        huntSanity: "50%",
        specialTrait: "소금을 밟지 않으며 순간이동 후 근처 플레이어에게 EMF 2/5 발생.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: true
    },
    {
        name: "팬텀",
        engName: "Phantom",
        evidences: ["스피릿 박스", "손자국", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+팬텀+공략",
        tip: "바라볼 때 정신력이 크게 깎이며 사진을 찍으면 모습이 사라집니다.",
        huntSanity: "50%",
        specialTrait: "사진 촬영 시 모습이 지워지고 깜빡임 주기가 매우 깁니다.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: true
    },
    {
        name: "폴터가이스트",
        engName: "Poltergeist",
        evidences: ["스피릿 박스", "손자국", "고스트 라이팅"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+폴터가이스트+공략",
        tip: "물건을 한꺼번에 멀리 던지는 폭발 능력을 사용합니다.",
        huntSanity: "50%",
        specialTrait: "여러 물건을 동시에 투척하며 물건 1개당 정신력 2% 차감.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "밴시",
        engName: "Banshee",
        evidences: ["손자국", "고스트 오브", "DOTS"],
        sanity: "타겟 정신력 50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+밴시+공략",
        tip: "오직 타겟 1명만을 노리며 지향성 마이크를 통해 고유의 비명 소리를 들을 수 있습니다.",
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
                • <strong>모델 룰:</strong> 밴시는 설정상 항상 여성 유령 모델만 사용합니다 (남성 모델 확인 시 밴시 제외 가능).
            </p>

            <div class="dict-section-title">2. 상호작용 및 고유 행동 (Interaction)</div>
            <p class="dict-text">
                • <strong>스토킹 로밍 (Stalking Roam):</strong> 평소에 타겟이 위치한 곳으로 끊임없이 방을 이동(배회)하는 성향이 강합니다.<br>
                • <strong>노래 부르기 이벤트 (Singing Event):</strong> 노래를 부르는 고스트 이벤트를 자주 발생시키며, 타겟이 접촉 시 정신력 감소량이 15%로 증가합니다.<br>
                • <strong>지향성 마이크 고유 비명:</strong> 지향성 마이크(Parabolic Mic)로 소리를 감지할 때, 약 33% 확률로 일반 속삭임 대신 <strong>특유의 날카로운 비명/탄식 소리(Banshee's Wail)</strong>를 들려줍니다.
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
                • <strong>지향성 마이크 테스트 (가장 확실):</strong> 밴시 증거가 의심될 때 마이크를 켜두고 기다려 특수 비명 소리가 들리는지 체크하는 것이 최우선입니다.<br>
                • <strong>사냥 중 몸통 박치기 테스트 (멀티플레이):</strong> 사냥이 시작되었을 때 유령이 자신을 보고도 무시하고 지나가거나 몸을 겹쳐도 죽지 않는다면 100% 밴시입니다.<br>
                • <strong>스토킹 체크:</strong> 고스트 룸이 아닌 다른 방에 머물고 있는데 유령이 지속적으로 내 주변에서 EMF를 띄우거나 출현한다면 밴시의 스토킹일 확률이 높습니다.
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
        tip: "10m 반경 안에서 플레이어가 걷거나 뛰면 가속하고, 완전히 정지해 있으면 매우 느려집니다.",
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
                • <strong>플레이어 움직임 감지 (핵심 메커니즘):</strong> 사냥 중 <strong>반경 10m 이내</strong>(층수 무관 3D 구체 범위)에 플레이어가 있을 때 속도가 실시간으로 급변합니다.<br>
                • <strong>가속 조건 (2.5 m/s):</strong> 10m 이내의 플레이어가 걷거나 달리는 등 이동 중일 경우, 시야(LOS) 확보 여부와 상관없이 <strong>2.5 m/s로 대폭 가속</strong>합니다.<br>
                • <strong>감속 조건 (1.4 m/s):</strong> 10m 이내의 플레이어가 제자리에 가만히 멈춰 서 있거나 웅크리고 있으면 <strong>1.4 m/s로 크게 감속</strong>합니다.<br>
                • <strong>시야 가속(LOS Accel) 없음:</strong> 플레이어를 오래 바라보아도 일반 유령처럼 점진적으로 빨라지지 않습니다.<br>
                • <strong>모델 룰:</strong> 다얀은 설정상 항상 여성 유령 모델만 사용합니다 (남성 모델 확인 시 다얀 제외 가능).
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
                • <strong>약점 (Weakness):</strong> 근처에 있는 플레이어가 움직이지 않고 침착하게 정지해 있으면 발걸음이 극도로 둔해집니다.
            </p>

            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>은신처 대기 테스트 (결정적 감별법):</strong> 캐비닛이나 락커 등 은신처에 숨은 채 완전히 멈춰 있을 때, 유령이 10m 안으로 접근하는 순간 <strong>발소리가 갑자기 느려지는 현상</strong>을 관찰하면 다얀으로 확정할 수 있습니다.<br>
                • <strong>무빙 카운터 (스톱 & 고):</strong> 사냥 중 다얀에게 쫓길 때 거리가 좁혀지면 향초를 태우거나 순간적으로 엄폐물 뒤에서 정지하여 유령의 속도를 늦춘 뒤 안전 구역으로 이동해야 합니다.<br>
                • <strong>타 유령과의 혼동 방지:</strong> 근처에서 느려지는 특성 때문에 데오겐(Deogen)이나 시야 밖 레버넌트(Revenant)와 혼동될 수 있으나, 다얀은 플레이어가 움직이면 즉시 2.5m/s로 급가속한다는 점으로 구별됩니다.
            </p>
        `
    },
    {
        name: "딜데가스트",
        engName: "Deildegast",
        evidences: ["EMF 5", "고스트 라이팅", "DOTS"],
        sanity: "50%",
        speed: "초기 3.0 m/s ➔ 투척 시 0.4 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+딜데가스트+공략",
        tip: "헌팅 초기엔 매우 빠르지만 물건을 투척할수록 극도로 느려집니다.",
        huntSanity: "50%",
        specialTrait: "물건을 26개 투척하면 이동 속도가 최저 0.4m/s까지 감소함.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "데오겐",
        engName: "Deogen",
        evidences: ["스피릿 박스", "고스트 라이팅", "DOTS"],
        sanity: "40%",
        speed: "원거리 3.0 m/s / 근접 0.4 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+데오겐+공략",
        tip: "숨어도 위치를 알아내고 찾아오지만 가까이 오면 매우 느려집니다.",
        huntSanity: "40%",
        specialTrait: "스피릿 박스 특수 거친 숨소리 반응(후욱후욱), 은신 불가.",
        forcedEvidence: "스피릿 박스",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: true
    },
    {
        name: "데몬",
        engName: "Demon",
        evidences: ["손자국", "고스트 라이팅", "서늘함"],
        sanity: "기본 70% (특수능력 100%)",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+데몬+공략",
        tip: "가장 공격적인 유령으로 높은 정신력에서도 무차별 헌팅을 시작합니다.",
        huntSanity: "70% (특수 능력 시 100%)",
        specialTrait: "향초 재사용 쿨타임이 60초로 짧으며 십자가 범위를 넓게 받음.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "갈루",
        engName: "Gallu",
        evidences: ["EMF 5", "스피릿 박스", "손자국"],
        sanity: "50%",
        speed: "분노 시 1.96 m/s / 기본 1.7 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+갈루+공략",
        tip: "소금/십자가/향초 자극 시 분노하며 분노 시 소금을 밟아도 자국을 남기지 않습니다.",
        huntSanity: "50%",
        specialTrait: "일반/분노/약화 3단계를 순환하며 분노 시 소금 표식 미생성.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "고료",
        engName: "Goryo",
        evidences: ["EMF 5", "손자국", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+고료+공략",
        tip: "DOTS 프로젝터 영상은 비디오 카메라를 통해서만 육안 확인이 가능합니다.",
        huntSanity: "50%",
        specialTrait: "사람이 방에 없어야 카메라로 DOTS 확인 가능.",
        forcedEvidence: "DOTS",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: true,
        hasTargetRoam: false
    },
    {
        name: "한투",
        engName: "Hantu",
        evidences: ["손자국", "고스트 오브", "서늘함"],
        sanity: "50%",
        speed: "온도에 따라 1.4 ~ 2.7 m/s (시야가속 X)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+한투+공략",
        tip: "추운 곳에서 매우 빠르고 따뜻한 곳에서 느려지며 입김을 내뿜습니다.",
        huntSanity: "50%",
        specialTrait: "시야 가속이 없으며 헌팅 중 입김 가시화, 서늘함 고정.",
        forcedEvidence: "서늘함",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: false
    },
    {
        name: "진",
        engName: "Jinn",
        evidences: ["EMF 5", "손자국", "서늘함"],
        sanity: "50%",
        speed: "1.7 ~ 2.5 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+진+공략",
        tip: "두꺼비집이 켜져 있고 멀리 있으면 빠르게 가속합니다.",
        huntSanity: "50%",
        specialTrait: "두꺼비집을 내리지 못하며 멀리서 시야 확인 시 2.5m/s로 급가속.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "메어",
        engName: "Mare",
        evidences: ["스피릿 박스", "고스트 오브", "고스트 라이팅"],
        sanity: "불 꺼짐 60% / 불 켜짐 40%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+메어+공략",
        tip: "어둠 속에서 더 강해지며 불을 즉시 끄는 능력이 있습니다.",
        huntSanity: "불 꺼짐 60% / 켜짐 40%",
        specialTrait: "전등이 켜지면 헌팅 확률 감소, 켜진 불을 즉시 끄는 능력 보유.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "모로이",
        engName: "Moroi",
        evidences: ["스피릿 박스", "고스트 라이팅", "서늘함"],
        sanity: "50%",
        speed: "정신력 저하 시 1.5 ~ 2.25 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+모로이+공략",
        tip: "스피릿 박스로 저주를 걸며 정신력이 낮을수록 극도로 빨라집니다.",
        huntSanity: "50%",
        specialTrait: "스피릿 박스 수신 시 정신력 감소 속도 2배 저주.",
        forcedEvidence: "스피릿 박스",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: false
    },
    {
        name: "마일링",
        engName: "Myling",
        evidences: ["EMF 5", "손자국", "고스트 라이팅"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+마일링+공략",
        tip: "헌팅 시 발소리가 매우 조용하여 가까이 접근해야만 들립니다.",
        huntSanity: "50%",
        specialTrait: "발소리가 전자기기 교란 범위(약 10m) 안에서만 들림.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "오바케",
        engName: "Obake",
        evidences: ["EMF 5", "손자국", "고스트 오브"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+오바케+공략",
        tip: "6손가락 손자국을 남기거나 헌팅 중 다른 모습으로 순간 변신합니다.",
        huntSanity: "50%",
        specialTrait: "6손가락 표식 생성, 헌팅 시 모습 변신(Shape-shift).",
        forcedEvidence: "손자국",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: true,
        hasTargetRoam: false
    },
    {
        name: "오밤보",
        engName: "Obambo",
        evidences: ["손자국", "고스트 라이팅", "DOTS"],
        sanity: "50%",
        speed: "공격적 1.9 m/s / 차분함 1.4 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+오밤보+공략",
        tip: "2분 주기로 차분함과 공격적 상태를 번갈아 바꿉니다.",
        huntSanity: "50%",
        specialTrait: "차분함/공격적 상태 주기 교체, 상태에 따라 속도 변동.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "오니",
        engName: "Oni",
        evidences: ["EMF 5", "서늘함", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+오니+공략",
        tip: "매우 왕성하게 활동하며 헌팅 시 모습을 훨씬 자주 드러냅니다.",
        huntSanity: "50%",
        specialTrait: "이벤트 시 정신력 20% 차감, 안개 실체화 미발생.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "원령",
        engName: "Onryo",
        evidences: ["스피릿 박스", "고스트 오브", "서늘함"],
        sanity: "60%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+원령+공략",
        tip: "양초 불빛을 두려워하며 불이 꺼질 때 헌팅이 유발될 수 있습니다.",
        huntSanity: "60%",
        specialTrait: "3번째 불이 꺼지면 즉시 헌팅 유발.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "팬텀",
        engName: "Phantom",
        evidences: ["스피릿 박스", "손자국", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+팬텀+공략",
        tip: "바라볼 때 정신력이 깎이며 사진 촬영 시 소멸합니다.",
        huntSanity: "50%",
        specialTrait: "사진 촬영 시 모습이 지워짐.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: true
    },
    {
        name: "폴터가이스트",
        engName: "Poltergeist",
        evidences: ["스피릿 박스", "손자국", "고스트 라이팅"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+폴터가이스트+공략",
        tip: "물건 폭발 능력을 사용합니다.",
        huntSanity: "50%",
        specialTrait: "동시 물건 투척 폭발.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "라이주",
        engName: "Raiju",
        evidences: ["EMF 5", "고스트 오브", "DOTS"],
        sanity: "전자기기 근처 65% / 기본 50%",
        speed: "전자기기 근처 2.5 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+라이주+공략",
        tip: "작동 중 전자기기가 주변에 있으면 대폭 가속합니다.",
        huntSanity: "전자기기 근처 65%",
        specialTrait: "전자기기 근처 2.5m/s 이동, 교란 범위 15m.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "레버넌트",
        engName: "Revenant",
        evidences: ["고스트 오브", "고스트 라이팅", "서늘함"],
        sanity: "50%",
        speed: "평소 1.0 m/s / 추적 3.0 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+레버넌트+공략",
        tip: "시야 추적 시 폭발적으로 빨라집니다.",
        huntSanity: "50%",
        specialTrait: "시야 확인 시 3.0m/s 급가속.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "셰이드",
        engName: "Shade",
        evidences: ["EMF 5", "고스트 라이팅", "서늘함"],
        sanity: "35%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+셰이드+공략",
        tip: "수줍음이 많아 같은 방에 사람이 있으면 헌팅을 못합니다.",
        huntSanity: "35%",
        specialTrait: "같은 방 사람이 존재 시 헌팅 불가능.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "타예",
        engName: "Thaye",
        evidences: ["고스트 오브", "고스트 라이팅", "DOTS"],
        sanity: "초기 75% -> 나이듦에 따라 15%",
        speed: "초기 2.75 m/s -> 나이듦에 따라 1.0 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+타예+공략",
        tip: "초반에는 빠르고 공격적이지만 시간이 지나면 약해집니다.",
        huntSanity: "초기 75% -> 15%",
        specialTrait: "나이듦 기믹, 시야 가속 없음.",
        forcedEvidence: "없음",
        hasAccel: false,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "미믹",
        engName: "The_Mimic",
        evidences: ["스피릿 박스", "손자국", "서늘함", "고스트 오브(가짜 증거)"],
        sanity: "복제 유령에 따라 다름",
        speed: "복제 유령에 따라 다름",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+미믹+공략",
        tip: "모든 유령 특성 복사 + 가짜 고스트 오브.",
        huntSanity: "복제 유령에 따름",
        specialTrait: "항상 가짜 고스트 오브가 관찰되는 4증거 유령.",
        forcedEvidence: "고스트 오브(가짜)",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: true,
        hasTargetRoam: false
    },
    {
        name: "트윈스",
        engName: "The_Twins",
        evidences: ["EMF 5", "스피릿 박스", "서늘함"],
        sanity: "50%",
        speed: "본체 1.5 m/s / 분신 1.87 m/s",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+트윈스+공략",
        tip: "본체와 분신이 서로 다른 곳에서 상호작용을 일으킵니다.",
        huntSanity: "50%",
        specialTrait: "본체/분신 출발에 따른 이동 속도 차이.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: true,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "요괴",
        engName: "Yokai",
        evidences: ["스피릿 박스", "고스트 오브", "DOTS"],
        sanity: "근처 대화 시 80% / 기본 50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+요괴+공략",
        tip: "근처 음성 대화 시 일찍 헌팅합니다.",
        huntSanity: "근처 대화 시 80%",
        specialTrait: "헌팅 중 감지 범위 2m 이내 제한.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "유레이",
        engName: "Yurei",
        evidences: ["고스트 오브", "서늘함", "DOTS"],
        sanity: "50%",
        speed: "1.7 m/s (가속 O)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+유레이+공략",
        tip: "문 상호작용으로 정신력을 한 번에 15% 깎아냅니다.",
        huntSanity: "50%",
        specialTrait: "문 닫기 능력 사용 시 정신력 15% 차감, 향초 정화 시 방에 고정.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
    },
    {
        name: "아스왕",
        engName: "Aswang",
        evidences: ["DOTS", "서늘함", "고스트 라이팅"],
        sanity: "50%",
        speed: "기본 1.53 m/s ➔ 최고 2.53 m/s (폭발적 가속)",
        ytUrl: "https://www.youtube.com/results?search_query=파스모포비아+아스왕+공략",
        tip: "공식 은신처에 숨은 플레이어는 절대 죽일 수 없으며 도달 즉시 헌팅이 종료됩니다. 단, 다음 헌팅 시 해당 위치로 즉시 직진합니다.",
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
                • <strong>시야 가속률:</strong> 플레이어를 시야(Line-of-Sight)에 포착했을 때, 초당 가속률이 일반 유령(기본 속도의 0.05배/초)보다 높은 기본 속도의 0.075배/초로 증가합니다.<br>
                • <strong>최고 속도 도달 시간:</strong> 대다수의 일반 유령이 최고 속도에 도달하는 데 13초가 걸리는 반면, 아스왕은 <strong>8.67초 만에 최고 속도인 2.53 m/s에 도달</strong>합니다.<br>
                • <strong>은신처(숨는 장소) 상호작용 및 특수 룰:</strong> 올바른 방식으로 사용 중인 유효한 공식 은신처(옷장, 사물함 등) 내부의 플레이어를 감지하고 도달할 경우, <strong>사냥이 즉시 강제 종료</strong>됩니다. 즉, 공식 은신처에 올바르게 숨어 있는 플레이어는 아스왕에게 살해당하지 않습니다.<br>
                • <strong>위치 추적 페널티:</strong> 이러한 방식으로 사냥이 종료되면 아스왕은 다음 사냥 시작 시 해당 플레이어의 위치에 직접 웨이포인트(경유지)를 생성하며, <strong>사냥 시작 시의 유예 시간(Grace period) 동안에도 해당 위치를 향해 곧장 이동</strong>합니다.
            </p>

            <div class="dict-section-title">2. 증거 (Evidence)</div>
            <p class="dict-text">
                • D.O.T.S. 프로젝터 (D.O.T.S. Projector)<br>
                • 빙점 이하의 온도 (Freezing Temperatures)<br>
                • 고스트 라이팅 (Ghost Writing)
            </p>

            <div class="dict-section-title">3. 강점 및 약점 (Strengths & Weaknesses)</div>
            <p class="dict-text">
                • <strong>강점 (Strength):</strong> 목표물을 발견하면 추격 속도가 더 빨라집니다.<br>
                • <strong>약점 (Weakness):</strong> 수색하기보다 직접 추격하는 것을 선호합니다.
            </p>

            <div class="dict-section-title">4. 공략 및 식별법 (Strategies)</div>
            <p class="dict-text">
                • <strong>상대 난이도:</strong> 주요 강점이 적고, 사냥 기본 속도(1.53 m/s)가 낮으며, 숨은 플레이어를 죽일 수 없다는 특성이 맞물려 게임 내에서 대처하기 가장 쉬운 유령 중 하나로 평가받습니다.<br>
                • <strong>은신처 약점의 한계 조건:</strong> 플레이어를 죽이지 못하는 약점은 오직 사용자 지정 난이도의 '은신처 개수' 설정에 영향을 받는 <strong>공식 은신처(막힐 수 있는 옷장/락커 등)에만 적용</strong>됩니다. 난이도 설정에서 은신처 개수를 0개로 설정했거나, 비공식 은신처(가구 뒤, 문 뒤 등)에 숨은 경우에는 이 약점이 적용되지 않아 정상적으로 사망합니다.<br>
                • <strong>사냥 종료 후 대처:</strong> 은신처를 이용해 사냥을 강제 종료시킨 플레이어는, 다음 사냥이 시작되자마자 유령이 자신의 위치로 일직선으로 돌진해 온다는 점을 반드시 인지하고 즉시 다른 위치로 이탈해야 합니다.<br>
                • <strong>타 유령과의 구별법:</strong> 아스왕의 이동 속도는 오밤보(Obambo)나 쌍둥이(The Twins)의 속도와 혼동될 수 있습니다. 여러 번의 사냥을 관찰하면서 유령의 기본 속도가 더 빠른 속도로 변경되는지 확인해야 하며, 사냥마다 기본 속도가 바뀐다면 아스왕이 아닙니다.
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
        tip: "완전히 눈이 멀었지만 플레이어 감지 탐지 범위가 훨씬 넓습니다.",
        huntSanity: "50%",
        specialTrait: "시각적 은신 가능, 넓은 전자기기 및 음성 탐지 범위 보유.",
        forcedEvidence: "없음",
        hasAccel: true,
        hasSpecialSpeed: false,
        hasForcedEv: false,
        hasTargetRoam: false
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

// 맵 정보 데이터
const MAP_DATA = [
    { name: "6 Tanglewood Drive", category: "Small", rooms: "11개 방", size: "소형 주택", tip: "가장 기본이 되는 표준 조사 맵입니다." },
    { name: "42 Edgefield Road", category: "Small", rooms: "16개 방", size: "2층 주택", tip: "복도가 길고 문이 많아 유령 상호작용 체크에 용이합니다." },
    { name: "10 Ridgeview Court", category: "Small", rooms: "12개 방", size: "2층 주택", tip: "지하실과 지하 차고 간의 연결 동선을 파악해야 합니다." },
    { name: "Grafton Farmhouse", category: "Small", rooms: "13개 방", size: "목조 농가", tip: "나무 바닥이라 발소리가 또렷하게 울립니다." },
    { name: "Camp Woodwind", category: "Small", rooms: "야외 캠핑장", size: "소형 야외", tip: "동선이 매우 짧아 빠른 파밍과 테스트에 적합합니다." },
    { name: "Prison", category: "Medium", rooms: "29개 방", size: "중형 교도소", tip: "A동/B동 수감구역의 중앙 전원 확보가 중요합니다." },
    { name: "Maple Lodge Campsite", category: "Medium", rooms: "야외 캠핑장", size: "중형 야외", tip: "날씨(비/안개)에 따른 시야 확보에 주의하세요." },
    { name: "Sunny Meadows", category: "Large", rooms: "60개 이상의 방", size: "대형 정신병원", tip: "중앙 홀을 중심으로 각 구역별 사전 탐색이 필수적입니다." }
];

// 핵심 공략 데이터
const GUIDE_DATA = [
    { title: "헌팅 속도로 유령 구분하기 (BPM 스피드 팁)", body: "기본 1.7m/s보다 또렷하게 빠른 경우: 진(두꺼비집 켜짐), 라이주(전자기기 근처), 모로이(저정신력), 데오겐(원거리). 기본보다 느린 경우: 레버넌트(시야 밖), 데오겐(근접)." },
    { title: "십자가 및 향초 방어 활용 법", body: "십자가는 유령이 헌팅을 시작하려는 '지점'이 범위를 덮어야 작동합니다. 향초는 유령 근처에서 피우면 시야를 6초간 마비시키고 안전지대로 이탈할 수 있게 해줍니다." },
    { title: "정신력 관리와 커스텀 아이템 활용", body: "양초 불빛 아래 있으면 정신력이 감소하지 않습니다. 타로 카드, 위자드 보드 등 커스텀 아이템 사용 시 즉시 헌팅 위험에 노출되므로 주의하세요." }
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
    renderMaps('ALL');
    renderGuides();
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
                <p class="ghost-tip-content">${ghost.tip}</p>
            </details>
        `;
        container.appendChild(card);
    });
}

// 3. 유령 도감 렌더링 (밴시 / 다얀 / 아스왕 커스텀 세부 템플릿 포함)
function renderGhostDictionary() {
    const container = document.getElementById('ghost-dictionary-container');
    if (!container) return;
    container.innerHTML = '';

    GHOST_DATA.forEach(ghost => {
        const card = document.createElement('div');
        card.className = 'dict-card';

        if (ghost.isCustomDetailed && ghost.detailedHtml) {
            card.innerHTML = `
                <div class="dict-header">
                    <div class="dict-title">${ghost.name} (${ghost.engName})</div>
                </div>
                <div class="dict-spec-bar">
                    <div class="dict-spec-item"><strong>헌팅 정신력:</strong> ${ghost.huntSanity}</div>
                    <div class="dict-spec-item"><strong>이동 속도:</strong> ${ghost.speed}</div>
                    <div class="dict-spec-item"><strong>고정 증거:</strong> ${ghost.forcedEvidence}</div>
                </div>
                ${ghost.detailedHtml}
            `;
        } else {
            card.innerHTML = `
                <div class="dict-header">
                    <div class="dict-title">${ghost.name} (${ghost.engName})</div>
                </div>
                <div class="dict-spec-bar">
                    <div class="dict-spec-item"><strong>헌팅 정신력:</strong> ${ghost.huntSanity}</div>
                    <div class="dict-spec-item"><strong>이동 속도:</strong> ${ghost.speed}</div>
                    <div class="dict-spec-item"><strong>고정 증거:</strong> ${ghost.forcedEvidence}</div>
                </div>
                <div class="dict-section-title">증거 목록</div>
                <p class="dict-text">${ghost.evidences.join(', ')}</p>
                <div class="dict-section-title">고유 특성 & 대응법</div>
                <p class="dict-text">${ghost.specialTrait}</p>
            `;
        }
        container.appendChild(card);
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

// 5. 맵 정보 렌더링 및 카테고리 필터링
function renderMaps(category = 'ALL') {
    const container = document.getElementById('maps-container');
    if (!container) return;
    container.innerHTML = '';

    const filtered = category === 'ALL' ? MAP_DATA : MAP_DATA.filter(m => m.category === category);

    filtered.forEach(map => {
        const card = document.createElement('div');
        card.className = 'map-card';
        card.innerHTML = `
            <div class="map-header">
                <div class="map-name">${map.name}</div>
                <span class="map-badge ${map.category}">${map.category}</span>
            </div>
            <div class="map-info-list">
                <div class="map-info-item"><strong>구조:</strong> ${map.size} (${map.rooms})</div>
            </div>
            <p class="dict-text">💡 ${map.tip}</p>
        `;
        container.appendChild(card);
    });
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
        contentEl.innerHTML = "<p>패치 소식 탭에서 상세 내역을 확인하실 수 있습니다.</p>";
    } else if (panelType === 'stream') {
        titleEl.innerText = "📺 방송 정보";
        contentEl.innerHTML = "<p>치트시트 개발 및 피드백 제보는 뇽자 방송/커뮤니티를 통해 진행됩니다.</p>";
    } else if (panelType === 'contact') {
        titleEl.innerText = "✉️ 제보 및 문의";
        contentEl.innerHTML = "<p>버그 및 정보 제보는 언제나 환영합니다!</p>";
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
            <div class="search-result-title">${g.name}</div>
            <div style="font-size:0.9rem; color:#a3a6c9;">${g.tip}</div>
        </div>
    `).join('');
}
