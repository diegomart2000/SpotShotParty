# SpotShotParty - Demo App

Look no further. This is your perfect excuse to take all those tequila shots with your friends. You will be able to say something like this:

- I've not been drinking, honey. I've just played SpotShotParty with the guys 🙃

### Here is the deal.

SpotShotParty is a guess the song game to play with friends. It's based on Spotify APIs 👌

Guess the song or take a tequila shot! 😗


Believe me, it is a lot of fun 🍻

### Are you a daddy and wanna play with the kiddos? Say no more. 
Instead of taking a tequila shot, you will have the opportunity to shot your water gun in their faces.

That's way more fun and you already have your excuse.

- Hey wife, those are the rules 😌

## The stack
This demo app is based on MERN stack.

### Backend
It's a `Node` / `Express` App using `MongoDb` for persistence, `Redis` as Session Store, and `Socket.io` as event emmiter to make the front end to react to sertain events.

Authentication with Spotify is handled with `Passport.js`. Database mappings and schemas are modeled with `Mongoose`. Frequent objects (like mina Party object), are stored in `Redis` for quick access and to avoid DB latency.

The Backend is architected in 3 layers:

#### Routers
Build on top of express and using session and middlewares to do authorization.

#### Services
Implementing Cache and Models integration. It is also responsible to emmit events though socket.io to the Frontend clients.

#### Models
Abstracting the access to db.

### Frontend
It's built on top of `React`, `Redux` for state management, `Sagas` to tigger side effects. Css and styling is done with `css modules`/`Sass` and `Styled components` for convenience. Also features a Redux middleware to dispatch events from Socket.io. Everything built with `Webpack 4` and `Workbox` to make it a Progressive Web App.

The Front is architected with following layers:

#### Routes
Using `react-router` and `react-device-detect` to split the app on Desktop client and Mobile client.

* Desktop client: is the one hosting the party and the one that will excecute the `Web Plaback SDK` from Spotify
* Mobile client: is the one tha players will use to join a Party and play by anwsering the game questions

#### Components
* Page components: main coponents to render the several game states and pages
* UI componentes: genreal UI abstractions and reusable bits.

#### Store
* `Action Types` and `Action Creators`
* `Reducers`
* `Sagas` to handle side effects
* `Selectors` to pick and map from the app state using `reselect`
* `Requests` to handle Backend API requests with credentials, built on top of `Axios`
* `Middleware` to hook into special `Action Types` and trigger `Socket.io` events and to dispatch `Actions` on incoming events

#### Styles
All the base styling and redefinitions are done with `Bulma`. It is also include to have some handy styling mixings.

#### Layout
The ui package indcludes a set of basic Layout components called `Pages`. Pages are implemented using grid system, then content componets are layed out with Bulma's flexbox.

```
<Page>
  <PageHeader>
      <Title>Alright, let's create your party</Title>
  </PageHeader>

  <PageContent>
    <div className={cx('level')}>
      <Input value={partyName} onChange={setName} primary />
    </div>

    <div className={cx('level')}>
      <Playlists
        selected={playlistId}
        onSelect={setPlaylist}
      />
    </div>
  </PageContent>

  <PageFooter>
    <Button>
      GO  <span>👉</span>
    </Button>
  </PageFooter>
</Page>
```



## WIP: Setup
```
db.createUser(
  {
    user: "ssp_user",
    pwd: "dev",
    roles: [
       { role: "readWrite", db: "ssp" }
    ]
  }
)
```
