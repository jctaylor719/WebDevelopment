/**************************************
* TITLE: Final Project - Final Release
* AUTHOR: Jessica Taylor
* CREATE DATE: 12/7/2021
* PURPOSE: Validate, scrape, and echo data
           submitted in the website's form
* LAST MODIFIED ON: 12/7/2021
**************************************/

$(document).ready(function() {

	$( "#accordion" ).accordion();
	
    $( "input[type='submit']" ).button();
    $( "input[type='reset']" ).button();
    
	// The number of characters must be greater than 1
    $( "#spinner" ).spinner({min: 1, max: 10});
    
    $( "#datepicker" ).datepicker({
        inline: true
    });
    
	// How you heard about me
	// List of words to autocomplete to
    var availableTags = [
		"Instagram",
		"Twitter",
		"Reddit",
		"Snapchat",
		"Tiktok",
		"Youtube",
		"Facebook",
		"Meta",
		"Friend",
		"Family",
		"Newspaper",
		"Other"
    ];
    $( "#autocomplete" ).autocomplete({
        source: availableTags
    });

    $.validator.setDefaults({

        submitHandler: function() {

			// Assign the variables to their respective values
			// In a string format

			// First Name
			var strFirst = $('#first').val();
			// Last Name
			var strLast = $('#last').val();
			// Phone Number
			var strPhone = $('#phone').val();
			// Email
            var strEmail = $('#email').val();
			// Username
            var strUsername = $('#username').val();
			// Password
            var strPassword = $('#password').val();
			// How the user heard of me (Method)
			var strMethod = $( "#autocomplete" ).val();
			// The desired art specifications
			var strSpecs = "";
			// How the user would like to be contacted
            var strContact = $('input[name="contact"]:checked').val();
			// The reserved date
			var strDate = $('#datepicker').val();
			// The number of characters
            var strChars = $('#spinner').val();
        
			// Loop to assign every checkbox selected
            $('input[name="type"]:checked').each(function() {
                strSpecs += $(this).val() + " ";
            });
        
			// Appended text to output area
            $('#output').append("Your form has sucessfully been submitted!<br>")
						.append("<br> First Name: " + strFirst)
						.append("<br> Last Name: " + strLast)
                        .append("<br> Phone: " + strPhone)
                        .append("<br> Email: " + strEmail)
						.append("<br> Username: " + strUsername)
                        .append("<br> Password: " + strPassword)
						.append("<br> How you heard about me: " + strMethod)
						.append("<br> Specifications: " + strSpecs)
                        .append("<br> Contact: " + strContact)
						.append("<br> Num. Of Characters: " + strChars)
						.append("<br> Date: " + strDate);
        }, 
        
		// In case of a user error, this specifies where the error message should go in the form
        errorPlacement: function (error, element) {
			if (element.attr("id") == "spinner") {
				// In this case, it is inserted after the element with the "spinner" id
				error.insertAfter($(element).parent());
			} 
			else if (element.attr("name") == "type") {
				// After the checkbox
				error.insertAfter($("#cAfter"));
			} 
			else {
				// And for every other case, after the element that caused the error
				error.insertAfter(element);
			}        }

    });
    
	// FUnction to validate the form
    $("#form").validate({
		// This will make it so the user cannot submit the form when there are issues in a collapsed accordion
		ignore: [],
		// The rules that indicate whether the input is valid or not
		rules: {
			// The first name is required and must be no more than 20 characters
			first: {
				required: true,
				maxlength: 20
			},
			// The last name is required and must be no more than 20 characters
			last: {
				required: true,
				maxlength: 20
			},
			// The phone number is required and must contain digits only, with a maximum of 10 digits in a phone number
			phone: {
				required: true,
				digits: true,
				maxlength: 10
			},
			// The email is required and must be a valid email (must have an @, etc.)
			email: {
				required: true,
				email: true
			},
			// The username is required and must not be over 10 characters
			userName: {	
				required: true,
				maxlength: 10
			},
			// The password is required and must be AT LEAST 5 characters
			password: {	
				required: true,
				minlength: 5
			},
			// The autocomplete question is required and cannot exceed 20 characters
			heard: {
				required: true,
				maxlength: 20
			},
			// The art type specifications are required (at least one must be checked)
			type: {
				required: true
			},
			// The method of contact is required
			contact: {
				required: true
			},
			// The reservation date is required and must be a valid date
			day: {
				required: true,
				date: true
			},
			// The number of characters is required and must contain digits only
			spinner: {
				required: true,
				digits: true
			}
		},
		// The error messages given if the data is invalid
		messages: {
			first: {
				// If a first name has not been entered
				required: "Please enter a first name",
				// If the user inputs too many characters in the first name field
				maxlength: $.validator.format("Must have less than {0} characters")
			},
			last: {
				// If a last name has not been entered
				required: "Please enter a last name",
				// If the user inputs too many characters in the last name field
				maxlength: $.validator.format("Must have less than {0} characters")
			},
			phone: {
				// If a phone number has not been entered
				required: "Please enter a phone number",
				// If the user inputs something that is not a number
				digits: "Please use numbers only",
				maxlength: 10
			},
			email: {
				// If an email has not been entered
				required: "Please enter an email address",
				// If the user inputs an email that is not valid
				email: "Please enter a valid email address"
			},
			userName: {
				// If a username has not been entered
				required: "Please enter a username",
				// If a username is entered but it exceeds the character limit
				maxlength: $.validator.format("Must have less than {0} characters")
			},
			password: {
				// If a password has not been entered
				required: "Please enter a password",
				// If a password has been entered but it is less than {0} characters
				minlength: $.validator.format("Must have at least {0} characters")
			},
			heard: {
				// If an answer has not been entered
				required: "Please enter a method",
				// If an answer has been entered but it exceeds 20 charactesr
				maxlength: $.validator.format("Must have less than {0} characters")
			},
			type: {
				// If none of the checkboxes are selected
				required: "Please check a box"
			},
			contact: {
				// If none of the radio buttons are selected
				required: "PLease choose a method of contact"
			},
			day: {
				// If a date has not been entered
				required: "Please enter a reservation date",
				// If a date has been entered but it is not valid
				date: "Please enter a valid date"
			},
			spinner: {
				// If the number of characters has not been entered
				required: "Please enter the number of characters"
			}
		}
	});
});