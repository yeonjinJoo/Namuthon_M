# Namuthon_M

## 🖥️ 프로젝트 소개
자립 준비 청년을 위한 맞춤 주거 지원사업과 쉼터 정보 제공 어플리케이션입니다.
<br>

## 🕰️ 개발 기간
* 23.12.28일 - 23.12.29일 (1일)

### ⚙️ 개발 환경
- compileSdk = 34
- JavaVersion.VERSION_1_8

## 📌 서버 구축
- ssh와 pem key를 이용한 서버 접속
- /var/www/nodejs_template/Namuthon_M/server_nodejs ( index.js가 존재하는 위치 )로 이동
- sudo node index.js를 통해 서버 실행
- Control + z 통해 종료
  
## 📌 앱 주요 기능
#### 로그인
- DB값 검증

#### 회원가입
- 주소 API 연동
- ID 중복 체크
  
#### 마이 페이지
- 회원정보 변경
  
#### 메인 페이지 
- 지원사업 관련 API 연동

#### 주변 쉼터가 표시된 구글맵
- 구글맵 api를 이용해 연동





