$(document).ready(function() {


	var checkLoginValid = (function() {

		var _form = $('#login-form'),
				_isValid = false,
				_password = 123,
				_validEmail = 'mail@mail.com';

		var init = function() {
			_setUpListeners();
		}
		var _setUpListeners = function() {
			_form.on('submit', function (event) {
				_formValid(event);
				_sendForm();
			});
		}
		var _formValid = function(event) {
			event.preventDefault();
			var inputs = _form.find('input');
					valid = true;
					
			$.each(inputs, function(index, val) {
				var input = $(val),
				 		value = input.val().trim(),
				 		type = input.attr('type').toLowerCase(),
				 		name = input.attr('name');

				// validate form		
				if (value === '') {
					// Show errors
					_form.find('.notify--invalid-email').hide();
					_form.find('.notify--invalid-password-email').hide();
					_form.find('.notify--enter-' + name).fadeIn();
					valid = false;
				} else {
					// if value !== '' => validate email
					if (type === 'email') {
						var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

						if (pattern.test(value)) {
							// Hide error-email
							_form.find('.notify--invalid-email').fadeOut();

							// if pattern.test(value) => validate email to _validEmail
							if (value === _validEmail) {
								valid = false;
				
								_form.find('.notify--invalid-email').hide();
								_form.find('.notify--invalid-password-email').fadeIn();
							}

	
						} else {
							// Show error-email
							_form.find('.notify--invalid-password-email').hide();
							_form.find('.notify--invalid-email').fadeIn();
							valid = false;
						}
					}
				}	 
				//Hide errors
				input.on('keydown', function () {
					_form.find('.notify--enter-' + name).hide();		
				});
	 
			});
			checkLoginValid._isValid = valid;
		}

		var _sendForm = function() {
			// if email end password is valid => checkLoginValid._isValid = true and form is submit
			if (checkLoginValid._isValid) {
			 _form.unbind('submit').submit();
			} 
		}

		return {
			init
		}
	}());

	checkLoginValid.init();	

});