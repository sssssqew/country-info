```
Country Information Dashboard
```

```
[folder structure]

country-info 
 - front
 - heroku-proxy
```

```
[set frontend]
git clone https://github.com/sssssqew/country-info.git front
npm install
npm start 
open localhost:8081
```

```
[set proxy server]
mkdir heroku-proxy && cd heroku-proxy
npm init -y
npm install cors-anywhere
node node_modules/cors-anywhere/server.js
=> 에러 발생시 server.js 포트 변경하거나 sudo fuser -k 8080/tcp
```

```
[fetch api]
API 주소 앞에 http://localhost:8080/를 붙여준다.
fetch(http://localhost:8080/ + API_URL)
axios(http://localhost:8080/ + API_URL)
```
