## 💀 blog
blog 💀

## 💀 Description
basic blog generator based on pocketbase

## 💀 Build
(we are using pnpm)
```bash
$ git clone https://github.com/Smichovska-SPS/projekt-skull
$ cd projekt-skull
$ npm install
$ npm run build
```

## 💀 Deploy
(deployment is not fully tought out 💀)
### Pocketbase
(currently trough fly.io)
```bash
$ flyctl launch
```
### Frotend
```bash
$ npm run build
$ node -r dotenv/config build
```


## 💀 connecting to pocketbase
### during development
connect to remote pocketbase instance and develop locally with
```bash
$ npm run dev
```

### during deployment
connect to pocketbase on localhost and deploy on the same server with node (pocketbase should not be exposed to the internet)


## 💀 TODO
- [ ] create editor
- [ ] actuall design
- [x] login with pocketbase
  - [x] regex email verification
- [ ] editable user profile
- [ ] if everything works, integrate with HUGO
- [ ] fix deployment (low priority)
