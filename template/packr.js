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
 * customPackrAccountReceivedEvent(obj)
 *   - called when an account is received via socket
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
 * customPackrAccountDisplayEvent(id)
 *   - called when an account is clicked via attribute: onclick="accountClick(' + obj.accountId +')"
 *   - parameters:
 *      ~ id => account id
 */
function customPackrAccountDisplayEvent(id) {
  //get account detail: var account = accountHandler.get(id);
  //TODO
  $('#account-sidebar-inbox').html('<i class="fa fa-inbox fa-lg fa-fw text-muted"></i> '+account.getMail());
  $('#account-sidebar-inbox').attr("onclick", "showFolder('INBOX',"+id+", false);");
  var folders = account.getFolders();
  for (var i in folders) {
    var folder = folders[i];
    displayFolder(folder.getName(), id, folder.getMessageCount());
  }
}
/*
 * customPackrEmailDisplayEvent(obj)
 *   - called when an email should be displayed in the email iframe
 *   - parameters:
 *      ~ obj.id        => ??
 *      ~ obj.sbj       => email subject
 *      ~ obj.content   => email content
 *      ~ obj.senddate  => email send timestamp
 *      ~ obj.recdate   => email receive timestamp
 *      ~ obj.sender    => email sender
 *      ~ obj.rplyto    => email reply-to address
 *      ~ obj.to        => email reciever
 *      ~ obj.cc        => ??
 *      ~ obj.bcc       => ??
 *      ~ obj.accountID => id of the email account
 *      ~ obj.folder    => full folder path of email
 */
function customPackrEmailDisplayEvent(obj) {
  //populate the header fields and iframe
}
/*
 * customPackrEmailForListReceivedEvent(obj)
 *   - called when ??
 *   - parameters:
 *      ~ obj.colorCode => color code of account
 *      ~ obj.sbj       => email subject
 *      ~ obj.senddate  => email send timestamp
 *      ~ obj.recdate   => email receive timestamp
 *      ~ obj.sender    => email sender
 *      ~ obj.rplyto    => email reply-to address
 *      ~ obj.cc        => ??
 *      ~ obj.bcc       => ??
 *      ~ obj.folder    => full folder path of email
 *      ~ obj.seen      => ??
 *      ~ obj.ansered   => ??
 *      ~ obj.deleted   => ??
 *      ~ obj.draft     => ??
 *      ~ obj.flagged   => ??
 */
function customPackrEmailForListReceivedEvent(obj) {
  //TODO
  
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
/*
 * customPackrEmailSendEvent()
 *   - called when email is send
 */
function customPackrEmailSendEvent() {
  //hide email dialog, clear input fields...
}
/*
 * customPackrMailSendedEvent(obj)
 *   - called when an email was sent
 *   - parameters:
 *      ~ obj => boolean, true if email was sent successfully
 */
function customPackrMailSendedEvent(obj) {
  //inform if email was sent successfully
}
/*
 * customPackrFolderLoadEvent()
 *   - called when ??
 */
function customPackrFolderLoadEvent() {
}
/*
 * customPackrLoadedEvent()
 *   - called when onLoad function in packr.js is called
 */
function customPackrLoadedEvent() {
}
/*
 * customPackrStartEvent()
 *   - called when packr.js tries to authenticate a user
 */
function customPackrStartEvent() {
}
/*
 * customPackrStartSocketEvent()
 *   - called when packr.js starts the socket connection
 */
function customPackrStartSocketEvent() {
}
/*
 * customPackrSocketConnectedEvent()
 *   - called when packr.js connected to a packr server
 */
function customPackrSocketConnectedEvent() {
}
/*
 * customPackrSocketClosedEvent()
 *   - called when packr.js closed the connection to a packr server
 */
function customPackrSocketClosedEvent() {
}
/*
 * customPackrSocketErrorEvent()
 *   - called when packr.js got a socket error
 */
function customPackrSocketErrorEvent() {
}
/*
 * customPackrSocketNotSupportetEvent()
 *   - called when 'socket' is not supported by the client
 */
function customPackrSocketNotSupportedEvent() {
}
/*
 * customPackrUserValidEvent()
 *   - called when packr.js successfully validates the user
 */
function customPackrUserValidEvent() {
  // here it should hide the login, user is now logged in
}


//TODO
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
