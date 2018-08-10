import React from 'react'
// import Register from '../../components/register/registerComponent'
// import ProductDescription from '../../components/productDescription/productDescriptionComponent'
// import RegisterProcess from '../../components/registerProcess/registerProcessComponent'
import RegisterProcess from '../../containers/registerProcess/registerProcessContainer'

class RegisterProcessPageRoute extends React.Component {
	render () {
		return (
  <div className='container'>
    <RegisterProcess {...this.props} />
  </div>
		)
	}
	props: {}
}
export default RegisterProcessPageRoute
