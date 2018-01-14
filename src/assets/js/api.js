// const api = {
// 	localhost: 'http://localhost:3334'
// }

export default {
	install(Vue, options) {
		Vue.prototype.commen = {
			api: 'http://localhost:3334'
		};
	}
}
