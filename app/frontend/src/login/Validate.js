export default function validate(state) {

    var validation = {
        password: { error: false, message: '' },
        uid: { error: false, message: '' },
    }


    if (state.password === '') {
        validation.password = { error: true, message: 'Required' }
    }

    if (state.uid === '') {
        validation.uid = { error: true, message: 'Required' }
    }

    return validation
}