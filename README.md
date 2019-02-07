# PragmaBrewery

Pragama Brewery is a web application to monitor the temperature of containers inside a refrigerated truck. The web application have two sections: SET-UP NEW TRIP and TRUCK INFO. 
The truck doors open with each delivery, and the temperature of each container rises 2 degrees. The system automatically adjusts temperatures individually for the ideal. 
To simulate a real trip, the system displays the elapsed time in minutes, however the trip counts in seconds and its maximum time is 60 seconds

##### SET UP NEW TRIP

Shows the driver(logged user) information, and the user can inform how many stops are planned.

##### TRUCK INFO

Shows a representation of the truck in use. Also the temperatures of each container with separated beers.

## Features

- Angular 7 (components, routes, modules, services, guards, models);
- RxJS;
- Angular Material;
- Bootstrap 4;
- SASS;
- Firebase hosting: https://pragmabrewery.firebaseapp.com/
- Firebase Firestore (users, beers, notifications);
- Firebase Authentication (persistent login);




### Running the application

To run the application You need to install Node.js on your machine check this guide [here](https://nodejs.org/en/).
First git clone the repo, then go to directory and run `npm install` to install dev and prod dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```sh
$ cd pragma-brewery
$ npm install
$ ng serve
```


### Kwnown Issues

- @firebase/firestore: Firestore (5.8.1+): The timestampsInSnapshots setting now defaults to true and shows a console error. This is not adjustable so far. The Firebase team will release a new version with the fix and will no longer see this error (alert) on the console.

### Version 2.0	
- Include thermostat (removed on final commit) again, to control each container individually;
- Integrate Notification-center component with deliver messages;
- Include reminders, schedule in Notification Center Components;
- Calendar integration;
- Social logins (just include method via Firebase);
- Add more than one type of beer in a container;
