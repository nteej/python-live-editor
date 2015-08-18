The basic functionality of the LiveEditor is explained in a previous wiki [here](https://github.com/Khan/live-editor/wiki/How-the-live-editor-works)  

The editor was initially made for ProcessingJS, with workers for learner friendly code hints (baby hint), linting, and testing the assignments. It is a comprehensive build, but recently there have been experimental explorations in integrating developer environments for HTML, SQLite, and Python. The modularity of the tool allows it to be leveraged to run any language that can be compiled/interpreted using JS in the browser. 

As the SQLite and Webpage experiments are lighter versions, they are a good starting point to understand the architecture to integrate a new language. The SQL implementation in LiveEditor can be seen in "demo/simple" folder in the sql.html and output-sql.html files.   

The sql.html file is where the LiveEditor object is declared and the UI for the IDE is loaded. The code output is rendered in output-sql.html and is embeded in the sql.html file in an iframe. Each of these files have a div with an id which is provided to a handlebars template to render the corresponding view. They also have js dependencies which are generated through a gulp build processes. The paths of the files that generate these dependencies can be traced from the from the build-paths.json.   

An abstract LiveEditor object declaration is shown below with &lt;language&gt; placeholder :

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

Follow the steps below to get started in integrating your library into the LiveEditor:

1. Follow the 'Building' instructions in the [Readme.md](https://github.com/Khan/live-editor/blob/master/README.md)   

2. Create a template for language's output file  
In "tmpl" folder create a handlebars template &lt;language&gt;-results.handlebars

3. Add dependencies for in-browser compiler/interpreter  
In the "external" folder, create a folder for the new language's in-browser compiler/interpreter and copy the corresponding JS files to the folder.

4. Create Backbone view for code output   
In "js/output" folder, create a folder for the new language, and create &lt;language&gt;-output.js file. Create a Backbone view for the language's output (refer "sql-output.js" file in the "js/output/sql" folder for exact syntax), window.&lt;language&gt;Output, and following functions:  

    - initialize  
        config, output - set from caller's config  
        call the render method
    - render  
        find the output element and set the contents of it
    - lint  
        takes two parameters userCode and skip word  
        run the code through all the lines of input code, catch all the errors and return them as an array of object through deferred object as shown below:     
        errors caught in lint can be sent to "oh noes" via $.Deferred()  
        create a new object   
                ```var deferred = $.Deferred();```   
        send the errors to the "resolve" method of deferred object   
        
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
        here "results" is the result of the userCode compilation from the language's JS compiler dependency.  
        get the output iframe document and write the "output" variable to it.  
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
In the build-paths.json, change/add the following under the scripts object:

    Add ace mode for the language to the "editor_ace_deps"'s array.
    Most of the time it should be of the format mode-&lt;language&gt;.js, but you can check the exact filename in bower_components/ace-builds/src-noconflict/ location.

    Add output_&lt;language&gt;_deps array - listing language compiling/interpreting dependencies
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

After the build process these are the new/changed files :

```
build   
    |_ js   
    |   |_ live-editor.editor_ace_deps.js   
    |   |_ live-editor.output_<language>_deps.js   
    |   |_ live-editor.output_<language>.js   
    |   
    |_ tmpl   
        |_ <language>-results.js   
demos   
    |_ simple   
        |_ <language>.html   
        |_ output_<language>.html   
```

Test the code at localhost:8000/demos/simple/&lt;language&gt;.html

Once the language is integrated into the LiveEditor environment, build workers for linting, hinting, and testing the code.
