function Resource(url) {
  this.url = url;
}

// api/orders -> GET, POST

Resource.prototype.query = function() {

	return Q($.ajax({
	    url: this.url, // api endpoint
	    method: "get",          // method
	    dataType: "json"        // data type
	}));
}

Resource.prototype.create = function(data, client) {
	return Q($.ajax({
	    url: this.url, // api endpoint
	    method: "post",          // method
	    data: {client: client, products: data.products},
	    dataType: "json"        // data type
	}));
}

// api/orders/:id -> GET, PUT, DELETE

Resource.prototype.view = function(id) {
	return Q($.get(this.url+"/"+id));
}

Resource.prototype.update = function(id, data) {
	return Q($.ajax({
	    url: this.url+"/"+id, // api endpoint
	    method: "put",          // method
	    data: data,
	    dataType: "json"        // data type
	}));
}

Resource.prototype.delete = function(id) {
	return Q($.ajax({
	    url: this.url+"/"+id, // api endpoint
	    method: "delete",
	    dataType: "json"        // data type
	}));
}
