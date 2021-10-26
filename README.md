# Testovic
Initial project with example solution and basic data.

* Create github profile or sign up to your profile
* Make fork from public repo JSpeci/Testovic as public repo
* Read instructions

## Instructions

* Install node.js to your computer
* Open terminal (iam using terminal in VSCode)
* Go to https://www.telerik.com/kendo-react-ui/
* Start free trial account, or use your own license, if you have.
* Go to https://www.telerik.com/kendo-react-ui/my-license/ or https://www.telerik.com/kendo-react-ui/getting-started/
* On this page you can get your trial 30day trial key
* Download that key and paste it next to *package.json* file
* terminal: in folder with package.json run **npm install**
* terminal: **npm install --save @progress/kendo-licensing**
* terminal: **npx kendo-ui-license activate**
* It takes some time to download and install all dependencies listed in *package.json* file
* Now you should be able to build it
* terminal: **webpack**
* Now you have dist folder next to src folder
* terminal: **npm run start**
* Open web browser and go to localhost:1234/dist

## Test Level1 instructions
* Study the structure of the project, run it and use "debugger" if necessary
* Fix css on monitoring library detail
* Open another terminal and run: **npx jest**, there should be two skipped tests
* Implement two tests in *"LibrariesListQuery.tests.ts"* ( use jest, react-testing-library, enzyme, etc..)
* Inspect, why *NewMonitoringLibraryDialog* did not appear and fix that
* Write tests checking that: 
    * Dialog is shown after New Monitoring Library button clicked
    * Dialog has name field
    * New library was added to dummy server libs array
    * New library is shown in table
* Another tests:
    * Test if there is a table
    * Test if the table has columns Name, CountOfPools, Questions
* Write empty/skipped tests on appearance for Monitoring Library Detail
* Do all with respect to current structure of app
## Test Level2 instructions
* Add Are you sure dialog, use Kendo react dialogs, for Delete Library button on Monitoring Library Detail
* Add empty tests for Library Deletion (appearance of dialog, appearance of table, value deletion from list). Test names should reflect expected behaviour.
* Implement tests - use MobxProvider to provide store to component in test
* Implement delete command with respect to your tests and project structure

## Q&A
* If you have any questions during the work, feel free to contact me
* When you're done, send a message and I will pull your repository and check the result
