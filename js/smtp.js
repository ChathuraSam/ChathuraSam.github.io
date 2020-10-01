function sendEmail(){

	var fromEmail = document.getElementById('form_email');
	var fromName = document.getElementById('form_name');
	var message = document.getElementById('form_message');
	Email.send({
    SecureToken : "10b17316-6289-45cb-b436-ba637bd402ed",
    To : 'chathura.samarajeewa@gmail.com',
    From : fromEmail.value,
    Subject : fromName.value+" has sent this from my Resume site",
    Body : message.value
	}).then(
	  message => alert("!Your message was successfully sent! I'll get back to you soon!!!")
	);
}