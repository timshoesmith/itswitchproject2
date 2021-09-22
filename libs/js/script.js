//Get All Contacts

    $.ajax({
        url: "libs/php/getAll.php",
        type: 'POST',
        dataType: 'json',
        data: {
          
        },
        success: function(result) {					
                                                            
            if (result.status.name == "ok") {
                let contacts = [];
                let row = "";
              
                result['data'].forEach(element => {
                   row =   `<tr><td>${element['firstName']}</td>
                            <td>${element['lastName']}</td>
                            <td>${element['jobTitle']}</td>
                            <td>${element['email']}</td>
                            <td>${element['department']}</td>
                            <td>${element['location']}</tr>`
                            contacts.push(row);
                   
                })
                $('#allContacts').html(contacts);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Open all countries on load call failed ' + errorThrown);
        }
    }); 	

    //Get departments and add to dropdown menu in desktop

    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        data: {
          
        },
        success: function(result) {					
            let menu = ['<option value="">(Selected a Department)</option>'];
            let menuItem = '';                                             
            result['data'].forEach(element => {
                menuItem =  `<option value=${element['id']}>${element['name']}</option>`;
               
                menu.push(menuItem);
             })
             $('#departmentMenu').html(menu);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Open all countries on load call failed ' + errorThrown);
        }
    }); 
    //Get locations and add to dropdown menu in desktop  
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
        data: {
          
        },
        success: function(result) {					
            let menu = ['<option value="">(Selected a Location)</option>'];
            let menuItem = '';                                             
            result['data'].forEach(element => {
                menuItem = `<option value=${element['id']}>${element['name']}</option>`;
                menu.push(menuItem);
             })
             $('#locationMenu').html(menu);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Open all countries on load call failed ' + errorThrown);
        }
    }); 	

//Select Menu function for location in desktop
    $('#departmentMenu').change(function(){
        alert('I am a lert dept : ' + $("#departmentMenu").val());
    });  
//Select Menu function for location in desktop
    $('#locationMenu').change(function(){
        alert('I am a lert dept : ' + $("#locationMenu").val());
    });
