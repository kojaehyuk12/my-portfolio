// 원본 소스에서 확인한 구현 흐름. 근거와 해석 범위는 SOURCE-NOTES.md 참고.
export const caseStudies = {
  tteumo: {
    focus: 'BLE 연결 상태 분리 · 건강 데이터 파싱',
    architecture: {
      title: '워치 연결과 데이터 변환을 나눈 모바일 구조',
      description: 'BLE 연동 중 확인한 두 가지 흐름입니다. 연결 상태와 수신 데이터를 분리하고, 러닝 기록에 사용할 데이터 형태로 변환합니다.',
      flows: [
        { label: '연결 상태', nodes: [
          { name: 'Android BLE', detail: '워치 연결 · GATT 이벤트', type: 'external', next: '콜백' },
          { name: 'BleManager', detail: '권한 확인 · 연결 단계 갱신', type: 'owned', next: '상태 노출' },
          { name: 'StateFlow', detail: '연결 중 · 탐색 · 연결 · 오류', type: 'owned' },
        ] },
        { label: '건강 데이터', nodes: [
          { name: '워치 데이터', detail: 'HR · STEPS · CAD 문자열', type: 'external', next: '파싱' },
          { name: 'BleDataParser', detail: '숫자 변환 + GPS 거리·페이스', type: 'owned', next: '모델 변환' },
          { name: 'HealthData', detail: '심박수 · 걸음 수 · 러닝 정보', type: 'owned' },
        ] },
      ],
      note: '프론트엔드의 BLE 연동 범위입니다. 전체 러닝 서비스의 서버 구조는 생략했습니다.',
    },
    issues: [
      {
        title: '연결 여부 하나로 표현하기 어려운 BLE 상태 관리',
        problem: '워치 연결 과정에는 연결 시도, 서비스 탐색, 연결 완료와 오류가 있습니다. 연결 여부만으로는 데이터가 아직 준비되지 않은 상태와 연결 실패를 구분하기 어렵습니다.',
        decision: '연결 단계의 표현을 통신 콜백에 모으고, 외부에는 읽을 수 있는 상태를 노출하는 구조를 사용했습니다. 문자열 데이터의 수신 상태와 연결 상태도 별도로 관리했습니다.',
        solution: 'BleConnectionState를 sealed class로 정의하고 GATT 콜백에서 MutableStateFlow를 갱신했습니다. 연결 전 Bluetooth 권한을 검사하고, 연결 종료 시 상태 변경과 cleanupConnection()으로 자원을 정리했습니다.',
        result: '연결 단계와 오류를 구분해서 참조할 수 있는 상태 구조를 구현했습니다. 자동 재연결의 실제 동작까지 확인된 것은 아니므로 복구 성공률은 성과에 포함하지 않았습니다.',
        code: ['BleConnectionState', 'MutableStateFlow', 'cleanupConnection()'],
      },
      {
        title: '워치 문자열과 GPS 값을 하나의 건강 데이터로 변환',
        problem: '워치는 심박수·걸음 수·케이던스를 문자열로 전달하고, 거리와 페이스는 GPS에서 계산합니다. 출처와 형식이 다른 값을 러닝 화면에서 함께 사용해야 했습니다.',
        decision: '통신 코드와 데이터 변환을 분리했습니다. 화면에서 문자열 규칙을 직접 다루지 않도록, 전용 파서가 HealthData를 만드는 역할을 맡게 했습니다.',
        solution: '쉼표로 나눈 문자열에서 HR·STEPS·CAD 접두어를 찾아 toIntOrNull()로 숫자를 읽었습니다. 변환할 수 없는 항목은 0으로 처리하고, 전달받은 GPS 거리·페이스를 합쳐 HealthData를 반환했습니다.',
        result: '서로 다른 입력을 공통 데이터 모델로 변환했습니다. 다만 0으로 대체한 값과 실제 측정값 0은 구분되지 않으므로, 유효성 상태를 별도로 표현하는 개선 여지는 남습니다.',
        code: ['BleDataParser.parseHealthData()', 'toIntOrNull()', 'HealthData'],
      },
    ],
  },
  'last-dance': {
    focus: '단계별 입력 유지 · 검증·저장 분리 · PDF 출력',
    architecture: {
      title: '하나의 폼 상태를 입력·저장·문서 출력에 연결',
      description: 'React 프론트엔드의 유언 작성 영역입니다. 부모 컴포넌트에 모인 입력 상태를 기준으로 검증, 서버 저장, PDF 출력을 연결합니다.',
      flows: [
        { label: '입력과 저장', nodes: [
          { name: '단계별 입력 폼', detail: 'data 전달 · onChange 갱신', type: 'owned', next: '입력 갱신' },
          { name: 'WillCreation', detail: 'formData · 검증 · saveWill()', type: 'owned', next: '저장 요청', bidirectional: true },
          { name: '유언 저장 API', detail: '팀 백엔드 · 저장 결과 반환', type: 'external' },
        ] },
        { label: '문서 출력', nodes: [
          { name: 'formData', detail: '단계별 입력의 공통 상태', type: 'owned', next: '데이터 전달' },
          { name: 'WillPDFTemplate', detail: '문서용 HTML · html2canvas', type: 'owned', next: '이미지 배치' },
          { name: 'jsPDF 출력', detail: 'A4 배치 · 추가 페이지 · 저장', type: 'owned' },
        ] },
      ],
      note: 'UI/UX·폼·문서 출력 담당 범위입니다. 화상 통신·블록체인 등 팀 전체 기능과 구분했습니다.',
    },
    issues: [
      {
        title: '단계를 이동해도 입력값을 유지하는 폼 상태 설계',
        problem: '개인정보·자산 등 여섯 단계의 입력 폼을 전환하면서 이전 입력을 유지하고, 각 단계의 검증 결과에 따라 다음 행동을 제어해야 했습니다.',
        decision: '화면별로 흩어질 수 있는 입력 상태를 부모의 formData에 모았습니다. 자식은 해당 단계의 데이터와 변경 함수만 받아, 화면 전환과 데이터 보관의 책임을 나눴습니다.',
        solution: 'currentStepData.key로 현재 폼의 data를 전달하고 onChange에서 해당 key만 갱신했습니다. FormValidation의 결과는 isValid로 받아 다음 버튼에 연결하고, 개인정보 필수값은 handleNext()에서도 확인했습니다.',
        result: '현재 단계의 폼을 바꿔도 부모 상태에 입력이 남는 구조를 구현했습니다. 입력 상태와 단계 이동 조건을 함께 관리하며 여섯 단계의 작성 흐름을 구성했습니다.',
        code: ['formData[currentStepData.key]', 'handleFormChange()', 'FormValidation'],
      },
      {
        title: '작성 완료·저장 성공·PDF 생성을 구분한 처리',
        problem: '마지막 단계에 도달한 것과 서버에 저장된 것은 서로 다른 상태입니다. 입력한 내용이 PDF에도 같은 데이터로 반영되어야 했습니다.',
        decision: '완료 화면은 저장 결과를 확인한 뒤 보여주고, 저장과 문서 출력은 같은 formData를 입력으로 사용했습니다. 입력 데이터와 PDF 화면을 별도로 복제해 관리하지 않도록 했습니다.',
        solution: '마지막 작성 단계에서 saveWill(formData, currentWillId)를 호출하고 result.success일 때 완료 단계로 이동했습니다. PDF 템플릿에는 같은 formData를 전달하고, html2canvas로 만든 이미지를 jsPDF의 A4 페이지에 배치했습니다. 긴 내용은 추가 페이지로 출력했습니다.',
        result: '저장 성공에 따른 완료 처리와 입력 데이터 기반 PDF 다운로드를 연결했습니다. PDF는 이미지 기반이므로 텍스트 선택과 문단 단위 페이지 나눔은 이 방식의 한계로 남습니다.',
        code: ['saveWill()', 'WillPDFTemplate', 'html2canvas → jsPDF'],
      },
    ],
  },
  mindmaze: {
    focus: '드래그 좌표 판정 · Activity 간 아이템 전달',
    architecture: {
      title: '조작·퍼즐 판정·아이템 반환의 역할 분리',
      description: 'Android 네이티브 UI에서 드롭 좌표를 보드 위치로 바꾸고, 퍼즐 완료 결과를 아이템 전달 흐름으로 연결했습니다.',
      flows: [
        { label: '퍼즐 처리', nodes: [
          { name: 'Android DragEvent', detail: '사용자의 드롭 위치', type: 'external', next: 'ACTION_DROP' },
          { name: 'Chapter1Chess', detail: '영역 검사 · 행·열 계산', type: 'owned', next: '정답 검사' },
          { name: '퀸 배치 판정', detail: '지정 좌표 비교 · 보상 표시', type: 'owned' },
        ] },
        { label: '아이템 전달', nodes: [
          { name: '보상 버튼', detail: '획득한 아이템 선택', type: 'owned', next: '결과 반환' },
          { name: 'Activity 결과', detail: 'Intent ITEM_ID · RESULT_OK', type: 'owned', next: '목록 표시' },
          { name: '인벤토리', detail: 'BagImageAdapter · 뷰 재사용', type: 'owned' },
        ] },
      ],
      note: '퍼즐 판정은 두 퀸의 정해진 위치를 비교합니다. 일반적인 N-Queens 풀이 알고리즘은 아닙니다.',
    },
    issues: [
      {
        title: '자유로운 드래그 좌표를 유효한 보드 위치로 변환',
        problem: '사용자는 말을 칸 중앙뿐 아니라 경계나 보드 밖에도 놓을 수 있습니다. 드롭 위치를 그대로 쓰면 표시 위치와 퍼즐 판정 기준이 달라질 수 있습니다.',
        decision: '화면상의 좌표를 먼저 보드의 행·열로 변환하고, 판정도 같은 좌표 체계를 사용하도록 구성했습니다. 보드 밖 드롭은 별도 복원 경로로 처리했습니다.',
        solution: 'ACTION_DROP에서 체스판의 영역을 검사하고 셀 너비·높이로 행과 열을 계산했습니다. 유효한 위치는 칸에 맞춰 배치하고, 보드 밖이면 저장해 둔 초기 위치로 되돌렸습니다.',
        result: '자유로운 드래그 입력을 칸 단위의 조작으로 바꿨습니다. 지정된 두 퀸의 좌표를 checkQueensPosition()에서 비교해 보상 표시로 연결했습니다.',
        code: ['DragEvent.ACTION_DROP', '행·열 좌표 변환', 'checkQueensPosition()'],
      },
      {
        title: '퍼즐 화면의 완료 결과를 인벤토리로 전달',
        problem: '퍼즐 화면에서 얻은 보상을 다른 화면의 아이템 목록과 연결해야 했습니다. 퍼즐 판정과 인벤토리 표시가 서로 다른 역할로 동작할 필요가 있었습니다.',
        decision: '퍼즐은 획득한 아이템의 식별값을 결과로 반환하고, 목록 표시는 어댑터가 담당하는 구조를 사용했습니다.',
        solution: '정답 후 보상 버튼에서 Intent에 ITEM_ID를 넣고 RESULT_OK로 반환했습니다. BagImageAdapter에서는 이미지 목록을 표시하고 convertView가 있으면 기존 ImageView를 재사용했습니다.',
        result: '정답 판정 → 아이템 결과 반환 → 목록 표시로 이어지는 흐름을 구성했습니다. 뷰 재사용은 구현 사실이며, 메모리나 프레임 개선 수치를 측정한 결과는 아닙니다.',
        code: ['Intent · ITEM_ID', 'setResult(RESULT_OK)', 'BagImageAdapter.getView()'],
      },
    ],
  },
  'ai-movies': {
    focus: '이미지 기반 API 연결 · 추천 결과 중복 제거',
    architecture: {
      title: '생성 이미지에서 실제 영화 목록으로 이어지는 흐름',
      description: 'JavaScript 프론트엔드에서 이미지 생성·분석·영화 검색의 결과를 이어 붙이고, 중복을 정리한 목록을 표시합니다.',
      flows: [
        { label: '포스터 생성', nodes: [
          { name: '프롬프트 입력', detail: 'JavaScript 요청·로딩 UI', type: 'owned', next: '생성 요청' },
          { name: 'DALL·E 3', detail: '외부 이미지 생성 API', type: 'external', next: '이미지 URL' },
          { name: '포스터 처리', detail: '생성 결과를 분석 입력으로 전달', type: 'owned' },
        ] },
        { label: '분석과 탐색', nodes: [
          { name: 'Cloud Vision', detail: '유사 이미지 · 이미지 분석', type: 'external', next: '분석 결과' },
          { name: '검색·결과 병합', detail: 'async/await · Map 중복 제거', type: 'owned', next: '작품 조회', bidirectional: true },
          { name: 'TMDB API', detail: '영화·TV 메타데이터', type: 'external' },
        ] },
      ],
      note: '이미지 생성 → Vision 분석 → TMDB 탐색 순서입니다. 최종 목록은 프론트엔드의 Map 병합 결과를 사용합니다.',
    },
    issues: [
      {
        title: '생성된 이미지를 실제 작품 검색의 입력으로 연결',
        problem: 'AI가 생성한 포스터에는 실제 영화의 식별자가 없습니다. 생성 결과만으로 상세 정보와 예고편을 제공할 수 없어 실제 작품 데이터로 연결할 과정이 필요했습니다.',
        decision: '생성·이미지 분석·영화 검색을 서로 다른 단계로 나눴습니다. 앞 단계의 출력을 다음 단계의 입력으로 사용하고, 사용자가 기다리는 동안에는 요청 상태를 표시했습니다.',
        solution: '생성 이미지를 Cloud Vision에 전달해 visuallySimilarImages를 얻고, 이미지별 분석과 영화 조회를 async/await로 연결했습니다. 로딩, API 실패, 빈 결과를 각각 처리하는 화면 분기를 두었습니다.',
        result: '문장 입력에서 시작해 이미지와 관련된 실제 영화 정보를 탐색하는 흐름을 구현했습니다. 여러 외부 요청을 이어 수행하므로 응답 시간과 추천 적합성은 별도의 측정이 필요합니다.',
        code: ['generateDrawing()', 'visuallySimilarImages', 'getPostersFromImages()'],
      },
      {
        title: '여러 이미지 검색에서 반복되는 영화 결과 정리',
        problem: '서로 다른 유사 이미지에서 같은 작품이 다시 검색될 수 있습니다. 결과를 그대로 합치면 같은 항목이 목록에 반복될 수 있습니다.',
        decision: '영화와 TV의 구분을 유지하면서 결과를 묶기 위해 제목과 media_type을 중복 비교의 키로 사용했습니다.',
        solution: '조회한 작품마다 title-media_type 키를 만들고 Map에 이미 있는지 확인했습니다. 없는 키만 저장하고 마지막에 Map.values()를 배열로 바꿔 필터와 결과 화면에 전달했습니다.',
        result: '같은 제목·콘텐츠 유형의 중복 항목을 한 번만 표시하도록 구현했습니다. 같은 제목과 유형을 가진 별개의 작품은 합쳐질 수 있어, 작품 ID를 이용하는 개선 여지가 있습니다.',
        code: ['Map', 'title + media_type', 'Array.from(postersMap.values())'],
      },
    ],
  },
  'what-happens-here': {
    focus: '게임·AI API 연동 · 응답과 통신 오류 분리',
    architecture: {
      title: '게임의 대화 UI와 힌트 생성 서버의 분리',
      description: 'LibGDX는 요청과 채팅 표시를, Python 서버는 입력 검증과 힌트 문맥·모델 호출을 담당합니다.',
      flows: [
        { label: '힌트 요청', nodes: [
          { name: 'LibGDX 클라이언트', detail: 'FifthScreen · user_input', type: 'owned', next: 'POST /chat' },
          { name: 'Flask API', detail: '입력 검증 · 사전 힌트 구성', type: 'owned', next: '문맥 전달' },
          { name: 'AI 모델 API', detail: '외부 응답 생성', type: 'external' },
        ] },
        { label: '응답 처리', nodes: [
          { name: 'HTTP 응답', detail: '정상 JSON · 오류 · 실패', type: 'owned', next: '콜백' },
          { name: 'HttpResponseListener', detail: '상태 코드 분기 · JSON 파싱', type: 'owned', next: '메시지 표시' },
          { name: '게임 채팅 UI', detail: '힌트 또는 통신 오류 안내', type: 'owned' },
        ] },
      ],
      note: 'FifthScreen과 chatbot_api.py에서 확인한 AI 힌트 경로입니다. Spring Boot 웹 커뮤니티는 별도 기능입니다.',
    },
    issues: [
      {
        title: '게임 화면과 AI 힌트 생성의 책임 분리',
        problem: '게임 안에서 사용자가 입력한 질문을 전달하고, 게임의 힌트 문맥에 맞는 답변을 받아야 했습니다. 입력 검증과 모델 호출을 담당할 경계가 필요했습니다.',
        decision: '게임은 JSON 요청과 메시지 표시를 맡고, 서버는 필수 입력 검증과 힌트 목록을 이용한 응답 생성을 맡도록 나눴습니다.',
        solution: 'FifthScreen에서 user_input을 담아 /chat으로 POST 요청했습니다. Flask는 입력이 없으면 400을 반환하고, 사전 정의한 힌트 목록을 system 메시지로 구성해 generate_response()에서 모델을 호출했습니다.',
        result: '게임의 대화 UI와 힌트 생성 API를 연결했습니다. 서버의 대화 문맥은 전역 변수 기반이므로 사용자별 대화 격리는 추가 설계가 필요한 부분입니다.',
        code: ['POST /chat', 'user_input', 'generate_response()'],
      },
      {
        title: '응답 수신과 정상적인 답변 표시를 구분',
        problem: 'HTTP 응답이 도착해도 서버 오류일 수 있고, 네트워크 문제로 요청 자체가 실패할 수도 있습니다. 두 경우 모두 정상 답변처럼 처리할 수는 없습니다.',
        decision: '응답의 상태 코드와 네트워크 실패 콜백을 구분했습니다. 사용자가 답변을 받지 못했을 때 요청 실패인지 판단할 수 있도록 별도 안내를 두었습니다.',
        solution: 'Gdx.net.sendHttpRequest()의 HttpResponseListener에서 상태 코드가 200이면 JSON을 ChatResponse로 변환했습니다. 다른 상태 코드는 오류 메시지로 처리하고, failed()에서는 네트워크 확인 메시지를 표시했습니다.',
        result: '정상 답변, 서버 오류, 네트워크 실패의 표시 경로를 분리했습니다. 확인한 범위는 FifthScreen의 처리이며 모든 게임 화면의 오류 처리가 동일하다는 의미는 아닙니다.',
        code: ['Gdx.net.sendHttpRequest()', 'handleHttpResponse()', 'failed()'],
      },
    ],
  },
  'film-ratings': {
    focus: 'OTT 표기 정규화 · 중복 병합 · 라우트 기반 갱신',
    architecture: {
      title: '두 데이터 출처를 상세 화면의 공통 목록으로 변환',
      description: 'Vue 상세 화면에서 자체 DB와 TMDB 데이터를 받아, 플랫폼 이름과 표시 규칙을 통일합니다. DB는 프론트엔드가 연동하는 API 뒤의 저장소입니다.',
      flows: [
        { label: '데이터 요청', nodes: [
          { name: 'Vue Router', detail: 'route.params.id 변경 감시', type: 'owned', next: '상세 조회' },
          { name: 'MovieDetailView', detail: '출처별 데이터·로딩 상태 관리', type: 'owned', next: 'HTTP', bidirectional: true },
          { name: '상세 정보 API', detail: '팀 DB API · 외부 TMDB', type: 'external' },
        ] },
        { label: 'OTT 표시', nodes: [
          { name: '플랫폼 이름 정규화', detail: '표기를 공통 키로 매핑', type: 'owned', next: '중복 비교' },
          { name: 'computed + Set', detail: '자체 DB 우선 · 없는 항목 추가', type: 'owned', next: '목록 변환' },
          { name: 'OTT 목록', detail: '로고 · 시청 링크 · 기본 링크', type: 'owned' },
        ] },
      ],
      note: '프론트엔드의 상세 조회와 데이터 병합 범위입니다. 백엔드·DB 구현을 개인 담당으로 표시하지 않았습니다.',
    },
    issues: [
      {
        title: '출처마다 다른 OTT 이름과 중복 항목 처리',
        problem: '자체 DB와 TMDB의 플랫폼 이름 표기가 다를 수 있고, 같은 OTT가 두 응답에 모두 들어올 수 있습니다. 단순 병합으로는 중복과 링크 누락을 해결하기 어렵습니다.',
        decision: '표시 이름 대신 정규화한 키로 같은 플랫폼인지 판단했습니다. 자체 DB를 우선하는 순서를 정하고, TMDB로 부족한 항목을 보완했습니다.',
        solution: 'normalizeOttName()에서 소문자 변환·특수문자 제거·키 매핑을 수행했습니다. computed에서 자체 DB 목록을 먼저 추가한 뒤 Set에 없는 TMDB 항목만 합쳤습니다. 시청 URL이 없으면 플랫폼 기본 링크를 사용했습니다.',
        result: '출처가 다른 OTT 정보를 중복 없는 목록으로 구성했습니다. 기본 링크는 플랫폼으로 이동하는 대안이며, 해당 작품의 개별 재생 페이지까지 보장하지는 않습니다.',
        code: ['normalizeOttName()', 'computed()', 'Set'],
      },
      {
        title: '같은 상세 컴포넌트에서 영화 변경에 따라 데이터 갱신',
        problem: '상세 화면의 컴포넌트가 유지된 채 URL의 영화 ID만 바뀔 수 있습니다. 처음 마운트될 때만 조회하면 새 영화로 화면을 갱신할 수 없습니다.',
        decision: '마운트 시 조회와 라우트 ID 변경 시 조회를 함께 처리했습니다. 두 데이터 출처의 요청 상태는 별도로 관리했습니다.',
        solution: 'watch(() => route.params.id)에서 변경된 ID로 loadAllMovieDetail()을 호출했습니다. TMDB·자체 DB의 데이터, 로딩, 오류 상태를 나누고 요청 종료 시 finally에서 로딩을 해제했습니다.',
        result: '상세 화면을 재사용하면서 선택한 영화의 데이터를 다시 불러오도록 구현했습니다. 빠른 연속 이동 시 이전 요청을 취소하는 처리까지 확인한 것은 아닙니다.',
        code: ['watch(() => route.params.id)', 'loadAllMovieDetail()', 'finally'],
      },
    ],
  },
};
