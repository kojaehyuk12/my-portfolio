# 포트폴리오 콘텐츠 근거

이 문서는 편집용 기록이며 웹페이지에 배포되지 않습니다. 사용자 제공 PDF, 압축파일의 README와 일부 핵심 소스를 참고했습니다. 원본 프로젝트를 실행하거나 원본 API를 호출하지 않았습니다.

| 프로젝트 | 확인한 근거 | 반영 내용 | 보강할 내용 |
| --- | --- | --- | --- |
| 뜀오 | 포트폴리오.pdf, runningapp/S13P11C202/README.md, Mobile의 BleManager.kt·BleDataParser.kt | 2025.07.07–08.18, FE 리드, Kotlin·Compose, 개인 회고의 BLE 선택과 권한 이슈, 프로젝트 러닝 기능 | 실제 저장소 URL, 본인 기여 상세, 측정 가능한 개선 결과 |
| Last Dance | 포트폴리오.pdf, S13P21C107/README.md의 팀 역할표·고재혁 회고, frontend/package.json | 2025.09–10, FE 리더, 전반 UI/UX 설계, 단계별 유언 작성·예약, PDF·엑셀 연동 | 실제 저장소 URL, 세부 구현 코드와 회고 보강 |
| Neko Adventure | 포트폴리오.pdf | 2025.10.10–11.20, Unity·C#, 캐릭터·적 AI 담당, 고양이 로그라이크 | Unity 소스, 플레이 영상, AI 구조·기술적 문제 해결. 제공 폴더에는 로그와 실행 관련 캐시만 확인됨 |
| MindMaze Escape | README, Chapter1Chess.java, BagImageAdapter.java, Ending 클래스들 | Java·Android·XML, 드래그 체스, 인벤토리, 챕터·엔딩, 사운드 | 정확한 개발 기간·개인 역할·프로젝트 정식명·저장소 URL |
| AI 영화추천 | movie_AI README, movie_poster_generator.js, movie_similar.js, project.js | JS 웹, DALL·E 3 이미지 생성, Vision 분석, TMDB 탐색·필터·예고편 | 기간·개인 역할·저장소 URL |
| What Happens Here | README, FirstScreen.java, chatbot_api.py, Spring Boot 컨트롤러 | LibGDX 게임, AI 대화, Spring Boot 커뮤니티 | 기간·개인 역할·저장소 URL |
| 영화 평점 비교 플랫폼 | final-movie README 역할표, Vue package.json, ExploreView.vue, MovieDetailView.vue | 고재혁 Frontend, Vue3·Pinia·Router, 영화 탐색·상세·OTT | 기간·정식명·저장소 URL, 구현 기능과 계획 기능 추가 구분 |

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
- 나머지 표지는 포트폴리오용 CSS·SVG 그래픽으로, 실제 화면 캡처로 표시하지 않습니다.
- 뜀오의 전체 AppView 이미지는 프로필·건강 데이터 화면이 섞여 있어 공개 자산에 포함하지 않았습니다.
- AI 영화추천 zip의 image1/image2는 추천 결과 화면이 아니므로 해당 프로젝트의 화면으로 사용하지 않았습니다.
- 원본 프로젝트의 JavaScript, 환경 파일, API 키, 로그는 웹사이트에 복사하지 않았습니다. 공개 폴더에는 선별한 이미지와 favicon만 있습니다.

## 확인 상태

- 데이터·설정·오프라인 생성 스크립트는 Node 구문 검사와 로컬 자산 연결 검사 대상입니다.
- npm 설치는 이 세션의 네트워크 EACCES로 실패했습니다. React 개발 서버·빌드를 검증하지 못했습니다.
- Chrome headless는 GPU 프로세스 오류로 종료되어 데스크톱·모바일 렌더링 및 클릭 동작을 브라우저에서 검증하지 못했습니다.
- `portfolio-preview.html`은 같은 프로젝트 데이터와 CSS를 사용하는 별도의 정적 검토본입니다. React 런타임이나 Vite 빌드 결과물은 아닙니다.
