var jqxhr = $.getJSON( "http://darshanwashimkar.github.io/test/BioBots/bioprint-data.json", function() {
  console.log( "success" );
})  
  .fail(function() {
    alert("Unable to read JSON file"");
    console.log( "error" );
  });
