(function() {
	
	//////// SPOTIFY MANAGER 
	var urlPreview="dsa";
	var imgPlay;
	
	var spotifyManager ={
	
		searchArtist:function(artist){
		
			//////////////////////////TODO
			
			console.log("Searching Artist ...");
			
			var url = "https://api.spotify.com/v1/tracks/";
			var results = 50;

		    var args = { 
		      format:'json', 
		      api_key: "0E3OYP2SKG4P9NZF1",
		      sort: 'song_hotttnesss-desc',
		      bucket: 'song_hotttnesss',
		      results: results, 
		    }; 
		
		    $.getJSON(url, args, function(data) {
		      doAppends(data, results);
		    });
			
		},
		
		
		searchAlbum:function(album){
		
			////////////////////////////TODO
			
			console.log("Searching Album ...");
			
			var url = "https://api.spotify.com/v1/albums/"+album;
			var results = 50;

		    var args = { 
		      format:'json', 
		      api_key: "0E3OYP2SKG4P9NZF1",
		      sort: 'song_hotttnesss-desc',
		      bucket: 'song_hotttnesss',
		      results: results, 
		    }; 
	
			$.getJSON(url, args, function(data) {
		      doAppends(data, results);
		    });
			
		},
		
		
		/////////////////////
		
		searchTrack:function(track){
		
			
			console.log("Searching Track ...");
			
			var url = "https://api.spotify.com/v1/tracks/"+track;
			//var results = 50;

		    var args = { 
		      format:'json', 
		      api_key: "0E3OYP2SKG4P9NZF1",
		      sort: 'song_hotttnesss-desc',
		      bucket: 'song_hotttnesss',
		      results: 'results', 
		    }; 
		
		    var merda = $.getJSON(url, function(data) { 
			    
			    this.url = data.preview_url;
			    console.log(this.url);
			    urlPreview = this.url;       
			    
			    var artist = document.activeElement.getElementsByTagName("h4")[0].innerHTML; // Agafa el nom del artista del element "actiu" = focused.
			    var song = document.activeElement.getElementsByTagName("p")[0].innerHTML; // Agafa el nom del song del element "actiu" = focused.
			    
			     getImages(artist, i, "imgPlay",null);
			    
          if (urlPreview != null) { // SI LA URL ES != NULL, LI AFEGEIX LA CANÇÓ.
            // CREA EL REPRODUCTOR
  			    var audio       = document.createElement("audio");
  			    audio.className = 'player';
  			    audio.preload   = 'none';
  			    audio.controls  = 'controls';
	            audio.autoplay  = 'true';
	
	            audio.src = urlPreview;
	            console.log(urlPreview);
	            nav = document.getElementById("navbar-brand-bottom");
	            nav.innerHTML = artist + " - " + song;
	            nav.appendChild(audio);
	            getRecommendedArtists(artist);
	            // add song to the BDD, this have a playlist assigned 
	            manager.setSong(artist,song,artist+" - "+song,1);
	            var response=manager.getLastSongs();
	            console.log(response);
	            createListaRep(response);
	            
	            
          }
          else {
            // CREEM MISSATGE DE ALERTA. FALTA AJUSTAR EL CSS PERQUE POSI EL MISSATGE ON TOCA "POSICIÓ".
            var span       = document.createElement("span");
            span.className = 'label label-danger';
            span.innerHTML = "Error, canción no disponible";

            nav = document.getElementById("navbar-brand-bottom");
            nav.innerHTML = artist + " - " + song + " ";
            nav.appendChild(span);
          }

		    }); 		
		},
		
		
		/////////////////
		
		searchAll: function(artist,album,track){
			var url;
			
			if(artist==null){
				console.log("No Artist available");
			}else{
				this.searchArtist(artist);
			}
			if(album==null){
				console.log("No Albums available");
			}else{
				this.searchAlbum(album);
			}
			if(track==null){
				console.log("No Tracks available");
			}else{
				this.searchTrack(track);
			}
			
		},

		init: function(){
			console.log("handlerSpotify");
		},	
	};

  


 var echonest = function () {

    this.main = function () {
      getHottest();
    }
 }

//////////////////	Retorna el id de spotify del tracks.

  this.getSpotifyID = function (foreign_id) {
    return foreign_id.substring(14, foreign_id.length);
  }

//////////////////  Agafa les cançons que mes s'escolten en aquest moment (echonest)

  this.getHottest = function () {
    var results = 50;
    var api_key = "0E3OYP2SKG4P9NZF1";

    var url = "http://developer.echonest.com/api/v4/song/search?api_key="+api_key+"&sort=song_hotttnesss-desc&results="+results+"&bucket=tracks&bucket=id:spotify&bucket=song_hotttnesss";

    $.getJSON(url, function(data) {
      doAppends(data, results);
    });
  }
  
  
  
  
  
  
  this.chargePlaylist = function (){
  
	  var namePlaylist;
	  var artist="Eminem";
	  var song="Like me";
	  
	  // For all the playlists on the BDD
	  
	  //namePlaylist=manager.getPlaylistbyID(1);
	  //getPlaylistbyName("marc");
	  //createPlayList(namePlaylist,false);
	  // search the songs and attach them to the playlist
	  //appendPlaylistItem(namePlaylist, artist, song);
	  
	  console.log(namePlaylist);
	  
	  
  }

///////////////////	Sencarrega de fer tots els Appends i inicialitzar Listeners

  this.doAppends = function (data, results) {
    AppendHottestSongs(data.response.songs, results);
    //chargePlaylist();
    SearchListener();
    PlaylistListener();
    //getRecommendedArtists();
  }

////////////////////	Append 'Lo que esta sonando' in the box

  this.AppendHottestSongs = function (songs, results) { 
    var max_songs = 10; // Fixa el maxim de displayed Songs.
    songs = deleteDupped(songs);

    for (i = 0; i < max_songs; i ++) {

      var list_group     = document.getElementById("hot");
      var item           = document.createElement("a");
      item.id            = "hs" + i;
      item.className     = "list-group-item";
      item.href          = "#";

      addListener(
        item,
        "click",
        appendSongInfo,
        false
      );

      var sub_item               = document.createElement("h4");
      sub_item.className         = "list-group-item-heading";
      sub_item.innerHTML         = songs[i].artist_name;
      sub_item.style.paddingLeft = '65px';

      var sub_item2               = document.createElement("p");
      sub_item2.className         = "list-group-item-text";
      sub_item2.innerHTML         = songs[i].title;
      sub_item2.style.paddingLeft = '65px'; 

      item.appendChild(sub_item);
      item.appendChild(sub_item2);
      list_group.appendChild(item);
      getImages(songs[i].artist_name, i, "hot",null);
    }
  }

////////////////////// Search and Get the results of the (Artist/Album/Track) searched on the textfield

  this.getSearchInfo = function (query) {
  
    var api_key = "0E3OYP2SKG4P9NZF1";
    var results = 50;

    // Consulta per cançó.
    var url = "http://developer.echonest.com/api/v4/song/search?api_key="+api_key+"&title="+query+"&results="+results+"&bucket=tracks&bucket=id:spotify&bucket=audio_summary";

    $.getJSON(url, function(data) {
      appendSearchSongInfo(data.response.songs);
    });

    // Consulta per artista.
    var url = "http://developer.echonest.com/api/v4/song/search?api_key="+api_key+"&format=json&results="+results+"&artist="+query;

    $.getJSON(url, function(data) {
      appendSearchArtistInfo(data.response.songs);
    });

    // Consulta per album.
    var url = "https://api.spotify.com/v1/search?q="+query+"&type=album";

    $.getJSON(url, function(data) {
      appendSearchAlbumInfo(data.albums.items,query,url);
    });
  }
  
//////////////////// Append Songs results into the box

  this.appendSearchSongInfo = function (songs) {
  
    var max_songs = songs.length; // Fixa el maxim de displayed Songs.
    console.log(songs);

    var list_group = document.getElementById("Canciones");
    var div        = document.createElement("div");
    div.className  = 'list-group';
     
    for (i = 0; i < max_songs; i ++) {

      var item           = document.createElement("a");
      item.id            = "cancion" + i;
      item.className     = "list-group-item";
      item.href          = "#";

      addListener(
        item,
        "click",
        appendSongInfo,
        false
      );

      var sub_item               = document.createElement("h4");
      sub_item.className         = "list-group-item-heading";
      sub_item.innerHTML         = songs[i].artist_name;
      sub_item.style.paddingLeft = '65px';

      var sub_item2               = document.createElement("p");
      sub_item2.className         = "list-group-item-text";
      sub_item2.innerHTML         = songs[i].title;
      sub_item2.style.paddingLeft = '65px'; 

      item.appendChild(sub_item);
      item.appendChild(sub_item2);
      list_group.appendChild(item);
      getImages(songs[i].artist_name, i, "Canciones",null);
    }

    list_group.appendChild(div);
  }

/////////////////  Append Artist results into the box

  this.appendSearchArtistInfo = function (songs) {
    var max_songs = songs.length; // Fixa el maxim de displayed Songs.
    console.log(songs);

    var list_group = document.getElementById("Artistas");
    var div        = document.createElement("div");
    div.className  = 'list-group';
     
    for (i = 0; i < max_songs; i ++) {

      var item           = document.createElement("a");
      item.id            = "artista" + i;
      item.className     = "list-group-item";
      item.href          = "#";

      var sub_item               = document.createElement("h4");
      sub_item.className         = "list-group-item-heading";
      sub_item.innerHTML         = songs[i].artist_name;
      sub_item.style.paddingLeft = '65px';

      var sub_item2               = document.createElement("p");
      sub_item2.className         = "list-group-item-text";
      sub_item2.innerHTML         = songs[i].title;
      sub_item2.style.paddingLeft = '65px'; 

      item.appendChild(sub_item);
      item.appendChild(sub_item2);
      list_group.appendChild(item);
      getImages(songs[i].artist_name, i, "Artistas",null);
    }

    list_group.appendChild(div);
  }
  
////////////////// Append Album results into the box
  
  this.appendSearchAlbumInfo = function (albums,artist,urlAlbums) {
  
    var max_songs = albums.length; // Fixa el maxim de displayed Songs.
    console.log(albums);

    var list_group = document.getElementById("Albumes");
    var div        = document.createElement("div");
    div.className  = 'list-group';
     
    for (i = 0; i < max_songs; i ++) {
	    // create the link (not functional)
      var item           = document.createElement("a");
      item.id            = "album" + i;
      item.className     = "list-group-item";
      item.href          = "#";
      // create the name of the Album
      var sub_item               = document.createElement("h4");
      sub_item.className         = "list-group-item-heading";
      sub_item.innerHTML         = albums[i].name;
      sub_item.style.paddingLeft = '65px';
      // create the name of the Artist
      var sub_item2               = document.createElement("p");
      sub_item2.className         = "list-group-item-text";
      sub_item2.innerHTML         = artist;
      sub_item2.style.paddingLeft = '65px'; 

      item.appendChild(sub_item);
      item.appendChild(sub_item2);
      list_group.appendChild(item);
      getImages(null, i, "Albumes",urlAlbums);
    }

    // attach into the box
    list_group.appendChild(div);
  }

////////////////

  this.getHottestSongWithForeignId = function (songs) {
    for (i = 0; i < songs.length; i++) {
      if (songs[i].tracks.length > 0) {
        return i;
      }
    }

    return null;
  }


/////////////////	Agafa la informació del focused item.

  this.appendSongInfo = function () {
    
    event.preventDefault(); // Elimina el scroll up, que genera el HTML, aixi al fer clic sobre un item de la llista, el scroll no es desplaça fins al top.

    var artist = document.activeElement.getElementsByTagName("h4")[0].innerHTML; // Agafa el nom del artista del element "actiu" = focused.
    var song = document.activeElement.getElementsByTagName("p")[0].innerHTML; // Agafa el nom del song del element "actiu" = focused.

    // Agafa informació de la canço quan fas click.
    var api_key = "0E3OYP2SKG4P9NZF1";
    var results = 10;

    var url = "http://developer.echonest.com/api/v4/song/search?api_key="+api_key+"&artist="+artist+"&title="+song+"&results="+results+"&bucket=tracks&bucket=id:spotify&bucket=audio_summary";

    $.getJSON(url, function(data) {
      var posicio = getHottestSongWithForeignId(data.response.songs);
      var id = getSpotifyID(data.response.songs[posicio].tracks[0].foreign_id); // Agafa el id de Spotify
      spotifyManager.searchAll(null,null,id); //  FALTA QUE ENS RETORNI EL PARAMETRE DE MUSICA
    });
  }


/////////////////

  this.getRecommendedArtists = function (artist) {
    var api_key = "0E3OYP2SKG4P9NZF1";
    var results = 10;
    var nom = artist;

    var col                       = document.getElementById("col_dret");
    var newCol                    = document.createElement("div");
    $(newCol).attr("id","col_dret");

    var panel                     = document.createElement("div");
    panel.className               = 'panel panel-primary';

    var panel_heading             = document.createElement("div");
    panel_heading.className       = 'panel-heading';

    var h3                        = document.createElement("h3");
    h3.className                  = 'panel-title';
    h3.innerHTML                  = 'Recomendaciones';

    var list_group                = document.createElement("div");
    list_group.className          = 'list-group';
    list_group.id                 = 'Recomended';

    panel_heading.appendChild(h3);
    panel.appendChild(panel_heading);
    panel.appendChild(list_group);
    //col.appendChild(panel);
    newCol.appendChild(panel);

     $(col).replaceWith(newCol);
     
    var url = "http://developer.echonest.com/api/v4/artist/similar?api_key="+api_key+"&name="+nom+"&format=json&results="+results;

    $.getJSON(url, function(data) {
      AppendRecomended(data.response.artists);
    });
  }

/////////////////

  this.AppendRecomended = function (artists) {

    var list_group                = document.getElementById("Recomended");
    

    for (i = 0; i < artists.length; i ++) {
      // create the link (not functional)
      var item           = document.createElement("a");
      item.id            = "recom" + i;
      item.className     = "list-group-item";
      item.href          = "#";
      // create the name of the Recomended Artist
      var sub_item               = document.createElement("h4");
      sub_item.className         = "list-group-item-heading";
      sub_item.innerHTML         = artists[i].name;
      sub_item.style.paddingLeft = '65px';

      var sub_item2               = document.createElement("p");
      sub_item2.className         = "list-group-item-text";
      sub_item2.innerHTML         = artists[i].name;
      sub_item2.style.paddingLeft = '65px'; 

      item.appendChild(sub_item);
      item.appendChild(sub_item2)
      list_group.appendChild(item);
      
      

      getImages(artists[i].name, i, "Recomended", null);
    }
   
  }
  
  
//////////////// Create Lista de reproduccion

	this.createListaRep = function (response) {

    var col = document.getElementById("listaRep");
   

    var panel                     = document.createElement("div");
    panel.className               = 'panel panel-primary';
    panel.id                      = 'listaRep';

    var panel_heading             = document.createElement("div");
    panel_heading.className       = 'panel-heading';

    var h3                        = document.createElement("h3");
    h3.className                  = 'panel-title';
    h3.innerHTML                  = 'Lista de reproducción';

    var list_group                = document.createElement("div");
    list_group.className          = 'list-group';
    list_group.id                 = 'listBox';
    
    panel_heading.appendChild(h3);
    panel.appendChild(panel_heading);
    panel.appendChild(list_group);
    $(col).replaceWith(panel);
    //$(col).before(panel);
    console.log("Lista de reproduccion:");
    console.log(response);
    addItemToListaRep(response);
    
  }
  
  /////////// add an item to the lista de reproduccion
  
  this.addItemToListaRep = function (response) {
    console.log(response);
  	var fin=response.data.length;
  	var song,sub_item;
  	
  	var list=document.getElementById("listBox");
  	
  	for(var i=0;i<fin;i++){
	  	song=response.data[i].track_id;
	  	console.log(song);

	  	var item           = document.createElement("a");
	  	item.className     = "list-group-item";
	  	item.href          = "#";
	  	
	  	
	  	sub_item               = document.createElement("h4");
	    sub_item.className         = "list-group-item-heading";
	    sub_item.innerHTML         = song;
	    sub_item.style.paddingLeft = '65px';
	     
	    item.appendChild(sub_item);
	    list.appendChild(item); 
  	}
  }
  
  
//////////////// Create a PLAYLIST

  this.createPlayList = function (name,add) {

    var col                       = document.getElementById("col_dret");

    var panel                     = document.createElement("div");
    panel.className               = 'panel panel-primary';
    panel.id                      = 'Playlistpanel - ' + name;

    var panel_heading             = document.createElement("div");
    panel_heading.className       = 'panel-heading';

    var h3                        = document.createElement("h3");
    h3.className                  = 'panel-title';
    h3.innerHTML                  = 'Playlist - ' + name;

    var button                    = document.createElement("button");
    button.id                     = 'playlist-btn-' + name;
    button.type                   = 'submit';
    button.className              = 'btn btn-success';
    button.value                  = 'submit';
    button.style.float            = 'right';
    button.style.marginTop        = '-8px';
    button.innerHTML              = 'Add ';

    addListener(
      button,
      "click",
      addItemToPlaylist,
      false
    );

    var span                      = document.createElement("span");
    span.className                = 'glyphicon glyphicon-plus-sign';

    var list_group                = document.createElement("div");
    list_group.className          = 'list-group';
    list_group.id                 = 'Playlist - ' + name;

    button.appendChild(span);
    h3.appendChild(button);
    panel_heading.appendChild(h3);
    panel.appendChild(panel_heading);
    panel.appendChild(list_group);
    $(col).before(panel);
    
    
    // add playlist to the BDD
    if(add==true)manager.setPlaylist(name);
    
    
    
  }

/////////////// Add item to the playlist

  this.addItemToPlaylist = function () {
    event.preventDefault();

    var inner = document.getElementById("navbar-brand-bottom").innerHTML; 
    var info = inner.substr(0, inner.search("<")); // Agafo el valor de la informació que m'interesa Artist - Song.

    // Separo de la info, el artista de la canço el '-1' i '+2' es per eliminar espais en blanc.
    var artist = info.substr(0, info.search("-") - 1); 
    var song = info.substr(info.search("-") + 2 , info.length);

    console.log("Artista: " + artist + " Song: " + song);

    var playlist = document.activeElement.id;
    playlist = playlist.substr(13,playlist.length); // Agafa el nom de la playlist del boto ADD. Cada boto te el nom de la seva playlist asociat.

    if (artist != "" && song != "") {
      appendPlaylistItem(playlist, artist, song);
      console.log(playlist);
      // get the playlist id by the name
      //var playlist_id=manager.getPlaylistbyName(playlist);
      // add song to the BDD, this have a playlist assigned 
      //manager.setSong(artist,song,artist+" - "+song,playlist_id);
      
    }
    else {
      window.alert("Selecciona la canción que quieras añadir primero");
    }
  }

///////////////

  this.appendPlaylistItem = function (playlist_name, artist_name, song_name) {
    console.log(document.getElementById("Playlistpanel - " + playlist_name)); // Busca la playlist corresponent (Panell).

    if (document.getElementById("Playlistpanel - " + playlist_name) != null) { // Comprovo que existeixi la playlist, tot i que no es necesari.
      var list_group = document.getElementById("Playlist - " + playlist_name); // Aqui es on afegiré el item. 

      var posicio = list_group.getElementsByTagName('a').length;

      var item           = document.createElement("a");
      item.id            = "pl"+ playlist_name + posicio;
      item.className     = "list-group-item";
      item.href          = "#";

      addListener(
        item,
        "click",
        appendSongInfo,
        false
      );

      var sub_item               = document.createElement("h4");
      sub_item.className         = "list-group-item-heading";
      sub_item.innerHTML         = artist_name;
      sub_item.style.paddingLeft = '65px';

      var sub_item2               = document.createElement("p");
      sub_item2.className         = "list-group-item-text";
      sub_item2.innerHTML         = song_name;
      sub_item2.style.paddingLeft = '65px'; 

      item.appendChild(sub_item);
      item.appendChild(sub_item2);
      list_group.appendChild(item); 

      getImages(artist_name, playlist_name + posicio, "Playlist", null);
    }
  }

////////////// Remove repeated artist on the Hottest echonest list

  this.deleteDupped = function (songs) { // Elimina els duplicats que genera Echonest, es un problema propi que tenen ells al proporcionar informació.
    
    var song_hotttnesss;
    var cleanSongs = [];
    var j = 0;

    // Comprovo que no agafi una canço amb la mateix valoració que la anterior, ja que les repetides van seguides de forma consecutiva i com la valoració
    // es l'únic parametre que mantenen entre les duplicades, fins que no trobi una valoració diferent, no es tractará d'una nova cançó.
    for (i = 0; i < songs.length; i++) { 
      if (song_hotttnesss != songs[i].song_hotttnesss) {
        song_hotttnesss = songs[i].song_hotttnesss;
        cleanSongs[j] = songs[i];
        j++;
      }
    }

    return cleanSongs;
  }
  
/////////////////

  this.getImages = function (artist, pos, id, urlAlbumes) {
    var url = 'http://developer.echonest.com/api/v4/artist/images';
    var results = 1;

    var args = { 
      format:'json', 
      api_key: "0E3OYP2SKG4P9NZF1",
      name: artist,
      results: results, 
    }; 
    
    if (id == "Albumes") { 
      args = {}; 
      url = urlAlbumes; 
    };

    $.getJSON(url, args, function(data) {
    	if (id != "Albumes"){
	      if (data.response.total > 0) {
	        if (id == "hot") {
	          console.log(data.response.images[0].url);
	          AppendHottestSongsImg(data.response.images[0].url, pos);
	        }
	        if (id == "Artistas") {
	          AppendArtistsImg(data.response.images[0].url, pos);
	        }
	        if (id == "Canciones") {
	          AppendSongsImg(data.response.images[0].url, pos);
	        }
	          if (id == "Recomended") {
	            AppendRecomendedImg(data.response.images[0].url, pos);
	          }
	          if (id == "Playlist") {
	            AppendPlaylistImg(data.response.images[0].url, pos);
	          }
	          if (id == "imgPlay") {
	            imgPlay=data.response.images[0].url;
	            $("#imgArtist").attr("src",imgPlay);
	          }
	          
	      }
	      else {
	        if (id == "hot") {
	          AppendHottestSongsImg("http://i680.photobucket.com/albums/vv168/genocidez/notfound_zps98e8c4c2.png", pos);
	        }
	        if (id == "Artistas") {
	          AppendArtistsImg("http://i680.photobucket.com/albums/vv168/genocidez/notfound_zps98e8c4c2.png", pos);
	        }
	        if (id == "Canciones") {
	          AppendSongsImg("http://i680.photobucket.com/albums/vv168/genocidez/notfound_zps98e8c4c2.png", pos);
	        }
          if (id == "Recomended") {
            AppendRecomendedImg("http://i680.photobucket.com/albums/vv168/genocidez/notfound_zps98e8c4c2.png", pos);
          }
          if (id == "Playlist") {
            AppendPlaylistImg("http://i680.photobucket.com/albums/vv168/genocidez/notfound_zps98e8c4c2.png", pos);
          }
	      }
	    }
      else{
		  if (data.albums.limit > 0) {
	        AppendAlbumsImg(data.albums.items[pos].images[2].url, pos);
	      }
	      else {
	        AppendAlbumsImg("/images/notfound.png", pos); 
	      }
	    }
    });
  }
  
///////////////////

  this.AppendHottestSongsImg = function (img, pos) {

    var sub_item3             = document.createElement("img");
    sub_item3.src             = img;
    sub_item3.style.width     = '65px';
    sub_item3.style.height    = '65px';

    var item                    = document.getElementById("hs"+ pos);
    item.style.backgroundImage  = "url('"+ img +"')";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize   = "65px 65px";
  }

  this.AppendSongsImg = function (img, pos) {
    var sub_item3             = document.createElement("img");
    sub_item3.src             = img;
    sub_item3.style.width     = '65px';
    sub_item3.style.height    = '65px';

    var item                    = document.getElementById("cancion"+ pos);
    item.style.backgroundImage  = "url('"+ img +"')";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize   = "65px 65px";
  }

  this.AppendArtistsImg = function (img, pos) {
    var sub_item3             = document.createElement("img");
    sub_item3.src             = img;
    sub_item3.style.width     = '65px';
    sub_item3.style.height    = '65px';

    var item                    = document.getElementById("artista"+ pos);
    item.style.backgroundImage  = "url('"+ img +"')";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize   = "65px 65px";
  }
  
  this.AppendAlbumsImg = function (img, pos) {
    var sub_item3             = document.createElement("img");
    sub_item3.src             = img;
    sub_item3.style.width     = '65px';
    sub_item3.style.height    = '65px';

    var item                    = document.getElementById("album"+ pos);
    item.style.backgroundImage  = "url('"+ img +"')";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize   = "65px 65px";
  }

  this.AppendRecomendedImg = function (img, pos) {
    var sub_item3             = document.createElement("img");
    sub_item3.src             = img;
    sub_item3.style.width     = '65px';
    sub_item3.style.height    = '65px';

    var item                    = document.getElementById("recom"+ pos);
    item.style.backgroundImage  = "url('"+ img +"')";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize   = "65px 65px";
  }

  this.AppendPlaylistImg = function (img, pos) {
    var sub_item3             = document.createElement("img");
    sub_item3.src             = img;
    sub_item3.style.width     = '65px';
    sub_item3.style.height    = '65px';

    var item                    = document.getElementById("pl"+ pos);
    item.style.backgroundImage  = "url('"+ img +"')";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize   = "65px 65px";
  }

//////////////////////  Add Search Listener

  this.SearchListener = function () {
    var button = document.getElementById("search_btn");

    addListener(
      button,
      "click",
      getSearchEvent,
      false
    );
  }

//////////////////////	Add Playlist Listener

  this.PlaylistListener = function () {
    var button = document.getElementById("new_playlist_btn");

    addListener(
      button,
      "click",
      getPlaylistEvent,
      false
    );
  }

  this.addListener = function (object, event, callback, capture) {
    object.addEventListener(event,callback,capture);
  }

//////////// Show the results of the Search (Artist/Album/Song)
  
  this.showSearchResults = function(){
	  console.log("SHOWING THE RESULTS");
	  var nameSpace=[];
	  nameSpace[0]="Artistas";
	  nameSpace[1]="Albumes";
	  nameSpace[2]="Canciones";
	  // get parent
	  var target = $("#searchResults");
	  
	  var principalNode = document.createElement("div");
	  $(principalNode).attr("class","col-sm-4");
	  $(principalNode).attr("id","searchResults");
	  
	  for(var i=0;i<3;i++)
	  {
	  		
		  	//create elements
		  var newNode = document.createElement("div");
		  $(newNode).attr("class", "panel panel-primary");
      newNode.id = nameSpace[i];
		  var newNode2 = document.createElement("div");
		  $(newNode2).attr("class", "panel-heading");
		  var newNode3 = document.createElement("h3");
		  $(newNode3).attr("class", "panel-title");
		  $(newNode3).html(nameSpace[i]);
		  // add elements
		  $( principalNode ).append( newNode );
		  $( newNode ).append( newNode2 );
		  $( newNode2 ).append( newNode3 );
	  }
	  $(target).replaceWith(principalNode);
	  
  }
  
//////////////// Listener event

  this.getSearchEvent = function (event) {
    event.preventDefault();
    
    var query = event.target.parentNode.childNodes[1].value;

    if (!query) {
      alert("Your search is short.");
      return false;
    } 
    else {
	    showSearchResults();
    }
    
    getSearchInfo(processInfoSong(query)); // Envia a SearchInfo, la informació de la query procesada ' ' -> '%20'.

    //"http://developer.echonest.com/api/v4/song/search?api_key=0E3OYP2SKG4P9NZF1&title=Wrecking%20Ball&results=100&bucket=tracks&bucket=id:spotify"
  }

///////////////// Listener Create PlayList

  this.getPlaylistEvent = function (event) {
    event.preventDefault();
    
    var query = event.target.parentNode.childNodes[1].value;

    if (!query) {
      alert("Your search is short.");
      return false;
    } 
    else {
      if (document.getElementById("Playlistpanel - " + query) != null) {
        window.alert("Ya existe una Playlist con ese nombre");
      }
      else {
        createPlayList(query,true);
      }
    }
  }

  // Create object 
  var e = new echonest();

  e.main();

}());


//////////////// Remove the spaces between the words

function processInfoSong(song)
{ 
 song = song.replace(/\s/g, "%20"); 
 console.log(song);
 
 return song;
}

