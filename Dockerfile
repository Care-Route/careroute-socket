# 베이스 이미지
FROM node:lts

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 복사
COPY . .

# 서버가 실행될 포트 설정
EXPOSE 4000

# 앱 실행 명령어
CMD ["node", "server.js"]
