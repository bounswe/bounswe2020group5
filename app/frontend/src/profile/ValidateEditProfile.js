export default function validateEditProfile(state) {

  var validation = {
    first_name: { error: false, message: '' },
    last_name: { error: false, message: '' },
    email: { error: false, message: '' },
    address_1: { error: false, message: '' },
    address_2: { error: false, message: '' },
    address_3: { error: false, message: '' },
    address_4: { error: false, message: '' },
    address_5: { error: false, message: '' },
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

  if (state.address_1 === '') {
    console.log("nasıl")
    validation.address_1 = { error: true, message: 'Required' }
  }
  if (state.address_2 === '') {
    validation.address_2 = { error: true, message: 'Required' }
  }
  if (state.address_3 === '') {
    validation.address_3 = { error: true, message: 'Required' }
  }
  if (state.address_4 === '') {
    validation.address_4 = { error: true, message: 'Required' }
  }
  if ((/[A-Z]/.test(state.address_4)) || /[a-z]/.test(state.address_4)) {
    validation.address_4 = { error: true, message: 'Only number' }
  }
  if (state.address_5 === '') {
    validation.address_5 = { error: true, message: 'Required' }
  }

  if (state.username === '') {
    validation.username = { error: true, message: 'Required' }
  }

  return validation
}
