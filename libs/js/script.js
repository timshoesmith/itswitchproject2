//Function sets up all database
function setUp() {

//Get All Contacts
$.ajax({
    url: "libs/php/getAll.php",
    type: 'POST',
    dataType: 'json',
    data: {
    
    },
    success: function(result) {					
                                                        
        if (result.status.name == "ok") {
            console.log(result)
            let contacts = [];
            let row = "";
           
            result['data'].forEach(element => {
            row =   `<tr id="${element['id']}">
                        <td>${element['firstName']},${element['lastName']}</td>
                        <td>${element['jobTitle']}</td>
                        <td>${element['email']}</td>
                        <td>${element['department']}</td>
                        <td>${element['location']}</td>
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
setUp();