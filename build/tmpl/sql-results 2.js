this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["sql-results 2"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n        <h1>Database Schema</h1>\n    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <table class=\"sql-schema-table\" data-table-name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n        <thead>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasSingleRow), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </thead>\n        <tbody>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tbody>\n        </table>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <th><a href=\"javascript:void(0)\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a> <span class=\"row-count\">";
  if (helper = helpers.rowCount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rowCount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " row</span></th>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <th><a href=\"javascript:void(0)\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a> <span class=\"row-count\">";
  if (helper = helpers.rowCount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rowCount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " rows</span></th>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <tr><td>\n            ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pk), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <span class=\"column-type-wrap\"><span class=\"schema-column-type\">";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></span>\n            </td></tr>\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "<span class=\"schema-pk\">(PK)</span>";
  }

function program11(depth0,data) {
  
  
  return "\n        <h1>Results</h1>\n    ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <table class=\"sql-result-table\">\n        <thead>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </thead>\n        <tbody>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.values), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tbody>\n        </table>\n    ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <th>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</th>\n        ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.result), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tr>\n        ";
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                    ";
  stack1 = (helper = helpers.isNull || (depth0 && depth0.isNull),options={hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.data), options) : helperMissing.call(depth0, "isNull", (depth0 && depth0.data), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return "\n                        <td>NULL</td>\n                    ";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        <td>";
  if (helper = helpers.data) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.data); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    ";
  return buffer;
  }

  buffer += "<html>\n<head>\n\n<style>\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n    empty-cells: show;\n    width: 100%;\n    margin-bottom: 20px;\n}\ntable thead {\n    background: #e6e6e6;\n    color: #000;\n    text-align: left;\n    vertical-align: bottom;\n}\nth:first-child {\n    border-radius: 6px 0 0 0;\n}\nth:last-child {\n    border-radius: 0 6px 0 0;\n}\nth:only-child{\n    border-radius: 6px 6px 0 0;\n}\ntbody {\n    border: 1px solid #dbdbdb;\n}\ntd {\n    border: 1px solid #eeeeee;\n    font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;\n    font-size: inherit;\n    margin: 0;\n    overflow: visible;\n    padding: .3em 1em;\n}\nth {\n    font-family: \"Proxima Nova\", sans-serif;\n    padding: .4em 1em;\n}\nth a {\n    color: #699c52;\n}\nh1 {\n    clear: both;\n    color: #aaa;\n    font-family: \"Proxima Nova\", sans-serif;\n    font-size: 1.1em;\n    font-weight: normal;\n    margin-top: 10px;\n    text-transform: uppercase;\n}\ntable.sql-schema-table {\n    float:left;\n    width: auto;\n}\ntable.sql-schema-table .column-type-wrap {\n    float: right;\n    margin-left: 20px;\n    min-width: 70px;\n}\ntable.sql-schema-table .schema-pk {\n    color: #999;\n}\ntable.sql-schema-table .schema-column-type {\n    float: left;\n    color: #999;\n}\ntable.sql-schema-table + table.sql-schema-table {\n    margin-left: 10px\n}\ntable.sql-schema-table .row-count {\n    color: #999;\n    float: right;\n    margin-left: 30px;\n    text-align: right;\n    font-weight: normal;\n}\n</style>\n</head>\n\n<body>\n<div class=\"sql-output\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tables), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tables), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.results), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.results), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n</body>\n</html>\n";
  return buffer;
  });;