namespace app.Services {

  //MovieService
  export class MovieService {
    public MovieResource;

    public save(movie) {
      return this.MovieResource.save(movie).$promise;
    }

    public getAll() {
      return this.MovieResource.query();
    }

    public remove(id) {
      return this.MovieResource.remove({id: id}).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService) {
      this.MovieResource = $resource('/api/movies');
    }
  }

  //UserService
  export class UserService {
    public UserResource;
    public register(user) {
      return this.UserResource.save(user).$promise;
    }
    constructor(
      private $resource: ng.resource.IResourceService){
        this.UserResource = $resource('/api/users');
    }
  }

  // register services with main app module
  angular.module('app').service('movieService', MovieService);
  angular.module('app').service('userService', UserService);
}
