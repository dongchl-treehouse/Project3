$('#name').focus();

$('#other-title').hide();

//Job role section: show a input text item when choosing other option 
$('#title').change(function() {
    if($('#title option:selected').val() === 'other' ) {
    	$('#other-title').show();    	
    }
    else {
    	$('#other-title').hide();
    }
});

//T shirt Info Section
$(document).ready(function() {
    var color_select_html = $('#color').html(); //save original color dropdown list

    $("#design").change(function () {
        $('#color').html(color_select_html); //set original color dropdown list back
        if($(this).val()=='js puns'){
        	$("#color").children("option[value=tomato]").remove();
            $("#color").children("option[value=steelblue]").remove();
            $("#color").children("option[value=dimgrey]").remove();
            console.log('js puns');
        }
        else if($('#design option:selected').val() === 'heart js' ) {
        	$("#color").children("option[value=cornflowerblue]").remove();
            $("#color").children("option[value=darkslategrey]").remove();
            $("#color").children("option[value=gold]").remove();
            console.log('heart js');
        }
        else {
        	$("#color").children("option[value=cornflowerblue]").remove();
            $("#color").children("option[value=darkslategrey]").remove();
            $("#color").children("option[value=gold]").remove();
            $("#color").children("option[value=tomato]").remove();
            $("#color").children("option[value=steelblue]").remove();
            $("#color").children("option[value=dimgrey]").remove();          
            $('#color').append('<option value="none">  Please select a T-shirt theme  </option>'); 
            
        }

        $("#color").val($("#color option:first").val());

    }).change();

 // Payment Info
    $("#payment option[value='select method']").remove();
    
    $("#payment").change(function () {
    	if($(this).val()=='Credit Card'){
    		$("#credit-card").show();
            $("#paypal").hide();
            $("#bitcoin").hide();
            console.log('Credit card');
        }
        else if($(this).val()=='PayPal'){
        	$("#credit-card").hide();
            $("#paypal").show();
            $("#bitcoin").hide();
            console.log('Paypal');
        }
        else {
        	$("#credit-card").hide();
            $("#paypal").hide();
            $("#bitcoin").show();
            console.log('Bitcoin');            
        }
    }).change();

});

//Activity section
var totalPrice = 0;

var para = document.createElement("P");                 // Create a <p> element
para.setAttribute("name", "totalPrice");
para.innerHTML = "Total: " + totalPrice;                // Insert text
document.getElementsByClassName("activities")[0].appendChild(para);

para.style.display = "none";

$(".activities input:checkbox").change(function(){
	var dtime = $(this).data('day-and-time');
	var itemName = $(this).attr('name');
	console.log(dtime);
	console.log(itemName);
	
	if ($(this).is(':checked')) {		
		//disable other checkbox with the same time and day
		$(".activities input:checkbox").each(function() {
			var itemName1 = $(this).attr('name');
			console.log(itemName);
			console.log(itemName1);

			if(itemName !== itemName1){
				var dtime1 = $(this).data('day-and-time');
				console.log(dtime1);
				if(dtime === dtime1) $(this).attr('disabled', 'disabled');		
			}
		});
	}
	else{//unchecked
		//enable other checkbox with the same time and day
		$(".activities input:checkbox").each(function() {
			var itemName1 = $(this).attr('name');
			if(itemName !== itemName1){
				var dtime1 = $(this).data('day-and-time');
				if(dtime === dtime1) $(this).removeAttr('disabled', 'disabled');		
			}
		});
	}
		
	var itemPrice = $(this).data('cost').slice(1);

	if ($(this).is(':checked')) {
		totalPrice += parseFloat(itemPrice);		
	}
	else{
		totalPrice -= parseFloat(itemPrice);				
	}
//	console.log(itemPrice);
//	console.log(totalPrice);

	para.innerHTML = "Total: " + totalPrice; //replace the new text    
		
	if(totalPrice > 0 ){
		//show total price
		para.style.display = "block";
	}
	else{
		//hide total price
		para.style.display = "none";
	}	

	
});


var submitMsg = document.createElement("P");                 // Create a <p> element
submitMsg.setAttribute("name", "submitMsg");
submitMsg.innerHTML = "   ";                // Insert text
document.getElementsByClassName("container")[0].appendChild(submitMsg);

submitMsg.style.display = "block";
submitMsg.style.color = "red";
//submit button click event
//Prevent form submission
$( "form" ).submit(function( event ) {
  event.preventDefault();
  
  let isNameOk = checkNameIsValid();  
  let isEmailOk = checkEmailIsValid();
  let isActivityOk = checkActivities();
  let isCreditCardOk;
  // if credit card is chosen, we need to validate credit card.
  if($('#payment').val() == 'Credit Card'){
	  console.log('Start to validate your credit card');
	  isCreditCardOk = checkCreditCard();  
  }
  
  
  if(isNameOk && isEmailOk && isActivityOk && isCreditCardOk){
	  console.log('sucessful validation and submit');
  	  submitMsg.style.display = "none";	  
  }
  else{
	  console.log('fail to submit');
	  submitMsg.innerHTML = " Fail to submit. Please check the red color marked items.";                // Insert text
  	  submitMsg.style.display = "block";
  }
    
});

function checkNameIsValid(){
	
	let valid = false;
	if($('#name').val().length > 0)
		valid = true;
	
	$('#name').css('border-color', function(){
		if (valid) return '#6F9DDC';
		else return '#f00';
	});

	return valid;		
}

function checkEmailIsValid(){
	let valid = false;
	var emailstr = $('#mail').val();	
	if(emailstr.includes('@') && emailstr.includes('.')) valid = true;

	$('#mail').css('border-color', function(){
		if (valid) return '#6F9DDC';
		else return '#f00';
	});

	return valid;		
}

function checkActivities(){
	let valid = false;
	if ($('input:checkbox:checked').length>0)
		valid = true;
	$(".activities").css('color', function(){
		if (valid) return '#000000';
		else return '#f00';
	});	
	return valid;
}

// form validation
function checkCreditCard(){
	var cardNumber = $('#cc-num').val();
	var zipcode = $('#zip').val();
	var cvv = $('#cvv').val();
	
	var valid_card = true;
	var valid_zipcode = true;
	var valid_cvv = true;
	
	//length validation
	if(cardNumber.length <13 || cardNumber.length>16) {
		valid_card = false;
	}
	if(zipcode.length !=5 ) valid_zipcode = false;
	if(cvv.length != 3) valid_cvv = false;
	
	//number validation
	if(!isANumber(cardNumber)) valid_card = false;
	if(!isANumber(zipcode)) valid_zipcode = false;
	if(!isANumber(cvv)) valid_cvv = false;
	
	$('#cc-num').css('border-color', function(){
		if (valid_card) return '#6F9DDC';
		else return '#f00';
	});

	$('#zip').css('border-color', function(){
		if (valid_zipcode) return '#6F9DDC';
		else return '#f00';
	});

	$('#cvv').css('border-color', function(){
		if (valid_cvv) return '#6F9DDC';
		else return '#f00';
	});
	
	return (valid_card && valid_zipcode && valid_cvv);
}

function isANumber(str){
	  return /^\d+$/.test(str);
}