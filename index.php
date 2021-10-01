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
        <link rel="stylesheet" href="./libs/css/style.css">
        
        <script src="libs/js/jquery-2.2.3.min.js"></script>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>

        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>    -->
        
        <link rel="stylesheet" href="libs/css/custom.css?<?php echo date("YmdHisP");?>">
    </head>
    <body>
        <div class="container">
<!-- top row with title and buttons -->
            <div class="row">
                <div class="col-md-6  bg-light p-4 mt-3 rounded">
                    <h4 class="text-center">Company Database</h4> 
                </div>
                <div class="col-md-6  bg-light p-4 mt-3 rounded">
                    <button type="button" class="btn btn-outline-primary" onclick="setUp()">Show All</button>
                    <button type="button" class="btn btn-outline-primary" onclick="showAllDepartments()">Departments</button>
                    <button type="button" class="btn btn-outline-primary" onclick="showAllLocations()">Locations</button>
                    <button type="button" class="btn btn-outline-primary" onclick="showAddPersonelModal()">Add Personel</button>
                </div>
            </div>
            <div  class="row"  id='topRowDeskTop'>
               
                        <div class="col-md-6 col-border"><input type="text" name="search" id="search" onfocus="this.value=''" class="form-control form-control-lg rounded-0 border-info" value="Search By Name, Dept or Location..."> </div>
                        <div class="col-md-3 col-border">
                            <div class="form-group"> <select id="departmentMenu" class="form-control" data-role="select-dropdown"></select></div>
                        </div>            
                        <div class="form-group"><select id="locationMenu" class="form-control" data-role="select-dropdown"></select></div>                            
            </div>
                         
<!-- Main database -->
            <div class="row">
                <div class="table" id="tablePersonelHead" >
                    <table class="table table-striped table-sm table-bordered table-hover">
                            <thead class=thead-light>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Job Title</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Location</th>
                                </tr>
                            <thead>
                            <tbody id="allContacts">                               
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
<!-- modal for  details -->

        <div class="modal fade" id="detailsModal" role="dialog">
            <div class="modal-dialog">             
                <div class="modal-content">
                        <div class="modal-header">
                        <h4 class="modal-title" id="modalTitle"></h4>
                        </div>
                    <div class="modal-body">
                        <table class="table table-striped table-sm table-bordered table-hover">
                            <thead class=thead-light>
                            <thead>
                            <tbody id="modalDetails"> 
                             </tbody>                                 
                        </table>
                    </div> 
                        <div class="modal-footer" id="#detailsModalFooter">
                            <p id="detailsModalInstructions"></p>
                            <button type="button" class="btn btn-outline-primary" id="addButton">Add</button>
                            <button type="button" class="btn btn-outline-primary" id="updateButton">Update</button>
                            <button type="button" class="btn btn-outline-warning" id="deleteButton">Delete</button>
                            <button type="button" class="btn btn-outline-info" id="closeButton" data-dismiss="modal">Close</button>
                        </div>
                                   
                </div>
            </div>
        </div>


<!-- Modal used for update and add -->

        <div class="modal" tabindex="-1" role="dialog" id="updateModal">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="updateModalTitle">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" id="updateModalBody">
                    <table class="table table-striped table-sm table-bordered table-hover">
                        <thead class=thead-light>
                        <thead>
                        <tbody id="updateModalDetails"> 
                         </tbody>                                 
                    </table>
                </div>



                <div class="modal-footer" id="updateModalFooter">
                
                </div>
              </div>
            </div>
          </div>


<!-- Modal For Confirmation of action -->
<div id="confirmationModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
  
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
          <h4 class="modal-title" id="titleConfirmationModal"></h4>
        </div>
        <div class="modal-body" id="bodyConfirmationModal">
          
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-warning" id="confirmationActionButton">Deletee</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
  
    </div>
  </div>




        <script src="libs/js/script.js?<?php echo date("YmdHis");?>"></script>
    </body>
</html>