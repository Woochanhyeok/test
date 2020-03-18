# 2019 광운대학교 산학연계SW 프로젝트

광운대학교 산학연계SW 프로젝트로 진행되는 AI를 활용한 건강식단 프로그램입니다. 

#### Requirement
* Node.js
* python3
  * numpy

#### 아나콘다 설치 경로 확인
일반적인 아나콘다 설치 경로는 다음과 같습니다.

OSX: /opt/anaconda3/env/[DIRECTORY]/bin/python

Window: C:/Users/[YOURNAME]/anaconda3/envs/[DIRECTORY]/python

해당 경로는 `server/recommendation-model/recommend.js` 에서 options의 pythonPath로 설정해주어야합니다.

#### VSCode 이용 시
git bash 터미널 실행 후 .bashrc를 생성하고 아래 코드를 추가하고 저장해주세요.
```bash
source ~/anaconda3/etc/profile.d/conda.sh
```

#### 사용 방법
`server/recommendation-model/recommned.js` 에서 
> pythonPath: '/opt/anaconda3/envs/tf1/bin/python3'

해당 부분을 위의 아나콘다 설치 경로로 수정해주세요.

1. 로컬 서버 실행
```node
node server/server.js
```
2. 리액트 앱 실행
```npm
npm start
```
