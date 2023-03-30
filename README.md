## 💀 blog
blog 💀

## 💀 Description
basic blog generator based on pocketbase

## 💀 Build
```bash
$ git clone https://github.com/Smichovska-SPS/projekt-skull
$ cd projekt-skull
$ npm install
$ npm run build
```

## 💀 Deploy
deploy with pocketbase (currently trough fly.io)
(also not working 💀)
```bash
$ flyctl launch
```

## 💀 connecting to pocketbase
### development
connect to remote pocketbase instance and develop locally with
```bash
$ npm run dev
```

### deployment
connect to pocketbase on localhost and deploy on the same server with node (pocketbase should not be exposed to the internet)


## 💀 TODO
- [ ] create editor
- [ ] actuall design
- [ ] login with pocketbase
- [ ] if everything works, integrate with HUGO
- [ ] fix deployment (low priority)