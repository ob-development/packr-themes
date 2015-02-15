/*  
 * packr (https://ob-dev.de)
 *
 * @theme_name [THEME NAME]
 * @theme_id [THEME ID]
 * @author [THEME AUTHOR]
 * @version [THEME VERSION]
 *
 */
 
/* The JS you need for the theme goes here */

/* packr events */

/*
 * customPackrAccountBackEvent()
 *   - called when the detailed sidebar should be closed
 */
function customPackrAccountBackEvent() {
}
/*
 * customPackrAccountReceivedEvent()
 *   - called when an account is recieved via socket
 *   - parameters:
 *      ~ obj.accountId => unique account id
 *      ~ obj.email     => email address
 *      ~ obj.cc        => account colorcode
 */
function customPackrAccountReceivedEvent(obj) {
  //create an element with the attribute: onclick="accountClick(' + obj.accountId +')"
  //colorcode can be used to mark the account, please use: rgba(' + obj.cc + ',0.7)
}
/*
 * customPackrAccountDisplayEvent()
 *   - called when an account is clicked via attribute: onclick="accountClick(' + obj.accountId +')"
 *   - parameters:
 *      ~ id => account id
 */
function customPackrAccountDisplayEvent(id) {
  //get account detail: var account = accountHandler.get(id);
  $('#account-sidebar-inbox').html('<i class="fa fa-inbox fa-lg fa-fw text-muted"></i> '+account.getMail());
  $('#account-sidebar-inbox').attr("onclick", "showFolder('INBOX',"+id+", false);");
  var folders = account.getFolders();
  for (var i in folders) {
    var folder = folders[i];
    displayFolder(folder.getName(), id, folder.getMessageCount());
  }
}
function customPackrEmailDisplayEvent(obj) {
  // called when an email should be displayed in the email iFrame
  
  // obj contains all information about the email
  
  /*
   * #obj.id
   * #obj.sbj
   * #obj.content
   * #obj.senddate
   * #obj.recdate
   * #obj.sender - 
   * #obj.rplyto - email an welche die antwort soll
   * #obj.to - empfänger denk ich
   * #obj.cc - 
   * #obj.bcc - 
   * #obj.accountID - id vom account
   * #obj.folder - voller ordner name wo die email ist
   */
  
  $('#mail-frame-title').html(obj.sbj);
  $('#mail-frame-time').html(obj.recdate);
  $('#mail-frame-from').html("Von: "+obj.sender);
  $('#mail-frame-to').html("An: "+obj.to);
  frame = document.getElementById('mail-content')
  frame.src = "javascript:;";
  win = frame.contentWindow;
  win.document.open();
  win.document.write(obj.content);
  win.document.close();
  document.getElementById('mail-frame').scrollTop = 0;
}
function customPackrEmailForListReceivedEvent(obj) {
  // called when some kind of crap...
  
  /* #obj.seen
   * #obj.answered
   * #obj.deleted
   * #obj.flagged
   * #obj.draft
   * #obj.colorCode
   * #obj.cc
   * #obj.bcc
   * #obj.rplyto
   * #obj.sender
   * #obj.senddate
   * #obj.recdate
   * #obj.sbj
   * #obj.folder
   */
  
  // need to check here, if the email is from the displayed email list
  // if so --> update the view | else | nothing
  
  // possible code:
  /*var newMSG = createNewMessageDiv(obj.id, obj.sbj, obj.recdate, obj.prev, obj.sender, obj.colorCode, obj.folder, obj.accountID);
  $("#message-frame").prepend(newMSG);*/
  
  var newMsg = $(document.createElement("div"));
  newMsg.attr('onclick','loadMail('+obj.id+',\''+obj.folder+'\','+obj.accountID+');');
  newMsg.attr('class', 'msg unseen');
  newMsg.attr('style', 'border-left: 10px solid rgba('+obj.colorCode+',0.7);');
  
  var star = (obj.flagged) ? '<i class="fa fa-star fa-fw pull-right"></i> ' : '' ;
  
  newMsg.html('<h3 class="text-left" title="'+obj.sbj+'"><div class="truncate">'+obj.sbj+'</div>'+star+'</h3><div class="sender truncate">'+obj.sender+'</div><span class="pull-right text-muted">'+obj.senddate+'</span>');
  
  $("#message-frame").prepend(newMsg);
   
}
function customPackrEmailSendEvent() {
  // called when an email is send
}
function customPackrMailSendedEvent(obj) {
  // Wenn jmd. eine E-Mail verschickt, wird diese Funktion als antwort aufgerufen, ob die E-Mail erfolgreich verschickt wurde
  // obj = true|false (boolean)
}
function customPackrFolderLoadEvent() {
  $("#message-frame").html("");
}
function customPackrLoadedEvent() {
  // called when onLoad function in packr.js is called
}
function customPackrStartEvent() {
  // called when packr.js tries to authenticate a user
}
function customPackrStartSocketEvent() {
  // called when packr.js starts an socket connection
}
function customPackrSocketConnectedEvent() {
  // called when packr.js connected to a packr server
}
function customPackrSocketClosedEvent() {
  // called when packr.js closed the connection to a packr server
}
function customPackrSocketErrorEvent() {
  // called when packr.js got a socket error
}
function customPackrSocketNotSupportedEvent() {
  // called when 'socket' is not supported by the client
}
function customPackrUserValidEvent() {
  // called when packr.js recived that user is validated
  
  // here it should hide the login/other modal
  // user is now logged in
}

/*
 * Custom scripts
 */

function displayFolder(name, account, unreadMessageCount) {
  var liObj = '<a href="#" onclick="showFolder(\''+name+'\', '+account+');" id="account-sidebar-close"><i class="fa fa-folder fa-fw text-muted"></i> '+name+' <span class="badge">'+unreadMessageCount+'</span></a>';
  var li = document.createElement('li');
  li.setAttribute("class", "sidebar-list sidebar-detail-folder");
  li.innerHTML = liObj;
  var ul = document.getElementById("detail-sidebar");
  ul.appendChild(li);
}
