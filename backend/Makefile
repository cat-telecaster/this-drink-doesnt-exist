.PHONY: bash
bash:
	docker run --rm -ti --name serv --network this-drink-doesnt-exist_local --publish 80:80 --mount type=volume,src=serv-cache,dst=/.cache --mount type=bind,src=`pwd`/..,dst=/this-drink-doesnt-exist --workdir /this-drink-doesnt-exist/backend --env-file .env -e GOCACHE=/.cache/gocache -e GOMODCACHE=/.cache/gomodcache golang:1.19.0 bash

.PHONY: test
test:
	go test -cover -tags=unit_tests,db_tests,integration_tests ./... -coverprofile=cover.out
	go tool cover -html=cover.out -o cover.html

.PHONY: snapshot
snapshot:
	UPDATE_SNAPSHOTS=true go test -tags=unit_tests,db_tests,integration_tests ./...

.PHONY: fmt
fmt:
	go fmt ./...

.PHONY: vet
vet:
	go vet ./...

.PHONY: build
build:
	go build -v -o serv -ldflags "-X main.revision=$(shell git rev-parse HEAD)" ./

.PHONY: gqlgen
gqlgen-app: gqlgen-shared
	-go run github.com/99designs/gqlgen --verbose --config gqlgen.yml
