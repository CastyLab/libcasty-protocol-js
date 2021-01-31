# Casty protocl package for JavaScript
This repository contains common protocol definitions for casty services
around gRPC such as user, authentication, theater etc...

## Directory Structure
The directory structure should match the protocol package.  
we use `/protofiles` directory for our proto files and then we compile them into a bundle file in work directory called `./bundle.js`

## Install package
```bash
$ npm i castylib-protocol-js
```

## Compile protobuffers
This command will compile `.proto` files of the `/protofiles` dir into `./bundle.js`
```bash
$ npm run build
```
