//Function sets up all database
function setUp() {

    
    // add locationDropDown and Deartmentdropdown
    getLocationDropDown('#locationMenu');
    getDepartmentDropdown('#departmentMenu');
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
                    row =   `<tr onClick=getPersonelRecord(${element['id']})>
                                <td>${element['id']}</td>
                                <td>${element['firstName']}</td>
                                <td>${element['lastName']}</td>
                                <td>${element['jobTitle']}</td>
                                <td>${element['email']}</td>
                                <td>${element['department']}</td>
                                <td>${element['location']}</td>
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

}

//Get departments and add to dropdown menu in desktop
function getDepartmentDropdown(dropdownID)  {      
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
                    $(dropdownID).html(menu);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Open all countries on load call failed ' + errorThrown);
                }
            }); 
        }
    //Get locations and add to dropdown menu with id passed  
            
    function getLocationDropDown(dropdownID,locationMessage) {
            $.ajax({
                url: "libs/php/getAllLocations.php",
                type: 'POST',
                dataType: 'json',
                data: {
                
                },
                success: function(result) {					
                    let menu = ['<option value="">' + locationMessage + '</option>'];
                    let menuItem = '';                                             
                    result['data'].forEach(element => {
                        menuItem = `<option value=${element['id']}>${element['name']}</option>`;
                        menu.push(menuItem);
                    })
                    $(dropdownID).html(menu);
    
    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Open all countries on load call failed ' + errorThrown);
                }
            }); 	
        }
//Select Menu function for department with id passed
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
                                `<tr onClick=getPersonelRecord(${element['id']})>
                                <td>${element['id']}</td>
                                <td>${element['firstName']}</td>
                                <td>${element['lastName']}</td>
                                <td>${element['jobTitle']}</td>
                                <td>${element['email']}</td>
                                <td>${element['department']}</td>
                                <td>${element['location']}<td>
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
                            `<tr onClick=getPersonelRecord(${element['id']})>
                            <td>${element['id']}</td>
                            <td>${element['firstName']}</td>
                            <td>${element['lastName']}</td>
                            <td>${element['jobTitle']}</td>
                            <td>${element['email']}</td>
                            <td>${element['department']}</td>
                            <td>${element['location']}<td>
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
                        row =   `<tr onClick=getPersonelRecord(${element['id']})>
                                    <td>${element['id']}</td>
                                    <td>${element['firstName']}</td>
                                    <td>${element['lastName']}</td>
                                    <td>${element['jobTitle']}</td>
                                    <td>${element['email']}</td>
                                    <td>${element['department']}</td>
                                    <td>${element['location']}</td>
                                    </tr>`
                                    contacts.push(row);
                        
                        });
                                 $('#allContacts').html(contacts);
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log('search personel  call failed ' + errorThrown);
                            } 
                            
                            
                    });              
            }
            //go back to full database
            else {                 
                setUp();
                }             
            });        
        });

//PERSONNEL CODE START///////////////////////////////////////////////////


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
                    <tr><td>Job Title</td><td>${result['data'][0]['jobTitle']}</td></tr>
                    <tr><td>email</td><td>${result['data'][0]['email']}</td></tr>
                    <tr><td>Department</td><td>${result['data'][0]['department']}</td></tr>
                    <tr><td>Location</td><td>${result['data'][0]['location']}</td></tr>`);
                    
                    $('#updateButton').show();
                    $('#addButton').hide();
                    $('#deleteButton').show();
                    $('#detailsModalInstructions').hide();
                    $("#detailsModal").modal('show');
                    //Add on clicks to buttons          
                   
                    $("#updateButton").prop("onclick", null).off("click");
                    $("#updateButton").click(function(){
                    editPersonelRecord(id)
                    });
                    //delete button and confirmation modal
                    $("#deleteButton").prop("onclick", null).off("click");
                    $("#deleteButton").click(function(){
                        $('#titleConfirmationModal').html("Delete Personel");
                        $('#bodyConfirmationModal').html("Are you Sure You Want to Delete");
                        $('#confirmationActionButton').html("Delete");
                        $("#confirmationModal").modal('show'); 
                        
                        $("#confirmationActionButton").prop("onclick", null).off("click");
                        $("#confirmationActionButton").click(function(){
                            deletePersonel(id);
                            $("#confirmationModal").modal('hide');
                            $("#detailsModal").modal('hide');
                        });
                    
                    });
                       
                },

                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('get personel failed on load call failed ' + errorThrown);
                }



                
                   
                    });
        
        
        
                }

//<select id="departmentMenu" class="form-control" data-role="select-dropdown"></select>

function addDropDownToPersonnelUpdate(department) {
                $.ajax({
                    url: "libs/php/getAllDepartments.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                    
                    },
                    success: function(result) {					
                        let menu = ['<option value="">' + department + '</option>'];
                        let menuItem = '';                                             
                        result['data'].forEach(element => {
                            menuItem =  `<option value=${element['id']}>${element['name']}</option>`;
                        
                            menu.push(menuItem);
                        })
                        $('#updateDeptDropDown').html(menu);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('Open all countries on load call failed ' + errorThrown);
                    }
                }); 
};

             
//function opens the modal with input data fields ready for edit
function editPersonelRecord(id) {
    $.ajax({
        url:'libs/php/getPersonByID.php',
        method: 'post',
        data: {
            id: id
        },
        success: function(result) {         
            $('#detailsModal').hide();
            $('#updateModalTitle').html('Edit Employee Details');
            $('#updateModalDetails').html(
                 `<tr><th>Info</th><th>Info</th></tr>
            <tr><td>ID</td><td>${result['data'][0]['id']}</td></tr>
            <tr><td>FirstName</td><td><input type="text" id="updatePersonnelFirstName" value="${result['data'][0]['firstName']}"</td></tr>
            <tr><td>lastName</td><td><input type="text" id="updatePersonnelLastName" value="${result['data'][0]['lastName']}"></td></tr>
            <tr><td>Job Title</td><td><input type="text" id="updatePersonnelJobTitle" value="${result['data'][0]['jobTitle']}"></td></tr>
            <tr><td>email</td><td><input type="text" id="updatePersonnelEmail" value="${result['data'][0]['email']}"></td></tr>           
            <tr><td>Department</td><td><div class="form-group"> <select id="updateDeptDropDown" class="form-control" data-role="select-dropdown"></select></div></td><tr>           
            <tr><td>Location</td><td>${result['data'][0]['location']}</td></tr>`);  
            
            addDropDownToPersonnelUpdate(result['data'][0]['department']);           
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('edit personel failed on load call failed ' + errorThrown);
            }

            });
          
            let modalFooter =        
                `<button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeUpdateModal">Close</button>`;                              
             $('#updateModalFooter').html(modalFooter);         
             $("#updateModal").modal('show');
             console.log( $("#updateDeptDropDown option:selected").val())
             $("#saveUpdateModal").click(function(){
                updatePersonnel(id, 
                        $("#updatePersonnelFirstName").val(),
                        $("#updatePersonnelLastName").val(),
                        $("#updatePersonnelJobTitle").val(),
                        $("#updatePersonnelEmail").val(),
                        $("#updateDeptDropDown option:selected").val()
                        );
                
                $('#updateModal').modal('hide');
                $('#detailsModal').show();
                getPersonelRecord(id);                      
                });
            
            $("#closeUpdateModal").click(function(){          
                $('#updateModal').modal('hide');
                $('#detailsModal').show();
                getPersonelRecord(id);                      
                });
           
            }


//update Personnel function
function updatePersonnel(id, firstName, lastName, jobTitle, email, departmentID) {
    console.log
    $.ajax({
        url: "libs/php/updatePersonnel.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: id,
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            email: email,
            departmentID: departmentID

        },
        success: function(result) {			                  
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Update locations failed on load call failed ' + errorThrown);
        }
    }); 
};




//ADD Personel///////////////////////////////////////////////////////////

//Add Personel Code/////////////////////////////
function addPersonel(newFirstName, newLastName, newJobTitle, newEmail, newDepartment) { 
    console.log(newFirstName)
    console.log(newDepartment)
        $.ajax({
            url: "libs/php/addPersonel.php",
            type: 'POST',
            dataType: 'json',
            data: {
                newFirstName: newFirstName,
                newLastName: newLastName,
                newJobTitle: newJobTitle,
                newEmail: newEmail,
                newDepartment: newDepartment
            },
            success: function(result) {			                 
             console.log(result)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Add personel failed on load call failed ' + errorThrown);
            }
        }); 
}

function showAddPersonelModal() {
    $('#updateModalTitle').html('Add Personel');
                let form =
                   `<tr><th>Info</th><th>Info</th></tr>
                    <tr><td>ID</td><td></td></tr>
                    <tr><td>First Name</td><td><input type="text" id="addPersonelFirstName"></td></tr>
                    <tr><td>Last Name</td><td><input type="text" id="addPersonelLastName"></td></tr>
                    <tr><td>Job Title</td><td><input type="text" id="addPersonelJobTitle"></td></tr>
                    <tr><td>Email</td><td><input type="text" id="addPersonelEmail"></td></tr>
                    <tr><td>Department</td><td><div class="form-group"> <select id="updateDeptDropDown" class="form-control" data-role="select-dropdown"></select></div></td><tr>`                  
                    $('#updateModalDetails').html(form);
                    addDropDownToPersonnelUpdate("Select Department");          
                let modalFooter = 
                    `<button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;                   
                     $('#updateModalFooter').html(modalFooter);                  
                console.log($("#updateDeptDropDown option:selected").val());
                $("#updateModal").modal('show');
                $("#saveUpdateModal").click(function(){
                    addPersonel( $("#addPersonelFirstName").val(), $("#addPersonelLastName").val(), $("#addPersonelJobTitle").val(), $("#addPersonelEmail").val(),  $("#updateDeptDropDown option:selected").val());
                    $('#updateModal').modal('hide');
                    setUp();                      
                });
        
            }
        
//Delete Personel code

function deletePersonel(id) {
    $.ajax({
        url: "libs/php/deletePersonelByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
            id: id
        },
        success: function(result) {	
          
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}



 //PERSONNEL CODE ENDS///////////////////////////////////////////////////
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
                let departments = ["<tr><th>ID</th><th>Department</th><th>Location</td></tr>"];
                let row = "";
            
            result['data'].forEach(element => {
                row =   `<tr onClick="showDepartment(${element['id']})"><td>${element['id']}</td><td>${element['department']}</td><td>${element['location']}</td></tr>`
                departments.push(row);
            });               
                    $('#detailsModalInstructions').html('Click Department to edit');
                    $('#detailsModalInstructions').show();
                    $('#deleteButton').hide();
                    $('#updateButton').hide();
                    $('#addButton').show();

                    $('#modalTitle').html('Departments');
                    $('#modalDetails').html(departments);
                   
                    //Add on clicks to buttons          
                    $("#addButton").prop("onclick", null).off("click");
                    $("#addButton").click(function(){
                        showAddDepartmentModal();
                    });
                    $("#detailsModal").modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Open all departments failed on load call failed ' + errorThrown);
            }
        });       
    }; 

//Show single department to update and delete
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
            $('#updateModalTitle').show();	                 
           $('#updateModalTitle').html('Update Department');
            let form =
                `<td>${result['data'][0]['id']}</td>
                <td><input type="text" id="updateDepartmentName" value="${result['data'][0]['name']}"></td>
                <td> <div class="form-group"><select id="addLocationLocationID" class="form-control" data-role="select-dropdown"></select></div></td>`                      
                getLocationDropDown("#addLocationLocationID", result['data'][0]['location'], 'I need updating'); 
                                 
                $('#updateModalDetails').html(form);
                            
            let modalFooter = 
                `<button type="button" class="btn btn-outline-warning" id="deleteDepartmentButton">Delete</button>
                <button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;                   
                 $('#updateModalFooter').html(modalFooter);                  
            
            $("#updateModal").modal('show');
            $("#saveUpdateModal").click(function(){
                console.log($("#addLocationLocationID").val());
                console.log($("#updateDepartmentName").val());
                console.log(result['data'][0]['id']);
                updateDepartment(result['data'][0]['id'], $("#updateDepartmentName").val(), $("#addLocationLocationID").val());
                $('#updateModal').modal('hide');
                showAllDepartments();                      
            });
                       
            $("#deleteDepartmentButton").click(function(){
                
                
                
                //delete button and confirmation modal
                $("#deleteDepartmentButton").prop("onclick", null).off("click");
                $("#deleteDepartmentButton").click(function(){
                    $('#titleConfirmationModal').html("Delete Department");
                    $('#bodyConfirmationModal').html("Are you Sure You Want to Delete");
                    $('#confirmationActionButton').html("Delete");
                    $("#confirmationModal").modal('show'); 
                    
                    $("#confirmationActionButton").prop("onclick", null).off("click");
                    $("#confirmationActionButton").click(function(){

                        $.ajax({
                            url: "libs/php/getDepartmentIDs.php",
                            type: 'POST',
                            dataType: 'json',
                            data: {
                            
                            },
                            success: function(result) {					
                                let noDuplications = true
                                                                    
                                if (result.status.name == "ok") {
                                    result['data'].forEach(person => {
                                     if    (person['departmentID'] == x) {
                                       noDuplications = false;
                                     }

                                    });
                                    if (noDuplications == true) {
                                        deleteDepartment(x);
                                        $("#confirmationModal").modal('hide');
                                        $('#updateModal').modal('hide');
                                        showAllDepartments();
                                    }
                                    else {
                                        $('#bodyConfirmationModal').html("This Department is in use");
                                    }
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log('Open all countries on load call failed ' + errorThrown);
                            }
                        }); 	
                        
                        
                         
                    });
                   
                });
                
              
                                   
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}
//update department function
function updateDepartment(id,department, locationID) {
    console.log
    $.ajax({
        url: "libs/php/updateDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: id,
            department: department,
            locationID: locationID
        },
        success: function(result) {
            console.log(result)			                  
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Update locations failed on load call failed ' + errorThrown);
        }
    }); 
};

// Add Department code////////////////////////////
function addDepartment(newDepartment, locationID) {    
        $.ajax({
            url: "libs/php/addDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
                newDepartment: newDepartment,
                locationID: locationID
            },
            success: function(result) {			                 
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('add department failed on load call failed ' + errorThrown);
            }
        }); 
}

function showAddDepartmentModal() {
    $('#updateModalTitle').html('Update Department');
                let form =
                    `
                    <td><input type="text" id="addDepartmentName"></td>
                    <td> <div class="form-group"><select id="addDepartmentLocationID" class="form-control" data-role="select-dropdown"></select></div></td>`                      
                    getLocationDropDown("#addDepartmentLocationID", 'Add a location'); 
                    $('#updateModalDetails').html(form);
                            
                let modalFooter = 
                    `<button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;                   
                     $('#updateModalFooter').html(modalFooter);                  
                
                $("#updateModal").modal('show');
                $("#saveUpdateModal").click(function(){
                    alert($('#addDepartmentLocationID').val())
                    addDepartment( $("#addDepartmentName").val(), $('#addDepartmentLocationID').val());
                    $('#updateModal').modal('hide');
                    showAllDepartments();                      
                });
        
            }
        
//Delete department code

function deleteDepartment(id) {

    

    $.ajax({
        url: "libs/php/deleteDepartmentByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
            id: id
        },
        success: function(result) {	
          
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Delete department failed on load call failed ' + errorThrown);
        }
    }); 
}




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
                });
                $('#updateButton').hide();
                $('#deleteButton').hide();
                $('#detailsModalInstructions').show();              
                $('#detailsModalInstructions').html('Click Location to edit');
                $('#modalTitle').html('Locations');
                $('#modalDetails').html(locations);
               
                //Add on clicks to buttons          
                $("#addButton").prop("onclick", null).off("click");
                $("#addButton").click(function(){
                    showAddLocationModal();
                });
                $("#detailsModal").modal('show');
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
                        `<button type="button" class="btn btn-outline-warning" id="deleteLocationButton">Delete</button>
                         <button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;                   
                         
                         $('#updateModalFooter').html(modalFooter);                  
                    
                        $("#updateModal").modal('show');
                        $("#saveUpdateModal").click(function(){
                        updateLocation(result['data'][0]['id'], $("#updateLocationName").val());
                        $('#updateModal').modal('hide');
                        showAllLocations();                      
                         });
                       


                    //delete button and confirmation modal
                    $("#deleteLocationButton").prop("onclick", null).off("click");
                    $("#deleteLocationButton").click(function(){


                        $('#titleConfirmationModal').html("Delete Location");
                        $('#bodyConfirmationModal').html("Are you Sure You Want to Delete");
                        $('#confirmationActionButton').html("Delete");
                        $("#confirmationModal").modal('show');                   
                        $("#confirmationActionButton").prop("onclick", null).off("click");
                        $("#confirmationActionButton").click(function(){
                        

                            $.ajax({
                                url: "libs/php/getLocationIDs.php",
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                
                                },
                                success: function(result) {					
                                    let noDuplications = true
                                                                        
                                    if (result.status.name == "ok") {
                                        result['data'].forEach(id => {
                                            if    (id['locationID'] == x) {
                                              noDuplications = false;
                                             
                                            }
                                        
                                            
                                        });
                                       
                                        if (noDuplications == true) {
                                           
                                            deleteLocation(x);
                                            $("#confirmationModal").modal('hide');
                                            $('#updateModal').modal('hide');
                                            showAllLocations();
                                        }
                                        else {
                                            $('#bodyConfirmationModal').html("This Location is in use");
                                        }
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    console.log('Open all countries on load call failed ' + errorThrown);
                                }
                            }); 	







                        
                    });
                    
                   
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

//Location UPDATE Code////////////////////////////////

//Add Location Code/////////////////////////////
function addLocation(newLocation) { 
        $.ajax({
            url: "libs/php/addLocation.php",
            type: 'POST',
            dataType: 'json',
            data: {
                newLocation: newLocation
            },
            success: function(result) {			                 
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Open all locations failed on load call failed ' + errorThrown);
            }
        }); 
}

function showAddLocationModal() {
    $('#updateModalTitle').html('Update Location');
                let form =
                    `
                    <td><input type="text" id="addLocationName"></td>`                  
                    $('#updateModalDetails').html(form);
                                
                let modalFooter = 
                    `<button type="button" class="btn btn-primary" id="saveUpdateModal">Save changes</button>
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;                   
                     $('#updateModalFooter').html(modalFooter);                  
                
                $("#updateModal").modal('show');
                $("#saveUpdateModal").click(function(){
                    addLocation( $("#addLocationName").val());
                    $('#updateModal').modal('hide');
                    showAllLocations();                      
                });
        
            }
        
//Delete location code

function deleteLocation(id) {
    $.ajax({
        url: "libs/php/deleteLocationByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
            id: id
        },
        success: function(result) {	
          
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
} 
         

//LOCATION CODE END////////////////////////////////////////////////////////



//pulls up full database when modal is closed and resets the value
        $('#detailsModal').on('hidden.bs.modal', function () {
            setUp();
        });
