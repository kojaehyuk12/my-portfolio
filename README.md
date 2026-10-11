# 고재혁 개발자 포트폴리오

React + Vite로 만든 다크 테마의 반응형 포트폴리오입니다. 제공된 PDF와 프로젝트 자료를 반영했습니다. 프로젝트 원본 압축파일과 `포트폴리오.pdf`는 이 폴더에 두었습니다.

## 지금 디자인 보기

**`portfolio-preview.html`을 더블클릭**하거나 `start-preview.cmd`를 실행하세요. 설치 없이 로컬 브라우저에서 열립니다. 같은 프로젝트 데이터와 CSS를 사용하는 별도 정적 검토본으로, 분야별 필터·상세 모달·모바일 메뉴·이메일 복사 동작을 포함합니다.

데이터 수정 후 검토본을 다시 생성하려면:

```powershell
node scripts/make-preview.mjs
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

빌드 결과는 `dist/`, 빌드 미리보기 주소는 http://127.0.0.1:4173 입니다. 이 로컬 주소는 다른 사람이 외부에서 접속하는 공개 주소가 아닙니다. 이번 React 프로젝트는 온라인으로 배포하지 않았습니다.

**현재 환경의 제한:** 이 세션에서 패키지 다운로드가 `EACCES`로 차단되어 설치·Vite 실행·프로덕션 빌드를 검증하지 못했습니다. Chrome headless도 GPU 프로세스 오류로 종료되어 화면 렌더링과 클릭 동작의 브라우저 검증을 완료하지 못했습니다. 외부 연결이 가능한 터미널에서 위 명령으로 이어서 실행할 수 있습니다.

## 반영한 내용

- Hero / About Me / Skills / Projects / Awards / Education / Contact
- 뜀오, Last Dance, Neko Adventure, MindMaze Escape, AI 영화추천, What Happens Here, 영화 평점 비교 플랫폼
- 프로젝트 기간·역할·기술·기능·성과 및 개인 기여 설명
- 전체 / 웹 / 모바일 / 게임 필터, 상세 모달, GitHub·Notion 링크
- 라임 포인트 컬러, 프로젝트별 표지와 원본 에셋, 반응형 구성
- 이메일 연락·복사, 키보드 포커스·Escape 닫기·모션 감소 설정 지원

확인되지 않은 수상 내역, 일부 기간과 개인 역할은 정리 예정으로 표시합니다. GitHub 저장소 주소가 비어 있으면 명시적으로 **GitHub 프로필**로 연결합니다. Notion 링크의 외부 공유 권한은 확인이 필요합니다. 근거와 남은 편집 항목은 [SOURCE-NOTES.md](SOURCE-NOTES.md)에 기록했습니다.

## 수정할 파일

| 파일 | 내용 |
| --- | --- |
| `src/data/portfolio.js` | 소개, 연락처, 기술, 프로젝트, 수상, 교육 |
| `src/App.jsx` | 전체 화면, 메뉴, 필터, 연락 기능 |
| `src/components/ProjectVisual.jsx` | 프로젝트별 표지 |
| `src/components/ProjectDialog.jsx` | 상세 모달 |
| `src/styles.css` | 다크 테마와 반응형 스타일 |
| `public/projects/` | 선별한 프로젝트 이미지 |
| `scripts/make-preview.mjs` | 설치 없는 정적 검토본 생성기 |

프로젝트의 `githubUrl`에 실제 저장소 주소를 넣으면 버튼이 저장소로 연결됩니다. `detailUrl`은 Notion 기록, `image`는 표지 이미지, `gallery`는 상세 이미지입니다. 개인 자료나 원본 소스 전체를 `public/`에 넣지 마세요. 해당 폴더의 모든 파일은 빌드에 포함됩니다.

레이아웃 변경 시 React 컴포넌트와 정적 검토본 생성기에도 함께 반영해야 합니다. 데이터와 CSS 수정은 검토본 재생성으로 반영됩니다. 정적 검토본은 개발 편의를 위한 파일이며 React 앱 배포에는 필요하지 않습니다.
