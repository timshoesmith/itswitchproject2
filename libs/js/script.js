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
                                <td>${element['department']}</td>
                                <td>${element['location']}<td>
                                <button onClick=getPersonelRecord(${element['id']})>Edit</button></td>
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
            let contacts = [];
            let row = "Im a row";                      
                    //Get personel by location id dropdown menu in desktop  
                $.ajax({
                    url: "libs/php/getPersonelByLocation.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: $("#locationMenu").val()
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
                            <td>${element['department']}</td>
                            <td>${element['location']}<td>
                            <button onClick=getPersonelRecord(${element['id']})>Edit</button></td>
                            </tr>`;
                            contacts.push(row);                                                          
                    })
                    $('#allContacts').html(contacts);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Get pesonel by location ID call failed ' + errorThrown);
                }
                
            }); 
    });  
//Search By Name
        $(document).ready(function() {
            //set up database
            setUp();
            $("#search").keyup(function() {
                var searchCharacters = $(this).val();
                if(searchCharacters!='') {                
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
                    //Add on clicks to buttons          
                    $("#addButton").prop("onclick", null).off("click");
                    $("#addButton").click(function(){
                        alert("add Button Person");
                    });
                    $("#updateButton").prop("onclick", null).off("click");
                    $("#updateButton").click(function(){
                    alert("update Button Person");
                    });
                    $("#deleteButton").prop("onclick", null).off("click");
                    $("#deleteButton").click(function(){
                        alert("delete Button Person");
                    });
               }


//DEPARTMENT CODE START///////////////////////////////////////////////////
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
                row =   `<tr onClick="showDepartment(${element['id']})"><td>${element['id']}</td><td>${element['name']}</td></tr>`
                departments.push(row);
            });
                    $('#modalTitle').html('Departments');
                    $('#modalDetails').html(departments);
                    $("#detailsModal").modal('show');
                    //Add on clicks to buttons          
                    $("#addButton").prop("onclick", null).off("click");
                    $("#addButton").click(function(){
                        alert("add Button Department");
                    });
                    $("#updateButton").prop("onclick", null).off("click");
                    $("#updateButton").click(function(){
                    alert("update Button Department");
                    });
                    $("#deleteButton").prop("onclick", null).off("click");
                    $("#deleteButton").click(function(){
                        alert("delete Button Department");
                    });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Open all departments failed on load call failed ' + errorThrown);
            }
        });       
    } 

//Show single department to update
function showDepartment(x) {
    $.ajax({
        url: "libs/php/getDepartmentByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
            id: x
        },
        success: function(result) {	
            console.log(result)		                 
           $('#updateModalTitle').html('Update Department');
            let form =
                `<td>${result['data'][0]['id']}</td>
                <td><input type="text" id="updateDepartmentName" value="${result['data'][0]['name']}"></td>`                  
                $('#updateModalDetails').html(form);
                            
            let modalFooter = 
                `<button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;                   
                 $('#updateModalFooter').html(modalFooter);                  
            
            $("#updateModal").modal('show');
            $("#saveUpdateModal").click(function(){
                updateDepartment(result['data'][0]['id'], $("#updateDepartmentName").val());
                $('#updateModal').modal('hide');
                showAllDepartments();                      
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}
//update department function
function updateDepartment(id,department) {
    console.log
    $.ajax({
        url: "libs/php/updateDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: id,
            department: department
        },
        success: function(result) {			                  
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Update locations failed on load call failed ' + errorThrown);
        }
    }); 
};























//DEPARTMENT CODE END///////////////////////////////////////////////////
//LOCATION CODE START///////////////////////////////////////////////////

    //Get locations and show in modal in desktop  
        function showAllLocations() { 
        $.ajax({
            url: "libs/php/getAllLocations.php",
            type: 'POST',
            dataType: 'json',
            data: {
            
            },
            success: function(result) {			
                let locations = [];
                let row = '';                                             
                result['data'].forEach(element => {
                    row = `<tr onClick="showLocation(${element['id']})"><td>${element['id']}</td><td>${element['name']}</td></tr>`;
                    locations.push(row);
                })
                $('#modalTitle').html('Locations');
                $('#modalDetails').html(locations);
                $("#detailsModal").modal('show');
                //Add on clicks to buttons          
                $("#addButton").prop("onclick", null).off("click");
                $("#addButton").click(function(){
                    alert("add Button Location");
                });
                // $("#updateButton").prop("onclick", null).off("click");
                // $("#updateButton").click(function(){
                //     $("#locationUpdateModal").modal('show');
                // });
                $("#deleteButton").prop("onclick", null).off("click");
                $("#deleteButton").click(function(){
                    alert("delete Button Location");
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Open all locations failed on load call failed ' + errorThrown);
            }
        }); 
    }	

//Show single location to update
        function showLocation(x) {
            $.ajax({
                url: "libs/php/getLocationByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: x
                },
                success: function(result) {			                 
                   $('#updateModalTitle').html('Update Location');
                    let form =
                        `<td>${result['data'][0]['id']}</td>
                        <td><input type="text" id="updateLocationName" value="${result['data'][0]['name']}"></td>`                  
                        $('#updateModalDetails').html(form);
                                    
                    let modalFooter = 
                        `<button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;                   
                         $('#updateModalFooter').html(modalFooter);                  
                    
                    $("#updateModal").modal('show');
                    $("#saveUpdateModal").click(function(){
                        updateLocation(result['data'][0]['id'], $("#updateLocationName").val());
                        $('#updateModal').modal('hide');
                        showAllLocations();                      
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Open all locations failed on load call failed ' + errorThrown);
                }
            }); 
        }
//update location function
            function updateLocation(id,location) {
                console.log
                $.ajax({
                    url: "libs/php/updateLocation.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: id,
                        location: location
                    },
                    success: function(result) {			                  
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('Update locations failed on load call failed ' + errorThrown);
                    }
                }); 
            };
        

//LOCATION CODE END////////////////////////////////////////////////////////



//pulls up full database when modal is closed and resets the value
        $('#detailsModal').on('hidden.bs.modal', function () {
            setUp();
        });













   