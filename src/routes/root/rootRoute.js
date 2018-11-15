import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppWrapper from '../../components/appWrapper/appWrapperComponent'

if (module.hot) {
	module.hot.accept()
}

export default class Root extends Component {
	constructor () {
		super()

		this.views = {}
	}

	ComponentsRoute = (props) => (
  <Switch>
    <Route exact path='/components' component={(props) => this.loadView('components', props)} />
    <Route exact path='/components/:id' component={(props) => this.loadView('applicationDetail', props)} />
    <Route path='/components/:componentTypeId/:componentId' component={(props) => this.loadView('componentTypeComponent', props)} />
  </Switch>
	)

	loadView (fileName, props) {
		if (this.views[fileName]) {
			return this.views[fileName]
		}

		new Promise(resolve =>
      require.ensure([], require => {
	switch (fileName) {
	case 'dummy':
		if (module.hot) {
			module.hot.accept('../dummyPage/homePageRoute', () => {
                require('../dummyPage/homePageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../dummyPage/homePageRoute').default)
		break
	case 'home':
		if (module.hot) {
			module.hot.accept('../homePage/homePageRoute', () => {
                require('../homePage/homePageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../homePage/homePageRoute').default)
		break
	case 'landing':
		if (module.hot) {
			module.hot.accept('../landingPage/landingPageRoute', () => {
                require('../landingPage/landingPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../landingPage/landingPageRoute').default)
		break
	case 'registerProcess':
		if (module.hot) {
			module.hot.accept('../registerProcessPage/registerProcessPageRoute', () => {
                require('../registerProcessPage/registerProcessPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../registerProcessPage/registerProcessPageRoute').default)
		break
	case 'components':
		if (module.hot) {
			module.hot.accept('../componentsPage/componentsPageRoute', () => {
                require('../componentsPage/componentsPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../componentsPage/componentsPageRoute').default)
		break
	case 'applicationDetail':
		if (module.hot) {
			module.hot.accept('../applicationDetailPage/applicationDetailPageRoute', () => {
                require('../applicationDetailPage/applicationDetailPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../applicationDetailPage/applicationDetailPageRoute').default)
		break
	case 'componentTypeComponent':
		if (module.hot) {
			module.hot.accept('../componentTypeComponentPage/componentTypeComponentPageRoute', () => {
                require('../componentTypeComponentPage/componentTypeComponentPageRoute').default // eslint-disable-line
				this.forceUpdate()
			})
		}
		resolve(require('../componentTypeComponentPage/componentTypeComponentPageRoute').default)
		break
	default:
		break
	}
})
    )
      .then(View => {
	this.views[fileName] = <View {...props} />
})
      .then(() => this.forceUpdate())
      .catch(err => {
	console.error(err)
	throw new Error(err)
})

		return <div />
	}
	render () {
		return (
  <AppWrapper>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={(props) => this.loadView('landing', props)} />
        <Route exact path='/sample_joinjs' component={(props) => this.loadView('dummy', props)} />
        <Route exact path='/landing' component={(props) => this.loadView('landing', props)} />
        <Route exact path='/registering' component={(props) => this.loadView('registerProcess', props)} />
        <Route exact path='/home' component={(props) => this.loadView('home', props)} />
        {/* <Route path='/componentTypeComponents' component={(props) => this.loadView('componentTypeComponent', props)} /> */}
        {/* <Route path='/components' component={(props) => this.ComponentsRoute(props)} /> */}
        <Route exact path='/component_types' component={(props) => this.loadView('components', props)} />
        <Route exact path='/component_types/:id' component={(props) => this.loadView('applicationDetail', props)} />
        <Route exact path='/components/:id' component={(props) => this.loadView('componentTypeComponent', props)} />
      </Switch>
    </BrowserRouter>
  </AppWrapper>
		)
	}
	props: {
    store: Object
  }
}
