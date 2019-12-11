
/* DOCUMENT READY  ----------- */
jQuery(document).ready(function() {		
"use strict";	
	
	
	
	/* ==============================================
    /* CONTACT FORM
	================================================== */
    
    $('.success-message-2').hide();
    $('.error-message-2').hide();
    
	var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';
		
	$contactform.submit(function(){
		$.ajax({
		   type: "POST",
		   url: "php/contact.php",
		   data: $(this).serialize(),
		   success: function()
		   {
							function sumir_floater() {
			var div = $("#uinfo");
		div.fadeIn();
		div.queue(function() {
			setTimeout(function() {
								
					$("#contactform")[0].reset();		
								
				div.dequeue();
			}, 2000);
		});
	div.fadeOut("fast");
	}
	sumir_floater();
	
			}
		 });
		return false;
	});
	
	

}); /* END DOCUMENT READY  ----------- */