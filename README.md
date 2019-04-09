# Login With Discord
## Archived and preserved
### Simple Promise-based Discord login API

I might revive this one day -Ender

* [Live Example](https://bot.ender.site/lwd)<br>
* [Download](https://github.com/EnderDev/Login-With-Discord/releases)

# Installation
Either download the latest version from the [GitHub releases](https://github.com/EnderDev/Login-With-Discord/releases)
or to ensure your site always has the latest version, include it using [jsdelivr](https://jsdelivr.net) with the below url
```
https://cdn.jsdelivr.net/gh/dusterthefirst/Login-With-Discord/dist/lwd.js
```

# Using
Download [lwd.d.ts](https://cdn.jsdelivr.net/gh/dusterthefirst/Login-With-Discord/dist/lwd.d.ts) if you use typescript or want the extra typings

To start you must create an instance of the class
```js
let discord = new LoginWithDiscord({
    clientID: '<client id>',
    scopes: [
        Scope.Identify
    ]
});
```
You must pass it the `clientID` and [scopes](#Supported Scopes) and can optionally pass a `redirect_url`, by default the redirect url is the current one, and you can also disable caching using the `cache` option which is defaulted to true

Once you have the discord object you have access to many functions and event handlers

# Example Code

```js
<script src="https://cdn.jsdelivr.net/gh/dusterthefirst/Login-With-Discord/dist/lwd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<button onclick="login()">login to discord</button>

<script>
       let discord = new LoginWithDiscord({
           clientID: '565116533085306882',
           scopes: [
               Scope.Identify, Scope.Guilds
           ]
       });
       
       function logout() {
           discord.logout();
           console.log("Logged out");
           location.reload();
       }
       
       function login() {
           discord.login();
           console.log("Opened Authorization Pane");
       }
    
       discord.onlogin = async () => {
           console.clear()
           let user = await discord.fetchUser();
           let guilds = await discord.fetchGuilds();
           document.write(`You are now logged in as ${user.username}#${user.discriminator}. <button onclick="logout()">logout</button><br><div id="guilds"></div>`)
           console.log(user)
           guilds.forEach(g => {
               var icon = g.iconURL
               if(icon == null) {
                   icon = "https://cdn.discordapp.com/embed/avatars/0.png"
               }
               $("#guilds").append(`<p id="g-${g.id}"><img src="${icon}"><h1>${g.name}</h1></p>`)
           })
       }; 
</script>```

# Documentaion

## `discord.onlogin`
Event handler called whenever discord.login() completes or the page is loaded with the user already logged in

## `discord.onlogout`
Event handler called whenever discord.logout() completes or the page is loaded without the user logged in

## `await discord.login()`
Asynchronous funtion that opens the login dialog for your application
(Throws an error if the authentication does not complete successfully)

## `discord.logout()`
Synchronus function that will clear the login cache and log the user out

## `await discord.fetchUser()`
**(requires scope `Identify` or `Email`)**<br/>
Asynchronus function that will get the [user object](https://discordapp.com/developers/docs/resources/user#user-object)

## `await discord.fetchConnections()`
**(requires scope `Connections`)**<br/>
Asynchronus function that will get the user's [connections](https://discordapp.com/developers/docs/resources/user#connection-object)

## `await discord.fetchGuilds()`
**(requires scope `Guilds`)**<br/>
Asynchronus function that will get the user's [guilds](https://discordapp.com/developers/docs/resources/user#get-current-user-guilds)

## `await discord.joinGuild('guildid')`
**(requires scope `GuildsJoin`)**<br/>
Asynchronus function that will join a guild

## `discord.state`
The current [state](#States) of the login process

## Supported Scopes

| Name              | Scope         | Description                                         |
| ----------------- | ------------- | --------------------------------------------------- |
| Scope.Connections | `connections` | Allows access to linked third-party accounts        |
| Scope.Email       | `email`       | Allows you to fetch the user ***with*** an email    |
| Scope.Identify    | `identify`    | Allows you to fetch the user ***without*** an email |
| Scope.Guilds      | `guilds`      | Allows you to fetch the user's guilds               |
| Scope.GuildsJoin  | `guilds.join` | Allows your app to add users to a guild             |

**`GuildsJoin` requires you to have a bot account linked to your application. Also, in order to add a user to a guild, your bot has to already belong to that guild.**

## States

| Value | Name              | Description          |
| ----- | ----------------- | -------------------- |
| `0`   | `State.LoggedOut` | No auth token stored |
| `1`   | `State.LoggedIn`  | Auth token is stored |
| `2`   | `State.LoggingIn` | Authorising          |
