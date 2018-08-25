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
			var inputs = _form.find('input'),
					valid = true;
					

			$.each(inputs, function(index, val) {
				var input = $(val),
				 		value = input.val().trim(),
				 		name = input.attr('name');

				// validate form		
				if (value === '') {
					// Show errors
					_form.find('.notify--enter-' + name).fadeIn();
				}
					//Hide errors
				input.on('change', function () {
					_form.find('.notify--enter-' + name).fadeOut();
				});

				// validate email
				if (input.attr('type').toLowerCase() === 'email') {
					var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

					if (pattern.test(value)) {
						// Hide error-email
						_form.find('.notify--invalid-email').fadeOut();
					} else {
						// Show error-email
						_form.find('.notify--invalid-email').fadeIn();
					}

					if (value !== _validEmail) {
						valid = false;
					} 

				}

				if (input.attr('type').toLowerCase() === 'password') {
					if (+value !== _password) {
						valid = false;
					} 
				}
				 
			});

			checkLoginValid._isValid = valid;
		}

		var _sendForm = function() {
			if (checkLoginValid._isValid) {
				_form.unbind('submit').submit();
			} else {
				_form.find('.notify--invalid-password-email').fadeIn();
			} 
		}

		return {
			init
		}
	}());

	checkLoginValid.init();	

});