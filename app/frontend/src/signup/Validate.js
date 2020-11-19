import { string } from "prop-types"

export default function validate(state) {


    var validation = {
        password: { error: false, message: '' },
        confirm: { error: false, message: '' },
    }


    if (state.password.length < 8) {
        validation.password = { error: true, message: 'Passwords must be at least 8 characters' }
    }

    if (!(/\d/.test(string) && /[a-z]/.test(string) && /[A-Z]/.test(string))) {
        validation.password = { error: true, message: 'Passwords must contain at least one lowercase, one uppercase and one digit' }
    }


    if (state.confirm !== state.password) {
        validation.confirm = { error: true, message: 'Passwords must match' }
    }

    return validation
}