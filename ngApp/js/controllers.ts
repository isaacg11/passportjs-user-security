namespace app.Controllers {

  // HomeController
  export class HomeController {
    public movies;
    constructor(
      private movieService: app.Services.MovieService
    ) {
      this.movies = this.movieService.getAll();
    }
  }

  // AddMovieController
  export class AddMovieController {
    public movie;
    public id;
    public save(){
      let params = {
        title: this.movie.title,
        genre: this.movie.genre,
        id: this.id
      }

      this.movieService.save(params).then(() => {
        this.$state.go('Home');
      })
    }

    constructor(
      private movieService: app.Services.MovieService,
      public $state: ng.ui.IStateService,
      public $stateParams: ng.ui.IStateParamsService
    ) {
      if($stateParams) {
        this.id = $stateParams["id"];
      }
    }
  }

  // DeleteMovieController
  export class DeleteMovieController {
    public id;
    public remove() {
      this.movieService.remove(this.id).then(() => {
        this.$state.go('Home');
      })
    }
    constructor(
      private movieService: app.Services.MovieService,
      public $state: ng.ui.IStateService,
      public $stateParams: ng.ui.IStateParamsService
    ) {
      if($stateParams) {
        this.id = $stateParams["id"];
      }
    }
  }

  // LoginController
  export class LoginController {
    public user;

    public login() {
      this.userService.login(this.user).then((res) => {
        if(res.message === 'Correct') {
          this.$state.go('Home');
        } else {
          alert(res.message);
        }
      })
    }

    constructor(
      private userService: app.Services.UserService,
      public $state: ng.ui.IStateService) {
    }
  }

  // RegisterController
  export class RegisterController {
    public user;

    public register() {
      this.userService.register(this.user).then(() => {
        this.$state.go('Home');
      })
    }

    constructor(
      private userService: app.Services.UserService,
      public $state: ng.ui.IStateService) {
    }
  }

  // register controllers with main app module
  angular.module('app').controller('HomeController', HomeController);
  angular.module('app').controller('AddMovieController', AddMovieController);
  angular.module('app').controller('DeleteMovieController', DeleteMovieController);
  angular.module('app').controller('LoginController', LoginController);
  angular.module('app').controller('RegisterController', RegisterController);
}
