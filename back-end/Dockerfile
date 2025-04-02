FROM alpine:3.18
WORKDIR /app
COPY ./api .
COPY ./.env .

RUN apk update && apk add --no-cache tzdata

ENV TZ=Asia/Bangkok

EXPOSE 8080
CMD ["/app/api"]
