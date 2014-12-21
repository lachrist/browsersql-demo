
home=/Users/soft/Desktop/workspace/browsersql-demo

browserify -e $home/main.js -o $home/script.js

scp -P 8022 \
  $home/demo.html \
  $home/style.css \
  $home/script.js \
  root@localhost:/root/blog/client/demo
