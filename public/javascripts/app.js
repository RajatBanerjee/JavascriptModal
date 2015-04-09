function btnClick(){
  JudyModal.open({
    content: '<strong>Default modal!</strong><br />Testing the modal.<br /><br />Loreum ipsum dolorem the quick brown fox jumped over the lazy dog.<br /><br />Yes its true.',
               draggable: true,
               openCallback: function () {
                   alert('This is an example of the use of openCallback');
               }
            });
}