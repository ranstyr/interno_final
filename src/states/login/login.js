export class LoginController {

    /* @ngInject */
    constructor($localStorage, $scope, Auth, $state) {

        this.$localStorage = $localStorage;
        this.$scope = $scope;
        this.Auth = Auth;
        this.$state = $state;
    }

    /**
     * Get updated portfolio on any question change
     * @returns {*}
     */
    getSearchResult() {

        const model = this.$localStorage.search;
        this.Search.get(model).then(Search_data => {
            this.Search_data = Search_data;
            return Search_data;
        });

    };

    login() {
        let credentials = {};
        credentials.email = this.$scope.email;
        credentials.password = this.$scope.password;
        this.Auth.login(credentials)
            .then((result)=>{
                //success
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                this.$state.go('home.search');
            },(reason)=>{
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);

            });
    };

    fbLogin(){
        this.Auth.fbLogin()
            .then((value)=>{
                //success
                this.$state.go('home.search');
            },(reason)=>{
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
            });

    }

}
