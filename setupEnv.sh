#!/usr/bin/env bash
sed -i "s,http://localhost:8080/recipe,$API_URL,g" /usr/share/nginx/html/env.js
exec "$@"