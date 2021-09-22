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
            let menu = [];
            let menuItem = '';                                             
            result['data'].forEach(element => {
                menuItem =  `<a value="${element['id']}" class="dropdown-item">${element['name']}</a>`;
                menu.push(menuItem);
             })
             $('#departmentMenu').html(menu);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Open all countries on load call failed ' + errorThrown);
        }
    }); 
    
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
        data: {
          
        },
        success: function(result) {					
            let menu = [];
            let menuItem = '';                                             
            result['data'].forEach(element => {
                menuItem =  `<a value="${element['id']}" class="dropdown-item">${element['name']}</a>`;
                menu.push(menuItem);
             })
             $('#locationMenu').html(menu);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Open all countries on load call failed ' + errorThrown);
        }
    }); 	
