// ==========================================
// 2. 장비 가이드 데이터베이스
// ==========================================

const EQUIPMENT_DATA = [
    { 
        name: "EMF 측정기", 
        category: "정보 수집", 
        t1: "Tier 1: 아날로그 바늘형 (범위 좁음)", 
        t2: "Tier 2: 디지털 수치형 (소리 명확)", 
        t3: "Tier 3: 3D 서라운드 다중 탐지기" 
    },
    { 
        name: "DOTS 프로젝터", 
        category: "증거 확인", 
        t1: "Tier 1: 휴대용 레이저 펜 (5m 좁은 원뿔형 빔, 손에 들면 헌팅 시 어그로)", 
        t2: "Tier 2: 설치형 반구형 그리드 (2.5m 주변광, 벽/바닥/천장 부착)", 
        t3: "Tier 3: 모터 회전식 3구 프로젝터 (7m 와이드 스캔, F키로 회전 정지/소음 제어)",
        isDetailed: true,
        detailedHtml: `
            <div class="dict-section-title">1. 티어(Tier)별 상세 스펙</div>
            <div style="overflow-x: auto; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; color: #d4d4d8; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1.5px solid var(--accent-vibrant); color: var(--accent-light);">
                            <th style="padding: 6px 8px;">구분</th>
                            <th style="padding: 6px 8px;">1티어 (Tier I)</th>
                            <th style="padding: 6px 8px;">2티어 (Tier II)</th>
                            <th style="padding: 6px 8px;">3티어 (Tier III)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 6px 8px; font-weight: 700; color: #fff;">형태</td>
                            <td style="padding: 6px 8px;">휴대용 레이저 펜</td>
                            <td style="padding: 6px 8px;">적외선 센서 개조형</td>
                            <td style="padding: 6px 8px;">모터 회전식 3구 프로젝터</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 6px 8px; font-weight: 700; color: #fff;">해금 레벨</td>
                            <td style="padding: 6px 8px;">기본 (Lv 1)</td>
                            <td style="padding: 6px 8px;">Lv 27</td>
                            <td style="padding: 6px 8px;">Lv 49</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 6px 8px; font-weight: 700; color: #fff;">가격 / 수량</td>
                            <td style="padding: 6px 8px;">$65 / 2개</td>
                            <td style="padding: 6px 8px;">$65 / 2개</td>
                            <td style="padding: 6px 8px;">$65 / 2개</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 6px 8px; font-weight: 700; color: #fff;">사거리</td>
                            <td style="padding: 6px 8px;">5m</td>
                            <td style="padding: 6px 8px;">2.5m</td>
                            <td style="padding: 6px 8px;">7m</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 6px 8px; font-weight: 700; color: #fff;">범위 / 형태</td>
                            <td style="padding: 6px 8px;">좁은 원뿔형 (Narrow)</td>
                            <td style="padding: 6px 8px;">구형 주변광 (Sphere Area)</td>
                            <td style="padding: 6px 8px;">넓은 원뿔형 스캔 (Wide Scan)</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 8px; font-weight: 700; color: #fff;">핵심 특징</td>
                            <td style="padding: 6px 8px;">들고 수색 / 바닥 거치 가능<br>(손전등 비활성화 시 작동 불가)</td>
                            <td style="padding: 6px 8px;">벽 / 바닥 / 천장 부착 가능<br>(중소형 방 중앙 최고 효율)</td>
                            <td style="padding: 6px 8px;">좌우 자동 회전 스캔<br>(F키로 회전 멈춤 및 소음 제어)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="dict-section-title">2. 사용법 및 작동 원리 (Usage)</div>
            <p class="dict-text">
                • <strong>배치 및 조작:</strong> 벽이나 바닥, 천장 등에 설치할 수 있으며 초록색 레이저 점 매트릭스를 방출합니다. 1티어는 손에 든 채로 켜서 비추고 다닐 수 있습니다.<br>
                • <strong>유령 감지 (D.O.T.S. 상태):</strong> 증거를 가진 유령은 주기적으로 짧은 도트 상태가 되어 플레이어 방향으로 걸어가며, 레이저 격자를 통과할 때만 초록빛 실루엣이 가시화됩니다.<br>
                • <strong>헌팅 주의사항:</strong> 전자 장비 판정이므로 <strong>1티어를 손에 든 상태로 켜두었을 때만</strong> 사냥 중 어그로를 끌어 위치를 노출시킵니다. (바닥/벽에 설치된 상태나 꺼진 상태는 안전)
            </p>

            <div class="dict-section-title">3. 팁 및 노하우 (Tips)</div>
            <p class="dict-text">
                • <strong>시야 확보 및 조명:</strong> 프로젝터 불빛은 조명 대용으로 쓸 수 있지만, 정신력 소모를 막아주지는 못합니다.<br>
                • <strong>자외선 단서 주의:</strong> 강한 초록색 불빛 때문에 문이나 스위치의 손자국(UV 지문)이 잘 안 보일 수 있습니다.<br>
                • <strong>천장 설치:</strong> 일부 맵에서는 2티어 및 3티어를 천장에 부착하여 방 전체를 넓게 커버할 수 있습니다.<br>
                • <strong>3티어 소음 제어:</strong> 모터 회전 소음이 거슬릴 때 장비를 바라보고 상호작용 키(F/E)를 누르면 회전이 멈춰 각도가 고정되고 소음이 사라집니다.<br>
                • <strong>유령 사진 판정:</strong> D.O.T.S. 실루엣으로 걸어가는 유령을 카메라로 촬영하면 일반 '유령 사진'으로 인정됩니다.<br>
                • <strong>고료(Goryo) 특수 룰:</strong> 고료는 방에 플레이어가 없어야 하며, 오직 <strong>비디오 카메라 화면을 통해서만</strong> D.O.T.S. 실루엣이 보입니다.
            </p>
        `
    },
    { 
        name: "자외선 라이트", 
        category: "증거 확인", 
        t1: "T1: 형광봉 (시간 경과 시 빛 약해짐)", 
        t2: "T2: 손전등형 UV 라이트", 
        t3: "T3: 광범위 UV 차징 랜턴" 
    },
    { 
        name: "비디오 카메라", 
        category: "증거 확인", 
        t1: "T1: 구형 흑백 비디오", 
        t2: "T2: HD 컬러 카메라", 
        t3: "T3: 고화질 스마트 노이즈 캔슬링 카메라" 
    },
    { 
        name: "스피릿 박스", 
        category: "음성 대화", 
        t1: "T1: 라디오 신호 혼선형 (노이즈 심함)", 
        t2: "T2: 스피커 탑재 오디오 박스", 
        t3: "T3: 고성능 노이즈 필터링 스피릿 박스" 
    },
    { 
        name: "향초 (정화)", 
        category: "방어/안전", 
        t1: "T1: 일반 향초 (범위 좁음)", 
        t2: "T2: 정화 향 스틱 (이동 시용)", 
        t3: "T3: 훈증용 연막 향초 (유령 정지 효과)" 
    }
];
