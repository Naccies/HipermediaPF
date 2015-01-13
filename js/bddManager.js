
	// creo el objecte manager
	var manager = {
		
		xhr : {},
		
		
		/////////////////////// SONGS
		
		
		/**
		* obtener una cancion por su ID
		* @param: id  , id de la canço a buscar
		**/
		getSongbyID : function(id){
			
			this.xhr = new XMLHttpRequest();
			var url="http://api.hipermedia.local/music/"+id;
			this.xhr.open("GET",url,false);
			this.xhr.send();
			var json_response = this.xhr.responseText;
			var response = JSON.parse(json_response);
			console.log("Status:"+this.xhr.status);
			
			console.log(json_response);
			console.log("Canço trobada: "+response.data[0].title);
			
		},
		
		// obtener las 10 ultimas canciones guardadas
		getLastSongs:function(){
			this.xhr = new XMLHttpRequest();
			this.xhr.open("GET","http://api.hipermedia.local/music",false);
			this.xhr.send();
			
			var json_response = this.xhr.responseText;
			var response = JSON.parse(json_response);
			console.log("Status:"+this.xhr.status);
			
			//console.log(response);
			//console.log(response.data[0].title);
			
			return response;
		},
		
		
		/**
		* insertar una nueva cancion
		* 
		* @param: artist nom del artista
		* @param: title titul de la canço
		* @param: track_id 
		* @param: playlist_id playlist a la que pertany
		**/
		setSong: function(artist,title,track_id,playlist_id){
			this.xhr = new XMLHttpRequest();
			this.xhr.open("POST","http://api.hipermedia.local/music/new");
			this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			var info = "artist="+artist+"&title="+title+"&track_id="+track_id+"&playlist_id="+playlist_id;
			this.xhr.send(info);

			console.log(" Canço afeguida.");
			//var response = xhr.responseText;	
			
		},
		
		/**
		* modificar una cancion ya existente
		* 
		* @param: musicID id de la canço
		* @param: title titul de la canço
		**/
		modifySong : function(title,musicID){
			this.xhr = new XMLHttpRequest();
			this.xhr.open("POST","http://api.hipermedia.local/music/update");
			this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			
			var info = "title="+title+"&music_id="+musicID;
			this.xhr.send(info);
			this.xhr.responseText;
			
			console.log(" Canço modificada");
			
		},
		
		/////////////////////// PLAYLIST 
		
		// obtener una playlist por su ID
		getPlaylistbyID : function(id){
			this.xhr = new XMLHttpRequest();
			
			this.xhr.open("GET","http://api.hipermedia.local/playlists/"+id,false);
			this.xhr.send();

			var json_response = this.xhr.responseText;
			var response = JSON.parse(json_response);
			console.log("Status:"+this.xhr.status);
			
			console.log(response);
			return response.data[0].name;
			//console.log(response.data[0].title);
		},
		
		// obtener una playlist por su Nombre
		getPlaylistbyName : function(name){
			var id=1;
			var xhr2;
			
						
			console.log("playlist:"+name);
			
			
			var xhr = new XMLHttpRequest();
			xhr.open("PUT","http://api.hipermedia.local/query");
			

			console.log("Status:"+xhr.status);
			
			//var json_response2 = xhr2.responseText;
			//var response2 = JSON.parse(json_response2);
			
			
			//console.log(json_response2);
			
			
			
			//id=response.data[0].playlist_id;
			//console.log(response.data[0].title);
			//return id;
		},

		
		
		/**
		* insertar una playlist
		* 
		* @param: nameList nom de la llista de reproduccio
		**/
		setPlaylist : function(nameList){
			this.xhr = new XMLHttpRequest();
			
			this.xhr.open("POST","http://api.hipermedia.local/playlists/new");
			this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			var info="name="+nameList;
			this.xhr.send(info);
			this.xhr.responseText;	
			
			console.log("Nova PlayList creada");
			
		},
		
		// 
		
		/**
		* actualizar una playlist
		* 
		* @param: playlist_ID id de la playlist a canviar
		* @param: newName nou titul de la playlist
		**/
		modifyPlaylist : function(playlist_ID,newName){
			
			this.xhr.open("POST","http://api.hipermedia.local/playlists/update");
			this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			var info="playlist_id="+playlist_ID+"&name="+newName;
			this.xhr.send(info);
			this.xhr.responseText;
			
			console.log("PlayList modificada");
			
		},
		
		
		//// crear una query especial
		query : function(){
			
			this.xhr.open("PUT","http://api.hipermedia.local/query");
			this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			this.xhr.send("SELECT * FROM playlists INNER JOIN music ON playlists.playlist_id=music.playlist_id WHERE playlists.playlist_id=1 LIMIT 2");
			this.xhr.responseText;	
			
		},
		
		
		// inicialization
		init: function(){
			
			console.log("Entra al init");
			
			this.xhr = new XMLHttpRequest();
			
			
			/*manager.setSong("Marc","hello world",3333,2);
			manager.setSong("Emili","Bye",3332,2);
			manager.setSong("Carlos","Magic world",333,1);
			manager.setSong("Nacho","Cap gros",3233,1);
			
			manager.modifySong("SIsiSI",2222);
			
			manager.setPlaylist("Barrio");
			
			manager.modifyPlaylist(1,"Supercell");
			
			manager.getSongbyID(2222);
			
			manager.getLastSongs();
			
			manager.getPlaylistbyID(1);*/
			
			
		},

	};
	
		
	document.addEventListener("DOMContentLoaded", manager.init(), false);






