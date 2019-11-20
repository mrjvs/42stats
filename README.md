# 42stats

Get nice statistics for your 42 cursus and campus

## Running
run `./42check` or `node index.js` in the root directory

# Config

config comes with defaults that can be overwritten.
config has to be in the root directory and named `config.json` and has to be in `JSON` format.

check `config-example.json` for an example.

## Layout

| Key           | Type                           | Description                                                      |
| ------------- | ------------------------------ | ---------------------------------------------------------------- |
| client_id     | **String** REQUIRED            | Client id from api page (go to user settings > api)              |
| client_secret | **String** REQUIRED            | Client secret from api page                                      |
| cacheFile     | **String**                     | File to save the cache to. (defaults to `coalition-cache.json`)  |
| campus        | **{id: String, name: String}** | The campus it filters on (defaults to `Codam`)                   |
| projectList   | **String[]**                   | List of project slugs to list (defaults to only `42cursus-libt`) | 
