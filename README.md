*Open a markdown preview with Ctrl+K V.*
# Deployment Process

When you want to deploy a Node.js project on Heroku, these are the following requirements.

### Requirements
1. Node.js local setup
2. npm installation
3. Heroku CLI

Once you have the setup locally, simply login to you Heroku account from Heroku CLI with your Heroku credentials.

After that, you navigate to the Node.js application folder you want to deploy. Once you navigate there, simply run the following command.

`heroku create testapp`

This will create the Heroku application in your Heroku account with the name `testapp`. This is only a one-time process. You do not need to run this command everytime, only one time when you first want to deploy the application to Heroku.

If you do not specify the app name in the above command then it will assign a random name to the Heroku application like cloudy-rain or shuttered-stallion etc.

Once the app is created, you can then push your application there. The command for the same is 

`git push heroku master`

#### Note - If your remote branch is not set, then you need to run the following command first from the app folder

`heroku git:remote -a yourappname`

The **Procfile** is kind of like a manifest file which gives Heroku a configuration to how to run your app.

Once, this is done, now we want to see our app. To see it locally, you can run the command

`heroku local web`

The app should be working on `localhost:5000`

Else, if you want to see the live site, run the command -

`heroku open`

In order to see any other command, just run -

`heroku help`

### You usually forget to commit your changes. Do that, else the changes wont reflect