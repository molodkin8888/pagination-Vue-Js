var applicationId = '';

new Vue({
	el:'#applicationPagination',
	data: {
		photos: [],
		totalPhotos: 0,
		countPhoto: 6,
		currentPage: 1
	},
	methods: {
		showPhoto: function(page){ 
			var options = {
				params: {
					client_id: applicationId,
					page: page,
					per_page: this.countPhoto
				}
			}

			this.$http.get('https://api.unsplash.com/photos', options).then(function(response){
				this.photos = response.data
				this.totalPhotos = parseInt(response.headers.get('x-total'))
				this.currentPage = page
			}, console.log)
		}
	},
	created: function(){
		this.showPhoto(this.currentPage)
	}
})


Vue.component('pagination', {
	template: '#paginationTemplate', 
	props: {
		current: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 0
		},
		perPage: {
			type: Number,
			default: 6
		},
		pageCount: {
			type: Number,
			default: 1
		}
	},
	computed: {
		pages: function(){
			var pages = []
			for(var i = this.pageStart; i <= this.pageEnd; i++){
				pages.push(i)
			}
			return pages
		},
		pageStart: function(){
			var start = this.current - this.pageCount
			return(start > 0) ? start : 1
		},

		pageEnd:function(){
			var end = this.current + this.pageCount

			return(end < this.totalPages) ? end : this.totalPages
		},

		totalPages: function(){
			return Math.ceil(this.total/this.perPage)
		},

		nextPage: function(){
			return this.current + 1
		},

		previousPage: function(){
			return this.current - 1
		}
	},
	methods: {
		First: function(){
			return this.pageStart !== 1
		},

		Last: function(){
			return this.pageEnd < this.totalPages
		},

		Prev: function(){
			return this.current > 1
		},
		Next: function(){
			return this.current < this.totalPages
		},

		changePage: function(page){
			this.$emit('page-changed', page)
		}
	}
})

Vue.component('simple-counter', {
  template: '<button v-on:click="counter++">{{ counter }}</button>',
  
data: function () {
  return {
    get counter(){
      return localStorage.getItem('counter') || 0;
  }, 
    set counter(value) {
        localStorage.setItem('counter', value);
    }
};
}
});