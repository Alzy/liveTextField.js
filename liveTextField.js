/**
 * Given an element and configuration object, convert the element into a
 * content editable field and attach event handlers specified.
 * @param  {domElement} element The dom element to convert
 * @param  {JSON} config  An object containing event handlers (oninput, onfocus, onblur) 
 */
function liveTextField(element, config) {

	this.init = function (element, config) {
		this.dom = element;
		this.dom.setAttribute('contenteditable', true);

		this.config = {};
		this.updateConfig(config);

		this.previousTextBuffer = element.innerText;

		this.dom.onkeydown = (event) => {
			// ENTER
			if(event.which == 13){
				this.dom.innerText = this.dom.innerText.trim().replace('\n', '')
				this.config.oninput();
				this.dom.blur();
				return false;
			}
			// ESC
			if(event.which == 27){
				this.dom.innerText = this.previousTextBuffer;
				this.dom.blur();
				return false;
			}
		}
	}

	/**
	 * Given a JSON config object, attach the event handlers to this object.
	 * @param  {JSON} newConfig The object containing event handler definitions.
	 *                          (oninput, onfocus, onblur). None are required. Will
	 *                          set unspecified handlers as blank function by default.
	 */
	this.updateConfig = function (newConfig) {
		newConfig = newConfig || {};

		this.config = {
			'oninput': newConfig.oninput || this.config.oninput || function(){},
			'onfocus': newConfig.onfocus || this.config.onfocus || function(){},
			'onblur': newConfig.onblur || this.config.onblur || function(){}
		}

		this.dom.oninput = this.config.oninput;
		this.dom.onfocus = (event) => {
			this.previousTextBuffer = element.innerText;
			this.config.onfocus();
		}
		this.dom.onblur = this.config.onblur;
	}

	this.init(element, config);
}
