# ElectroTallinn App

Сайт [electrotallinn.ee](https://electrotallinn.ee): карта электрозаправок, маркет, игры, профили пользователей и админка.

Nuxt 2 (Vue 2, SSR) + Express API внутри Nuxt (`serverMiddleware` на `/api`), MySQL, BootstrapVue, Leaflet.
В прод запускается через PM2 за nginx.

## Стек

- **Frontend:** Nuxt 2.15, Vue 2, BootstrapVue, SCSS (Dart Sass)
- **Backend:** Express 4 в `api/` (подключается как `serverMiddleware`), MySQL (`mysql`), JWT, Telegram Login Widget
- **Файлы:** отдельный сервис `filemanager` (`files.electrotallinn.ee`)
- **Прод:** Linux x64, Node.js 24 LTS, Yarn 1.22, PM2 5, nginx

## Требования

| Компонент | Версия |
|---|---|
| Node.js | 24 LTS (см. `.nvmrc`, `engines` в `package.json`) |
| Yarn | 1.22 (classic, lockfile v1) |
| PM2 | 5.x |
| MySQL | 5.7+ / 8.x |
| ОС сервера | Linux x64 (glibc); нативные модули собираются на сервере |

> Node 16 больше не используется: `node-sass` заменён на Dart Sass (`sass`), который работает на современных Node.

## Локальная разработка

```bash
nvm use                      # Node 24 из .nvmrc
# создайте .env по таблице ниже, если его ещё нет
yarn install --ignore-engines
npm rebuild sharp            # только если sharp не установился автоматически

yarn dev                     # http://localhost:3000
yarn build && yarn start     # прод-режим локально
yarn generate                # статическая генерация в dist/
```

`--ignore-engines` нужен для Yarn 1: транзитивный `@nuxt/types` объявляет поддержку Node только до 19
и иначе прерывает установку.

## Переменные окружения (`.env`)

Файл `.env` в git не хранится (`.gitignore`), на сервере создаётся вручную.

| Переменная | Обяз. | Назначение |
|---|---|---|
| `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` | да | подключение к MySQL |
| `TELEGRAM_TOKEN` | да | проверка подписи Telegram Login Widget |
| `SERVER_PORT` | нет | порт Nuxt, по умолчанию `3000` |
| `SITE_URL` | нет | публичный адрес сайта (`https://electrotallinn.ee`) |
| `API_URL` | нет | публичный адрес API (`https://electrotallinn.ee/api`) |
| `BASE_FILE_URL` | нет | адрес файлового сервиса (`https://files.electrotallinn.ee`) |
| `GOOGLE_KEY`, `FLICKR_KEY`, `WEATHER_KEY` | для карт/погоды | внешние API |
| `GOOGLE_TAG_MANAGER_ID` | нет | GTM, по умолчанию `GTM-WCXP8ZF` |
| `MC_MAP_IP` | нет | IP сервера Minecraft для карты |

## Скрипты

| Команда | Что делает |
|---|---|
| `yarn dev` | dev-сервер с hot reload (nodemon + nuxt) |
| `yarn build` | прод-сборка в `.nuxt` (`--modern=server`) |
| `yarn start` | запуск собранного приложения |
| `yarn generate` | статическая генерация в `dist/` |
| `yarn rebuild:sharp` | пересборка нативного `sharp` под текущую ОС |

## Деплой на прод

Боевой каталог: `~/domeenid/www.nuforms.com/electrotallinn`, PM2-процесс `electroapp`.
Рядом в PM2 работают отдельные приложения `filemanager` и `etbot` — они не входят в этот репозиторий
и этим скриптом не управляются.

### Первичная настройка сервера

```bash
# nvm не работает, если задан NPM_CONFIG_PREFIX (частая настройка на shared-хостинге).
# Проверить источник переменной:
#   echo "$NPM_CONFIG_PREFIX"
#   grep -rn "NPM_CONFIG_PREFIX" ~/.bashrc ~/.bash_profile ~/.profile ~/.npmrc 2>/dev/null
# Найденную строку нужно закомментировать/удалить, а в текущей сессии — снять переменную:
unset NPM_CONFIG_PREFIX

# Node 24 через nvm (на этом сервере уже установлен; переустановка nvm не требуется)
[ -s ~/.nvm/nvm.sh ] || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 24
nvm use 24
# ВАЖНО: не меняйте `nvm alias default`, если на сервере есть приложения на других
# версиях Node — deploy.sh берёт версию из .nvmrc и переключает Node только внутри себя.

# yarn 1.22 и pm2 — уже под Node 24, чтобы они попали в nvm-prefix.
# Если prefix в ~/.npmrc указывает на несуществующий каталог — удалите настройку:
npm config delete prefix 2>/dev/null || true
npm install -g yarn@1.22.22 pm2@5
hash -r                        # сбросить кэш путей bash после установки
pm2 install pm2-logrotate
# pm2 update / pm2 kill не запускайте, если на этом же pm2 daemon работают другие
# приложения: daemon перезапустится на текущем Node и перезапустит все процессы.
```

```bash
git clone <repo-url> electrotallinn
cd electrotallinn
nano .env                  # заполнить по таблице выше
chmod +x deploy.sh         # один раз, чтобы работал ./deploy.sh

nvm use                    # Node 24 из .nvmrc
yarn install --ignore-engines
npm rebuild sharp          # нативные бинарники под Linux
yarn build

pm2 start ecosystem.config.js
pm2 save
pm2 startup                # выполнить команду, которую выведет pm2
```

### nginx

```nginx
server {
    listen 80;
    server_name electrotallinn.ee www.electrotallinn.ee;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Порт `3000` должен совпадать с `SERVER_PORT` (иначе — с `server.port` в `nuxt.config.js`).
TLS — certbot или существующий конфиг.

### Переход на Node 24 (однократно)

На сервере уже активен Node 24 — ставить и переключать ничего не нужно. Достаточно
переустановить зависимости и пересобрать нативные модули под новую версию Node:

```bash
cd ~/domeenid/www.nuforms.com/electrotallinn
node -v                                 # ожидаем v24.x
git pull --ff-only

rm -rf node_modules                     # старые бинарники node-sass (собраны под Node 16) больше не нужны
yarn install --frozen-lockfile --ignore-engines
npm rebuild sharp
yarn build

# пересоздаём только electroapp, чтобы применился interpreter из ecosystem.config.js
pm2 delete electroapp 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
```

Если `yarn` или `pm2` не найдены под Node 24 — `npm install -g yarn@1.22.22 pm2@5`
(при ошибке npm про `.npm-global` см. блок про `NPM_CONFIG_PREFIX` выше).

`pm2 delete electroapp` + `pm2 start ecosystem.config.js` кратковременно останавливают только это приложение;
`filemanager` и `etbot` не затрагиваются.

### Обновление приложения

```bash
cd ~/domeenid/www.nuforms.com/electrotallinn
./deploy.sh
```

`deploy.sh` выполняет:

1. `nvm use` — версия Node из `.nvmrc`;
2. `git pull --ff-only`;
3. `yarn install --frozen-lockfile --ignore-engines`;
4. `npm rebuild sharp` + проверку `require('sharp')`;
5. `yarn build`;
6. `pm2 startOrRestart ecosystem.config.js --update-env` (с явным `interpreter`) и `pm2 save`;
7. health-check `curl http://localhost:3000/`.

Ручной вариант тех же шагов:

```bash
git pull --ff-only
nvm use
export NODE_OPTIONS=--openssl-legacy-provider
yarn install --frozen-lockfile --ignore-engines
npm rebuild sharp
yarn build
pm2 startOrRestart ecosystem.config.js --update-env
pm2 save
```

Если менялись зависимости — обновите `yarn.lock` локально (`yarn install --ignore-engines`)
и закоммитьте его, иначе `--frozen-lockfile` прервёт деплой.

### Проверка после деплоя

```bash
pm2 status
pm2 logs electroapp --lines 100
curl -I http://localhost:3000/
curl -s http://localhost:3000/api/home/statistics | head -c 200   # API (нужна БД)
node -e "require('sharp'); console.log('sharp OK')"
```

## Несколько приложений на разных версиях Node

Сейчас оба приложения на этом сервере работают на Node 24, поэтому конфликта версий нет. На будущее:

- `nvm install 24` ставит Node в `~/.nvm/versions/node/v24.x` и **не трогает** другие установки Node;
- pm2 daemon общий на пользователя и работает на том Node, которым его запустили. Без явного `interpreter`
  все процессы daemon'а используют версию Node daemon'а;
- в `ecosystem.config.js` для `electroapp` задан `interpreter`: major-версия читается из `.nvmrc` (24),
  путь ищется в nvm, иначе берётся текущий `node`. Поэтому деплой не зависит от версии Node у daemon'а;
- если у второго приложения когда-нибудь появится другая версия Node, задайте `interpreter` и в его
  ecosystem-конфиге (например, `/usr/bin/node` или путь к нужной версии в nvm);
- **не используйте** `pm2 update`, `pm2 kill`, `pm2 resurrect` без необходимости — они перезапускают daemon
  и все приложения на нём;
- `nvm alias default` менять не нужно: `deploy.sh` берёт версию из `.nvmrc` и переключает Node только внутри себя.

Проверить, на чём работает каждый процесс:

```bash
pm2 describe electroapp | grep -iE 'node v|interpreter|script'
pm2 describe <other-app> | grep -iE 'node v|interpreter|script'
```

## Особенности окружения (почему так настроено)

### Node 24 и webpack 4

Nuxt 2 использует webpack 4, который считает хеши через `md4`. В OpenSSL 3 (Node 17+) его нет, поэтому сборка падает с
`error:0308010C:digital envelope routines::unsupported`. Решение — флаг `--openssl-legacy-provider`:

- локально и в npm-скриптах: через `cross-env NODE_OPTIONS=...` (работает и в Windows);
- на сервере: в `ecosystem.config.js` (`env.NODE_OPTIONS`) и в `deploy.sh` (экспорт перед сборкой).

### `yarn install --ignore-engines`

Yarn 1 **прерывает** установку, если `engines` любого пакета не совпадает с текущим Node. Транзитивный
`@nuxt/types@2.16.3` заявляет поддержку только `^14.18 || ^16.10 || ^17 || ^18 || ^19`, поэтому на Node 20/22/24
нужен `--ignore-engines`. Флаг безопасен: `@nuxt/types` — только типы, на работу рантайма не влияет.

### Dart Sass вместо node-sass

`node-sass` — нативный модуль с привязкой к ABI Node: `node-sass@6` не собирается на Node 18+ и не работает
между версиями Node. Он заменён на `sass` (Dart Sass, чистый JS). `sass-loader@10.4` сам выбирает `sass`,
если `node-sass` не установлен, поэтому правок в `nuxt.config.js` не потребовалось. Версия `sass` закреплена
`~1.77.8`, чтобы не получать шквал предупреждений о `@import` (bootstrap 4 использует именно его).

### `sharp` и нативные бинарники

`sharp` содержит платформенный бинарник (`sharp-linux-x64.node`). `node_modules` **нельзя** копировать
с Windows/macOS на Linux — приложение упадёт с `Cannot find module '../build/Release/sharp-linux-x64.node'`.
Устанавливайте/пересобирайте зависимости на самом сервере:

```bash
rm -rf node_modules
yarn install --ignore-engines
npm rebuild sharp
# либо, если сборка из исходников не нужна:
npm install --platform=linux --arch=x64 sharp
```

Код загружает `sharp` лениво (`api/utils/Utils.js`), поэтому при проблеме с бинарником не падает весь `/api`,
а ломаются только операции с изображениями.

## Troubleshooting

| Симптом | Причина / решение |
|---|---|
| `Cannot find module '../build/Release/sharp-linux-x64.node'` | `node_modules` скопирован с другой ОС или install-скрипты были пропущены: `rm -rf node_modules && yarn install --ignore-engines && npm rebuild sharp` |
| `error @nuxt/types@2.16.3: The engine "node" is incompatible` | забыт `--ignore-engines` при `yarn install` |
| `error:0308010C:digital envelope routines::unsupported` | не задан `NODE_OPTIONS=--openssl-legacy-provider` (проверьте `pm2 env <id>` / `ecosystem.config.js`) |
| `Cannot find module 'sass'` при сборке | зависимости не переустановлены после обновления: `yarn install --ignore-engines` |
| `nvm is not compatible with the "NPM_CONFIG_PREFIX" environment variable` или `npm ENOENT ... .npm-global` | в профиле/`.npmrc` задан несуществующий prefix: `unset NPM_CONFIG_PREFIX`, убрать строку из `~/.bashrc` / `~/.npmrc`, при необходимости `npm config delete prefix` |
| `nvm: command not found` | nvm не загружен в текущей сессии: `source ~/.nvm/nvm.sh` |
| приложение работает не на той версии Node | проверьте `pm2 describe <app> | grep -i interpreter`; задайте `interpreter` в ecosystem-конфиге и пересоздайте процесс: `pm2 delete <app> && pm2 start ecosystem.config.js`. Не используйте `pm2 update`, если на daemon есть другие приложения |
| 502 Bad Gateway от nginx | процесс не слушает порт: `pm2 status`, `pm2 logs electroapp --lines 100`, проверить `SERVER_PORT` |
| API отвечает 500, в тексте ошибка `sharp` | см. первую строку таблицы; после фикса: `pm2 restart electroapp` |
| Процесс перезапускается сам / высокий CPU | `watch: true` в старом `app.json`; используйте `ecosystem.config.js` (`watch: false`) |

## Структура проекта

```
api/                Express API (serverMiddleware на /api): controllers → services → repositories
assets/styles/      SCSS (main.scss подключается в nuxt.config.js)
components/         Vue-компоненты
pages/              маршруты Nuxt (market, map, users, admin, game, ...)
plugins/            клиентские плагины Nuxt
locales/            переводы i18n (en/ru/et)
static/             статические файлы
deploy.sh           деплой/обновление на сервере
ecosystem.config.js PM2-конфигурация (electroapp)
```


