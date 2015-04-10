(function () {
       //Global object
        this.JudyModal= {};

        var options = {},
            closeModalEvent,
            defaultSettings = {
                width: '250px',
                height: '250px',
                lock: false,
                content:"<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam nisi, temporibus quam iusto amet beatae ab nobis. Perferendis fugiat cupiditate quas iure alias odio suscipit voluptate facilis, dolorem sapiente adipisci.</p>",
                closeButton: true,
                draggable: false,
                closeAfter: 0,
                openCallback: false,
                closeCallback: false,
                hideOverlay: false
            };

        //variables required for building the modal
        var modalOverlay,
            modalContainer,
            modalHeader,
            modalContent,
            modalClose;

        /*
        PUBLIC FUNCTIONS
        */

        // Open the modal
        JudyModal.open = function (parameters) {
            
                if(typeof(parameters)=="undefined"){
                    options = defaultSettings;
                }
                else{
                options.width = parameters.width || defaultSettings.width;
                options.height = parameters.height || defaultSettings.height;
                options.lock = parameters.lock || defaultSettings.lock;
                options.closeButton = parameters.closeButton || defaultSettings.closeButton;
                options.draggable = parameters.draggable || defaultSettings.draggable;
                options.closeAfter = parameters.closeAfter || defaultSettings.closeAfter;
                options.closeCallback = parameters.closeCallback || defaultSettings.closeCallback;
                options.openCallback = parameters.openCallback || defaultSettings.openCallback;
                options.hideOverlay = parameters.hideOverlay || defaultSettings.hideOverlay;
                options.content= parameters.content || defaultSettings.content;
                }
            SetModalContainerOptions(options);
            BuildModalInnerContent(options.content);
            SentModalCenter();
            setEventHandlers(options)
      

            document.onkeypress = function (e) {
                if (e.keyCode === 27 && options.lock !== true) {
                    JudyModal.close();
                }
            };

        

        // if (window.addEventListener) {
        //     window.addEventListener('resize', centerModal, false);
        // } else if (window.attachEvent) {
        //     window.attachEvent('onresize', centerModal);
        // }

        // if (options.draggable) {
        //     modalHeader.style.cursor = 'move';
        //     modalHeader.onmousedown = function (e) {
        //         JudyModal.drag(e);
        //         return false;
        //     };
        // } else {
        //     modalHeader.onmousedown = function () {
        //         return false;
        //     };
        // }
        // if (options.closeAfter > 0) {
        //     closeModalEvent = window.setTimeout(function () {
        //         JudyModal.close();
        //     }, options.closeAfter * 1000);
        // }
        // if (options.openCallback) {
        //     options.openCallback();
        // }
        };

       
        // Close the modal
        JudyModal.close = function () {
            modalContent.innerHTML = '';
            modalOverlay.setAttribute('style', '');
            modalOverlay.style.cssText = '';
            modalOverlay.style.visibility = 'hidden';
            modalContainer.setAttribute('style', '');
            modalContainer.style.cssText = '';
            modalContainer.style.visibility = 'hidden';
            modalHeader.style.cursor = 'default';
            modalClose.setAttribute('style', '');
            modalClose.style.cssText = '';

            if (closeModalEvent) {
                window.clearTimeout(closeModalEvent);
            }

            if (options.closeCallback) {
                options.closeCallback();
            }

            if (window.removeEventListener) {
                window.removeEventListener('resize', centerModal, false);
            } else if (window.detachEvent) {
                window.detachEvent('onresize', SentModalCenter);
            }
        };

        

        //private functions
        function BuildModalContent(){
            modalOverlay = document.createElement('div'),
            modalContainer = document.createElement('div'),
            modalHeader = document.createElement('div'),
            modalContent = document.createElement('div'),
            modalClose = document.createElement('div');

        

            // Set the id's, append the nested elements, and append the complete modal to the document body
            modalOverlay.setAttribute('id', 'modal-overlay');
            modalContainer.setAttribute('id', 'modal-container');
            modalHeader.setAttribute('id', 'modal-header');
            modalContent.setAttribute('id', 'modal-content');
            modalClose.setAttribute('id', 'modal-close');
            modalClose.setAttribute('class','judy-modal-close');
            modalHeader.appendChild(modalClose);
            modalContainer.appendChild(modalHeader);
            modalContainer.appendChild(modalContent);

            modalClose.innerHTML  ="X"

            modalOverlay.style.visibility = 'hidden';
            modalContainer.style.visibility = 'hidden';

             document.body.appendChild(modalOverlay);
                document.body.appendChild(modalContainer);
                 
        }
        
        function SetModalContainerOptions (options){
             modalContainer.style.width = options.width;
            modalContainer.style.height = options.height;
              if (options.lock || !options.closeButton) {
            modalClose.style.visibility = 'hidden';
            }
            if (!options.hideOverlay) {
                modalOverlay.style.visibility = 'visible';
            }
            modalContainer.style.visibility = 'visible';
        }

        function BuildModalInnerContent (innerContent) {
             
             modalContent.innerHTML = innerContent;  
        }

        // Center the modal in the viewport
        function SentModalCenter(parameters) {
            var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),

                modalWidth = Math.max(modalContainer.clientWidth, modalContainer.offsetWidth),
                modalHeight = Math.max(modalContainer.clientHeight, modalContainer.offsetHeight),

                browserWidth = 0,
                browserHeight = 0,

                amountScrolledX = 0,
                amountScrolledY = 0;

            if (typeof (window.innerWidth) === 'number') {
                browserWidth = window.innerWidth;
                browserHeight = window.innerHeight;
            } else if (document.documentElement && document.documentElement.clientWidth) {
                browserWidth = document.documentElement.clientWidth;
                browserHeight = document.documentElement.clientHeight;
            }

            if (typeof (window.pageYOffset) === 'number') {
                amountScrolledY = window.pageYOffset;
                amountScrolledX = window.pageXOffset;
            } else if (document.body && document.body.scrollLeft) {
                amountScrolledY = document.body.scrollTop;
                amountScrolledX = document.body.scrollLeft;
            } else if (document.documentElement && document.documentElement.scrollLeft) {
                amountScrolledY = document.documentElement.scrollTop;
                amountScrolledX = document.documentElement.scrollLeft;
            }

            
            modalContainer.style.left = amountScrolledX + (browserWidth / 2) - (modalWidth / 2) + 'px';

            modalOverlay.style.height = documentHeight + 'px';
            modalOverlay.style.width = '100%';
        };
      
             if (window.addEventListener) {
            window.addEventListener('load', function () {
                BuildModalContent();
            }, false);
        } else if (window.attachEvent) {
            window.attachEvent('onload', function () {
                BuildModalContent();
            });
        }
        
        function setEventHandlers (parameters){

            modalClose.addEventListener('click',function () {
                if (parameters.closeButton) {
                    JudyModal.close();
                } else {
                    return false;
                }
            }); 

            modalOverlay.addEventListener('click', function () {
                if (!parameters.lock) {
                    JudyModal.close();
                } else {
                    return false;
                }
            });
        }
    }());