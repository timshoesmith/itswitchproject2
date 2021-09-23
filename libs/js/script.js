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
//Select Menu function for department in desktop
        $('#departmentMenu').change(function(){
                let contacts = [];
                let row = "Im a row";
                let departmentName = "";
                let locationID = 1;
                let locationName = "";


                        //Get departments id  
                        $.ajax({
                            url: "libs/php/getDepartmentByID.php",
                            type: 'POST',
                            dataType: 'json',
                            data: {
                            id : $("#departmentMenu").val()
                            },
                            success: function(result) {	
                                departmentName = result['data'][0]['name'];
                                locationID = result['data'][0]['locationID'];
                                    //Get location id  
                        $.ajax({
                            url: "libs/php/getLocationByID.php",
                            type: 'POST',
                            dataType: 'json',
                            data: {
                            id : locationID
                            },
                            success: function(result) {	
                            
                                locationName = result['data'][0]['name'];
                                console.log(locationName)
                                            
                            
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log('Open Location by ID on load call failed ' + errorThrown);
                            }
                        }); 	
                            
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log('Open Department by ID on load call failed ' + errorThrown);
                            }
                        }); 
                        
                        //Get personel by dept id dropdown menu in desktop  
                    $.ajax({
                        url: "libs/php/getPersonelByDept.php",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            id: $("#departmentMenu").val()
                        },
                        success: function(result) {	
                                            
                    result['data'].forEach(element => {

                                row =   `<tr><td>${element['firstName']}</td>
                                <td>${element['lastName']}</td>
                                <td>${element['jobTitle']}</td>
                                <td>${element['email']}</td>
                                <td>${departmentName}</td>
                                <td>${locationName}</tr>`;
                                contacts.push(row);                           
                                
                        })
                        $('#allContacts').html(contacts);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('Get pesonel by department ID call failed ' + errorThrown);
                    }
                    
                }); 
        });  
//Select Menu function for location in desktop
        $('#locationMenu').change(function(){
            alert('I am a lert dept : ' + $("#locationMenu").val());     
        });

//Search By Name
        $(document).ready(function() {
            $("#search").keyup(function() {
                var searchText = $(this).val();
                if(searchText!='') {              

                $.ajax({
                    url: "libs/php/searchPersonnel.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        searchCharacters:  searchText
                    },
                    success: function(result) {	
                           console.log(result['data']);
                           console.log(searchText);
                            let row = '';
                            let results = [];
                           if( result['data'].length > 0) {
                               result['data'].forEach(row => {
                                row = "<a href='#' class='list-group-item list-group-item-action border-1'>" + row['lastName'] + "</a>"
                                results.push(row);
                            })
                        }
                        else {
                            row = "<p class='list-group-item border-1'>No Record</p>";
                            results.push(row);
                        }     

                        $('#show-list').html(results);
                
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Get pesonel by department ID call failed ' + errorThrown);
                }
                
            }); 

                }
            });
            $(document).on('click', 'a', function() {
                $("#search").val($(this).text());
                $('#show-list').html('');
            })
        });
















   