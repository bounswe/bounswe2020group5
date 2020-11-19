export default function validate(state) {


    var validation = {
        password: { error: false, message: '' },
        confirm: { error: false, message: '' },
    }


    if (state.password.length < 8) {
        validation.password = { error: true, message: 'Passwords must be at least 8 characters' }
    }

    if (state.confirm.length < 8) {
        validation.confirm = { error: true, message: 'Passwords must be at least 8 characters' }
    }

    return validation
}