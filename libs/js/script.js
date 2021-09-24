
//Function sets up all database
function setUp() {

//Set place holder in search field
    $('#search').val('Search By Name...');
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
                    row =   `<tr>
                                <td>${element['id']}</td>
                                <td>${element['firstName']}</td>
                                <td>${element['lastName']}</td>
                                <td>${element['jobTitle']}</td>
                                <td>${element['email']}</td>
                                <td>${element['department']}</td>
                                <td>${element['location']}</td>
                                <td><button onClick=getPersonelRecord(${element['id']})>Edit</button></td>
                                </tr>`
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
    }

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

                                row =   
                                
                                `<tr>
                                <td>${element['id']}</td>
                                <td>${element['firstName']}</td>
                                <td>${element['lastName']}</td>
                                <td>${element['jobTitle']}</td>
                                <td>${element['email']}</td>
                                <td>${departmentName}</td>
                                <td>${locationName}
                                <td><button onClick=getPersonelRecord(${element['id']})>Edit</button></td>
                                </tr>`;





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

            //set up database
            setUp();
            $("#search").keyup(function() {
                var searchCharacters = $(this).val();
                if(searchCharacters!='') {
                    console.log(searchCharacters)                  
                    $.ajax({
                        url:'libs/php/searchPersonnel.php',
                        method: 'post',
                        data: {
                            searchCharacters: searchCharacters
                        },
                        success: function(result) {
                          
                            let contacts = [];
                            let row = "";
                
                        result['data'].forEach(element => {
                        row =   `<tr>
                                    <td>${element['id']}</td>
                                    <td>${element['firstName']}</td>
                                    <td>${element['lastName']}</td>
                                    <td>${element['jobTitle']}</td>
                                    <td>${element['email']}</td>
                                    <td>${element['department']}</td>
                                    <td>${element['location']}</td>
                                    <td><button onClick=getPersonelRecord(${element['id']})>Edit</button></td>
                                    </tr>`
                                    contacts.push(row);
                        
                        });
                                 $('#allContacts').html(contacts);
                            }                       
                    });              
            }
            //go back to full database
            else {                 
                setUp();
                }             
            });        
        });
   

//function opens the modal and populates the persons data
        function getPersonelRecord(id) {
            $.ajax({
                url:'libs/php/getPersonByID.php',
                method: 'post',
                data: {
                    id: id
                },
                success: function(result) {
                    $('#modalTitle').html('Employee Details');
                    $('#modalDetails').html(
                         `<tr><th>Info</th><th>Info</th></tr>
                    <tr><td>ID</td><td>${result['data'][0]['id']}</td></tr>
                    <tr><td>FirstName</td><td>${result['data'][0]['firstName']}</td></tr>
                    <tr><td>lastName</td><td>${result['data'][0]['lastName']}</td></tr>
                    <tr><td>email</td><td>${result['data'][0]['email']}</td></tr>
                    <tr><td>Department</td><td>${result['data'][0]['department']}</td></tr>
                    <tr><td>Location</td><td>${result['data'][0]['location']}</td></tr>`);                    
                }
            });
            // $('#addButton').css('display', 'none');
            $("#detailsModal").modal('show');
        }
//function opens the modal and lists departments




          //Get departments and display in modal in desktop
          function showAllDepartments() {
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: 'POST',
            dataType: 'json',
            data: {
            },
            success: function(result) {					
                let departments = [];
                let row = "";
    
            result['data'].forEach(element => {
                row =   `<tr><td>${element['id']}</td><td>${element['name']}</td></tr>`
                departments.push(row);
            });
                    $('#modalDetails').html(departments);
                    $("#detailsModal").modal('show');
                   


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Open all departments failed on load call failed ' + errorThrown);
            }
        }); 
       
    }
//Get locations and show in modal in desktop  
        function showAllLocations() { 
        $.ajax({
            url: "libs/php/getAllLocations.php",
            type: 'POST',
            dataType: 'json',
            data: {
            
            },
            success: function(result) {	
                console.log(result)				
                let locations = [];
                let row = '';                                             
                result['data'].forEach(element => {
                    row = `<tr><td>${element['id']}</td><td>${element['name']}</td></tr>`;
                    locations.push(row);
                })
                $('#modalDetails').html(locations);
                $("#detailsModal").modal('show');


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Open all locations failed on load call failed ' + errorThrown);
            }
        }); 
    }	

//pulls up full database when modal is closed and resets the value
        $('#detailsModal').on('hidden.bs.modal', function () {
            setUp();
        });













   