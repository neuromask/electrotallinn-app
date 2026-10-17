git pull
yarn install
# sharp ships platform-specific binaries: rebuild them for the server (Linux),
# otherwise the app crashes with "Cannot find module '../build/Release/sharp-linux-x64.node'"
npm rebuild sharp
yarn build
pm2 restart app.json