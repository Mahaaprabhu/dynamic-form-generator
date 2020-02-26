                                        
                                         ########## Dynamic Form Generator ##########


# WHAT'S THIS APP ALL ABOUT?
_____________________________
* Dynamic Form Generator - Front end application framework designed in Angular 9 to demonstrate the conceptual logic behind the dynamic form generation.
* This application demonstrates the ability to define/create/design html forms with validations at run time.



# FUNCTIONALITIES?
____________________
* 'Create Form' and 'Fill Form' are the two main functional components of this app.
* Create Form Link: Leads to the 'form creator' page where the definition of a new form, it's elements and validation constraints can be configured and saved.
* Fill Form Link: Leads to the page where a 'form'  (created using the above page) can be selected to fill data and submit.

## IMPORTANT NOTE - SAMPLE PRE-BUILT FORM:
* A sample form will be injected ('Ticket Tracker ') to application's state as soon as (and only if) one visits to the FORM CREATOR Page.
* The sample 'Ticket Tracker' form can be later selected from FORMS PANEL (cab be accessed by clicking the 'FILL FORM' button from the home page).

## CREATE FORM -> FORM CREATOR PAGE - EDITOR & PREVIEW PANELS:
* Form Creator Page has the Editor and Preview panels. 




# EDITOR PANEL:
_________________
* Editor panel has options to define the form definition.

### Form ID: (Generated field)
* Generated and managed by the application itself.

### Form Display Name: (Optional field)
* Name to display as a form header.

### Element ID: (Generated field)
* Generated and managed by the application itself.

### Element Display Label: (Mandatory field)
* Acts as the display label of the specifying element. 

### Element Type: (Optional field)
* As of now supports two options (can be extended easily though) 'text' for text box elements and 'select' for drop downs.
* NOTE: Default is 'text'.
* NOTE: If 'select' option is selected, the list of options should be defined in 'Element Options' field (as comma separated values).
* NOTE: 'RegEx pattern' option allows one to add regex based constrains for the values of this selected element type.

### Require Element: (Optional field)
* If selected is 'Yes', then the generated form cannot be submitted without providing a valid value to this element.
* NOTE: Default is 'No'.

### RegEx pattern: (Optional field)
* Accepts a regular expression to be validated for the element's value during the form submission.

### Element Options:  (Optional field, should be given for the elements of type 'select')
* Accepts comma (,) separated values that will be used as options for drop down elements (If Element Type was selected as 'select').

### Parent (all) element ids: (Optional field)
* Comma separated element IDs can be specified.
* If given, then this element will get displayed only if 'all' the specified parent elements are active and are filled with valid data.
* NOTE: Element ID can be noted during the element creation or in the preview panel (details are given below).
* EXAMPLE: e1,e2,e3
  This implies that this element will be displayed only if all three elements with IDs 'e1', 'e2' and 'e3' are verified to be active and provided with valid data (based on the constraints configured).

### Parent (any) element ids: (Optional field)
* Comma separated element IDs can be specified.
* If given, then this element will get displayed only if any 'one' or 'more' of the specified parent element(s) is/are active and are filled with valid data.
* NOTE: Element ID can be noted during the element creation or in the preview panel.
* EXAMPLE: e1,e2,e3
  This implies that this element will be displayed only if 'one' or 'more' of the elements 'e1', 'e2' and 'e3' are active and provided with valid data.

### Parent element id with value: (Optional field)
* A single colon (:) separated element id and it's expected value can be specified.
* NOTE: Element ID can be noted during the element creation or in the preview panel.
* EXAMPLE: 
  e1:yes 
  This implies that this element will be displayed only if element with id 'e1' is active and provided/selected with value 'yes'.

### Mix of various parent element options:
* More than one of the above defined parent element fields can be used simultaneously.

### 'Add Element' Button:
* Adds the specified element to the form definition.
* One can choose to add more element definitions, or can click on 'Submit Form' button.

### 'Submit Form' Button:
* Saves the form definition along with the element definitions and will take one to the home page.




# PREVIEW PANEL:
__________________
* Added form elements will get displayed in preview panel until the 'Submit Form' button is clicked.
* Elements can be 'reordered' using the /\ and \/ arrow buttons.
* NOTE: Element IDs can be noted from the preview panel.
* NOTE: This panel is only to display the elements, and to enable re-ordering. Constraints will not be enforced in this panel (might be added in upcoming versions though).




# FILL FORM -> FORMS PANEL PAGE:
__________________________________
* 'Forms Panel' page is where one can select the previously defined form templates (Read the following note section to know about the sample template).
* Selected form template will be visible once the 'select' button is clicked.
* Selected form can now be filled and submitted after successful validation.
* Color code is in place to differentiate whether the values of form elements are valid or not (highlighted by red dotted border).
* Only a form with valid element values can be submitted.

##IMPORTANT NOTE:
* The available form template list will contain a SAMPLE FORM TEMPLATE - 'Ticker Tracker' if one had visited the FORM CREATOR page earlier (Using Create Form Link).
* If sample form is not being displayed, in order to get the SAMPLE FORM TEMPLATE - 'Ticker Tracker', visit the FORM CREATOR Page and come back to this page (Forms Panel Page).

NOTE: On form submission the element numbering is left intentionally as that of the defined element order for clear concept illustration (i,e. for example, if the 3rd element of a form is hidden, still the 4th element will be shown with order id '4' in the display even though it gets displayed as a 3rd element since the actual 3rd element is hidden).  




# OTHER NOTES:
________________
* This project was generated with Angular CLI version 9.0.2.
* The app handles the data in memory (no external API services).



              ______________________________________________________________________________________
              
              
## Development server
_____________________
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Code scaffolding
_____________________
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
________
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running unit tests
_____________________
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running end-to-end tests
___________________________
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Further help
________________
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
