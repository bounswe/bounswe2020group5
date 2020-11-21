export default function validate(state) {

    var validation = {
        current_pw: { error: false, message: '' },
        new_pw: { error: false, message: '' },
        confirm: { error: false, message: '' },
    }


    if (!(/\d/.test(state.current_pw) && /[a-z]/.test(state.current_pw) && /[A-Z]/.test(state.current_pw))) {
        validation.current_pw = { error: true, message: 'Passwords must contain at least one lowercase, one uppercase and one digit' }
    }

    if (state.current_pw.length < 8) {
        validation.current_pw = { error: true, message: 'Passwords must be at least 8 characters' }
    }

    if (!(/\d/.test(state.new_pw) && /[a-z]/.test(state.new_pw) && /[A-Z]/.test(state.new_pw))) {
        validation.new_pw = { error: true, message: 'Passwords must contain at least one lowercase, one uppercase and one digit' }
    }

    if (state.new_pw.length < 8) {
        validation.new_pw = { error: true, message: 'Passwords must be at least 8 characters' }
    }

    if (state.current_pw === state.new_pw) {
        validation.confirm = { error: true, message: 'New password must be different from your current password' }
    }

    if (state.confirm !== state.new_pw) {
        validation.confirm = { error: true, message: 'New passwords must match' }
    }


    return validation
}