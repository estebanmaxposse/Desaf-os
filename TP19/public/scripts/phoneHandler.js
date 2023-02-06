//Phone Number Handler
const phoneInputField = document.getElementById('user-phone');
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

const formatPhone = () => {
    const phoneNumber = phoneInput.getNumber()
    const formatedPhone = document.getElementById('formated-phone')
    formatedPhone.value = phoneNumber
}