# Sweeper Server

Install Postgres and pgadmin3  
Make a database for sweepr `sweepr`  
Add info into `config.json` from `config-default.json`  
run `source setup.sh` or `npm install; node_modules/.bin/sequelize db:migrate`

# Authorization
Using Postman, call /auth with a email and password.  
You will return a token on successful authorization.  
Add this token to all requests under header `x-access-token`  
