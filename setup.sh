
if  [ -e "config/config.json" ]
then
  echo "config/config.json exists, thank you for setting up the database"
  echo "1 ------ installing node modules in case you forgot"
  npm install

  echo "2 ------ performing latest migrations"
  node_modules/.bin/sequelize db:migrate

else
  echo ERROR: config/config.json is not found
fi
