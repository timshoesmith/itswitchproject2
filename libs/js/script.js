//PRELOADER
$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
         });
        }
    });

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
                        <td class="d-none d-md-table-cell">${element['email']}</td>
                        <td>${element['department']}</td>
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
//UPDATE DEPARTMENT/////////////////////////////////////////
//Show single department to update and delete
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

//Can I delete department? function returns boolean yes or no given a department ID
function checkDepartmentID(id) {
    $.ajax({
        url: "libs/php/checkDepartmentID.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                    },
        success: function(result) {	
            console.log(result['data'][0]['count(id)']);
                if (result['data'][0]['count(id)'] == 0) {
                    console.log('It is zero')
                    deleteDepartment(id);
                }
                else 
                {
                    alert('This department is in use!')
                }
           
   
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}

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
           
            document.querySelector('input[name="inputDepartment"]').value = result['data'][0]['name'];
            getAllLocationForDepartment('#dropdownUpdateDepartmentLocation', result['data'][0]['location'])
            $('#updateOrDeleteDepartment').modal('show');


            //UPdate Department when UPdate button clicked
                 $('#updateDepartmentButton').click(function () {   
                     $("#updateDepartmentButtonConfirmation").prop("onclick", null).off("click");      
                     $("#updateDepartmentButtonConfirmation").click(function(){
                       
                         updateDepartment(result['data'][0]['id'], $("#inputDepartment").val(), $("#dropdownUpdateDepartmentLocation").val());
                         $('#updateOrDeleteDepartment').modal('hide');
                         console.log( $("#dropdownUpdateDepartmentLocation").val());
                         console.log( $("#inputDepartment").val())
                        
                     
                 });
                     $('#updateConfirmationText').html(`Are you sure you want to update ${$("#inputDepartment").val()} ?`);
                     $('#updateDepartmentConfirmation').modal('show');
                   
                 });

             //Delete Personnel when DElete button clicked
             $('#deleteDepartmentButton').click(function () {  
                $("#deleteDepartmentButtonConfirmation").prop("onclick", null).off("click");      
                $("#deleteDepartmentButtonConfirmation").click(function(){
                console.log('the id is : ' + result['data'][0]['id'])
                checkDepartmentID(result['data'][0]['id']);
                //deleteDepartment( result['data'][0]['id']);
                $('#updateOrDeleteDepartment').modal('hide');
            
            });
            $('#deleteConfirmationText').html(`Are you sure you want to delete ${result['data'][0]['name']} ?`);
            $('#deleteDepartmentConfirmation').modal('show');

        });
        
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}

//UPDATE DEPARTMENT CLOSE///////////////////////////////////////




//ADD DEPARTMENT/////////////////////////////////////////

//get all location to add to add department form
function getAllLocationForDepartment(modalID, defaultText)  {      
    $.ajax({
                url: "libs/php/getAllLocations.php",
                type: 'POST',
                dataType: 'json',
                data: {
                
                },
                success: function(result) {	
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
//Open Add Department Modal when Add button clicked
$('#addDepartmentlButton').click(function () {
    getAllLocationForDepartment('#dropdownAddDepartmentLocation', 'Choose Location');
    $('#addDepartment').modal('show');
  });
//Add Department when Add button clicked
$('#addDepartmentButtonOnAddForm').click(function () {  
    $("#addDepartmentButtonConfirmation").prop("onclick", null).off("click");      
    $("#addDepartmentButtonConfirmation").click(function(){
        addDepartment( $("#inputDepartmentAdd").val(), $("#dropdownAddDepartmentLocation").val());
        $('#addDepartment').modal('hide');    
});
    $('#addDepartmentConfirmation').modal('show');
});
//Add department when close button clicked clears form
$("#addDepartmentCloseButton").click(function(){ 
        $('#addDepartmentForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
        $('#addDepartmentForm').find(':checkbox, :radio').prop('checked', false);
    
    });
//ADD DEPARTMENT FINISHED/////////////////////////////////

//UPDATE DEPARTMENT FUNCTIONS/////////////////////////
//Show single department to update and delete
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
//UPDATE DEPARTMENT FUNCTIONS/////////////////////////


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
                            <td class="d-none d-md-table-cell">${element['email']}</td>
                            <td>${element['department']}</td>
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
                                <td class="d-none d-md-table-cell">${element['email']}</td>
                                <td>${element['department']}</td>
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

function openUpdateDeleteLocationModal(x) {
    $.ajax({
        url: "libs/php/getLocationByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: x
                    },
        success: function(result) {	
            console.log(result['data'])
            document.querySelector('input[name="inputLocation"]').value = result['data'][0]['name'];
            $('#updateOrDeleteLocation').modal('show');
           //UPdate Location when UPdate button clicked
           $('#updateLocationButton').click(function () { 
               
              //     $("#updateLocationButtonConfirmation").prop("onclick", null).off("click");      
                //     $("#updateLocationButtonConfirmation").click(function(){

                updateLocation(result['data'][0]['id'], $("#inputLocation").val());
      
              
      
        //         $('#updateOrDeleteLocation').modal('hide');
        //         console.log('the result ' + result['data'][0]['id'] + ' ' +  $("#inputLocation").val())
               
               
            
        });
        //     $('#updateConfirmationLocationText').html(`Are you sure you want to update ${$("#inputLocation").val()} ?`);
        //     $('#updateLocationConfirmation').modal('show');
          
        // });
        //  //Delete Personnel when DElete button clicked
        //  $('#deleteDepartmentButton').click(function () {  
        //     $("#deleteDepartmentButtonConfirmation").prop("onclick", null).off("click");      
        //     $("#deleteDepartmentButtonConfirmation").click(function(){
        //     console.log('the id is : ' + result['data'][0]['id'])
        //     checkDepartmentID(result['data'][0]['id']);
        //     //deleteDepartment( result['data'][0]['id']);
        //     $('#updateOrDeleteDepartment').modal('hide');
        
        // });
        // $('#deleteConfirmationText').html(`Are you sure you want to delete ${result['data'][0]['name']} ?`);
        // $('#deleteDepartmentConfirmation').modal('show');

    // });
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}


//ADD LOCATION FUNCTIONS/////////////////////


//Add Location function
function addLocation(newLocation) {    
    $.ajax({
        url: "libs/php/addLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            newLocation: newLocation           
        },
        success: function(result) {	
            console.log(result);		                 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('add location failed on load call failed ' + errorThrown);
        }
    }); 
}

//Open ADD Location when Add button clicked
$('#addLocationButton').click(function () {
    $('#addLocation').modal('show');
  });

//Add Location when Add button clicked
$('#addLocationButtonOnAddForm').click(function () {  
    $("#addLocationButtonConfirmation").prop("onclick", null).off("click");      
    $("#addLocationButtonConfirmation").click(function(){
        addLocation($("#inputLocationAdd").val());   
        $('#addLocation').modal('hide');    
});
    $('#addLocationConfirmation').modal('show');
});
//Add department when close button clicked clears form
// $("#addDepartmentCloseButton").click(function(){ 
//         $('#addDepartmentForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
//         $('#addDepartmentForm').find(':checkbox, :radio').prop('checked', false);
    
//     });






//ADD LOCATION FUNCTIONS END////////////////////////























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
                        menuItem = `<tr id=${element['id']} class="rowClick"><td>${element['name']}</td></tr>`;
                        menu.push(menuItem);
                    })
                    $(modalID).html(menu);
    
    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Open all countries on load call failed ' + errorThrown);
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
                <td  class="d-none d-md-table-cell">${element['email']}</td>
                <td>${element['department']}</td>
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
          openUpdateDeleteDepartmentModal(event['currentTarget']['id']);
        }); 
           //click on row of locations event
      $('#tableLocation').on('click', 'tr' , function (event) {
        openUpdateDeleteLocationModal(event['currentTarget']['id']);
      }); 
});


