# 포트폴리오 콘텐츠 근거

이 문서는 편집용 기록이며 웹페이지에 배포되지 않습니다. 사용자 제공 PDF, 압축파일의 README와 일부 핵심 소스를 참고했습니다. 원본 프로젝트를 실행하거나 원본 API를 호출하지 않았습니다.

| 프로젝트 | 확인한 근거 | 반영 내용 | 보강할 내용 |
| --- | --- | --- | --- |
| 뜀오 | 포트폴리오.pdf, runningapp/S13P11C202/README.md, Mobile의 BleManager.kt·BleDataParser.kt | 2025.07.07–08.18, FE 리드, Kotlin·Compose, 개인 회고의 BLE 선택과 권한 이슈, 프로젝트 러닝 기능 | 실제 저장소 URL, 본인 기여 상세, 측정 가능한 개선 결과 |
| Last Dance | 포트폴리오.pdf, S13P21C107/README.md의 팀 역할표·고재혁 회고, frontend/package.json, WillCreation/index.jsx, pdfGenerator.js | 2025.09–10, FE 리더, UI/UX 설계, formData 기반 단계별 입력·검증·저장, PDF 생성 | 실제 저장소 URL, 측정 가능한 개선 결과 |
| Neko Adventure | 포트폴리오.pdf | 2025.10.10–11.20, Unity·C#, 캐릭터·적 AI 담당, 고양이 로그라이크 | Unity 소스, 플레이 영상, AI 구조·기술적 문제 해결. 제공 폴더에는 로그와 실행 관련 캐시만 확인됨 |
| MindMaze Escape | README, Chapter1Chess.java, BagImageAdapter.java, Ending 클래스들, 사용자 확인 | 2024.03–06, 리더 및 프론트엔드, Java·Android·XML, 드래그 체스, 인벤토리, 챕터·엔딩, 사운드 | 프로젝트 정식명·저장소 URL |
| AI 영화추천 | movie_AI README, movie_poster_generator.js, movie_similar.js, project.js, 사용자 확인 | 2024.03–06, 리더 및 프론트엔드, JS 웹, DALL·E 3 이미지 생성, Vision 분석, TMDB 탐색·필터·예고편 | 저장소 URL |
| What Happens Here | README, FirstScreen.java, FifthScreen.java, chatbot_api.py, Spring Boot 컨트롤러, 사용자 확인 | 2024.09–12, 풀스택 리더, LibGDX HTTP 콜백·JSON 처리, Flask 힌트 API, Spring Boot 커뮤니티 | 저장소 URL |
| 영화 평점 비교 플랫폼 | final-movie README 역할표, Vue package.json, ExploreView.vue, MovieDetailView.vue, 사용자 확인 | 2025.05–06, 고재혁 Frontend, Vue3·Pinia·Router, 영화 탐색·상세·OTT | 정식명·저장소 URL, 구현 기능과 계획 기능 추가 구분 |

## 구체적인 해결 방법의 근거

- 뜀오: `BleConnectionState`와 `StateFlow`로 연결 단계를 노출하고, `BleDataParser`에서 접두어별 건강 데이터를 변환합니다. 권한 확인과 연결 종료 시 정리를 확인했습니다. 재연결 함수의 호출은 확인되지 않아 자동 재연결 성공이나 지연 감소를 주장하지 않습니다.
- Last Dance: `WillCreation`의 부모 `formData`와 단계별 key·onChange, 검증 결과에 따른 버튼 상태, 저장 성공 후 완료 화면 이동을 확인했습니다. PDF는 같은 데이터를 템플릿에 전달하고 html2canvas 이미지와 jsPDF 페이지로 구성합니다.
- MindMaze Escape: `ACTION_DROP` 좌표를 행·열로 변환하고 보드 밖 드롭을 복원합니다. `checkQueensPosition()`은 두 퀸의 지정된 정답 좌표를 검사하며, N-Queens 탐색 알고리즘으로 표현하지 않습니다. 아이템은 `ITEM_ID`와 `RESULT_OK`로 반환하고 인벤토리에서는 `convertView`를 재사용합니다.
- AI 영화추천: 이미지 생성·Vision 유사 이미지·영화 검색의 비동기 연결, 제목과 `media_type`을 합친 Map 키로 중복 제거, 로딩·실패·빈 결과 분기를 확인했습니다.
- What Happens Here: 구체적인 클라이언트 예시는 `FifthScreen`의 POST 요청과 `HttpResponseListener`에 한정합니다. Flask는 필수 입력 검증과 사전 힌트의 system 메시지 구성을 담당합니다. 다른 화면의 요청 방식까지 일관되다고 주장하거나 대화 기록을 사용자별 세션으로 표현하지 않습니다.
- 영화 평점 비교 플랫폼: `MovieDetailView.vue`의 `normalizeOttName()`, computed와 Set을 이용한 자체 DB 우선 병합, 기본 시청 링크 보완, 라우트 ID 감시를 확인했습니다.
- Neko Adventure: 구현 소스가 없어 구체적인 AI 알고리즘이나 문제 해결 사례를 추가하지 않았습니다.

위 설명은 원본 코드를 읽고 정리한 구현 구조입니다. 성능·정확도 개선 수치, 당시 겪은 장애나 선택하지 않은 대안은 근거가 없어 덧붙이지 않았습니다.

## 개인 이력

- 이름·GitHub·이메일은 제공 PDF에서 확인했습니다. 전화번호와 원본 PDF는 공개 자산에 복사하지 않았습니다.
- SSAFY 13기는 뜀오 README에서 확인했습니다. 교육 수료 여부, 전체 교육 기간, 학교·전공은 확인되지 않아 만들지 않았습니다.
- 수상 내역은 자료에서 확인되지 않아 빈 상태입니다.
- 프로젝트별 저장소 주소는 확인되지 않아 `githubUrl`을 비웠습니다. 현재 GitHub 버튼은 `GitHub 프로필`이라는 라벨로 사용자의 계정에 연결됩니다.
- Notion 링크는 PDF 또는 프로젝트 README에서 옮겼으며, 외부 공유 권한과 현재 접근 가능 여부는 검증하지 못했습니다.
- 자기소개와 제목은 확인된 경험을 바탕으로 작성한 제안 문안입니다. 근거 없는 수치 성과, 상용 운영 실적, 서비스의 법적 효력은 주장하지 않습니다.
- 상세보기의 `기여 범위`에서 개인 담당 내용과 팀 전체 기능을 구분합니다. 자료가 부족한 프로젝트의 설계 설명은 소스 구조를 정리한 것이며, 개인의 실제 회고로 단정하지 않습니다.

## 공개 자산

- `public/projects/lastdance.png`: README의 `img/유언장 작성-2.png`. 입력 전 자산 등록 화면.
- `public/projects/mindmaze.png`: 게임의 `drawable-v24/chapter1_background.png`. 게임 배경 에셋이며 실행 캡처가 아님.
- `public/projects/what-happens.jpg`: 웹 프로젝트의 `static/images/whathappen.jpg`. 타이틀 이미지.
- `public/projects/movie-wireframe.png`: `요구사항명세서/화면 정의서.png`. 설계 자료이며 완성 화면이 아님.
- 프로젝트 목록은 텍스트와 기술·역할을 중심으로 표시합니다. 기존 장식용 표지는 제거하고 상세보기에는 출처를 확인한 화면과 에셋만 표시합니다.
- 뜀오의 전체 AppView 이미지는 프로필·건강 데이터 화면이 섞여 있어 공개 자산에 포함하지 않았습니다.
- AI 영화추천 zip의 image1/image2는 추천 결과 화면이 아니므로 해당 프로젝트의 화면으로 사용하지 않았습니다.
- 원본 프로젝트의 JavaScript, 환경 파일, API 키, 로그는 웹사이트에 복사하지 않았습니다. 공개 폴더에는 선별한 이미지와 favicon만 있습니다.

## 확인 상태

- 배포본·오프라인 검토본의 프로젝트 목록, 검색·필터, 상세 모달, 키보드 단축키, 메뉴·이메일 복사를 DOM 환경에서 검증했습니다. 이미지 파일과 오프라인 참조 경로도 확인했습니다.
- npm 의존성 설치와 React 프로덕션 빌드를 완료했습니다.
- 이번 수정의 데스크톱·모바일 렌더링 및 클릭 동작은 브라우저에서 검증하지 못했습니다.
- `portfolio-preview.html`은 배포 사이트와 같은 React 컴포넌트·CSS·데이터를 포함하는 단일 HTML 빌드입니다. 파일에서 열 수 있도록 이미지 주소만 `./public/projects/`로 변경합니다.
