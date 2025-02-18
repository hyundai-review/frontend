# nginx 이미지 사용
FROM nginx:latest

# root에 /app 폴더 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# work dir에 dist 폴더 생성
RUN mkdir ./dist

# host pc의 현재 경로의 build 폴더를 work dir의 build 폴더로 복사
ADD ./dist ./dist

# nginx의 default.conf 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 nginx.conf를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# .env 파일을 컨테이너의 /app/.env로 복사
COPY .env /app/.env

# 80 포트 개방
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
