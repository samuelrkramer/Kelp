# Welcome to Kelp

## About

Kelp is an application to view and review kelp-related businesses. Users are able to add, update, and remove businesses from the directory, as well as add and delete reviews.

## Running your own

### Development

1. Clone the repo
```
git clone https://github.com/samuelrkramer/Kelp.git
```

2. Copy the **.env.example** file and change to your proper settings

3. Setup your Postgres user with `CREATEDB` according to your **.env** settings

4. Install node dependencies in **BOTH** the `backend` and `frontend` directories:
```
npm install && npm install -D
```

5. Run startup scripts in **BOTH** the `backend` and `frontend` directories:
```
npm start
```

### Deploing to Heroku

1. Set up your Heroku account and install the Heroku CLI

2. Create a new application in your Heroku dashboard, then go to "Resources" and "Find more add-ons" in order to add the free "Heroku Postgres".

3. In the project directory, log into Heroku in your terminal:
```
heroku login
```

4. Set up git to use Heroku as a remote:
```
heroku git:remote -a <app-name>
```

5. Set your environment variables in the Heroku dashboard under "Settings" and "Config Vars". You will have to click to "reveal config vars".
    * At a minimum, you will need to set `JWT_SECRET` and `JWT_EXPIRES_IN`

6. Push the master branch to Heroku:
```
git push heroku master
```

7. Migrate and seed the database:
```
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all
```

At this point, your clone should be up and running!

## DB Schema
![Schema](dbschema.jpeg)