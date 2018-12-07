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
				this.config.oninput();
				this.dom.blur();
				return false;
			}
			// ESC
			if(event.which == 27){
				element.innerText = this.previousTextBuffer;
				this.dom.blur();
				return false;
			}
		}
	}

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
