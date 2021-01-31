# Casty gRPC.proto package
This repository contains common protocol definitions for casty services
around gRPC such as user, authentication, theater etc...

# Golang

## Install protoc-gen-go compiler
To install `protoc-gen-go` take a look at [this documentation](https://github.com/golang/protobuf#installation)!

## Directory Structure
The directory structure should match the protocol package.  
`protoc` command is bad at import packages and compile them if they're not in the same dir.
we use `/protofiles` directory for our proto files and then we compile them into `/proto`

## Compile protobuffers
This command will compile `.proto` files of the `/protofiles` dir into `/proto`
```bash
protoc -I=protofiles --go_out=plugins=grpc:proto protofiles/*.proto
```

## Usage
To use this package on other Go services, simply use command below to install it.
```bash
$ go get github.com/CastyLab/grpc.proto
```

# Javascript

## Install package
```bash
$ npm i casty-proto
```

## Compile protobuffers
This command will compile `.proto` files of the `/protofiles` dir into `/pbjs/proto.js`
```bash
$ npm run compile
```