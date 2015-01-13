<?php
	
	//////////////// VARIABLES/ ARRAYS /
	/* Constantes */
	define("CONSTANTE", "Hola mundo. </br>");
	echo CONSTANTE; // muestra "Hola mundo."

	/* Asignando una cadena. */
	$str = "Esto es una cadena, Hola";
	
	/* Añadiendo a la cadena. */
	$str = $str . " Marc.";
	
	/* Otra forma de añadir, incluye un carácter de nueva línea protegido. */
	// $str .= " Y un carácter de nueva línea al final.\n";
	
	/* Imprimir por pantalla la cadena */
	echo $str;
	
	
	
	/* Esta será ’<p>Número: $num</p>’ */
	$num = 9;
	$str = "<p>Número: $num</p>";
	
	/* Obtener el primer carácter de una cadena  */
	$str = "Esto es una prueba.";
	       $first = $str[0];
	       /* Obtener el último carácter de una cadena. */
	       $str = "Esto es aún una prueba.";
	       $last = $str[strlen($str)-1];
	       echo "</br> Ultima letra: $last </br>";
	       
	 /*creacion de array*/
	 $ss = array("foo","super"=>"bar");
	 
	 echo "Array ss: $ss[0] $ss[super]</br>"; // primero con indice numerico, segundo con indice asociativo
	 
	 
	 $foo = "Bob";  // Asigna el valor ’Bob’ a $foo
     $bar = &$foo; // Referencia $foo vía $bar.
  
     echo $foo;  
     echo $bar;
	 
	 
	 
	 
	 /* assignacion de array*/
	 $a[0] = "abc";
     $a[1] = "def";
     
     echo "Array a:</br> $a[0]  $a[1] </br>";
     
     /* Anidacion de arrays para montar estructuras */
    $a = array(
     "manzana"  => array(
          "color"  => "rojo",
          "sabor"  => "dulce",
          "forma"  => "redondeada"
     ),
     "naranja"  => array(
          "color"  => "naranja",
          "sabor"  => "ácido",
          "forma"  => "redondeada"
     ),
     "plátano"  => array(
		"color"  => "amarillo",
		"sabor"  => "paste-y",
		"forma"  => "aplatanada"
	 ) 
	);
	
    echo $a["manzana"]["sabor"]; // devolverá "dulce"
    
  
	//////////////////  OBJETOS 
	
	class foo {
	    function do_foo () {
	        echo "Doing foo.";
	    }
	}
	
	$bar = new foo;// instanciar el objeto
	$bar->do_foo(); // llamada a funciones
	
	
	       
	 

?>