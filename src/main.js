import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import './registerServiceWorker';
import 'vuetify/dist/vuetify.min.css';
// import '@mdi/font/css/materialdesignicons.css';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import ElementUI from 'element-ui';
import 'element-theme-dark';
// import 'element-ui/lib/theme-chalk/index.css';
import 'izitoast/dist/css/iziToast.css';
import './assets/default.styl';
// import 'vue-status-indicator/styles.css'
import StatusIndicator from 'vue-status-indicator'
import VueIntro from 'vue-introjs';

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@supermap/iclient-leaflet'

Vue.use(L)
Vue.component('v-chart', ECharts)
Vue.use(ElementUI);
Vue.use(Vuetify, {
	// theme: {
	//   primary: colors.indigo.base, // #E53935
	//   secondary: colors.indigo.lighten4, // #FFCDD2
	//   accent: colors.indigo.base // #3F51B5
	// },
	options: {
		themeVariations: ['primary', 'secondary', 'accent'],
		extra: {
			mainToolbar: {
				color: 'primary'
			},
			sideToolbar: {},
			sideNav: 'primary',
			mainNav: 'primary lighten-1',
			bodyBg: ''
		}
	}
});
Vue.use(StatusIndicator);
Vue.use(VueIntro);

Vue.component('v-chart', ECharts);
Vue.config.productionTip = false;
//require('echarts/extension/bmap/bmap');

new Vue({
	router,
	store,
	render: h => h(App),
	components: { App },
	template: '<App/>'
}).$mount('#app');
