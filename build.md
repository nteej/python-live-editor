The basic functionality of the LiveEditor is explained in a previous wiki [here](https://github.com/Khan/live-editor/wiki/How-the-live-editor-works)

The functionality is transferable to other languages like SQL, HTML/CSS(Webpage), Python, or any other language that can be compiled/interpreted using JS.   

A good starting point is to go through the current implementation of SQL in LiveEditor as shown in "demo/simple" folder by sql.html and output-sql.html files.   
For sql.html, most of the code is generated through the gulp build process. The paths of these can be traced from the stylesheet and script files linked in the file from the build-paths.json.   
A div is allocated for handlebars to render the live-editor in, and the LiveEditor object is created by passing in the properties.   
An abstract LiveEditor object definition is shown below with &lt;language&gt; placeholder from the html file:

```
window.liveEditor = new LiveEditor({
        el: $("#sample-live-editor"),//el is the html element where live-editor handlebars templates will be rendered
        outputType: "<language>", // output type has to be registered in js/output/<language>-output.js as discussed later
        code: window.localStorage["test-code"] || "<default language code>",
        editorType: "ace_<language>", // has to be registered in "js/editors/ace/editor-ace.js"
        execFile: "output-&lt;language&gt;.html", // need to be created, can be seeded with output-sql.html
        /*Dependencies and view proprties*/
        /*Should not require any changes*/
        width: 400,
        height: 400,
        editorHeight: "70%",
        autoFocus: true,
        workersDir: "../../build/workers/", 
        externalsDir: "../../build/external/",
        imagesDir: "../../build/images/", 
        soundsDir: "../../sounds/",
        jshintFile: "../../build/external/jshint/jshint.js",
        useDebugger: false 
        /*Should not require any changes*/
    });


liveEditor.editor.on("change", function() {
        window.localStorage["test-code"] = liveEditor.editor.text();
}); // On change/edit stores the code to localstorage

```

Going through the sql.html and build-paths.json, we can get a fair estimate of the changes we need to do to integrate a new language in LiveEditor.
The following steps are based on reverse engineering the current implementation of languages incorporated after ProcessingJS, viz. sql and webpage:

1. Follow the Building instructions in the Readme.md

2. Create a template for language's output file  
In "tmpl" folder create a handlebars template &lt;language&gt;-results.handlebars

3. Add dependencies for in-browser compiler/interpreter  
In the "external" folder, create a folder for the new language's in-browser compiler/interpreter and copy the corresponding JS files to the folder.

4. Create Backbone view for code output   
In "js/output" folder, create a folder for the new language, and create &lt;language&gt;-output.js file. Create a Backbone view for the language's output (refer "sql-output.js" file in the "js/output/sql" folder for exact syntax), window.&lt;language&gt;Output, and following functions:  

    - initialize  
        config - set from caller's config  
        output - set from caller's config  
        call render  
    - render  
        find the output element and set the contents of it
    - lint  
        takes two parameters userCode and skip word  
        run the code through all the lines of code, catch all errors and return them  
        errors caught in lint can be sent to "oh noes" via $.Deferred()  
        create a new 
                ```var deferred = $.Deferred();```   
        add the errors to the "resolve" object of deferred
                ```
                deferred.resolve([{
                    row: <row number on which error occured>,
                    column: <column number on which error occured>,
                    text: <error text>,
                    type: "error",
                    source: "slowparse" // not sure what this is
                }]);
                ```
        
       return the deferred object.  
    - runCode  
        takes two parameters userCode and callback function  
        call the dependency library's function on userCode and set the code output to the Handlebars template created above, as follows    
                ```
                var output = Handlebars.templates["<language>-results"]({results: results, errors:errors});
                ```
        here "results" is the result of the userCode compilation from the language compiler dependency.  
        write the "output" variable to iframe in output file.  
        errors caught in runCode can be sent to "oh noes" via callback.  
        capture the errors in an array of objects and send them as "callback(errors, userCode)"  
        lastly register the output as:   
                ```LiveEditorOutput.registerOutput("<language>", <language>Output);```   

5. Add and register the language to ace configuration   
In "js/editors/ace/editor-ace.js", add ace_&lt;language&gt; array key, with specific tooltip options required for the language, and register it at the bottom of the page as:   
    ```
    LiveEditor.registerEditor("ace_<language>", AceEditor);
    ```   

6. Configure the build paths for the files created   
In the build-paths.json, you will need to change/add under the scripts object

    Add ace mode for the language to the "editor_ace_deps"'s array.
    Most of the time it should be of the format mode-&lt;language&gt;.js, but you can check the exact filename in bower_components/ace-builds/src-noconflict/ location.

    Apart from this you will need to add 
        output_&lt;language&gt;_deps array - for language compiling/interpreting dependencies
        output_language array - containing paths to the &lt;language&gt;-output.js and &lt;language&gt;-tester.js   

7. Setting up the home page and the output html pages   
In "demo/simple" folder create the language specific index and output html files as
&lt;language&gt;.html and &lt;language&gt;-output.html (refer sql.html and sql-output.html for specific syntax)

For &lt;language&gt;.html:  
    Copy the stylesheets and script dependencies from sql.html
    The scripts are compiled during the gulp build process.
    In the last script tag, change the defaultCode to the &lt;language&gt; code

Create a new LiveEditor object, set  
- "editorType" to ace_&lt;language&gt; (as defined in "js/editors/ace/editor-ace.js")  
- "output" to &lt;language&gt; (as defined in "js/output/&lt;language&gt;/&lt;language&gt;-output.js")  
- "el" as the element where the live-editor template will be loaded   
- "code" as window.localStorage["test-&lt;language&gt;-code"] || defaultCode   
- "execFile" as "output_&lt;language&gt;.html"   
    
set on-change listener for code change     
    ```
        liveEditor.editor.on("change", function() {
            window.localStorage["test-<language>-code"] = liveEditor.editor.text();
        });
    ```  
    
For &lt;language&gt;-output.html:  
    Copy the contents of "output_sql.html" and change the last two script sources to language specific ones:   
- &lt;script src="../../build/js/live-editor.output_&lt;language&gt;_deps.js"&gt;&lt;/script&gt;  
- &lt;script src="../../build/js/live-editor.output_&lt;language&gt;.js"&gt;&lt;/script&gt;   
    
Run gulp at the root location, in a new terminal window/tab run python server.
