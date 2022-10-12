import $ from "jquery";

export default function ipLookUp() {

    $.get('https://ipapi.co/json/', function(data) { 
        console.log(data)
      })

    // var endpoint = 'http://ip-api.com/json/?fields=status,message,countryCode';

    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         var response = JSON.parse(this.responseText);
    //         if(response.status !== 'success') {
    //             console.log('query failed: ' + response.message);
    //             return
    //         }
    //         // Redirect
    //         if(response.status == 'success') {
    //             console.log("SUCCESS!", response.message);
    //         }

    //     }
    // };
    // xhr.open('GET', endpoint, true);
    // xhr.send();


}