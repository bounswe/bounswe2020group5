export default function validateEditProfile(state) {

  var validation = {
    address_1: { error: false, message: '' },
    address_2: { error: false, message: '' },
    address_3: { error: false, message: '' },
    address_4: { error: false, message: '' },
    address_5: { error: false, message: '' },
  }

  if (state.address_1 === '') {
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


  return validation
}
