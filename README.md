# Casty protocl package for JavaScript
This repository contains common protocol definitions for casty services

## Directory Structure
The directory structure should match the protocol package.  
we use `/protobuf` directory for our proto files and then we compile them into a commonjs bundle file in work directory called `./commonjs.js`

## Install package
```bash
$ npm i castylib-protocol-js
```

## Compile protobuffers
This command will compile `.proto` files of the `/protobuf` dir into `./bundle.js`
```bash
$ npm run build
```

## Contributing
Thank you for considering contributing to Casty projects!

## License
Casty is an open-source software licensed under the MIT license.
