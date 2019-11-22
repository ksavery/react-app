# API Calls

This is where all of the API configuration takes place. This is where most of the API setup takes place. Calling the API should be done by sagas.

## API Structure

### Notation guide

> `*`: Wildcard (Assortment of characters)  
> `[ * ]`: Folder  
> `├──` & `└──` & `│`: Folder/File Navigation  
> `*.*`: Important File

### File Structure

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         ├── [ { API_1 } ]
>         │   ├── [Controllers]
>         │   │   ├── [ { CONTROLLER_1 } ]
>         │   │   │   ├── [ { CALL_1 } ]
>         │   │   │   │   └── index.jsx
>         │   │   │   │
>         │   │   │   ├── [ { CALL_2 } ]
>         │   │   │   ...
>         │   │   │   ├── [ { CALL_# } ]
>         │   │   │   └── path.js
>         │   │   │
>         │   │   ├── [ { CONTROLLER_2 } ]
>         │   │   ...
>         │   │   └── [ { CONTROLLER_# } ]
>         │   ├── proxy.js
>         │
>         ├── [ { API_2 } ]
>         ...
>         ├── [ { API_# } ]
>         │
>         ├── [ utils ]
>         │   ├── baseUrl.js
>         │   ├── proxy.js
>         │   └── request.js
>         └── proxy.js
> ```

The above is what the overall structure of the API should look like. Now, we'll talk about what it all means.

### Explanations

#### The APIs

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         ├── [ { API_1 } ]
>         ├── [ { API_2 } ]
>         ...
>         └── [ { API_#} ]
> ```

^ Each of the API\_# folders represent a different API we are configured to talk to. For our case, we can be talking to many APIs, each of which we use a reverse proxy to call. This folder is an attempt at organizing them, so we are keeping the setup for most of the calls in one place. This should help avoid the annoying "grammar" issues and help simply calls to the API as they are updated.

#### API Configuration:

In order to use the app, you will have to have a `.env.local` file in your root project. We use a package called [`dotenv-flow`](https://github.com/kerimdzhanov/dotenv-flow) to manage the different variable instances across platforms. There should be a .env.production file that already exists in the same (root) location. You should be able to replace the variables in there with your own `.env.local`.

#### API Request

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         └── [ utils ]
>             └── request.js
> ```

Each API call we make in a controller, will use this common request utility to actually call out to the APIs. This currently uses `[axios](https://github.com/axios/axios)` to make the call. This also standardizes how we do all of our API calls.

#### API Proxies

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         ├── [ { API_#} ]
>         │ └── proxy.js
>         ├── [ utils ]
>         │   └── proxy.js
>         └── proxy.js
> ```

Each call to the UI is proxied, this allows us to make calls privately. This also helps avoid CORS issues. This becomes very noticeable when querying something in a Kubernetes Cluster.

The proxy file in the `utils` folder is used to create the proxy middleware connection that is used by each API controller. This is where the UI will use a reverse proxy anytime it tries to make a request with a specified path (`localhost:3000/api/Controller` for example).

Ultimately there are two places that setup the proxy.

1. Development: `react-app/config/setupProxy.js`

   This uses [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware) to call during development.

2. Production: `build/nginx.conf`

   For production, it is a bit more complicated. We are running off of a minified version of the app. So, in order to keep configuration simple, we use [`nginx-config`](https://github.com/tmont/nginx-conf) to dynamically create a proxy for each controller. As well as other server setup. This is then put inside of a docker container at deployment.

The proxy file in the base API folder simply combines all the proxy calls made by each API. This avoids us from continuing to add to a growing list of APIs.

#### API Controllers

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         └── [ { API_1 } ]
>             └── [Controllers]
>                 ├── [ { CONTROLLER_1 } ]
>                 ├── [ { CONTROLLER_2 } ]
>                 ...
>                 └── [ { CONTROLLER_# } ]
> ```

These folders represent the various controllers that usually make up an API.

Example: `{www.baseurl}{/api/controller}`

By separating things by controller, it should help keep the code separated, and maintainable.

#### API Controller Path

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         └── [ { API_# } ]
>             └── [ { CONTROLLER_# } ]
>                 └── path.js
> ```

This file determines the API controller path the app is going to use. The way this is implemented is that APIs can be called directly through the UI app.

_Example:_ If running locally, you can type the following URL and retrieve items from the API connection you specified in the `.env.local` file...

`http://localhost:3000/api/Items`

#### Basic API Calls

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         └── [ { API_# } ]
>             └── [Controllers]
>                 └── [ { CONTROLLER_# } ]
>                     └── route.js
> ```

This file is the full URL for the controller like seen in the example above.

#### API Redux/Saga Calls:

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         └── [ { API_# } ]
>             └── [Controllers]
>                 └── [ { CONTROLLER_# } ]
>                     ├── [ { CALL_1 } ]
>                     ├── [ { CALL_2 } ]
>                     ...
>                     └── [ { CALL_# } ]
> ```

^ The separate API calls are broken into different folders, this is because each call results in a change of state, which we try to mostly handle here. This is why there are multiple files inside of these folders. Try to stick to a naming convention that makes sense.

#### API Controller URL

> ```
> [react-app]
> └── [ src ]
>     └── [ api ]
>         └── [ { API_# } ]
>             └── [Controllers]
>                 └── [ { CONTROLLER_# } ]
>                     └── [ { CALL_# } ]
>                         └── index.js
> ```

This file contains an API class that includes a single controller call. This file does not include the state management settings. This uses the request in the `app/utils` folder to have a standardized API call structure. We also use [`axios`](https://github.com/axios/axios) as our API helper because it supports older versions of IE including IE11 without the need of fetch polyfill. We use the options json instead of doing a axious.put(), etc. because it's simple and like node's fetch which should make it easy to transition to a different technology if need be in the future.

The calls in this folder should be used in tandem with the saga/redux stuff.

#### API Redux/Saga Call Setup

> ```
> [react-app]
> └── [ src ]
>     └── [ views / containers ]
>         └── [ { API_CONTAINER } ]
>             ├── action.js
>             ├── constants.js
>             ├── reducer.js
>             └── saga.js
> ```

^ Each call is broken into several different files. I will not attempt to explain the full meaning behind each file as there is a lot going on to the uninitiated eye. This is essentially all just configuration to do each API call.

Now, in order to better understand what is going on (as there is a lot), you'll need to be familiar with several different react concepts/technologies. I'll leave it to the experts to better explain each piece...but I'll try to give a brief overview here.

_Quick Note_:

> The best thing you can do is, if you have a day, read through the boilerplate documentation [here](../../README.md#Documentation)

[`Immer`](../../docs/js/immer.md): Essentially allows for very quick equality testing by using computed hashes. Otherwise compares are typically very slow. Most of our data should be made immutable; for performance reasons.

[`Redux`](../../docs/js/redux.md): What we use to help with app state management. In our case we specifically use sagas (another react technology... see below) as are our main source of state management, but we use redux and its concepts.

[`Sagas`](../../docs/js/redux-saga.md): Basically used to handle side effects of things such as button clicks. It's used so that two components that may rely on each other can be separated and maintained independently. It also spins stuff off on different threads which is really nice.

[`Actions`](https://redux.js.org/basics/actions?_sm_au_=iVVVHZP60s4Nq6v1): Basically these are responsible for triggering the various states method call. In our case, it is used for our various API call states... typically loading, success, or error. However, these are also used for things such as button click actions.

[`Reducers`](https://redux.js.org/basics/reducers?_sm_au_=iVVMMJW01ZP6nLRt): Uses actions to figure out what to do; in our case what to do to the saga.

**File**: `action.js`

Contains the actions for redux operations. Uses the constants specified in the same folder.

**File**: `constants.js`

The constants used to manage actions. These need to be unique throughout the application, which is why the name for each constant is so long. This file will also contain any constants that are being used by the component like the name of the store state, and the state properties.

**File**: `reducer.js`

Figure out what needs to be done when an action occurs.

**File**: `saga.js`

Basically contains all the listeners that run on a different thread that allows asynchronous calls from the actions.

## Adding a new API

1. Review the [File Structure](#file-structure).

2. Implement the same file structure for the new API.

3. Add the new proxy calls to each respective folder.

   1. The base API folder for any new APIs
   2. The API\_# folder for any new controller paths.

4. Update the `.env.production` file with any new/removed environment variables.
