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
      fitColumns:true, //fit columns to width of table (optional)
      tooltips:true,
      tooltipsHeader:true,
      progressiveRenderSize:50,      
      columns:[ //Define Table COlumns
          {title:"Model #", field:"model", sorter:"number", sortable:false, width:"65"},
          {title:"User", field:"email", sorter:"string", sortable:true, formatter:"email"},
          {title:"Input", field:"input", sorter:"string", sortable:false},
          {title:"Output", field:"output", sorter:"string", sortable:false},
          {title:"Crosslinking Used", field:"crosslinking", sorter:"boolean", sortable:true, formatter:"tickCross"},
          {title:"NoOfLayers", field:"layer", sorter:"number", sortable:true},
          {title:"LayerHeight", field:"height", sorter:"number", sortable:true},
          {title:"Wellplate", field:"wellplate", sorter:"number", sortable:true},
          {title:"AliveCells", field:"live", sorter:"number", sortable:true, formatter:"progress"},
          {title:"DeadCells", field:"dead", sorter:"number", sortable:true, formatter:"progress", formatterParams:{color:"#dd1400"}},
          {title:"Elasticity", field:"elasticity", sorter:"number", sortable:true},
      ],
      pagination:true,
  });

  $("#example-table").tabulator("setData", tabledata);


  $('#noOfRows').change(function(){        
    $("#example-table").tabulator("setPageSize", Number(this.value));
  });

  function searchAlive(rowData){
    var min = 0;
    var max = 100;
    if($('#seachAliveMin').val().length > 0){
      min = $('#seachAliveMin').val();
    }
    if($('#seachAliveMax').val().length > 0){
      max = $('#seachAliveMax').val();
    }    
    return  min <= rowData.live && max >= rowData.live;
  }

  function searchDead(rowData){
    var min = 0;
    var max = 100;
    if($('#seachDeadMin').val().length > 0){
      min = $('#seachDeadMin').val();
    }
    if($('#seachDeadMax').val().length > 0){
      max = $('#seachDeadMax').val();
    }    
    return  min <= rowData.dead && max >= rowData.dead;
  }

  function searchAll(rowData){
    var minAlive = 0;
    var maxAlive = 100;
    var minDead = 0;
    var maxDead = 100;
    var ignoreEmail = false;
    var ignoreModel = false;
    if($('#seachAliveMin').val().length > 0){
      minAlive = $('#seachAliveMin').val();
    }
    if($('#seachAliveMax').val().length > 0){
      maxAlive = $('#seachAliveMax').val();
    }

    if($('#seachDeadMin').val().length > 0){
      minDead = $('#seachDeadMin').val();
    }
    if($('#seachDeadMax').val().length > 0){
      maxDead = $('#seachDeadMax').val();
    }
    if($('#seachEmail').val().length <= 0){
      ignoreEmail = true;
    }
    if($('#seachModel').val().length <= 0){
      ignoreEmail = true;
    }
    
    return  minAlive <= rowData.live && maxAlive >= rowData.live && 
            minDead <= rowData.dead && maxDead >= rowData.dead &&
            (ignoreModel ||  rowData.model == $('#seachModel').val()) &&
            (ignoreEmail ||  rowData.email.indexOf($('#seachEmail').val()) > -1);
  }

  // Searching using model #
 /* $('#seachModel').on('propertychange input', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged) {    
        if(this.value.length <= 0){          
          $("#example-table").tabulator("setFilter");
        }
        else{
          $("#example-table").tabulator("setFilter", "model", "=", this.value);
        }
    }
  });

  // Searching using email.
  $('#seachEmail').on('propertychange input', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged){
      if(this.value.length <= 0){          
        $("#example-table").tabulator("setFilter");
      }
      else{
        $("#example-table").tabulator("setFilter", "email", "like", this.value);
      }
    }
  });

  // Searching alive cell Min
  $('#seachAliveMin').on('propertychange input', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged){
      $("#example-table").tabulator("setFilter", searchAlive);
    }
  });
  
  $('#seachAliveMax').on('propertychange input', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged){
      $("#example-table").tabulator("setFilter", searchAlive);
    }
  });

  // Searching alive cell Min Max
  $('#seachDeadMin').on('propertychange input', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged){
      $("#example-table").tabulator("setFilter", searchDead);
    }
  });
  
  $('#seachDeadMax').on('propertychange input', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged){
      $("#example-table").tabulator("setFilter", searchDead);
    }
  });*/

  var typingTimer;
  var doneTypingInterval = 400;
  $('#seachModel').keyup(function(){
    clearTimeout(typingTimer);    
    typingTimer = setTimeout(function(){
      if($('#seachModel').val().length <= 0){          
        $("#example-table").tabulator("setFilter");
      }
      else{
        $("#example-table").tabulator("setFilter", "model", "=", $('#seachModel').val());
      }
    }, doneTypingInterval);
  });

  $('#seachEmail').keyup(function(){
    clearTimeout(typingTimer);    
    typingTimer = setTimeout(function(){
      if($('#seachEmail').val().length <= 0){          
        $("#example-table").tabulator("setFilter");
      }
      else{
        $("#example-table").tabulator("setFilter", "email", "like", $('#seachEmail').val());
      }
    }, doneTypingInterval);
  });

  $('#seachAliveMin').keyup(function(){
    clearTimeout(typingTimer);    
    typingTimer = setTimeout(function(){
      $("#example-table").tabulator("setFilter", searchAlive);
    }, doneTypingInterval);
  });
  $('#seachAliveMax').keyup(function(){
    clearTimeout(typingTimer);    
    typingTimer = setTimeout(function(){
      $("#example-table").tabulator("setFilter", searchAlive);
    }, doneTypingInterval);
  });

  $('#seachDeadMin').keyup(function(){
    clearTimeout(typingTimer);    
    typingTimer = setTimeout(function(){
      $("#example-table").tabulator("setFilter", searchDead);
    }, doneTypingInterval);
  });
  $('#seachDeadMax').keyup(function(){
    clearTimeout(typingTimer);    
    typingTimer = setTimeout(function(){
      $("#example-table").tabulator("setFilter", searchDead);
    }, doneTypingInterval);
  });  

  $("#allFilters").click(function(){
      $("#example-table").tabulator("setFilter", searchAll);
  });

  $("#clearAll").click(function(){
      $("#seachModel").val('');
      $("#seachEmail").val('');
      $("#seachAliveMin").val('');
      $("#seachAliveMax").val('');
      $("#seachDeadMin").val('');
      $("#seachDeadMax").val('');
      $("#example-table").tabulator("setFilter");
  });

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