(function() {
	//Global object
	this.JudyModal = {};

	var options = {},
		closeModalEvent,
		defaultSettings = {
			width: '250px',
			height:'auto',
			closeOnOverlayClick: false,
			innerContent: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam nisi, temporibus quam iusto amet beatae ab nobis. Perferendis fugiat cupiditate quas iure alias odio suscipit voluptate facilis, dolorem sapiente adipisci.</p>",
			headerContent:"This is a header !!",
			footerContent:"<button>	hahah</button>",
			showClose: true,
			afterOpen: false,
			afterClose: false,
			beforeClose: false,
			overlay: true,
			closeOnEscape: true
		};

	//variables required for building the modal
	var overlay,
		container,
		header,
		innerContent,
		footer,
		close;

	//*********************************//
	//PUBLIC FUNCTIONS
	//*********************************//

	// Open the modal
	JudyModal.open = function(parameters) {

		if (typeof(parameters) == "undefined") {
			options = defaultSettings;
		} else {
			options.width = parameters.width || defaultSettings.width;
			options.height = parameters.height || defaultSettings.height;
			options.closeOnOverlayClick = typeof(parameters.closeOnOverlayClick)!="undefined"?parameters.closeOnOverlayClick: defaultSettings.closeOnOverlayClick;
			options.showClose = typeof(parameters.showClose)!="undefined"?parameters.showClose: defaultSettings.showClose;
			options.afterClose = parameters.afterClose || defaultSettings.afterClose;
			options.beforeClose = parameters.beforeClose || defaultSettings.beforeClose;
			options.afterOpen = parameters.afterOpen || defaultSettings.afterOpen;
			options.overlay = typeof(parameters.overlay)!="undefined"?parameters.overlay:defaultSettings.overlay;
			options.innerContent = parameters.innerContent || defaultSettings.innerContent;
			options.footerContent = parameters.footerContent || defaultSettings.footerContent;
			options.headerContent = parameters.headerContent || defaultSettings.headerContent;
			options.closeOnEscape = typeof(parameters.closeOnEscape)!="undefined"?parameters.closeOnEscape:defaultSettings.closeOnEscape;
		}

		SetModalContainerOptions(options);
		SetModalContent(options);
		setEventHandlers(options)
		
		//open callback
		if (options.afterOpen) {
			options.afterOpen();
		}
	}

	// Close the modal
	JudyModal.close = function() {
		//before close callback
        if (options.beforeClose) {
            options.beforeClose();
        }

        //destroy header
        header.innerHTML ='';
        //destroy content
        innerContent.innerHTML='';
        //destroy footer
        footer.innerHTML ='';
		//hide overlay
		overlay.style.display = 'none';
		//hide container		
		container.style.display = 'none';

		//after clsoe callback
		if (options.closeCallback) {
			options.closeCallback();
		}
	}

	//********************************//
	// private functions
	//********************************//

	//Build the modal sceleton on page load
	function BuildModalContent() {
        var htmlContent = document.createDocumentFragment();

        //create the overlay
		overlay = document.createElement('div');
        overlay.setAttribute('id', 'judy-modal-overlay');
        overlay.setAttribute('class', 'judy-modal-overlay');
        overlay.style.display = 'none';
        htmlContent.appendChild(overlay);

        //Build the Modal Container
        container = document.createElement('div'),
        container.setAttribute('id', 'judy-modal-container');
        container.setAttribute('class', 'judy-modal-container');
        container.style.display = 'none';

        //Build the MOdal Header
        header = document.createElement('div'),
        header.setAttribute('id', 'judy-modal-header');
        header.setAttribute('class', 'judy-modal-header');
        container.appendChild(header);

        //Build the close button
        close = document.createElement('div');
        close.setAttribute('id', 'modal-close');
        close.setAttribute('class', 'judy-modal-close');
        close.innerHTML = "X"
        container.appendChild(close);

        //Build the modal contentHolder
		innerContent = document.createElement('div'),
		innerContent.setAttribute('id', 'judy-modal-content');
        innerContent.setAttribute('class', 'judy-modal-content');
        container.appendChild(innerContent);

        //Build the footer
        footer = document.createElement('div'),
		footer.setAttribute('id', 'judy-modal-footer');
        footer.setAttribute('class', 'judy-modal-footer');
        container.appendChild(footer);


        htmlContent.appendChild(container);
        
        document.body.appendChild(htmlContent);
	}

	//On modal open set the user specified attributes
	function SetModalContainerOptions(options) {
		container.style.width = options.width;
		container.style.height = options.height;

		if (options.showClose===true) {
			close.style.display = 'block';
		}else{
			close.style.display = 'none';
		}

		if (options.overlay===true) {
			overlay.style.display = 'block';
		}else{
			overlay.style.display = 'none';
		}

		container.style.display = 'block';
	}

	//Fill the modal with user specified content,header and footer
	function SetModalContent(parameters) {
		innerContent.innerHTML = parameters.innerContent;
		header.innerHTML=parameters.headerContent;
		footer.innerHTML = parameters.footerContent
	}

	//Register the event handlers for close, escape and overlay click
	function setEventHandlers(parameters) {
        close.addEventListener('click', function() {
            if (parameters.showClose) {
                JudyModal.close();
            } else {
                return false;
            }
        });

        overlay.addEventListener('click', function() {
            if (parameters.closeOnOverlayClick) {
                JudyModal.close();
            } else {
                return false;
            }
        });

        window.addEventListener('keydown',function(e) {
            if (e.keyCode === 27 && options.closeOnEscape == true) {
                JudyModal.close();
            }
            
        });
    }

    //load the modal basic content on the page
	window.addEventListener('load', function() {
		BuildModalContent();
	}, false);

}());