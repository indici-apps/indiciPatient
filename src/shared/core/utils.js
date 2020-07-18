export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Email cannot be empty';
    if (!re.test(email)) return 'Ooops! We need a valid email address';

    return '';
};

export const passwordValidator = password => {
    if (!password || password.length <= 0) return 'Password cannot be empty';

    return '';
};


export const nameValidator = name => {
    if (!name || name.length <= 0) return 'Name cannot be empty';

    return '';
};

export const nhiValidator = (nhi, email) => {
    //if(!nhi || nhi.length <=0 || !email || email.length <=0) return 'NHI or Email cannot be empty';
    const re = /\S+@\S+\.\S+/;
    if (email.length > 0) {
        if (!re.test(email)) return 'Ooops! We need a valid email address';
        else return '';
    }

    if (nhi.length > email.length || email.length > nhi.length) return '';
    else return 'NHI or Email cannot be empty';
    return '';
};