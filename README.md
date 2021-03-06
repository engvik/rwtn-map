# Refugees Welcome to Norway's Welcome to _______, map!
Inspired by the great [Arriving in Berlin](http://arriving-in-berlin.de/) map, [Refugees Welcome to Norway](http://rwtn.no/) wanted to create a similar map over Oslo.

And why not just open source it, so others can make use of it as well?

## Contents

* [Install, build, and run](https://github.com/engvik/rwtn-map#install-build-and-run)
* [Configuration](https://github.com/engvik/rwtn-map#configuration)
    * [config/languages.json](https://github.com/engvik/rwtn-map#configlanguagesjson)
        * [Example](https://github.com/engvik/rwtn-map#example)
        * [Values](https://github.com/engvik/rwtn-map#values)
    * [config/map.json](https://github.com/engvik/rwtn-map#configmapjson)
        * [Example](https://github.com/engvik/rwtn-map#example-1)
        * [Values](https://github.com/engvik/rwtn-map#values-1)
    * [locale/IETF-code.json](https://github.com/engvik/rwtn-map#ietf-codejson)
        * [Example](https://github.com/engvik/rwtn-map#example-2)
        * [Creating a translation for a marker type](https://github.com/engvik/rwtn-map#creating-a-translation-for-a-marker-type)
    * [Full example](https://github.com/engvik/rwtn-map#full-example)
* [Environment variables](https://github.com/engvik/rwtn-map#environment-variables)

## Install, build and run

    git clone git@github.com:engvik/rwtn-map.git
    cd rwtn-map
    npm install
    npm start

## Configuration
Markers for the map, translations and available languages are configured by editing json files in `config/` and `locales/`.

### config/languages.json

This is the file for setting up the languages you support. Adding a language here, will make it an option on the front page.

#### Example

```json
[
  {
    "code": "en-US",
    "name": "English"
  },
  {
    "code": "nb-NO",
    "name": "Norsk bokmål"
  }
]
```

This will make English and Norwegian available on the site.

#### Values
* `code` - The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag). Must correspond with the filename containing the translations in the `locales/` folder.
* `name` - The name of the language as it will appear on the front page of the site.

### config/map.json
Here are the markers for the map stored, along with the coordinates for the map view.

#### Example

```json
[
  {
    "start": [59.9212802, 10.7598769]
  },
  {
    "type": "supermarket",
    "icon": "",
    "localeKey": "supermarket-1",
    "coordinates": [59.9212802, 10.7598769]
  },
  {
    "type": "doctor",
    "icon": "",
    "localeKey": "doctor-1",
    "coordinates": [59.9200002, 10.7598769]
  }
]
```

This will render the map with the coordinates `59.9212802, 10.7598769` and with two that map.

#### Values

The first object in the array, has to be one defining the map view.

* `start` - The coordinates for the map view. Must be stored as a separate object, first on in the array.

* `type` - What type of marker it is. This is used for filtering the map based on what type of marker it is. Remember to create a translation for the type.
* `icon` - Used for defining what marker to render.
* `localeKey` - The key for the translation in the `locales/`-folder. Will be rendered when you click the marker.
* `coordinates` - The coordinates to place the marker.

### locales/IETF-code.json

This is where we store the translations files. The project comes with some predefined values for the static content on the site.

#### Example

```json
// en-US.json
[
  {
    "map-title": "Map",
    "map-filter-type": "Filter",
  }
]

// nb-NO.json
[
  {
    "map-title": "Kart",
    "map-filter-type": "Filtrer",
  }
]

```

As you can see, the same keys are used in both files. This makes it possible to retrieve the correct translation based on the language selected.

#### Creating a translation for a marker type

When you are defining markers, remember to create translations for each type you use. The key should be the same as the type.

If you have defined a marker like this:

```json
{
  "type": "doctor",
  "icon": "",
  "localeKey": "doctor-1",
  "coordinates": [59.9200002, 10.7598769]
}
```

You should create a translation like this:
```json
// en-US.json
{
  "doctor": "Doctor"
}

// nb-NO.json
{
  "doctor": "Lege"
}
```
### Full example
If you want to see a bigger example with all of the configuration done, have a look at the [map/oslo](https://github.com/engvik/rwtn-map/tree/map/oslo)-branch to see the for Oslo.

## Environment variables
* `PORT`
* `NODE_ENV`
