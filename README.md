# wardrobe-data-app
This is a full stack application to visualize personal wardrobe data.

# Deploying a Full(ish) Stack App with Heroku
## Prereqs
- Github account
- [Heroku account](heroku.com)
- Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Step 1: Create a new repo
- Create a Github repository with a README and a gitignore in python
- Clone this repo down on your computer

## Step 2: Create a new conda virtual environment
- ```conda create -n heroku_demo python=3.7.6```
- ```conda activate heroku_demo```
- ```pip install flask gunicorn flask_sqlalchemy```
- From the root of your repo directory run: ```pip freeze > requirements.txt```

## Step 3: Create your Flask app
- Create a file named app.py at the top level of your repo directory.
- Create two routes - one to render the html and one to return data.

## Step 4: Deploy your Flask app to Heroku
- Log into the Heroku website and create a new app.
- In your terminal, if you're not already logged in, run ```heroku login```
- Follow Heroku instructions to connect your app to an existing repository
- Check that this was successful in your terminal: ```git remote -v```
- Add your Procfile - this has already been done for you, but you should always have this file at the top level of your repo, it should be named Procfile and it should contain ```web: gunicorn app:app```
- Push these changes to your repo and then push them to Heroku
  - ```git add .```
  - ```git commit -m 'heroku setup'```
  - ```git push```
  - ```git push heroku```
- Once the deployment is successful: ```heroku open```


## Step 5: Get your data out of your DB
- Connect to your db in your app.py file (in this case, we are using a SQLite db).
- Write an API route (or routes!) that returns data from your db table(s).

## Step 6: Plot your data
- In your JavaScript file (which will be imported into your index.html), make an API call to your API route that returns data.
- Once the data is returned, parse and plot it.