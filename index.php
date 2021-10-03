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
                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addPersonnel">Add</button>
                                <button type="button" class="btn btn-primary d-none d-xl-inline" data-toggle="modal" data-target="#updateOrDeletePersonnel">UpOrD</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row align-items-center border border-primary">
                            <div class="col-md-6 align-items-center border border-primary" id="searchRow">
                                <div class="id">
                                    <h5>Search by Name, Dept or Loc...</h5>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                
                                
                                    <div class="col-6">
                                        <div class="dropdown">
                                            <button class="btn btn-primary btn-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Search by Dept
                                            </button>
                                            <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <a class="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="col-6">
                                        <div class="dropdown">
                                            <button class="btn btn-primary btn-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Search by Location
                                            </button>
                                            <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <a class="dropdown-item" href="#">Something else here</a>
                                            </div> 
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
<!-- button row to be removed -->
            <div class="row border border-primary">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateOrDeletePersonnel">Show All</button>
            </div>

    </div>
  <!-- End of Container Div plus main database showing personnel and search -->


<!-- DEPARTMENT MODALS////////////////////////////////////////////////////////////// -->

<!-- Modal Which lists the departments -->
        <div class="modal fade" id="listDepartment" tabindex="-1" aria-labelledby="listDeptartmentLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="departmentLabel">Departments</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered table-hover">
                    <thead>
                                    <tr>
                                    <th scope="col">Department</th>
                                    <th scope="col">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>Sales
                                    <td>London</td>
                                    </tr>
                                </tbody>

                    </table>        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateOrDeleteDepartment">Click On Department</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                
                    <button type="button" class="btn btn-primary">Add</button>
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
                            <input type="text" class="form-control" id="inputDepartment" aria-describedby="Department Name">
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Are you sure you want to update Department </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form> 
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteDepartmentConfirmation">Delete</button>
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
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Yes</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
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
                                    <tr>
                                    <th scope="col">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
                                    <tr>
                                    <td>London</td>
                                    </tr>
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

<!-- Modal Update Department -->
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
                    <form>
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
                            <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                            <label for="inputDepartment">Department</label>
                            <input type="text" class="form-control" id="inputDepartment" aria-describedby="department">
                        </div>
                        
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Are you sure you want to add</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </form>          
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
                                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="inputDepartment">Department</label>
                                <input type="text" class="form-control" id="inputDepartment" aria-describedby="department">
                            </div>
                            
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Are you sure you want to </label>
                            </div>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </form> 
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deletePersonnelConfirmation">Delete</button>
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
                       <p>Are you sure you want to delete PERSON NAME?</p>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Yes</button>
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