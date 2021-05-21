This app was written to render data received from the api endpoint. 

On load the app makes an AJAX request and return a response with the data and necessary status flags. The fetched data is also stored in the cache to make future async request only if necessary. The request also takes into account basic error handling. 

The response of the AJAX request is then handed onto state variables which in turn relays them to a table in order to display the information in the form of a basic summary and further details onClick.

The components are written as Functional components with React and Typescript.

Usage:
please run `npm start` after cloning the repo.
