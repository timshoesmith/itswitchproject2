//Function sets up all database
function setUp() {
    getAllPersonnel();
    getAllDepartments("#allDepartments");
    getAllLocations("#allLocations");
    getDepartmentDropdown('#dropdownDepartmentButton');
    getLocationDropDown('#dropdownLocationButton');
   
        // $('#dropdownDepartmentButton li a').on('click', function(){
        //     console.log('hi')
        // });
}
//PERSONNEL FUNCTIONS////////////////////////////////
//Get All Personnel
function getAllPersonnel() {
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
            row =   `<tr id="${element['id']}" class="rowClick">
                       
                        <td>${element['firstName']},${element['lastName']}</td>
                        <td class="d-none d-md-table-cell">${element['jobTitle']}</td>
                        <td>${element['email']}</td>
                        <td class="d-none d-md-table-cell">${element['department']}</td>
                        <td class="d-none d-md-table-cell">${element['location']}</td>
                        </tr>`
                        contacts.push(row);
            
            })
            $('#allPersonnel').html(contacts);
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('Open all countries on load call failed ' + errorThrown);
    }
   
    });
   
}

//Add personnel Form/////////////////
function getAllDepartmentsForPersonnel(modalID, defaultText)  {      
    $.ajax({
                url: "libs/php/getAllDepartments.php",
                type: 'POST',
                dataType: 'json',
                data: {
                
                },
                success: function(result) {				
                    let menu = [`<option value= 0}>${defaultText}</option>`];
                    let menuItem = '';                                            
                    result['data'].forEach(element => {
                        menuItem =  `<option value=${element['id']}>${element['department']}</option>`;
                    
                        menu.push(menuItem);
                    })
                    $(modalID).html(menu);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Open all getAllDepartmentsForPersonnel on load call failed ' + errorThrown);
                }
            }); 
        }
//Add Personel AJAX CALL
function addPersonel(newFirstName, newLastName, newJobTitle, newEmail, newDepartment) { 
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
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Add personel failed on load call failed ' + errorThrown);
            }
        }); 
}
//Open add Personnel Form
$("#addPersonnelTopButton").click(function(){ 
    getAllDepartmentsForPersonnel('#dropdownAddPersonnelDepartment', 'Choose Department');
    $('#addPersonnel').modal('show');
  });

//Add Personnel when Add button clicked
$('#addPersonnelButton').click(function () {
    
    $("#addPersonnelButtonConfirmation").prop("onclick", null).off("click");      
    $("#addPersonnelButtonConfirmation").click(function(){
        addPersonel( $("#inputFirstName").val(), $("#inputLastName").val(), $("#inputJobTitle").val(), $("#inputEmail").val(),  $("#dropdownAddPersonnelDepartment").val());
        $('#addPersonnel').modal('hide');
        setUp();
});
    $('#addPersonnelConfirmation').modal('show');
});

$("#addPersonnelCloseButton").click(function(){ 
        $('#addPersonnelForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
        $('#addPersonnelForm').find(':checkbox, :radio').prop('checked', false);
    
    });

//Update personnel modal form/////////////////

function openUpdateDeletePersonnelModal(id) {
    $.ajax({
        url:'libs/php/getPersonByID.php',
        method: 'post',
        data: {
            id: id
        },
        success: function(result) {         
                    // $('#updateOrDeletePersonnel').modal('show'); 
                    document.querySelector('input[name="inputLastNameName"]').value = result['data'][0]['lastName'];
                    document.querySelector('input[name="inputFirstNameName"]').value = result['data'][0]['firstName'];
                    document.querySelector('input[name="inputJobTitleName"]').value = result['data'][0]['jobTitle'];
                    document.querySelector('input[name="inputEmailName"]').value = result['data'][0]['email'];
                    getAllDepartmentsForPersonnel('#dropdownUpdatePersonnelDepartment', result['data'][0]['department']);
                   $('#updateOrDeletePersonnel').modal('show'); 


                   //UPdate Personnel when UPdate button clicked
                        $('#updatePersonnelButton').click(function () {   
                            $("#updatePersonnelButtonConfirmation").prop("onclick", null).off("click");      
                            $("#updatePersonnelButtonConfirmation").click(function(){
                                updatePersonnel( result['data'][0]['id'], $("#inputFirstNameName").val(), $("#inputLastNameName").val(), $("#inputJobTitleName").val(), $("#inputEmailName").val(),  $("#dropdownUpdatePersonnelDepartment").val());
                                $('#updateOrDeletePersonnel').modal('hide');
                                setUp();
                        });
                            $('#updateConfirmationText').html(`Are you sure you want to update ${$("#inputFirstNameName").val()} ${$("#inputLastNameName").val()}?`);
                            $('#updateOrDeletePersonnelConfirmation').modal('show');

                        });

                    //Delete Personnel when DElete button clicked
                        $('#deletePersonnelButton').click(function () {  
                        $("#deletePersonnelButtonConfirmation").prop("onclick", null).off("click");      
                        $("#deletePersonnelButtonConfirmation").click(function(){
                        deletePersonnel( result['data'][0]['id']);
                        $('#updateOrDeletePersonnel').modal('hide');
                        setUp();
                    });
                    $('#deleteConfirmationText').html(`Are you sure you want to delete ${$("#inputFirstNameName").val()} ${$("#inputLastNameName").val()}?`);
                    $('#deletePersonnelConfirmation').modal('show');

                });


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('edit personel failed on load call failed ' + errorThrown);
                }
            });            
        }

function deletePersonnel(id) {
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

//update Personnel function
function updatePersonnel(id, firstName, lastName, jobTitle, email, departmentID) {
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
//PERSONNEL FUNCTION END///////////////////////////////////////////

















//DEPARTMENT FUNCTIONS BEGIN///////////////////////////////////

//get all location to add to add department form
function getAllLocationForDepartment(modalID, defaultText)  {      
    $.ajax({
                url: "libs/php/getAllLocations.php",
                type: 'POST',
                dataType: 'json',
                data: {
                
                },
                success: function(result) {	
                    console.log(result)			
                    let menu = [`<option value= 0}>${defaultText}</option>`];
                    let menuItem = '';                                            
                    result['data'].forEach(element => {
                        menuItem =  `<option value=${element['id']}>${element['name']}</option>`;
                    
                        menu.push(menuItem);
                    })
                    $(modalID).html(menu);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Open all  getAllLocationForDepartmenton load call failed ' + errorThrown);
                }
            }); 
        }
//Show single department to update and delete
function openUpdateDeleteDepartmentModal(x) {
    $.ajax({
        url: "libs/php/getDepartmentByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: x
                    },
        success: function(result) {	
            console.log(result)
            $('#updateOrDeleteDepartment').modal('show');
            document.querySelector('input[name="inputDepartment"]').value = result['data'][0]['name'];
            getAllLocationForDepartment('#dropdownUpdateDepartmentLocation', result['data'][0]['location'])
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}



//Add department function
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
            console.log(result);		                 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('add department failed on load call failed ' + errorThrown);
        }
    }); 
}


//Add Department when Add button clicked
$('#addDepartmentlButton').click(function () {
    getAllLocationForDepartment('#dropdownAddDepartmentLocation', 'Choose Location');
    $('#addDepartment').modal('show');
  });

 //Add Department when Add button clicked
$('#addDepartmentButton').click(function () {
    
   
    $("#addDepartmentButtonConfirmation").prop("onclick", null).off("click");      
    $("#addDepartmentButtonConfirmation").click(function(){
        addDepartment( $("#inputDepartmentAdd").val(), $("#dropdownAddDepartmentLocation").val());
        console.log("dept "  + $("#inputDepartmentAdd").val())
        console.log("dept "  + $("#dropdownAddDepartmentLocation").val())
        $('#addDepartment').modal('hide');

      
});
    $('#addDepartmentConfirmation').modal('show');
});

$("#addDepartmentCloseButton").click(function(){ 
        $('#addDepartmentForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
        $('#addDepartmentForm').find(':checkbox, :radio').prop('checked', false);
    
    });



















//Get departments and add to departments Modal
function getAllDepartments(modalID)  {      
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
                        menuItem =  `<tr id=${element['id']} class="rowClick">
                                        <td>${element['department']}</td>
                                        <td>${element['location']}</td>
                                    </tr>`;
                    
                        menu.push(menuItem);
                    })
                    $(modalID).html(menu);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Open all countries on load call failed ' + errorThrown);
                }
            }); 
        }
//Get locations and add to department Modal       
    function getAllLocations(modalID) {
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
                        menuItem = `<tr id=${element['id']}><td>${element['name']}</td></tr>`;
                        menu.push(menuItem);
                    })
                    $(modalID).html(menu);
    
    
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
                  		
                    let menu = [];
                    let menuItem = '';                                             
                    result['data'].forEach(element => {
                        menuItem =  `<li><a class="dropdown-item" id=${element['id']} href="#">${element['department']}</a></li>`;
                        
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
function getPersonnelByDepartmentID(id) { 
        $.ajax({
            url: "libs/php/getPersonelByDept.php",
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function(result) {	      
                let contacts = [];
                let row = "";
               
                result['data'].forEach(element => {
                row =   `<tr id="${element['id']}" class="rowClick">
                           
                            <td>${element['firstName']},${element['lastName']}</td>
                            <td class="d-none d-md-table-cell">${element['jobTitle']}</td>
                            <td>${element['email']}</td>
                            <td class="d-none d-md-table-cell">${element['department']}</td>
                            <td class="d-none d-md-table-cell">${element['location']}</td>
                            </tr>`
                            contacts.push(row);
                
                })
                $('#allPersonnel').html(contacts);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Get pesonel by department ID call failed ' + errorThrown);
        }
        
    }); 

}


//Open add Department Form
$("#addPersonnelTopButton").click(function(){ 
    getAllDepartmentsForPersonnel('#dropdownAddPersonnelDepartment', 'Choose Department');
    $('#addPersonnel').modal('show');
  });








































//DEPARTMENT FUNCTION END////////////////////////////////////

//LOCATION FUNCTIONS BEGIN//////////////////////////////////
 //Get locations and add to dropdown menu with id passed  
            
 function getLocationDropDown(dropdownID) {
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
                menuItem =  `<li><a class="dropdown-item" id=${element['id']} href="#">${element['name']}</a></li>`;
                menu.push(menuItem);
            })
            $(dropdownID).html(menu);


        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Open all countries on load call failed ' + errorThrown);
        }
    }); 	
}

function getPersonnelByLocationID(id) {
    //Select Menu function for location in desktop   
   
        // let contacts = [];
        // let row = "Im a row";                      
                //Get personel by location id dropdown menu in desktop  
            $.ajax({
                url: "libs/php/getPersonelByLocation.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function(result) {	   
                    let contacts = [];
                    let row = "";
                   
                    result['data'].forEach(element => {
                    row =   `<tr id="${element['id']}" class="rowClick">
                            
                                <td>${element['firstName']},${element['lastName']}</td>
                                <td class="d-none d-md-table-cell">${element['jobTitle']}</td>
                                <td>${element['email']}</td>
                                <td class="d-none d-md-table-cell">${element['department']}</td>
                                <td class="d-none d-md-table-cell">${element['location']}</td>
                                </tr>`
                                contacts.push(row);
                    
                    })
                    $('#allPersonnel').html(contacts);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Get pesonel by location ID call failed ' + errorThrown);
            }
            
        }); 
  
}







//Setup function is called
// setUp();

//SEARCHES ///////////////////////
//Search by Name
$(document).ready(function() {
    //set up database
    setUp();
    $("#searchName").keyup(function() {
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
                row =   `<tr id="${element['id']}">
                <td>${element['firstName']},${element['lastName']}</td>
                <td class="d-none d-md-table-cell">${element['jobTitle']}</td>
                <td>${element['email']}</td>
                <td class="d-none d-md-table-cell">${element['department']}</td>
                <td class="d-none d-md-table-cell">${element['location']}</td>
                </tr>`
                            contacts.push(row);
                
                });
                         $('#allPersonnel').html(contacts);
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
    // $('#dropdownDepartmentButton li a').on('click', function(){
    //     //$('#datebox').val($(this).text());
    //     alert($(this).text());
    // });
    $(document).on('click', '#dropdownDepartmentButton li a', function() {
        var id= ($(this).attr('id'));
        getPersonnelByDepartmentID(id)
    }); 
    $(document).on('click', '#dropdownLocationButton li a', function() {
        var id= ($(this).attr('id'));
        getPersonnelByLocationID(id);
    }); 
    
      //click on row of personnel event
      $('#tablePersonnel').on('click', 'tr' , function (event) {
        openUpdateDeletePersonnelModal(event['currentTarget']['id'], );
        //event['currentTarget']['department']
        });  
         //click on row of departments event
      $('#tableDepartment').on('click', 'tr' , function (event) {
          console.log(event['currentTarget'])
          openUpdateDeleteDepartmentModal(event['currentTarget']['id']);
        }); 
});


