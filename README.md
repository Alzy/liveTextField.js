# liveTextField.js
A simple function that converts an element into a single-line contenteditable field with specified event handlers.

    <span id="text-block">Hello, World!</span>
    
    <script>
    	let textBlock = document.querySelector('#text-block');
    	liveTextField(
    		textBlock,
    		{
    			'onfocus': () => {console.log('I recieved focus')},
    			'oninput': () => {console.log('Someone is typing')},
    			'onblur': () => {console.log('I lost focus')}
    		}
    	);
    </script>

Note that if the user presses the ESC key to leave the text field, the text will revert back to what it was before the user started editting.
