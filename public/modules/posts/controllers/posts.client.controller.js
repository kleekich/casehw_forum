'use strict';


var postsApp = angular.module('posts');

// Posts controller
postsApp.controller('PostsController', ['$scope', '$stateParams', 'Authentication', 'Posts', '$modal', '$log', '$location', '$http', 'Category', '$state', 'Forum',
    function($scope, $stateParams, Authentication, Posts, $modal, $log, $location, $http, Category, $state, Forum) {
        $scope.orderProp = '-created';
        $scope.authentication = Authentication;
        $scope.forumGuideTitle = Category.sharedCategory.title;
        $scope.forumGuideSnippet = Category.sharedCategory.snippet;
        $scope.selectedCategory = Category.sharedCategory.title;
        $scope.selectedSnippet = Category.sharedCategory.snippet;
        $scope.animationsEnabled = true;
        $scope.hideAlert = false;
        
        
        $scope.sortBy = function(choice){
            $scope.orderProp = choice;
        };
        //Forum Categories data
        $scope.categories = [
            {   
                title: 'Introduce Yourself',
                snippet: 'Get to know other cashew members!',
            },
            {
                title: 'Share Your Ideas',
                snippet: 'Share ideas, interests, strategies.',
            },
            {
                title: 'Feedback To Cashew',
                snippet: 'We likes to hear from you!',
                
            }
        ];
        
        
        //Forum Topics
        $scope.topics = [
                    {
                        group: 'Introduce Yourself',
                        label: 'Cashew Community',
                        numPosts: 0
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Business Strategy',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Custommer Strategy',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Other Topics',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Feedback To Cashew',
                        label: 'Q&A',
                        numPosts: 0
                        
                    },
                    { 
                        group: 'Feedback To Cashew',
                        label: 'Feed Back',
                        numPosts: 0
                        
                    },
                    {   
                        group: 'Feedback To Cashew',
                        label: 'Other Topics',
                        numPosts: 0
                        
                    }
                    
                ];
        
        
        
    
        $scope.hideListPostClientView = Category.hidePostList;

        
        
        $scope.selectCategory = function(categoryObj) {
          console.log('category selected: ' + categoryObj.title);
          $scope.forumGuideTitle = categoryObj.title;
          $scope.forumGuideSnippet = categoryObj.snippet;
          $scope.selectedCategory = categoryObj.title;
          $scope.selectedSnippet = categoryObj.snippet;
          Category.sharedCategory = categoryObj;//setting category object to Category service
          $scope.hideForumBoard = true;
          $scope.hideAlert = true;
          Category.hidePostList = false;
          
          $scope.hideListPostClientView = Category.hidePostList;
        };
        
    
        
        
        this.authentication = Authentication;
        // Find a list of Posts
        this.posts = Posts.query();
        
        // Find existing Post
        $scope.findOne = function() {
            
            $scope.post = Posts.get({ 
                postId: $stateParams.postId
            });
            
            Forum.currPost = $scope.post;
            
            
        };
        //Open a modal window to Create a single post record
         
          this.modalCreate = function (size) {
        
            var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'modules/posts/views/create-post.client.view.html',
              controller: function ($scope, $modalInstance) {
                
                 
                 $scope.ok = function () {
                    
                    $modalInstance.close();
                    
                 };
                
                  $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                  };
                 
              },
              size: size
            });
        
            modalInstance.result.then(function (selectedItem) {
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };
        
        
        //Open a modal window to Update a single post record

          this.modalUpdate = function (size, selectedPost) {
            
            var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'modules/posts/views/edit-post.client.view.html',
              controller: function ($scope, $modalInstance, post) {
                 $scope.post = post;
                 
                 $scope.ok = function () {
                    
                    $modalInstance.close($scope.post);
                    $state.reload();
                 };
                
                  $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                  };
                 
              },
              size: size,
              resolve: {
                post: function () {
                  return selectedPost;
                }
              }
            });
        
            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };
          
          
          
          
            // Remove existing Post
        this.remove = function(post) {
            if ( post ) { 
                post.$remove();
                $location.path('/posts');
                

                for (var i in this.posts) {
                    if (this.posts[i] === post) {
                        this.posts.splice(i, 1);
                    }
                }
            } else {
                this.post.$remove(function() {
                    //delete then direct to list
                    $location.path('/posts');
                });
            }
        };
        
        Category.sharedTopic = {
                        group: Category.sharedCategory.title,
                        label: '',
                        numPosts: 0
                    };
        
        $scope.selectTopic = function(topicObj) {
            console.log('topic selected: ' + topicObj.label);
            if(topicObj==='all'){
                var topicArray= $scope.topics;
                var allTopicString='';
                var i=0;
                for(i; i < topicArray.length; i++){
                    allTopicString.concat(topicArray[i].name);
                }
                $scope.selectedTopic= allTopicString;
                
                
            }else{
                
                Category.sharedTopic = topicObj;
                $scope.selectedTopic = topicObj.label;
            }
          };
        
        $scope.reloadRoute = function() {
            $state.reload();
        };
        
        
        
        //Like System
        $scope.likeStatus = 'Like';
    
        
        //increment numlike by 1 for a post
        $scope.likePost = function(likedPost) {
            var likeArray = likedPost.likedBy;
            console.log('likeArray:' + likeArray);
            likeArray.append({ 'userId': Authentication.user._id});
            
            if($scope.likeStatus === 'Like' && likeArray.indexOf(Authentication.user._id) === -1){
                console.log('Like Clicked');
                console.log('likeArray.indexOf(userId):' + likeArray.indexOf(Authentication.user._id));
                $scope.likeStatus = 'Unlike';
                likedPost.likes = parseInt(likedPost.likes) + 1; 
                
                likedPost.likedBy = likeArray.push(new Object({userId: Authentication.user._id}));
                console.log('after like:' + JSON.parse(JSON.stringify(likedPost.likedBy)));
                console.log(likedPost.likedBy);
                likedPost.$update(function(){
                        
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }else if($scope.likeStatus === 'Unlike' && likeArray.indexOf(Authentication.user._id) !== -1){
                console.log('Unlike Clicked');
                $scope.likeStatus = 'Like';
                likedPost.likes = parseInt((likedPost).likes) - 1;
                var index = likedPost.likedBy.indexOf(Authentication.user._id);
                likedPost.likedBy.splice(index, 1);
                console.log(likedPost.likedBy);
                
                likedPost.$update(function(){
                        
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }
        };
        
        $scope.backToList = function() { 
         
            window.history.back();
            $scope.selectCategory(Category.sharedCategory);
            $scope.selectTopic(Category.sharedTopic);
            $scope.forumGuideTitle = Category.sharedCategory.title;
            $scope.forumGuideSnippet = Category.sharedCategory.snippet;
            $scope.hideListPostClientView = Category.hidePostList;
        
        };
        $scope.numComment = Forum.filtered;
    
    
        //Carousel
        $scope.myInterval = 2000;
        $scope.noWrapSlides = false;
        $scope.images = [
            {url:'https://www.thedollarbusiness.com/wp-content/uploads/2014/12/Cashew-Nuts-TheDollarBusiness.jpg'},
            
            {url:'http://f.tqn.com/y/homecooking/1/W/R/w/1/GettyImages-544546055.jpg'},
            
            {url:'http://cdn2.stylecraze.com/wp-content/uploads/2013/09/13-Best-Benefits-Of-Cashew-Nut-Oil-For-Skin-Hair-And-Health.jpg'},
            
            {url:'http://www.welltodolondon.com/wp-content/uploads/2014/11/045.jpg'}
            
            
        ]; 
         /*
        var slides = $scope.slides = [];
       
        slides.push();
          $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
              image: '//placekitten.com/' + newWidth + '/300',
              text: ['1','2','3','4'][slides.length % 4] + ' ' +
                ['a', 'b', 'c', 'd'][slides.length % 4]
            });
          };
          for (var i=0; i<4; i++) {
            $scope.addSlide();
          }
        */
        
        /*Accordion*/
     
$scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
        
        
       
    }
    
]);



postsApp.controller('PostsCreateController', ['$scope', 'Posts', 'Notify', 'Authentication', 'Category',
    function($scope, Posts, Notify, Authentication, Category) {
        
        $scope.categories = [
            {   
                title: 'Cashew Forum',
                snippet: 'Welcome to Cashew Forum! '
            },
            {   
                title: 'Introduce Yourself',
                snippet: 'Get to know other cashew members, and build a cashew community!',
            },
            {
                title: 'Share Your Ideas',
                snippet: 'Share ideas, interests, strategies.',
            },
            {
                title: 'Feedback To Cashew',
                snippet: 'We likes to hear from you!',
                
            }
        ];
        
        
        //Forum Topics
        $scope.topics = [
                    {
                        group: 'Introduce Yourself',
                        label: 'Cashew Community',
                        numPosts: 0
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Business Strategy',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Custommer Strategy',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Other Topics',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Feedback To Cashew',
                        label: 'Q&A',
                        numPosts: 0
                        
                    },
                    { 
                        group: 'Feedback To Cashew',
                        label: 'Feed Back',
                        numPosts: 0
                        
                    },
                    {   
                        group: 'Feedback To Cashew',
                        label: 'Other Topics',
                        numPosts: 0
                        
                    }
                    
                ];
                
        $scope.selectedCategory = Category.sharedCategory.title;
        $scope.selectedTopic = Category.sharedTopic.label;
        // Create new Post
        
        this.create = function() {
            // Create new Post object
            var post = new Posts ({
                postBy: Authentication.user.username,
                user : Authentication.user._id,
                title: this.title,
                content: this.content,
                category: this.category,
                topic: this.topic,
                likedBy:{userId: Authentication.user._id}
                
            });

            // Redirect after save
            post.$save(function(response) {
                
                
                Notify.sendMsg('NewPost', {'id': response._id});
                
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        

    }
]);


postsApp.controller('PostsUpdateController', ['$scope', 'Posts', 'Category',
    function($scope, Posts, Category) {
    $scope.categories = [
            {   
                title: 'Cashew Forum',
                snippet: 'Welcome to Cashew Forum! '
            },
            {   
                title: 'Introduce Yourself',
                snippet: 'Get to know other cashew members, and build a cashew community!',
            },
            {
                title: 'Share Your Ideas',
                snippet: 'Share ideas, interests, strategies.',
            },
            {
                title: 'Feedback To Cashew',
                snippet: 'We likes to hear from you!',
                
            }
        ];
        
        
        //Forum Topics
        $scope.topics = [
                    {
                        group: 'Introduce Yourself',
                        label: 'Cashew Community',
                        numPosts: 0
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Business Strategy',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Custommer Strategy',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Share Your Ideas',
                        label: 'Other Topics',
                        numPosts: 0
                        
                    },
                    {
                        group: 'Feedback To Cashew',
                        label: 'Q&A',
                        numPosts: 0
                        
                    },
                    { 
                        group: 'Feedback To Cashew',
                        label: 'Feed Back',
                        numPosts: 0
                        
                    },
                    {   
                        group: 'Feedback To Cashew',
                        label: 'Other Topics',
                        numPosts: 0
                        
                    }
                    
                ];
                
        $scope.selectedCategory = Category.sharedCategory.title;
        $scope.selectedTopic = Category.sharedTopic.label;

        // Update existing Post
        this.update = function(updatedPost) {
            var post = updatedPost;

            post.$update(function() {
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);
// Comments controller
postsApp.controller('CommentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments', 'Posts', '$modal', '$log', '$state', 'Forum',
    function($scope, $stateParams, $location, Authentication, Comments, Posts, $modal, $log, $state, Forum) {
        Forum.filtered = $scope.filtered;
        $scope.authentication = Authentication;
        $scope.currentPost = Forum.currPost;
        //Open a modal window to Update a single post record

          this.modalUpdate = function (size, selectedComment) {
            
            var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'modules/posts/views/edit-comment.client.view.html',
              controller: function ($scope, $modalInstance, comment) {
                 $scope.comment = comment;
                 
                 $scope.ok = function () {
                    
                    $modalInstance.close($scope.comment);
                    
                 };
                
                  $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                  };
                 
              },
              size: size,
              resolve: {
                comment: function () {
                  return selectedComment;
                }
              }
            });
        
            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };
          
          // Create new Comment
        $scope.createComment = function() {
            // Create new Comment object
            
            var comment = new Comments ({
                comment: this.comment,
                commentTo: $stateParams.postId,
                commentBy: Authentication.user.username,
                user: $scope.authentication.user._id
                
            });
            /*
            //Update number of comments for the post
            
            var newNumComment = parseInt(Forum.currPost.comments) + 1;
            Forum.currPost.comments = newNumComment.toString();
            Forum.currPost.$update(function() {
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            */
            // Redirect after save
            comment.$save(function(response) {
                
                
                // Clear form fields
                $scope.comment = '';
                $scope.commentTo = '';
                $scope.commentBy = '';
                $state.reload();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

            // Remove existing Comment
        this.remove = function(comment) {
            if ( comment ) { 
                /*
                Forum.currPost.comments = parseInt(Forum.currPost.comments) - 1;
                Forum.currPost.$update(function() {
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            */
                comment.$remove();
                $state.reload();
                

                for (var i in this.comments) {
                    if (this.comments[i] === comment) {
                        this.comments.splice(i, 1);
                    }
                }
            } else {
                /*
                Forum.currPost.comments = parseInt(Forum.currPost.comments) - 1;
                Forum.currPost.$update(function() {
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            */
                this.comment.$remove(function() {
                    //delete then direct to list
                    $state.reload();
                });
            }
        };
        

        // Update existing Comment
        $scope.update = function() {
            var comment = $scope.comment;

            comment.$update(function() {
                $location.path('posts/' + $stateParams.postId);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Comments
        $scope.find = function() {
            $scope.comments = Comments.query();
            
        };

    }
]);

postsApp.controller('CommentsUpdateController', ['$scope', 'Comments',
    function($scope, Posts, Category) {
    
        
        // Update existing Comment
        this.update = function(updatedComment) {
            var comment = updatedComment;

            comment.$update(function() {
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);



postsApp.directive('listPostsClientView', ['Posts', function(Posts){
    return{
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/posts/views/list-posts.client.view.html'
    };
    
    
}]);


postsApp.directive('postList', ['Posts', 'Notify', function(Posts, Notify){
    return{
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/posts/views/post-list-template.html',
        link: function(scope, element, attrs){
            
            //when a new post is added, update the post list
            
            Notify.getMsg('NewPost', function(event, data) {
                
                scope.postsCtrl.posts = Posts.query();
                
            });
        }
    };
    
}]);


postsApp.directive('commentList', ['Posts', 'Notify', function(Posts, Notify){
    return{
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/posts/views/comment-list-template.html',
        link: function(scope, element, attrs){}
        
        
    };  
}]);
