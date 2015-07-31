- Created copy of sql.html and output_sql.html files in demo/simple and renamed them for python
- Changed default code to print Hello World! or function
- in liveEditor object changed all sql mentions to python
- in build-paths.json 
    + added python to ace deps
    + created a prop for output_python_deps
        * included Skulpt dist in it
    + created a prop for output_python
- in js/editors/ace/editor-ace.js added python as editor type
- js/output copied the sql folder and renamed file and folder for python
- in js/output/python/python-output.js 
    + renamed SQLOutput to PythonOutput and at the bottom of the file registered it
    + kept only critical functions and commented rest of them out
    + in runCode called Skulpt's Sk.configure to configure output to outf function 
    + called Skulpt's eval
    + added outf to PythonOutput
    + couldn't get the Handlebars output to run so hardcoded the value of div to output from Skulpt through global javascript variable in output_python.html
- hid the scratchpad-canvas-loading gif in python html style