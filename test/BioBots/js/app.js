var jsonData = $.getJSON( "http://darshanwashimkar.github.io/test/BioBots/bioprint-data.json",{
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  },function() {
  console.log( "success" );
})  
  .fail(function() {
    alert("Unable to read JSON file");
    console.log( "error" );
  });


jsonData.done(function(data) {  
  $.each(data, function(i,eachPrint){
      if(eachPrint['print_info']['crosslinking']['cl_enabled'] == false){
        cl = 'class="warning"';
      }
      else{
        cl = '';
      }
      $('#data_presenter > tbody:last-child').append(                
        '<tr>'+
          '<td>'+eachPrint['user_info']['serial']+'</td>' +
          '<td>'+eachPrint['user_info']['email']+'</td>' +
          '<td '+cl+'>'+eachPrint['print_info']['crosslinking']['cl_duration']+'</td>' +
          '<td '+cl+'>'+eachPrint['print_info']['crosslinking']['cl_intensity']+'</td>' +
          '<td>'+eachPrint['print_info']['files']['input']+'</td>' +
          '<td>'+eachPrint['print_info']['files']['output']+'</td>' +
          '<td>'+eachPrint['print_info']['pressure']['extruder1']+'</td>' +
          '<td>'+eachPrint['print_info']['pressure']['extruder2']+'</td>' +
          '<td>'+eachPrint['print_info']['resolution']['layerHeight']+'</td>' +
          '<td>'+eachPrint['print_info']['resolution']['layerNum']+'</td>' +
          '<td>'+eachPrint['print_info']['wellplate']+'</td>' +
          '<td>'+eachPrint['print_data']['livePercent']+'</td>' +          
          '<td>'+eachPrint['print_data']['elasticity']+'</td>' +
          '<td>'+eachPrint['print_data']['deadPercent']+'</td>' +
        '</tr>'
      );      
      if(i == 100){
        return(false);
      }
   });  
});