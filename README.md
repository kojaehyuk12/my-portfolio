# 고재혁 개발자 포트폴리오

React + Vite로 만든 개발 문서 스타일의 반응형 포트폴리오입니다. 파일 탐색 메뉴, README 소개, 기술과 기여를 중심으로 한 프로젝트 목록으로 구성했습니다. 제공된 PDF와 프로젝트 자료를 반영했으며 원본 자료는 이 폴더에 두었습니다.

## 지금 디자인 보기

**`portfolio-preview.html`을 더블클릭**하거나 `start-preview.cmd`를 실행하세요. 설치 없이 로컬 브라우저에서 열립니다. 배포 사이트와 같은 React 컴포넌트를 하나의 HTML에 묶어 프로젝트 검색·분야별 필터·상세 모달·모바일 메뉴·이메일 복사를 동일하게 제공합니다. 이미지는 `public/projects/`를 참조합니다.

디자인이나 데이터 수정 후 검토본을 다시 생성하려면 먼저 프로젝트 의존성을 설치한 뒤 실행합니다:

```powershell
npm.cmd ci
npm.cmd run preview:offline
```

## React 앱 실행

Node.js 20.19+, 22.12+ 또는 호환되는 최신 버전에서 현재 폴더를 VS Code로 열고 실행합니다. 작업 환경은 Node.js 24.11.0입니다.

```powershell
npm.cmd install
npm.cmd run dev
```

개발 서버 주소: http://127.0.0.1:5173

`start-portfolio.cmd`를 더블클릭해도 설치 후 개발 서버와 브라우저를 엽니다. 실행 창을 닫으면 서버가 종료됩니다. PowerShell 실행 정책 변경 없이 사용할 수 있도록 `npm.cmd`를 사용합니다. macOS/Linux에서는 `npm` 명령을 사용하세요.

```powershell
npm.cmd run build
npm.cmd run preview
```

빌드 결과는 `dist/`, 빌드 미리보기 주소는 http://127.0.0.1:4173 입니다. 이 로컬 주소는 다른 사람이 외부에서 접속하는 공개 주소가 아닙니다.

GitHub 저장소는 `kojaehyuk12/my-portfolio`이며 `main` 브랜치가 Vercel 프로덕션 배포에 연결되어 있습니다. `vercel.json`에서 Vite 빌드와 `dist/` 배포를 지정합니다. React 진입점인 `index.html`은 그대로 사용하고, `portfolio-preview.html`은 로컬 검토본으로 유지합니다.

**확인 상태:** 프로덕션 빌드와 오프라인 미리보기 생성이 통과했습니다. 두 빌드의 DOM 검증에서 7개 프로젝트, 분야 필터·검색·초기화, 검색 단축키, 모든 상세 모달, 포커스 복귀, 모바일 메뉴, 이메일 복사와 이미지 경로를 확인했습니다. 연결된 브라우저가 없어 화면 렌더링과 실제 모바일 배치는 시각 검증하지 못했습니다.

## 반영한 내용

- README / Projects / Stack / About / Education / Contact
- 뜀오, Last Dance, Neko Adventure, MindMaze Escape, AI 영화추천, What Happens Here, 영화 평점 비교 플랫폼
- 프로젝트 기간·역할·기술·기능·성과 및 개인 기여 설명
- 전체 / 웹 / 모바일 / 게임 필터, 프로젝트·기술 검색, 상세 모달, GitHub·Notion 링크
- 파일 탐색 사이드바, 차분한 다크 테마, 상세보기의 원본 자료, 반응형 구성
- 이메일 연락·복사, `/` 검색 단축키, 키보드 포커스·Escape 닫기·모션 감소 설정 지원

수상 내역은 데이터가 있을 때 표시합니다. 프로젝트 기간과 역할은 사용자 확인 내용을 반영했습니다. GitHub 저장소 주소가 비어 있으면 명시적으로 **GitHub 프로필**로 연결합니다. Notion 링크의 외부 공유 권한은 확인이 필요합니다. 근거와 남은 편집 항목은 [SOURCE-NOTES.md](SOURCE-NOTES.md)에 기록했습니다.

## 수정할 파일

| 파일 | 내용 |
| --- | --- |
| `src/data/portfolio.js` | 소개, 연락처, 기술, 프로젝트, 수상, 교육 |
| `src/App.jsx` | 전체 화면, 메뉴, 필터, 연락 기능 |
| `src/components/ProjectVisual.jsx` | 상세보기의 실제 화면·에셋과 설명 |
| `src/components/ProjectDialog.jsx` | 상세 모달 |
| `src/styles.css` | 다크 테마와 반응형 스타일 |
| `public/projects/` | 선별한 프로젝트 이미지 |
| `scripts/make-preview.mjs` | React 앱을 서버 없이 여는 HTML로 묶는 생성기 |

프로젝트의 `githubUrl`에 실제 저장소 주소를 넣으면 버튼이 저장소로 연결됩니다. `detailUrl`은 Notion 기록, `image`는 표지 이미지, `gallery`는 상세 이미지입니다. 개인 자료나 원본 소스 전체를 `public/`에 넣지 마세요. 해당 폴더의 모든 파일은 빌드에 포함됩니다.

디자인·데이터·동작 수정은 React 소스에 한 번만 적용하고 검토본을 다시 생성합니다. 검토본은 개발 편의를 위한 파일이며 Vercel은 `dist/`의 React 빌드를 배포합니다.

디자인 참고: [Brittany Chiang](https://brittanychiang.com/)의 정보 배치, [Paco Coursey](https://paco.me/)의 간결한 문서 구성, [satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio)의 개발 도구 모티프. 참고 사이트의 코드·문구·이미지는 가져오지 않았습니다.
