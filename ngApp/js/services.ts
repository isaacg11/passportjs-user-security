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
      this.MovieResource = $resource('/api/movies/:id');
    }
  }

  //UserService
  export class UserService {
    public RegisterResource;
    public LoginResource;

    public register(user) {
      return this.RegisterResource.save(user).$promise;
    }

    public login(user) {
      return this.LoginResource.save(user).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService){
        this.RegisterResource = $resource('/api/users/register');
        this.LoginResource = $resource('/api/users/login');
    }
  }

  // register services with main app module
  angular.module('app').service('movieService', MovieService);
  angular.module('app').service('userService', UserService);
}
