//Get All Contacts
$.ajax({
    url: "libs/php/getAll.php",
    type: 'POST',
    dataType: 'json',
    data: {
    
    },
    success: function(result) {					
                                                        
        if (result.status.name == "ok") {
            
            let personnel = result['data'];



            function generateTableHead(table, data) {
                let thead = table.createTHead();
                let row = thead.insertRow();
                for (let key of data) {
                    if (key != "id") { 
                  let th = document.createElement("th");
                  let text = document.createTextNode(key);
                  th.appendChild(text);
                  row.appendChild(th);
                }
            }
              }
              function generateTable(table, data) {
                for (let element of data) {
                  let row = table.insertRow();
                  for (key in element) {
                    if (key != 'id') { 
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                  }
                }
                }
              }
              
              let table = document.querySelector("table");
              let data = Object.keys(personnel[0]);
              generateTableHead(document.getElementById('#tablePersonnel'), data);
              generateTable(document.getElementById('#tablePersonnel'), personnel);

        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('Open all countries on load call failed ' + errorThrown);
    }
}); 


//Get departments and add to dropdown menu in desktop
// function getDepartmentDropdown(dropdownID)  {      
//   $.ajax({
//               url: "libs/php/getAllDepartments.php",
//               type: 'POST',
//               dataType: 'json',
//               data: {
              
//               },
//               success: function(result) {	
                
                


//                let departments = result['data'];



//             function generateTableHead(table, data) {
//                 let thead = table.createTHead();
//                 let row = thead.insertRow();
//                 for (let key of data) {
//                     if (key != "id") { 
//                   let th = document.createElement("th");
//                   let text = document.createTextNode(key);
//                   th.appendChild(text);
//                   row.appendChild(th);
//                 }
//             }
//               }
//               function generateTable(table, data) {
//                 for (let element of data) {
//                   let row = table.insertRow();
//                   for (key in element) {
//                     if (key != 'id') { 
//                     let cell = row.insertCell();
//                     let text = document.createTextNode(element[key]);
//                     cell.appendChild(text);
//                   }
//                 }
//                 }
//               }
              
//               let table = document.querySelector("table");
//               let data = Object.keys(departments[0]);
//               generateTableHead(table, data);
//               generateTable(table, departments);























//                 console.log(result)
//               },
//               error: function(jqXHR, textStatus, errorThrown) {
//                   console.log('Open all countries on load call failed ' + errorThrown);
//               }
//           }); 
//       }

//       getDepartmentDropdown(2)