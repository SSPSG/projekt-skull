export const regEx: any = {
    // Password can contain any alphanumerical characters, '+', '_', '-', '.' and its length must be 8 up to 64
    username: /^[\w\-\+\.]{3,20}$/,
    // Email RegEx format: example.exa-_mple+example@example.co.uk
    email: /^([a-z\d_\-\.\+]+)@([a-z\d_\-]{2,15})\.([a-z\d]{2,15})(\.[a-z\d]{2,8})?$/,
    // Password has the same RegEx as username
    password: /^([\w\-\+\.]{8,64})$/,
};

export function validate(field: HTMLInputElement, reg: RegExp) {
    return reg.test(field.value);
}