import { string } from "prop-types"

export default function validate(state) {


    var validation = {
        password: { error: false, message: '' },
        confirm: { error: false, message: '' },
        fname: { error: false, message: '' },
        lname: { error: false, message: '' },
    }


    if (!(/\d/.test(state.password) && /[a-z]/.test(state.password) && /[A-Z]/.test(state.password))) {
        validation.password = { error: true, message: 'Passwords must contain at least one lowercase, one uppercase and one digit' }
    }

    if (state.password.length < 8) {
        validation.password = { error: true, message: 'Passwords must be at least 8 characters' }
    }

    if (state.confirm !== state.password) {
        validation.confirm = { error: true, message: 'Passwords must match' }
    }

    if (state.fname === '') {
        validation.fname = { error: true, message: 'Required' }
    }

    if (state.lname === '') {
        validation.lname = { error: true, message: 'Required' }
    }

    return validation
}