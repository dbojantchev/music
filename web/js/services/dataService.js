angular.module('musicapp')
    .factory("$dataService", ['$http',
        function ($http) {
            return {
                getAlbums: function () {
                    console.log("Inside getAlbums: ");
                    return $http({
                        method: 'GET',
                        url: '/api/getAlbums'
                    });
                },

                getSongs: function (albumId) {
                    console.log("Inside getSongs: ");
                    return $http({
                        method: 'GET',
                        url: '/api/getSongs?albumId=' + albumId
                    });
                },

                getAlbumsJSON: function () {
                    console.log("Inside getAlbumsJSON: ");
                    return $http({
                        method: 'GET',
                        url: '/data/albums.json'
                    });
                },

                addSong: function (newSong) {
                    console.log("Inside getSongs: " + newSong);
                    return $http({
                        method: 'POST',
                        data: newSong,
                        url: '/api/addSong'
                    });
                }

            }
        }
    ]);

