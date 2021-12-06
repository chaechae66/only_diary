##  :pushpin: 목차
* [소개](#소개)
   * 소개말
   * 배포 링크
   * 특징
   * 개발 기간
* [페이지 구성](#페이지-구성)
   * 메인 페이지
   * 회원가입 / 로그인 페이지
   * 다이어리 등록 페이지
   * 마이 다이어리 페이지
   * 다이어리 디테일 페이지
* [환경 구성](#환경-구성)
   * yarn
   * 환경변수
* [기술 스택](#기술-스택)
   * 스택
   * 사용 이유
* [개선사항](#개선사항)
   * 페이지 이탈 후에도 유저가 누른 좋아요 상태 유지
   * 새로고침 후 데이터 유지
   * 다이어리 등록 시 이미지 이름 중복 없애기

## :love_letter: 소개
### 소개말
<img src="https://user-images.githubusercontent.com/80934175/143998142-7b66bde1-3a59-48c5-a820-c3ed0dd5d855.png" width="150px" height="150px" alt="logo"/>

Only Diary는 유저가 이미지와 함께 다이어리를 게시할 수 있는 웹 어플리케이션 입니다.<br />
유저는 공개 / 비공개 를 설정 할 수 있어서 모든 유저에게 공개하거나 않거나 설정할 수 있습니다.
### 배포 링크
[https://only-diary.web.app/](https://only-diary.web.app/)
### 특징
- 로그인 기능 
- 공개 / 비공개 모드 설정
- 다이어리 등록
- 좋아요 & 알람 기능
- 새로고침 시 데이터 유지
- 드롭다운 메뉴
- auto 슬라이드 배너
- 반응형
### 개발 기간
2021.09.09 ~ 2021.11.23(~ing)

<br />

## :page_with_curl: 페이지 구성

<br />

### 메인 페이지

![main_page](https://user-images.githubusercontent.com/80934175/144802596-ec4e3f45-5530-4e99-b325-a8d3cf982cbd.gif)

* 로그인 유무에 따른 Header
  * 로그인 후 드롭다운의 메뉴
  * 좋아요 누른 후 알람 메뉴
    * 좋아요 누른 유저
    * Timestamp
  * 직관적인 메뉴 UI  
* autoplay 메인 배너
  * 배너 페이지 이동
  * 현재 배너 앞 뒤 이동
  * autoplay 정지 / 시작
* 공개 모드로 설정된 모든 다이어리 리스트
  * 간단한 카드 형태 
### 회원가입 / 로그인 페이지

<img width="850" alt="캡처" src="https://user-images.githubusercontent.com/80934175/144802518-38b50554-dfd2-4149-aa91-dbb7dfcb617b.jpg">

* 회원가입 / 로그인 유효성 검사 기능 
* 간편하게 회원가입 / 로그인 페이지 이동
* submit 버튼 클릭 시 로딩 중에는 disabled 활성화
* 오류 시 alert 창 표시 
### 다이어리 등록 페이지

<img width="860" alt="캡처2" src="https://user-images.githubusercontent.com/80934175/144802229-d0ebe2ea-1ccf-44e1-84f7-bd605a2c511e.PNG">


* 이미지 선택 시 미리보기 기능
* 유저가 사진 업로드 가능
* 공개 / 비공개 모드 설정 가능
  * 공개 모드 시 모든 유저가 읽기 가능
  * 비공개 모드 시 작성자만 읽기 가능
* 공개 / 비공개 모드 직관적인 토글버튼 UI
* 텍스트 세션 텍스트 양에 따라 높이 자동 설정
* 업로드 로딩 시 로딩 중과 에니메이트 표시
### 마이 다이어리 페이지

- 다이어리 있을 때
<img width="860" alt="캡처3" src="https://user-images.githubusercontent.com/80934175/144803110-67aa0b25-2ce3-4419-8a58-30421418a187.PNG">

- 다이어리 없을 때
<img width="860" alt="캡처4" src="https://user-images.githubusercontent.com/80934175/144803136-9be2f4b7-5757-48b8-8e79-3b3be84f160b.PNG">

* 간단하게 유저의 정보 제공
* 다이어리 수에 따라 다른 페이지 UI
  * 다이어리 없을 시 다이어리 추가 UI
    * 다이어리 추가 하도록 UX 디자인
  * 있을 시 다이어리 목록 UI
    * 간단한 카드 형태  
### 다이어리 디테일 페이지

<img width="860" alt="캡처5" src="https://user-images.githubusercontent.com/80934175/144803449-45823e71-0c39-44af-ada3-d487310f26a6.PNG">

* 다이어리 정보 제공 (다이어리 등록 페이지와 UI 비슷)
* 좋아요 기능
  * 좋아요 누른 페이지는 다른 페이지 이동 후 다시 와도 좋아요 표시 됨
  * 좋아요 수 1개 이상 시 카운팅
  * 좋아요 취소 기능
* 디테일 페이지가 본인 작성 다이어리일 시, 수정&삭제 버튼 활성화
* 이전으로의 버튼을 통해 뒤로가기 구현

<br />

## :earth_asia: 환경 구성
### yarn
```

git clone https://github.com/chaechae66/only_diary.git
yarn install
yarn start

```
### 환경변수
```

/* root 디렉토리에 .env 파일 추가 후 */

REACT_APP_FIREBASE_APIKEY = 파이어베이스 앱키
REACT_APP_FIREBASE_AUTHDOMAIN = 파이어베이스 도메인 주소
REACT_APP_FIREBASE_DATABASEURL = 파이어베이스 데이터베이스 주소
REACT_APP_FIREBASE_PROJECTID = 파이어베이스 프로젝트 아이디
REACT_APP_FIREBASE_STORAGEBUKET = 파이어베이스 스토리지버킷 주소
REACT_APP_FIREBASE_MESSAGINGSENDERID = 파이어베이스 MESSAGINGSENDER 아이디
REACT_APP_FIREBASE_APPID = 파이어베이스 앱 아이디
REACT_APP_FIREBASE_MEASUREMENTID = 파이어베이스 MEASUREMENT 아이디

```

<br />

## :hammer: 기술 스택
### 스택
1. 리액트
2. 리덕스
3. 파이어베이스
### 사용 이유
#### 리액트
- 컴포넌트화 구조의 jsx 관리
  - 컴포넌트 UI 재사용 & 유지보수 용이
- 큰 커뮤니티, 그에 따른 폭넓은 라이브러리 선택
- Virtual DOM을 통해 어플리케이션의 성능을 향상
#### 리덕스
- 보다 효율적인 상태관리 라이브러리
- 차후 미들웨어의 활용
#### 파이어베이스
- auth, db 등의 다양한 백엔드 서비스 제공
- 차후 Node.js를 학습해 변경 예정

<br />

## :pill: 개선사항
### 페이지 이탈 후에도 유저가 누른 좋아요 상태 유지
#### :alarm_clock: 기간
2021.11.14
#### :mag_right: 문제점
좋아요 기능을 개발하던 중 페이지 이탈 후 좋아요 누른 상태가 유지되지 않는 문제가 있었다.

#### :bulb: 해결법
그래서 페이지 진입 시, <br />
좋아요 데이터를 불러와서 좋아요 누른 상태로 업데이트 해주게 해결하였다.

### 새로고침 후 데이터 유지
#### :alarm_clock: 기간
2021.11.12 ~ 2021.11.14

#### :mag_right: 문제점
로그인 정보를 Redux에 저장하여 여러 UI에 가져다 쓰고 있다. <br />
하지만 Redux은 새로고침 시 데이터가 날아간다는 치명적인 단점이 있다. <br />
그래서 유저 입장에서 로그인 데이터가 없어 다소 혼란을 줄 수 있다.

#### :bulb: 해결법
로그인 정보(currentUser)가 변할 때를 감지하기 위해 useEffect라는 React Hook을 사용한다. <br />
그 안에 firebase 메서드(onAuthStateChanged)로 로그인 상태를 감지하여 <br />
로그인 정보를 Redux dispatch 통해 reducer에 정의해둔 userLogIn을 실행해 다시 로그인 시켜주어 해결하였다. <br />
향후 Redux 미들웨어를 도입하여 보완하여 해결할 계획이다.

### 다이어리 등록 시 이미지 이름 중복 없애기
#### :alarm_clock: 기간
2021.11.21

#### :mag_right: 문제점
다이어리는 이미지와 텍스트를 주로 이루어 있습니다. 등록 시 이미지 정보를 firebase storage에 저장하여 보관하게 됩니다. <br />
이 때 그 전에 다른 유저가 같은 이미지 이름을 이미 사용하여 업로드 시 이미지가 덮어쓰기 되어 다른 유저는 등록한 이미지와 달라 혼란을 줄 수 있습니다.

#### :bulb: 해결법
uuid라는 고유의 이름을 제공하는 라이브러리와 함께 기존에 저장된 file 정보 중 fileType(확장자)를 불러 조합시키므로 중복될 수 없게 해결하였습니다.
