# Urban Foraging 

## Final Project

Find the free food

## The Tech


* React
* Redux
* Express
* Knex
* Bootstrap
* JWT Auth

## User Stories

### MVP

As a non-registered user:
  I want to see a google map container with login and register buttons in the nav.
  I want to be able to filter through the items to forage and show them as pins on the google map and list them below.
  I want to click on a pin and be shown information about the item to forage.

As a user:
  I want to be able to register as a new user.
  I want to be able to log in to my own account and see my profile.
  I want to be able to add a new item.
  I want to be able to update and delete my own item.
  I want to be able to add an item and set it to public or private.
  I want to be able to see a google map container which has the option of showing my private collection and my private collection plus everyone else’s entries. (filter)
  I want to be able to search by keyword and see a google map container which shows them as pins and lists.

### Stretch

  Pop up sign up or register form 10 seconds after landing on website
  Add a rating and comment on other peoples items
  Filter by seasonal availability
  Filter by quantity (eg heaps of lemons)
  Share with another user/friend
  User points system
  Email confirmation for sign up


  ---

## Views (Client Side)
  | name | purpose |
  | --- | --- |
  | Login | View for user to enter their login credentials |
  | Register | View for user to sign up for the App |
  | CreateMeeting | View for user to arrange meeting attendees and information before starting the timer |
  | Meeting | View to display current meeting time, cost and other information while the meeting is in progress |
  | History | Display a list of past meetings the user has attended with select preview information |
  | PastMeeting | Display a single meeting from the history list, displaying more information and a list of attendees for the past meeting |


## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | currentMeeting | Track meeting progress such as current cost and current duration |
  | meetings | store the list of meetings the user has attended in the past |
  | users | store the list of users who can attend meetings |

 ## Actions

 ### meetings

 | type | data | purpose |
 | --- | --- | --- |
 | RECEIVE_MEETINGS | meetings | retreive meetings from the db and store in redux |
 | ADD_MEETING | meeting | Add a single meeting to the history after it is created |

 ### users
 | type | data | purpose |
 | --- | --- | --- |
 | RECEIVE_USERS | users | retreive the users from the server |

 ### currentMeeting
  | type | data | purpose |
| --- | --- | --- |
| START_MEETING | attendees ([]), meeting_name | a meeting has started, set initial meeting state |
| END_MEETING | null | Set meeting in progress flag to false |  
| TICK_ONE_SECOND | null | Increase running total by 1s worth of $ |
| RESET_MEETING | null | Revert to initial state |



## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/login | Yes | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | The Users JWT Token |
| Get | /api/meetings | Yes | Get a Users Meeting Histroy | An Array of Meetings |
| Post | /api/meetings | Yes | Save a completed meeting | The Meeting that has been saved in db read format |
| Get | /api/meetings/:id/users | Yes | Get the attendees of a Meeting | An Array of User objects |
| Get | /api/users | Yes | Get the users of the app | An Array of User Objects |

## DB (Server Side)
  There should be three tables for MVP

### Users
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | user_name | String |
  | first_name | String |
  | last_name | String |
  | hash | text |

### Meetings
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | meeting_name | String |
  | time | Timestamp |
  | attendees | integer |
  | cost | Decimal |

### Attendees (Join Table M2M)

  Many Users attend Many Meetings

 | Column Name | Data Type |
 | --- | --- |
 | user_id | Integer |
 | meeting_id | Integer |

 ---

## Setup

Run the following commands in your terminal:

```sh
npm install
npx knex migrate:latest
npx knex seed:run
mv .env.example .env
```

To run in development:
```sh
npm run dev
```

To run in production:
```sh
npm start
```


## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps


### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app


### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:
```sh
npm run h:deploy
```

Run heroku migrations:
```sh
npm run h:migrate
```

Run heroku seeds:
```sh
npm run h:seed
```

If ever you need to rollback, you can also:
```sh
npm run h:rollback
```


### Ta-Da!
Your app should be deployed!
