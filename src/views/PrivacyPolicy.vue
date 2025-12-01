<template>
  <AppHeader />

  <div class="privacy-policy-container">
    <div class="privacy-policy-content">
      <h1>메랜유틸 개인정보처리방침</h1>
      <p class="meta">시행일: 2025-11-28</p>
      <p class="meta-note">
        본 방침은 행정안전부 「개인정보 처리방침 작성지침(2025)」에 따라 작성되었습니다.
      </p>

      <!-- 제1조 -->
      <section>
        <h2>제1조(개인정보의 처리 목적)</h2>
        <p>
          메랜유틸(이하 '서비스')은 다음의 목적을 위하여 개인정보를 처리합니다. 처리된 개인정보는 다음의 목적 이외에는 이용되지 않으며,
          이용 목적 변경 시 개인정보보호법 등 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.
        </p>
        <ol>
          <li><strong>회원 식별 및 로그인 제공</strong> — Discord OAuth2 인증을 통한 사용자 식별 및 로그인 기능 제공</li>
          <li><strong>맞춤형 콘텐츠 및 기능 제공</strong> — 사용자가 업로드한 게임 스크린샷 분석을 통해 개인별 타이머·통계·기능 제공</li>
          <li><strong>서비스 이용 통계 및 개선</strong> — 서비스 품질 향상 및 기능 고도화를 위한 통계분석</li>
          <li><strong>AI 모델 학습</strong> — 업로드된 스크린샷은 AI 모델 학습 데이터로 활용될 수 있으며, 학습 완료 후 파기됩니다</li>
          <li><strong>아이템 알림 제공</strong> - Discord DM을 통한 관심 아이템 등록 감지 및 알림 제공</li>
          <li><strong>파티 매칭 서비스 제공</strong> - 게임 닉네임·직업·레벨·포지션 등을 활용한 파티 매칭 서비스 제공</li>
        </ol>
      </section>

      <!-- 제2조 -->
      <section>
        <h2>제2조(처리하는 개인정보의 항목)</h2>
        <p>서비스는 서비스 제공을 위해 아래 개인정보 항목을 처리합니다.</p>
        <dl>
          <dt>1. 회원 가입·로그인 관련</dt>
          <dd>Discord 고유 ID, Discord Username, Discord Avatar URL</dd>

          <dt>2. 이용자가 제공하는 정보</dt>
          <dd>사용자가 업로드한 게임 스크린샷 이미지 파일</dd>

          <dt>3. 자동으로 수집되는 정보</dt>
          <dd>접속 기록, 요청 로그 등(로컬 Loki에 저장), Cloudflare 경유 시 생성되는 네트워크 메타데이터(접속 IP, User-Agent 등)</dd>
        </dl>
      </section>

      <!-- 제3조 -->
      <section>
        <h2>제3조(개인정보의 처리 및 보유 기간)</h2>
        <p>서비스는 개인정보 보유기간을 명확히 정하여 처리·보유하며, 보유기간 경과 또는 처리 목적 달성 시 지체 없이 파기합니다.</p>
        <table>
          <thead>
          <tr>
            <th>구분</th>
            <th>보유 항목</th>
            <th>보유 및 이용기간</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Discord 사용자 정보</td>
            <td>Discord ID, Username, Avatar URL</td>
            <td>회원 탈퇴 시 즉시 삭제</td>
          </tr>
          <tr>
            <td>관심 아이템 정보</td>
            <td>알림이 등록 아이템</td>
            <td>사용자가 삭제 시 즉시 삭제(알림 내역은 별도 보관하지 않음)</td>
          </tr>
          <tr>
            <td>파티 관련 정보</td>
            <td>파티 설명, 포지션 정보</td>
            <td>파티 삭제 시 즉시 삭제</td>
          </tr>
          <tr>
            <td>업로드 스크린샷</td>
            <td>이미지 파일</td>
            <td>AI 학습 후 즉시 삭제</td>
          </tr>
          <tr>
            <td>서비스 로그</td>
            <td>접속/요청 로그 (Loki)</td>
            <td>별도 보관기간 미설정(서버 환경에 따라 순차 삭제)</td>
          </tr>


          </tbody>
        </table>
      </section>

      <!-- 제4조 -->
      <section>
        <h2>제4조(개인정보의 제3자 제공)</h2>
        <p>서비스는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다. 다만 아래의 서비스 제공을 위해 필요한 경우 해당 정보는 제3자에게 제공될 수 있습니다.</p>
        <table>
          <thead>
          <tr>
            <th>제공받는 자</th>
            <th>제공 항목</th>
            <th>제공 목적</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Discord Inc.</td>
            <td>Discord 사용자 인증 관련 정보 및 알림</td>
            <td>OAuth2 인증을 통한 로그인 및 사용자 식별 및 DM을 활용한 알림발송</td>
          </tr>
          <tr>
            <td>Cloudflare, Inc.</td>
            <td>접속 IP, User-Agent 등 네트워크 메타데이터</td>
            <td>CDN·보안(웹방화벽, DDoS 보호) 및 트래픽 최적화</td>
          </tr>
          <tr>
            <td>Google LLC (도입 예정)</td>
            <td>쿠키 기반 비식별 통계정보</td>
            <td>서비스 이용 통계 분석</td>
          </tr>
          </tbody>
        </table>
        <p class="note">※ Discord·Cloudflare 경유는 작성지침상 '국외 이전'에 해당하지 않음을 반영하여 작성하였습니다.</p>
      </section>

      <!-- 제5조 -->
      <section>
        <h2>제5조(개인정보 처리의 위탁)</h2>
        <p>
          현재 서비스는 개인정보 처리 업무를 외부에 위탁하고 있지 않습니다. 향후 위탁 발생 시 개인정보보호법 제26조에 따라
          위탁업무, 수탁자 및 위탁내용을 본 방침에 명시하고 수탁자와 적절한 개인정보 처리 위탁계약을 체결하겠습니다.
        </p>
      </section>

      <!-- 제6조 -->
      <section>
        <h2>제6조(개인정보의 파기 절차 및 방법)</h2>
        <ol>
          <li>
            <strong>파기절차</strong> — 개인정보 보유기간의 경과, 처리목적 달성 등 파기 사유 발생 시 내부 절차에 따라 선정·확인 후 파기합니다.
          </li>
          <li>
            <strong>파기방법</strong>
            <ul>
              <li>전자적 파일 형태: 복구 불가능한 방법(영구 삭제)으로 파기</li>
              <li>이미지 파일(스크린샷): AI 학습 완료 후 자동 삭제 프로세스로 영구 삭제</li>
              <li>로그 데이터: 시스템 정책에 따라 순차 삭제</li>
              <li>관심 아이템 정보는 사용자가 삭제 시 즉시 파기</li>
              <li>파티 매칭 정보는 파티 삭제 시 즉시 파기</li>
            </ul>
          </li>
        </ol>
      </section>

      <!-- 제7조 -->
      <section>
        <h2>제7조(정보주체의 권리·의무 및 행사방법)</h2>
        <p>정보주체는 개인정보보호법에 따라 다음의 권리를 행사할 수 있습니다.</p>
        <ul>
          <li>개인정보 열람 요구</li>
          <li>오류 정정 요구</li>
          <li>삭제 요구</li>
          <li>처리정지 요구</li>
        </ul>
        <p>
          권리 행사는 이메일로 가능하며, 요구 시 본인 확인을 위한 최소한의 정보 제출을 요청할 수 있습니다.
          요청 접수 후 법령이 정한 기간 내에 처리하겠습니다.
        </p>
      </section>

      <!-- 제8조 -->
      <section>
        <h2>제8조(개인정보의 안전성 확보조치)</h2>
        <p>서비스는 개인정보의 안전성 확보를 위해 다음과 같은 기술적·관리적·물리적 조치를 이행하고 있습니다.</p>
        <ul>
          <li>접근 통제: 데이터베이스(PostgreSQL), 객체저장(MinIO), 로그(Loki)에 대한 접근 권한 최소화 및 인증 적용</li>
          <li>물리적 보안: 개인정보 저장 장치가 위치한 서버(사용자 소유 PC)에 대한 물리적 접근 통제</li>
          <li>네트워크 보안: Cloudflare를 통한 WAF, DDoS 보호 및 트래픽 필터링</li>
          <li>데이터 최소화: 목적에 필요한 최소한의 정보만 수집·보유</li>
          <li>로그 모니터링: Loki 기반 모니터링으로 비정상 행위 탐지</li>
        </ul>
      </section>

      <!-- 제9조 -->
      <section>
        <h2>제9조(개인정보 보호책임자)</h2>
        <p>개인정보 처리에 관한 사항을 문의하실 경우 아래 책임자에게 연락해 주시기 바랍니다.</p>
        <table>
          <thead>
          <tr>
            <th>구분</th>
            <th>연락처</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>책임자</td>
            <td>메랜유틸 운영자</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td><a href="mailto:mygod456@naver.com">mygod456@naver.com</a></td>
          </tr>
          </tbody>
        </table>
      </section>

      <!-- 제10조 -->
      <section>
        <h2>제10조(권익침해 구제방법)</h2>
        <p>개인정보 침해에 대한 상담 및 피해구제를 원하실 경우 아래 기관에 문의하시기 바랍니다.</p>
        <ul>
          <li>개인정보침해신고센터: <a href="https://privacy.kisa.or.kr" rel="noopener noreferrer"
                             target="_blank">privacy.kisa.or.kr</a> / 전화 118</li>
          <li>개인정보 분쟁조정위원회: <a href="https://www.kopico.go.kr" rel="noopener noreferrer"
                               target="_blank">www.kopico.go.kr</a> / 전화 1833-6972</li>
          <li>대검찰청 사이버수사과: <a href="https://www.spo.go.kr" rel="noopener noreferrer" target="_blank">www.spo.go.kr</a>
          </li>
          <li>경찰청 사이버안전국: 182</li>
        </ul>
      </section>

      <!-- 제11조 -->
      <section>
        <h2>제11조(개인정보 처리방침의 변경)</h2>
        <p>
          본 방침은 법령·서비스 변경에 따라 개정될 수 있으며, 변경 시 개정된 사항을 웹사이트(또는 서비스 공지)를 통해 고지합니다.
          시행일자는 문서 상단에 기재된 날짜를 따릅니다.
        </p>
      </section>

      <!-- Footer -->
      <div class="policy-footer">
        <p>본 개인정보처리방침은 메랜유틸의 실제 개인정보 처리 현황과 관계 법령(개인정보보호법 등)을 기준으로 작성되었습니다.</p>
        <p class="note">참고: 개인정보처리방침 작성지침(2025)을 준수하여 작성하였음.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.privacy-policy-container {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
}

.privacy-policy-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
}

.privacy-policy-content h1 {
  margin: 0 0 20px 0;
  font-size: 32px;
  color: white;
  text-align: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
}

.meta {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 8px 0;
}

.meta-note {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin: 8px 0 32px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.privacy-policy-content section {
  margin-bottom: 40px;
}

.privacy-policy-content h2 {
  margin: 0 0 16px 0;
  font-size: 20px;
  color: white;
  font-weight: 600;
}

.privacy-policy-content p {
  margin: 0 0 16px 0;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.privacy-policy-content ol {
  margin: 16px 0;
  padding-left: 24px;
}

.privacy-policy-content ul {
  margin: 16px 0;
  padding-left: 24px;
}

.privacy-policy-content li {
  margin: 8px 0;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
}

.privacy-policy-content dl {
  margin: 16px 0;
}

.privacy-policy-content dt {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 15px;
}

.privacy-policy-content dd {
  margin: 4px 0 12px 24px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  line-height: 1.7;
}

/* 표 스타일 */
.privacy-policy-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.privacy-policy-content th,
.privacy-policy-content td {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px;
  text-align: left;
  font-size: 14px;
}

.privacy-policy-content th {
  background: rgba(74, 144, 226, 0.15);
  color: white;
  font-weight: 600;
}

.privacy-policy-content td {
  color: rgba(255, 255, 255, 0.8);
}

.privacy-policy-content a {
  color: #4a90e2;
  text-decoration: none;
  font-weight: 600;
}

.privacy-policy-content a:hover {
  text-decoration: underline;
}

.note {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 12px;
}

.policy-footer {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.policy-footer p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 8px 0;
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .privacy-policy-container {
    padding: 20px 15px;
  }

  .privacy-policy-content {
    padding: 24px 20px;
  }

  .privacy-policy-content h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .privacy-policy-content h2 {
    font-size: 18px;
  }

  .privacy-policy-content p,
  .privacy-policy-content li,
  .privacy-policy-content dd {
    font-size: 14px;
  }

  .privacy-policy-content table {
    font-size: 12px;
  }

  .privacy-policy-content th,
  .privacy-policy-content td {
    padding: 8px;
  }
}
</style>
