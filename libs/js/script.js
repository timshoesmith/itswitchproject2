var theDepartmentID,
theLocationID,
personID;



//PRELOADER
$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
         });
        }
    });

//Company Home Page Event Listeners    
    $("#companyPageAddPerson").click(function(){ 
        getAllDepartmentsForPersonnel('#dropdownAddPersonnelDepartment', 'Choose Department');
        $('#addPersonnel').modal('show');
    });

    $("#companyPageShowDepartments").click(function(){ 
        getAllDepartments("#allDepartments");
        $('#listDepartments').modal('show');
    });
 
    $("#companyPageSearchPersonnel").keyup(function() {
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

    $("#companyPageShowLocations").click(function(){ 
        getAllLocations("#allLocations");
        $('#listLocations').modal('show');
    });



// Department Event Listenters///////////////////////////////////////////////////////////////////////

//Open Add Department Modal when Add button clicked
 $('#departmentAddButton').click(function () {
    $("#inputDepartmentAdd").html("");
    getAllLocationForDepartment('#dropdownAddDepartmentLocation', 'Choose Location');
    $('#departmentAdd').modal('show');
  });
//Add department when close button clicked clears form
$("#departmentAddCloseButton").click(function(){ 
    $('#departmentAddForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $('#departmentAddForm').find(':checkbox, :radio').prop('checked', false);
});
//Add Department when Add button clicked
$("#departmentAddButtonOnAddForm").click(function(){
    //check a location has been selected
    if ($("#dropdownAddDepartmentLocation").val() > 0) { 
    checkDepartmentForDuplicate( $("#inputDepartmentAdd").val(), $("#dropdownAddDepartmentLocation").val());
} else {
    $('#departmentAddMustHaveLocation').modal('show');
}
});
//Add Brings up confirmation modal
$("#departmentAddButtonConfirmationYes").click(function(){ 
   
        addDepartment($('#inputDepartmentAdd').val(),$("#dropdownAddDepartmentLocation").val()); 
        $('#listDepartments').modal('hide');
        $('#departmentAddConfirmation').modal('hide');
        $('#departmentAdd').modal('hide');
        $('#departmentAddForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
        $('#departmentAddForm').find(':checkbox, :radio').prop('checked', false);
        //THIS DOES NOT UPDATE THE DROPDOWN SO NEW DEPT DOES NOT SHOW////////////////////////////////
        getAllDepartments("#allDepartments");
        //THIS MODAL DOES NOT REAPEAR//////////////////////////////////////////////////////////////
        $('#listDepartments').modal('show');
});

 //click on row of departments event
$('#departmentTable').on('click', 'tr' , function (event) {
     theDepartmentID = event['currentTarget']['id'];
    openUpdateDeleteDepartmentModal(theDepartmentID);
    }); 

//Delete Department////////////////////
$('#departmentDeleteButton').click(function(){
    checkDepartmentID(theDepartmentID);
});

//Delete Department Confirmation
$('#departmentDeleteConfirmationButtonYes').click(function(){
    deleteDepartment(theDepartmentID);
    $('#listDepartments').modal('hide');
    $('#departmentDeleteConfirmation').modal('hide');
    $('#departmentUpdateOrDelete').modal('hide');
    //THIS DOES NOT UPDATE THE DROPDOWN SO DELETED DEPT STILL SHOWS////////////////////////////////
    getAllDepartments("#allDepartments");
    //THIS MODAL DOES NOT REAPEAR//////////////////////////////////////////////////////////////
    $('#listDepartments').modal('show');
})
//Confirmation when Update Button is clicked
$('#departmentUpdateButton').click(function() {
    $('#departmentUpdateConfirmationText').html("Are you sure you want to update the department to " +  $('#inputDepartment').val());
    $('#updateDepartmentConfirmation').modal('show');
})
//Department is Updated when confirmation button is clicked
$('#departmentUpdateButtonConfirmationYes').click(function() {
    updateDepartment(theDepartmentID, $('#inputDepartment').val(), $("#dropdownUpdateDepartmentLocation").val());
    $('#updateDepartmentConfirmation').modal('hide');
    $('#departmentUpdateOrDelete').modal('hide');
     getAllDepartments("#allDepartments");
       //THIS DOES NOT UPDATE THE DROPDOWN SO UPDATED DEPT DOES NOT SHOW////////////////////////////////
     getDepartmentDropdown('#dropdownDepartmentButton');
    $('#listDepartments').modal('hide');
});

// Department Event Listenters///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Location Event Listenters/////////////////////////////////////////////////////////////////////////
//Open Add Location Modal when Add button clicked
$('#locationAddButton').click(function() {
    $("#inputDepartmentAdd").html("");
    
    $('#locationAdd').modal('show');
})
//Add department when close button clicked clears form
$('#locationAddCloseButton').click(function() {
    $('#locationAddForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $('#locationAddForm').find(':checkbox, :radio').prop('checked', false);
})
//Add Location when Add button clicked
$("#locationAddButtonOnAddForm").click(function(){
    $('#addConfirmationTextLocation').html("Are you sure you want to add " +  $('#inputLocationAdd').val());              
    $('#locationAddConfirmation').modal('show');
});
//Add Location when Confirmation button clicked
$('#locationAddButtonConfirmationYes').click(function() {
    addLocation($('#inputLocationAdd').val());
    $('#listLocations').modal('hide');
    $('#locationAddConfirmation').modal('hide');
    $('#locationAdd').modal('hide');
})
//click on row of locations event
  $('#locationTable').on('click', 'tr' , function (event) {
    theLocationID = event['currentTarget']['id'];
    openUpdateDeleteLocationModal(theLocationID);
}); 
//Delete Location////////////////////
$('#locationDeleteButton').click(function(){
    checkLocationID(theLocationID);
});
//Delete Location Confirmation
$('#locationDeleteButtonConfirmationYES').click(function(){
    deleteLocation(theLocationID);
    $('#listLocations').modal('hide');
    $('#locationDeleteConfirmation').modal('hide');
    $('#locationUpdateOrDelete').modal('hide');
    //THIS DOES NOT UPDATE THE DROPDOWN SO DELETED DEPT STILL SHOWS////////////////////////////////
    getAllLocations("#allLocationss");
    //THIS MODAL DOES NOT REAPEAR//////////////////////////////////////////////////////////////
   // $('#listLocations').modal('show');
})
//Confirmation when Update Button is clicked
$('#locationUpdateButton').click(function() {
    $('#locationUpdateConfirmationText').html("Are you sure you want to update the location to " +  $('#inputLocation').val());
    $('#updateLocationConfirmation').modal('show');
})
//Location is Updated when confirmation button is clicked
$('#locationUpdateButtonConfirmationYes').click(function() {
    updateLocation(theLocationID, $('#inputLocation').val());
    $('#listLocations').modal('hide');
    $('#updateLocationConfirmation').modal('hide');
    $('#locationUpdateOrDelete').modal('hide');
     getAllLocations("#allLocations");
       //THIS DOES NOT UPDATE THE DROPDOWN SO UPDATED LOCATION DOES NOT SHOW////////////////////////////////
     getLocationsDropdown('#dropdownLocationsButton');
    $('#listLocations').modal('show');
});
// Location Event Listenters///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Personnel Event Listenters/////////////////////////////////////////////////////////////////////////


//Save button on add from clicked check to make sure fields are filled
$('#personnelAddButton').click(function () {
    console.log($("#dropdownAddPersonnelDepartment").val())
    if (!$('#inputFirstName').val() || !$('#inputLastName').val() || !$('#inputJobTitle').val() || !$('#inputEmail').val() || !( $("#dropdownAddPersonnelDepartment").val() > 0) ) {
        $('#personnelAddAllFieldsNotCompleted').modal('show');
    } else { 
    $('#personnelAddConfirmationText').html("Are you sure you want to add " +  $('#inputFirstName').val() + ' ' + $('#inputLastName').val()); 
    $('#personnelAddConfirmation').modal('show');
    }
});
//Add department when close button clicked clears form
$('#personnelAddCancelButton').click(function() {
    $('#addPersonnelForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $('#addPersonnelForm').find(':checkbox, :radio').prop('checked', false);
})
//Confirmation of add personnel Add the record
$('#personnelAddButtonConfirmationYes').click(function() {
    addPersonel($('#inputFirstName').val(), $('#inputLastName').val(), $('#inputJobTitle').val(), $('#inputEmail').val(), $("#dropdownAddPersonnelDepartment").val())
    $('#personnelAddConfirmation').modal('hide');
    $('#addPersonnel').modal('hide');
    setUp();
});
//Delete Personnel Button on Update Form
$('#personnelUpdateDeleteButton').click(function() {
    $('#personnelDeleteConfirmation').modal('show');
});
//Confirm Delte before proceeding
$('#personnelDeleteButtonConfirmationYes').click(function(){
    deletePersonnel(person['id']);
    $('#personnelUpdateOrDelete').modal('hide');
    $('#personnelDeleteConfirmation').modal('hide');
    //LIST OF PERSONNEL DOES NOT UPDATE ON SETUP////////////////////////////////
    setUp();
});
//Confirm update before proceeding
$('#personnelUpdateButtonSave').click(function() {
    $('#personnelUpdateConfirmationText').html('Are you sure you want to update ' + $('#inputFirstNameName').val() + ' ' + $('#inputLastNameName').val())
    $('#personnelUpdateConfirmation').modal('show');
});
$('#personnelUpdateButtonConfirmationYes').click(function() {
    updatePersonnel(personID, $('#inputFirstNameName').val(), $('#inputLastNameName').val(), $('#inputJobTitleName').val(), $('#inputEmailName').val(), $('#dropdownUpdatePersonnelDepartment').val());
    console.log($('#dropdownUpdatePersonnelDepartment').val());
    $('#personnelUpdateConfirmation').modal('hide');
    $('#personnelUpdateOrDelete').modal('hide');
    //NOT UPDATING ON SETUP JUST AFTER APP IS LOADED//////////////////////////////
    //IF DEPARTMENT DROP DOWN NOT CHANGED IT REVERTS TO NULL///////////////////
    setUp();
    
})


// Personnel Event Listenters/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Location Event Listenters///////////////////////////////////////////////////////////////////////


















//   //Add Personnel when Add button clicked
// $('#addPersonnelButton').click(function () {
    
//     $("#addPersonnelButtonConfirmation").prop("onclick", null).off("click");      
//     $("#addPersonnelButtonConfirmation").click(function(){
//         addPersonel( $("#inputFirstName").val(), $("#inputLastName").val(), $("#inputJobTitle").val(), $("#inputEmail").val(),  $("#dropdownAddPersonnelDepartment").val());
//         $('#addPersonnel').modal('hide');
//         setUp();
// });
//     $('#addPersonnelConfirmation').modal('show');
//     $('#addConfirmationTextPersonnel').html(`Are you sure you want to Add ${$("#inputFirstName").val()} ${$("#inputLastName").val()}?`);  
// });
// //Clear Add Personnel Form if cancelled
// $("#addPersonnelCloseButton").click(function(){ 
//         $('#addPersonnelForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
//         $('#addPersonnelForm').find(':checkbox, :radio').prop('checked', false);
    
//     });
//Add Personnel on confirmation

 




// //Open ADD Location when Add button clicked
// $('#addLocationButton').click(function () {
//     $("#inputLocationAdd").html("");
//     $('#addLocation').modal('show');
//   });

// //Add Location when Add button clicked
// $('#addLocationButtonOnAddForm').click(function () {  
//     $("#addLocationButtonConfirmation").prop("onclick", null).off("click");      
//     $("#addLocationButtonConfirmation").click(function(){
//         addLocation($("#inputLocationAdd").val());   
//         $('#addLocation').modal('hide');    
// });
//     $('#addConfirmationTextLocation').html(`Are you sure you want to Add ${$("#inputLocationAdd").val()}?`);
//     $('#addLocationConfirmation').modal('show');
// });
// //Add Location when close button clicked clears form
// $("#addLocationCloseButton").click(function(){ 
//         $('#addLocationForm').find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
//         $('#addLocationForm').find(':checkbox, :radio').prop('checked', false);
    
//     });


















//Function sets up all database
function setUp() {
    getAllPersonnel(); 
    getDepartmentDropdown('#dropdownDepartmentButton');
    getLocationDropDown('#dropdownLocationButton'); 

    $(document).on('click', '#dropdownDepartmentButton li a', function() {
        var id= ($(this).attr('id'));
        if (id == "companyPageShowAllDepts") {
           setUp();
        } else {
            getPersonnelByDepartmentID(id);
        }
       
    }); 
    $(document).on('click', '#dropdownLocationButton li a', function() {
        var id= ($(this).attr('id'));
        if (id == "companyPageShowAllLocations") {
            setUp();
         } else {
            getPersonnelByLocationID(id);
         }
      
    }); 
    
      //click on row of personnel event
        $('#tablePersonnel').on('click', 'tr' , function (event) {
            openUpdateDeletePersonnelModal(event['currentTarget']['id'], );
            //event['currentTarget']['department']
            });  
        
         
            //click on row of locations event
        $('#showAllPersonnel').click(function() {
            setUp();
        }); 


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
//Open add Personnel Form large Screen
// $("#addPersonnelTopButton").click(function(){ 
//     getAllDepartmentsForPersonnel('#dropdownAddPersonnelDepartment', 'Choose Department');
//     $('#addPersonnel').modal('show');
//   });
//Open add Personnel Form small Screen
// $("#addPersonnelTopButtonSmallScreen").click(function(){ 
//     getAllDepartmentsForPersonnel('#dropdownAddPersonnelDepartment', 'Choose Department');
//     $('#addPersonnel').modal('show');
//   });
  



//Update personnel modal form/////////////////

function openUpdateDeletePersonnelModal(id) {
    $.ajax({
        url:'libs/php/getPersonByID.php',
        method: 'post',
        data: {
            id: id
        },
        success: function(result) {   
            //create global variable
            personID =   result['data'][0]['id'];
        
                
            $('#inputFirstNameName').val(result['data'][0]['firstName']);
            $('#inputLastNameName').val(result['data'][0]['lastName']);
            $('#inputJobTitleName').val(result['data'][0]['jobTitle']);
            $('#inputEmailName').val(result['data'][0]['email']);                  
            getAllDepartmentsForPersonnel('#dropdownUpdatePersonnelDepartment', result['data'][0]['department']);
            $('#personnelUpdateOrDelete').modal('show'); 
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

//DELETE DEPARTMENT BEGIN////////////////////////



function openUpdateDeleteDepartmentModal(x) {
    $.ajax({
        url: "libs/php/getDepartmentByID.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: x
                    },
        success: function(result) {	         
            $('#inputDepartment').val(result['data'][0]['name']);
            getAllLocationForDepartment('#dropdownUpdateDepartmentLocation', result['data'][0]['location']);
            $("#dropdownUpdateDepartmentLocation").val(result['data'][0]['locationID']);
            $('#departmentUpdateOrDelete').modal('show');       
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
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
                  		
                    let menu = [`<li><a class="dropdown-item" id="companyPageShowAllDepts" href="#">Show All</a></li>`];
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

//Can I delete department? function adds or alerts if department ID is in use
function checkDepartmentID(id) {
    $.ajax({
        url: "libs/php/checkDepartmentID.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                    },
        success: function(result) {	
                if (result['data'][0]['count(id)'] == 0) {
                    $('#departmentDeleteConfirmation').modal('show');
                    $('#departmentDeleteConfirmationText').html("Are you sure you want to add " +  $('#inputDepartment').val());             
                }
                else 
                {
                    $('#departmentDeleteStillInUseText').html($('#inputDepartment').val() + " is still in use! ");                 
                   $('#departmentDeleteStillInUse').modal('show');
                }       
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}



























//Ajax update call to update Department
function updateDepartment(id,department, locationID) {
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
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Update locations failed on load call failed ' + errorThrown);
        }
    }); 
};
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


//ADD DEPARTMENT////////////////////////
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
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log('add department failed on load call failed ' + errorThrown);
          }
      }); 
  }
  
  //Can I add department? function adds or alerts if department ID is in use
  function checkDepartmentForDuplicate(name, locationID) {
      $.ajax({
          url: "libs/php/checkDepartmentNameDuplicate.php",
                  type: 'POST',
                  dataType: 'json',
                  data: {
                      name: name,
                      locationID: locationID
                      },
          success: function(result) {	
                  if (result['data'][0]['count(name)'] == 0) {
                    //   addDepartment(name, locationID);
                    $(addConfirmationTextDepartment).html("Are you sure you want to add " +  $('#inputDepartmentAdd').val());
                  
                      $('#departmentAddConfirmation').modal('show');
                  }
                  else 
                  {
                    $('#departmentAddAlreadyCreated').modal('show');
                      
                  }
             
     
          
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log('Show department failed on load call failed ' + errorThrown);
          }
      }); 
  }



//ADD DEPARTMENT FINISHED/////////////////////////////////









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
            let menu = [`<li><a class="dropdown-item" id="companyPageShowAllLocations" href="#">Show All</a></li>`];
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

//UPDATE LOCATION FUNCTIONS START///////////////
//update location function
function updateLocation(id,location) {
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
            $('#inputLocation').val(result['data'][0]['name']);      
            $('#locationUpdateOrDelete').modal('show');       
        
            $('#updateOrDeleteLocation').modal('show');
          
         

      
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show location modal failed on load call failed ' + errorThrown);
        }
    }); 
}
//UPDATE LOCATION FUNCTIONS FINISH///////////////

//ADD LOCATION FUNCTIONS STARTS/////////////////////


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
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('add location failed on load call failed ' + errorThrown);
        }
    }); 
}




//ADD LOCATION FUNCTIONS END////////////////////////

//DELETE LOCATION FUNCTIONS STARTS////////////////////////

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
            console.log('Delete location failed on load call failed ' + errorThrown);
        }
    }); 
}

//Can I delete location? function returns boolean yes or no given a department ID
function checkLocationID(id) {
    $.ajax({
        url: "libs/php/checkLocationID.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                    },
        success: function(result) {	
            console.log(id)
                    if (result['data'][0]['count(id)'] == 0) {
                        $('#locationDeleteConfirmation').modal('show');
                        $('#locationDeleteConfirmationText').html("Are you sure you want to delete " +  $('#inputLocation').val());      
                    }
                    else 
                    {
                        console.log('wrong modal')
                        $('#locationDeleteStillInUseText').html($('#inputLocation').val() + " is still in use! ");                 
                       $('#locationDeleteStillInUse').modal('show');
                    }       
               
   
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Show department failed on load call failed ' + errorThrown);
        }
    }); 
}
//ADD LOCATION FUNCTIONS END STARTS////////////////////////























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
   
    // $('#dropdownDepartmentButton li a').on('click', function(){
    //     //$('#datebox').val($(this).text());
    //     alert($(this).text());
    // });
    
});


