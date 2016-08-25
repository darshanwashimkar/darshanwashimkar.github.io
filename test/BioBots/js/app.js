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




//define some sample data
var tabledata = [
    {id:1, model:"1", email:"user0@gmail.com", input:"red", output:"dasd", crosslinking: "false", layer:"32", height:"0.8", wellplate:"42", live:"83.98", dead:"21.41", elasticity:"49.53"},
    {id:1, model:"1", email:"user0@gmail.com", input:"red", output:"dasd", crosslinking: "false", layer:"32", height:"0.8", wellplate:"42", live:"83.98", dead:"21.41", elasticity:"49.53"},
    {id:1, model:"1", email:"user0@gmail.com", input:"red", output:"dasd", crosslinking: "false", layer:"32", height:"0.8", wellplate:"42", live:"83.98", dead:"21.41", elasticity:"49.53"},
    {id:1, model:"1", email:"user0@gmail.com", input:"red", output:"dasd", crosslinking: "false", layer:"32", height:"0.8", wellplate:"42", live:"83.98", dead:"21.41", elasticity:"49.53"},
    {id:1, model:"1", email:"user0@gmail.com", input:"red", output:"dasd", crosslinking: "false", layer:"32", height:"0.8", wellplate:"42", live:"83.98", dead:"21.41", elasticity:"49.53"},
];


jsonData.done(function(data) {
  tabledata  = []
  $.each(data, function(i,eachPrint){
      var ele = {
        "id": i,
        "model": eachPrint['user_info']['serial'],
        "email" : eachPrint['user_info']['email'],
        "input" : eachPrint['print_info']['files']['input'],
        "output" : eachPrint['print_info']['files']['output'],
        "crosslinking" : eachPrint['print_info']['crosslinking']['cl_enabled'],
        "layer" : eachPrint['print_info']['resolution']['layerNum'],
        "height" : eachPrint['print_info']['resolution']['layerHeight'],
        "wellplate" : eachPrint['print_info']['wellplate'],
        "live" : eachPrint['print_data']['livePercent'],
        "dead" : eachPrint['print_data']['deadPercent'],
        "elasticity" : eachPrint['print_data']['elasticity']
      }
      tabledata.push(ele);
   });

  $("#example-table").tabulator({
      height:"320px", // set height of table (optional)
      fitColumns:true, //fit columns to width of table (optional)
      tooltips:true,
      tooltipsHeader:true,
      columns:[ //Define Table COlumns
          {title:"Model #", field:"model", sorter:"number", sortable:false, width:"62"},
          {title:"User", field:"email", sorter:"string", sortable:true, formatter:"email"},
          {title:"Input", field:"input", sorter:"string", sortable:false},
          {title:"Output", field:"output", sorter:"string", sortable:false},
          {title:"Crosslinking", field:"crosslinking", sorter:"boolean", sortable:true, formatter:"tickCross"},
          {title:"NoOfLayers", field:"layer", sorter:"number", sortable:true},
          {title:"LayerHeight", field:"height", sorter:"number", sortable:true},
          {title:"Wellplate", field:"wellplate", sorter:"number", sortable:true},
          {title:"AliveCells", field:"live", sorter:"number", sortable:true, formatter:"progress"},
          {title:"DeadCells", field:"dead", sorter:"number", sortable:true, formatter:"progress", formatterParams:{color:"#dd1400"}},
          {title:"Elasticity", field:"elasticity", sorter:"number", sortable:true},
      ],
      rowClick:function(e, id, data, row){ //trigger an alert message when the row is clicked
          alert("Row " + id + " Clicked!!!!");
      }, pagination:true,
  });
  
  $("#example-table").tabulator("setData", tabledata);  
});

//load sample data into the table


/*
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
      if(i == 1){
        return(false);
      }
   });  
});
*/