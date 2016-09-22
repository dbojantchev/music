angular.module('musicapp').controller('catalogController', catalogController);

function catalogController($scope, $compile, $http, $q, $dataService) {

    $scope.albumData = [];
    $scope.albumDataDB = [];
    $scope.albumDataJSON = [];
    $scope.albumBank = '1';

    $scope.toggleDetail = function(album){
        if(album.showDetail){
            album.showDetail = false;
            $($('#album' + album.id + 'row').next('tr').children('td.detailPane')).remove();
        } else {
            album.showDetail = true;
            $($('#album' + album.id + 'row')).after('<tr> <td colspan="8" class="detailPane"></td></tr>');
            var detailPane = $('#album' + album.id + 'row').find('tr td.detailPane');

            $scope.getSongs(album.id, function(songs) {
                var songsHTML = '<div class="row">';
                songsHTML += '<div class="col-xs-1">Track #</div>';
                songsHTML += '<div class="col-xs-4">Title</div>';
                songsHTML += '<div class="col-xs-1" style="text-align:right">Length</div>';
                songsHTML += '<div class="col-xs-4">Genre</div>';
                songsHTML += '</div>';
                $($('#album' + album.id + 'row').next('tr').children('td.detailPane')).append(songsHTML);
                songs.forEach(function(song) {
                    var songsHTML = '<div class="row">';
                    songsHTML += '<div class="col-xs-1" style="text-align:center">' + ( (song.track_no) ? (song.track_no) : '') + '</div>';
                    songsHTML += '<div class="col-xs-4">' + song.title + '</div>';
                    songsHTML += '<div class="col-xs-1" style="text-align:right">' + song.length + '</div>';
                    songsHTML += '<div class="col-xs-4">' + ( (song.genre) ? (song.genre) : '') + '</div>';
                    songsHTML += '</div>';
                    $($('#album' + album.id + 'row').next('tr').children('td.detailPane')).append(songsHTML);
                });

                if($scope.albumBank === '1') {
                    songsHTML += "<hr>";
                    songsHTML += "<div><button class='btn btn-default' ng-click='addSong(" + album.id + ")'>Add Song</button></div>";
                    $($('#album' + album.id + 'row').next('tr').children('td.detailPane')).append(songsHTML);

                    $compile($('#album' + album.id + 'row').next('tr').children('.detailPane'))($scope);
                }
            });
        }
    };

    $scope.getSongs = function(albumId, cb){
        if($scope.albumBank === '1') {
            $dataService.getSongs(albumId, cb)
                .success(function (data, status, headers, config) {
                    if (cb) {
                        cb(data.rows);
                    }
                }).error(function (data, status, headers, config) {
                    console.log('System error. Album data could not be loaded');
                }
            );
        } else
        if($scope.albumBank === '2') {
            if(cb){
                cb($scope.albumDataJSON.find(function(item){ return item.id === albumId; }).song);
            }
        }
    };

    $scope.selectDatabase = function(){
        if($scope.albumBank == 1) {
            $scope.albumData = $scope.albumDataDB;
        } else
        if($scope.albumBank == 2) {
            $scope.albumData = $scope.albumDataJSON;
        }
    };

    $scope.newSong = {
        track_no:99,
        title:'',
        length:0.00,
        genre:'TBD'
    };

    $scope.addSong = function(albumId){
        $scope.newSong.albumId = albumId;
        $('#addSong').modal('show');
    };

    $scope.saveSong = function(){
        $dataService.addSong($scope.newSong)
            .success(function (data, status, headers, config) {
                $('#addSong').modal('hide');
                setTimeout(function(){
                    $('#showSongs' + $scope.newSong.albumId).click();
                    $('#showSongs' + $scope.newSong.albumId).click();
                },0);
            }).error(function (data, status, headers, config) {
            console.log('System error. Album data could not be loaded');
            $('#addSong').modal('hide');
            }
        );
    };

    $dataService.getAlbums()
        .success(function (data, status, headers, config) {
            console.log("getAlbums",data);
            $scope.albumDataDB = data.rows;
            $scope.albumDataDB.forEach(function(item){item.release_dt = window.musicapp.dateConv1(item.release_dt);});
            $scope.albumData = $scope.albumDataDB;

        }).error(function (data, status, headers, config) {
            console.log('System error. Album data could not be loaded');
        });

    $dataService.getAlbumsJSON()
        .success(function (data, status, headers, config) {
            data.music.artist.album.forEach(function(item){item.id=Math.round(Math.random() * 1000000000) % 1000; item.artist = data.music.artist.name;});
            $scope.albumDataJSON = data.music.artist.album;
            console.log("getAlbumsJSON", $scope.albumDataJSON);
        }).error(function (data, status, headers, config) {
        console.log('System error. Album data could not be loaded');
    });
};