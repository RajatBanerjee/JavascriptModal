(function () {
       
        this.JudyModal= {};
        var options = {},

          

            centerModal,

            closeModalEvent,

            defaultSettings = {
                width: 'auto',
                height: 'auto',
                lock: false,
                hideClose: false,
                draggable: false,
                closeAfter: 0,
                openCallback: false,
                closeCallback: false,
                hideOverlay: false
            };

        // Open the modal
        JudyModal.open = function (parameters) {
            settings.width = parameters.width || defaultSettings.width;
            settings.height = parameters.height || defaultSettings.height;
            settings.lock = parameters.lock || defaultSettings.lock;
            settings.hideClose = parameters.hideClose || defaultSettings.hideClose;
            settings.draggable = parameters.draggable || defaultSettings.draggable;
            settings.closeAfter = parameters.closeAfter || defaultSettings.closeAfter;
            settings.closeCallback = parameters.closeCallback || defaultSettings.closeCallback;
            settings.openCallback = parameters.openCallback || defaultSettings.openCallback;
            settings.hideOverlay = parameters.hideOverlay || defaultSettings.hideOverlay;

            centerModal = function () {
                JudyModal.center({});
            };

            if (parameters.content && !parameters.ajaxContent) {
                modalContent.innerHTML = parameters.content;
            } else if (parameters.ajaxContent && !parameters.content) {
                modalContainer.className = 'modal-loading';
                JudyModal.ajax(parameters.ajaxContent, function insertAjaxResult(ajaxResult) {
                    modalContent.innerHTML = ajaxResult;
                });
            } else {
                modalContent.innerHTML = '';
            }

            modalContainer.style.width = settings.width;
            modalContainer.style.height = settings.height;

            JudyModal.center({});

            if (settings.lock || settings.hideClose) {
                modalClose.style.visibility = 'hidden';
            }
            if (!settings.hideOverlay) {
                modalOverlay.style.visibility = 'visible';
            }
            modalContainer.style.visibility = 'visible';

            document.onkeypress = function (e) {
                if (e.keyCode === 27 && settings.lock !== true) {
                    JudyModal.close();
                }
            };

            modalClose.onclick = function () {
                if (!settings.hideClose) {
                    JudyModal.close();
                } else {
                    return false;
                }
            };
            modalOverlay.onclick = function () {
                if (!settings.lock) {
                    JudyModal.close();
                } else {
                    return false;
                }
            };

            if (window.addEventListener) {
                window.addEventListener('resize', centerModal, false);
            } else if (window.attachEvent) {
                window.attachEvent('onresize', centerModal);
            }

            if (settings.draggable) {
                modalHeader.style.cursor = 'move';
                modalHeader.onmousedown = function (e) {
                    JudyModal.drag(e);
                    return false;
                };
            } else {
                modalHeader.onmousedown = function () {
                    return false;
                };
            }
            if (settings.closeAfter > 0) {
                closeModalEvent = window.setTimeout(function () {
                    JudyModal.close();
                }, settings.closeAfter * 1000);
            }
            if (settings.openCallback) {
                settings.openCallback();
            }
        };

        // Drag the modal
        JudyModal.drag = function (e) {
            var xPosition = (window.event !== undefined) ? window.event.clientX : e.clientX,
                yPosition = (window.event !== undefined) ? window.event.clientY : e.clientY,
                differenceX = xPosition - modalContainer.offsetLeft,
                differenceY = yPosition - modalContainer.offsetTop;

            document.onmousemove = function (e) {
                xPosition = (window.event !== undefined) ? window.event.clientX : e.clientX;
                yPosition = (window.event !== undefined) ? window.event.clientY : e.clientY;

                modalContainer.style.left = ((xPosition - differenceX) > 0) ? (xPosition - differenceX) + 'px' : 0;
                modalContainer.style.top = ((yPosition - differenceY) > 0) ? (yPosition - differenceY) + 'px' : 0;

                document.onmouseup = function () {
                    window.document.onmousemove = null;
                };
            };
        };

        // Perform XMLHTTPRequest
        JudyModal.ajax = function (url, successCallback) {
            var i,
                XMLHttpRequestObject = false,
                XMLHttpRequestObjects = [
                    function () {
                        return new window.XMLHttpRequest();  // IE7+, Firefox, Chrome, Opera, Safari
                    },
                    function () {
                        return new window.ActiveXObject('Msxml2.XMLHTTP.6.0');
                    },
                    function () {
                        return new window.ActiveXObject('Msxml2.XMLHTTP.3.0');
                    },
                    function () {
                        return new window.ActiveXObject('Msxml2.XMLHTTP');
                    }
                ];

            for (i = 0; i < XMLHttpRequestObjects.length; i += 1) {
                try {
                    XMLHttpRequestObject = XMLHttpRequestObjects[i]();
                } catch (ignore) {
                }

                if (XMLHttpRequestObject !== false) {
                    break;
                }
            }

            XMLHttpRequestObject.open('GET', url, true);

            XMLHttpRequestObject.onreadystatechange = function () {
                if (XMLHttpRequestObject.readyState === 4) {
                    if (XMLHttpRequestObject.status === 200) {
                        successCallback(XMLHttpRequestObject.responseText);
                        modalContainer.removeAttribute('class');
                    } else {
                        successCallback(XMLHttpRequestObject.responseText);
                        modalContainer.removeAttribute('class');
                    }
                }
            };

            XMLHttpRequestObject.send(null);
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

            if (settings.closeCallback) {
                settings.closeCallback();
            }

            if (window.removeEventListener) {
                window.removeEventListener('resize', centerModal, false);
            } else if (window.detachEvent) {
                window.detachEvent('onresize', centerModal);
            }
        };

        // Center the modal in the viewport
        JudyModal.center = function (parameters) {
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

            if (!parameters.horizontalOnly) {
                modalContainer.style.top = amountScrolledY + (browserHeight / 2) - (modalHeight / 2) + 'px';
            }

            modalContainer.style.left = amountScrolledX + (browserWidth / 2) - (modalWidth / 2) + 'px';

            modalOverlay.style.height = documentHeight + 'px';
            modalOverlay.style.width = '100%';
        };

        //private functions
        function BuildModal(){
            var modalOverlay = document.createElement('div'),
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
            modalHeader.appendChild(modalClose);
            modalContainer.appendChild(modalHeader);
            modalContainer.appendChild(modalContent);

            modalOverlay.style.visibility = 'hidden';
            modalContainer.style.visibility = 'hidden';

             document.body.appendChild(modalOverlay);
                document.body.appendChild(modalContainer);
        }
        
      
    }());