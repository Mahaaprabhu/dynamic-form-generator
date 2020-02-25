## dynamic-form-generator

Angular front end application to demonstrate the functional logic behind the dynamic html form generation.

# Dynaforms

  * This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.
  
  * The app handles the data in memory (no external API services).
  
  * Using the 'Create Form' option, meta data for any dynamic form can be configured.

  * Currently the app supports 'text' and 'select' fields only (which can be extended easily). It will be sufficient for the given requirements.
  
  * By using the given flags and 'Regular Expression ' fields, one can add more complex constraints for form validation.
Parent element ids of any element can be specified in various combinations, so that the element can by made enabled/disabled during the run time.

  * One can configure a variety of parent element dependencies using the two dedicated fields provided ('all', 'any' or, in combination of 'both').

  * Added elements can be rearranged in 'Preview Panel'.

  * Using the 'Fill Form' option, the created form can be accessed and data can be submitted.
Color codes are in place to highlight the erroneous fields

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
