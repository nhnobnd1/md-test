echo 'Starting delete all node_modules in project...'
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
echo 'Delete all node_modules in project done.'

echo 'Starting install packages in project...'
yarn 
echo 'Install packages in project done.'

echo 'Starting build project...'
yarn build
echo 'Build project done.'