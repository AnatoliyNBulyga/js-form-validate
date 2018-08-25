$(document).ready(function() {

	var commentFormCheck = (function() {

		// Приватные переменные модуля
		var _button = $('.button'),
				_form = $('#comment-form'),
				_isValid = true;
		
		//Функция инициализации модуля
		var init = function() {
			_setUpListeners();
		}

		//Функция прослушивания событий на странице
		var _setUpListeners = function() {
			_form.on('submit', function (event) {
			_checkFormValidate(event);
			_sendForm();	
			});

		}

		// Приватные  функции модуля
		var _checkFormValidate = function(event) {
			event.preventDefault();
			var textarea = _form.find('textarea'),
					val = textarea.val().trim(),
					requiredValue = textarea.attr('data-valid'),
					valid = true;

					if (requiredValue == 'required') {
						// Show errors
						if (val === '') {
							_form.find('.notify').fadeIn();
							valid = false;
						}

						// Hide errors
						textarea.on('keydown', function () {
							_form.find('.notify').fadeOut();		
						});
					}
		commentFormCheck._isValid = valid;
		}
		
		var _sendForm = function() {
			if (commentFormCheck._isValid == true) {
				_form.unbind('submit').submit();
			}
		} 


		//Возращаем переменные, которые будут доступны из-вне модуля
		return {
			init
		}

	}());


	//Вызываем модуль через метод запуска
	commentFormCheck.init();

});