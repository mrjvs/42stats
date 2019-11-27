# 42stats

Get nice statistics for your 42 cursus and campus

## installation
nodeJs is required.
run `npm install` in the root directory.

## Running
run `./42check` or `node index.js` in the root directory

You can get extra information from a project by running `./42check get-project <project>` (be careful, you need the id or slug, not the name of the project)

# Config

config comes with defaults that can be overwritten.
config has to be in the root directory and named `config.json` and has to be in `JSON` format.

check `config-example.json` for an example.

## Layout

| Key           | Type                           | Description                                                          |
| ------------- | ------------------------------ | -------------------------------------------------------------------- |
| client_id     | **String** REQUIRED            | Client id from api page (go to user settings > api)                  |
| client_secret | **String** REQUIRED            | Client secret from api page                                          |
| cacheFile     | **String**                     | File to save the cache to. (defaults to `coalition-cache.json`)      |
| campus        | **{id: String, name: String}** | The campus it filters on (defaults to `Codam`)                       |
| cursus        | **String**                     | The cursus to get projects from (defaults to `42cursus`)             |
| projectList   | **String[]**                   | List of project slugs to list (defaults to all projects from cursus) |
