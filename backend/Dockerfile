# syntax=docker/dockerfile:1.4.0

FROM golang:1.19.0 AS deps
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

FROM golang:1.19.0 AS builder
COPY --from=deps /go/pkg/mod /go/pkg/mod
WORKDIR /app
COPY . .
RUN --mount=type=secret,id=revision go build -v -o serv -ldflags "-X main.revision=`cat /run/secrets/revision`" ./cmd

FROM ubuntu:focal AS runner
RUN apt-get -y update && \
    DEBIAN_FRONTEND=noninteractive apt-get -y install tzdata ca-certificates && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /
COPY --from=builder /app/serv .
ENTRYPOINT ["/serv"]