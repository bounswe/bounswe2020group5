export default function validateEditProfile(state) {

  var validation = {
    first_name: { error: false, message: '' },
    last_name: { error: false, message: '' },
    email: { error: false, message: '' },
    address: { error: false, message: '' },
    username: { error: false, message: '' },

  }
  if (state.first_name === '') {
    console.log("girdi")
    validation.first_name = { error: true, message: 'Required' }
  }

  if (state.last_name === '') {
    validation.last_name = { error: true, message: 'Required' }
  }

  if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(state.email))) {
    validation.email = { error: true, message: 'Please enter a valid mail address' }
  }

  if (state.username === '') {
    validation.username = { error: true, message: 'Required' }
  }

  if (state.address === '') {
    validation.address = { error: true, message: 'Required' }
  }

  return validation
}
