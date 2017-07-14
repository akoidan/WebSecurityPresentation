Ссылка на презентацию https://www.youtube.com/watch?v=JsELGliOS_c

Для того, чтоб запустить:

npm install
node bin/www & node node app-attack.js
that will run app on http://localhost:3002/ and app-attack on http://localhost:3001/

Также хосты нужно добавить hack bank.
В линуксе:
sudo echo '127.0.0.1 hack' >> /etc/hosts
sudo echo '127.0.0.1 bank' >> /etc/hosts
На винде, дописать строки выше в файл %SystemRoot%\System32\drivers\etc\hosts
