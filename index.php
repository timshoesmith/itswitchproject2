<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Company Contacts</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    
       
        <link rel="stylesheet" href="libs/css/style.css?<?php echo date("YmdHisP");?>">
    </head>
    <body>

<!-- Container Div plus main database showing personnel and search -->
        <div class="container border border-primary">         
                <div class="row align-items-center border  border-primary">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-4">
                                <img class="img-responsive" src="libs/images/cologo1.png" />
                            </div>
                            <div class="col-8">
                                <h1 class="align-middle">The Company</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row d-inline d-md-block">
                            <div class="col-12">
                                <button type="button" class="btn btn-primary d-none d-xl-inline" data-toggle="modal" data-target="#listDeptOrCompany">Show All</button>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#listDepartment">Depts</button>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#listLocation">Loc</button>
                                <button type="button" class="btn btn-success" id="addPersonnelTopButton" data-toggle="modal" data-target="">Add</button>
                                <button type="button" class="btn btn-primary d-none d-xl-inline" data-toggle="modal" data-target="#updateOrDeletePersonnel">UpOrD</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row align-items-center border border-primary">
                            <div class="col-md-4 align-items-center border border-primary" id="searchRow">
                    
                                <input type="text" name="searchName" id="searchName" onfocus="this.value=''" class="form-control form-control-lg rounded-0 border-info" value="Search By Name, Dept or Location...">
                
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                
                                
                                    <div class="col-6">
                                        <div class="dropdown">
                                            <button class="btn btn-primary btn-block dropdown-toggle" type="button" id="dropdownMenuButtonDepartment" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Search by Dept
                                            </button>
                                            <ul class="dropdown-menu w-100" aria-labelledby="" id="dropdownDepartmentButton">
                                            </ul >
                                        </div> 
                                    </div>
                                    <div class="col-6">
                                        <div class="dropdown">
                                            <button class="btn btn-primary btn-block dropdown-toggle" type="button" id="dropdownMenuButtonLocation" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Search by Location
                                            </button>
                                            <ul class="dropdown-menu w-100" aria-labelledby="" id="dropdownLocationButton">
                                            </div> 
                                        </div>
                                    </div>                      
                                </div>
                            </div>                    
                

<!-- Table of personnel -->
            <div class="row border border-primary">
                <table class="table table-striped table-sm table-bordered table-hover" id="tablePersonnel">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col" class="d-none d-md-table-cell">Job Title</th>
                        <th scope="col ">Email</th>
                        <th scope="col" class="d-none d-md-table-cell">Department</th>
                        <th scope="col" class="d-none d-md-table-cell">Location</th>
                        </tr>
                    </thead>
                    <tbody id="allPersonnel">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  <!-- End of Container Div plus main database showing personnel and search -->


<!-- DEPARTMENT MODALS////////////////////////////////////////////////////////////// -->

<!-- Modal Which lists the departments -->
        <div class="modal fade" id="listDepartment" tabindex="-1" aria-labelledby="listDeptartmentLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="departmentLabel">Departmentss</h5>
                    <button type="button" class="btn btn-primary" id="addDepartmentlButton">Add</button>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered table-hover" id="tableDepartment">
                    <thead>
                                    <tr>
                                    <th scope="col">Department</th>
                                    <th scope="col">Location</th>
                                    </tr>
                                </thead>
                                <tbody id="allDepartments">                                
                                </tbody>

                    </table>        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                
                    
                </div>
                </div>
            </div>
        </div>

<!-- Modal Update Department -->
    <div class="modal fade" id="updateOrDeleteDepartment" tabindex="-1" aria-labelledby="updateOrDeleteDepartmentLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="departmentDeleteLabel">Update or Delete Department</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="inputDepartment">Department</label>
                            <input type="text" class="form-control" id="inputDepartment" name="inputDepartment" aria-describedby="Department Name">
                        </div>
                        <div class="form-group">                     
                                <select id="dropdownUpdateDepartmentLocation" name="select" class="custom-select"></select> 
                        </div>
                       
                    </form> 
                    
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" id="updateDepartmentlButton">Update</button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteDepartmentButtonConfirmation" id="deleteDepartmentButton">Delete</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

<!-- UPdate Confirmation for  Department -->
<div class="modal fade" id="updateDepartmentConfirmation" tabindex="-1" aria-labelledby="update department" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="departmentConfirmation">Update Department</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="updateConfirmationText">Are you sure you want to update DEPARTMENT?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal"id="updateDepartmentButtonConfirmation" >Yes</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="updateDepartmentButtonConfirmationClose">No</button>
                </div>
            </div>
        </div>
    </div>

<!-- Delete Confirmation for  Department -->
    <div class="modal fade" id="deleteDepartmentConfirmation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="departmentConfirmation">Delete Department</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete DEPARTMENT?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" id="deleteDepartmentButtonConfirmation">Yes</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>


<!-- Modal Add Department -->
<div class="modal fade" id="addDepartment" tabindex="-1" aria-labelledby="addDepartmentlLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="DepartmentLabel">Add Department</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addDepartmentForm">
                    <div class="form-group">
                            <label for="inputDepartmentAdd">First Name</label>
                            <input type="text" class="form-control" id="inputDepartmentAdd" aria-describedby="First Name">
                        </div>
                        <!-- <div class="form-group">
                            <label for="inputDepartment">Department</label>
                            <input type="text" class="form-control" id="inputDepartment" aria-describedby="Department Name">
                        </div> -->
                        <div class="form-group">                     
                            <select id="dropdownAddDepartmentLocation" name="select" class="custom-select">
                            </select> 
                        </div>                    
                    </form>          
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="addDepartmentButton">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id=addDepartmentCloseButton>Close</button>
                </div>
            </div>
        </div>
    </div>



<!-- Add Confirmation for  Department -->
<div class="modal fade" id="addDepartmentConfirmation" tabindex="-1" aria-labelledby="add department check" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="departmentConfirmation">Add Department</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to add DEPARTMENT?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" id="addDepartmentButtonConfirmation">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>








<!-- Modal Update Location -->
<div class="modal fade" id="updateOrDeleteLocation" tabindex="-1" aria-labelledby="updateOrDeleteLocationLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="locationDeleteLabel">Update or Delete Location</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="inputLocationName">Location</label>
                            <input type="text" class="form-control" id="inputLocationName" aria-describedby="location of department">
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Are you sure you want to update Location </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form> 
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteLocationConfirmation">Delete</button>
                </div>
            </div>
        </div>
    </div>









    <!-- LOCATION MODALS////////////////////////////////////////////////////////////// -->

<!-- Modal Which lists the locations -->
        <div class="modal fade" id="listLocation" tabindex="-1" aria-labelledby="listLocationLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="locationLabel">Locations</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr><th scope="col">Location</th></tr>
                        </thead>
                        <tbody id="allLocations">
                        </tbody>
                    </table>        
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateOrDeleteLocation">Click on Location</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Add</button>
                </div>
                </div>
            </div>
        </div>

<!-- Delete Confirmation for  Location -->
    <div class="modal fade" id="deleteLocationConfirmation" tabindex="-1" aria-labelledby="deleteLocationConfirmationLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="locationConfirmation">Delete Location</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete LOCATION?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Yes</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>



<!-- PERSONNEL MODALS////////////////////////////////////////////////////////////// -->

<!-- Modal Add Personnel -->
    <div class="modal fade" id="addPersonnel" tabindex="-1" aria-labelledby="addPersonnelLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="personnelLabel">Add Personnel</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addPersonnelForm">
                        <div class="form-group">
                            <label for="inputFirstName">First Name</label>
                            <input type="text" class="form-control" id="inputFirstName" aria-describedby="First Name">
                        </div>
                        <div class="form-group">
                            <label for="inputLastName">Last Name</label>
                            <input type="text" class="form-control" id="inputLastName" aria-describedby="Last Name">
                        </div>
                        <div class="form-group">
                            <label for="inputJobTitle">Job Title</label>
                            <input type="text" class="form-control" id="inputJobTitle" aria-describedby="Job Title">
                        </div>
                        <div class="form-group">
                            <label for="inputEmail">Email address</label>
                            <input type="email" class="form-control" id="inputEmail" aria-describedby="email address">
                        </div>
                        <div class="form-group">                     
                            <select id="dropdownAddPersonnelDepartment" name="select" class="custom-select">
                            </select> 
                        </div>                    
                    </form>          
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="addPersonnelButton">Add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id=addPersonnelCloseButton>Close</button>
                </div>
            </div>
        </div>
    </div>


<!-- Modal Update Personnel -->
        <div class="modal fade" id="updateOrDeletePersonnel" tabindex="-1" aria-labelledby="updateOrDeletePersonnelLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="personnelLabel">Update or Delete Personnel</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="inputFirstNameName">First Name</label>
                                <input type="text" class="form-control" id="inputFirstNameName" name="inputFirstNameName" aria-describedby="First Name">
                            </div>
                            <div class="form-group">
                                <label for="inputLastNameName">Last Name</label>
                                <input type="text" class="form-control" id="inputLastNameName" name="inputLastNameName" aria-describedby="Last Name">
                            </div>
                            <div class="form-group">
                                <label for="inputJobTitleName">Job Title</label>
                                <input type="text" class="form-control" id="inputJobTitleName" name="inputJobTitleName"aria-describedby="Job Title">
                            </div>
                            <div class="form-group">
                                <label for="inputEmailName">Email address</label>
                                <input type="email" class="form-control" id="inputEmailName" name="inputEmailName"aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">                     
                                <select id="dropdownUpdatePersonnelDepartment" name="select" class="custom-select"></select> 
                            </div>                                                    
                        </form> 
                        
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" id="updatePersonnelButton">Update</button>
                        <button type="button" class="btn btn-danger" data-toggle="modal" id="deletePersonnelButton" data-target="#deletePersonnelConfirmation">Delete</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
<!-- Add Confirmation for  Personnel -->
        <div class="modal fade" id="addPersonnelConfirmation" tabindex="-1" aria-labelledby="addConfirmationLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                            <h5 class="modal-title" id="addConfirmationLabel">Add Personnel</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to add PERSON NAME?</p>
                            
                    </div>
                    <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="addPersonnelButtonConfirmation">Yes</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>  
<!-- Update Confirmation for  Personnel -->
        <div class="modal fade" id="updateOrDeletePersonnelConfirmation" tabindex="-1" aria-labelledby="updateConfirmationLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateConfirmationLabel">Update Personnel</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                       <p id="updateConfirmationText">Are you sure you want to update PERSON NAME?</p>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="updatePersonnelButtonConfirmation">Yes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>
<!-- Delete Confirmation for  Personnel -->
        <div class="modal fade" id="deletePersonnelConfirmation" tabindex="-1" aria-labelledby="deleteConfirmationLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteConfirmationLabel">Delete Personnel</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                       <p id="deleteConfirmationText"></p>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="deletePersonnelButtonConfirmation" data-dismiss="modal">Yes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                       
                    </div>
                </div>
            </div>
        </div>




        <script src="libs/js/jquery-2.2.3.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>  
        <script src="libs/js/script.js?<?php echo date("YmdHis");?>"></script>
    </body>
</html>