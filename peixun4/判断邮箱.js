function isEmail(emailStr) {
    // let pattern = /^[a-zA-Z0-9_-]+@\d+\.com/
    let pattern = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
    return pattern.test(emailStr);
}
function isMobilePhone(phone) {
    let pattern = /^1[3456789]\d{9}$/;
    return pattern.test(phone);
}
