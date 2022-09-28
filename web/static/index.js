function actions(){
    var val = document.getElementById("form1").value;

    $.ajax
        ({
            url: "http://127.0.0.1:8000/orderid/"+val,
            contentType: 'application/json; charset=utf-8',
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                $("#button1").attr("disabled", true)
                $("#step1").removeClass("active")
                $("#step2").removeClass("active")
                $("#step3").removeClass("active")
                $("#step4").removeClass("active")
            },
            complete: function () {
                $("#button1").attr("disabled", false)
            },
            error: function (e) {
                console.log(e)
            },
            success: function (resp) {
                console.log(resp)
                if (resp.status == 'ok'){
                    switch (resp.resp.line_items[0].fulfillment_status){
                        case 'Unfulfilled':
                            $("#step1").addClass("active")
                            $("#span1").text("Unfulfilled");
                            break;
                        case 'Fulfilled':
                            $("#step1").addClass("active")
                            $("#step2").addClass("active")
                            $("#span1").text("Fulfilled");
                            break;
                        case 'Scheduled':
                            $("#step1").addClass("active")
                            $("#step2").addClass("active")
                            $("#step3").addClass("active")
                            $("#span1").text("Scheduled");
                            break;
                        case 'Shipped':
                            $("#step1").addClass("active")
                            $("#step2").addClass("active")
                            $("#step3").addClass("active")
                            $("#step4").addClass("active")
                            $("#span1").text("Shipped");
                            break;
                    }
                }

                else if (resp.status = 'failed'){
                    alert(resp.Error)
                }
                else{
                    alert('Something went wrong')
                }
               
            }
        });
}
