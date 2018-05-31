var x = 350;
var y = 250;
var vida = 100;
var arriba=-1;
var abajo=-1;
var izquierda=-1;
var derecha=-1;
var puntuacion = 0;
var minas = [[aleatorio(670),aleatorio(450)],[aleatorio(670),aleatorio(450)],[aleatorio(670),aleatorio(450)],[aleatorio(670),aleatorio(450)],
	[aleatorio(670),aleatorio(450)],[aleatorio(670),aleatorio(450)],[aleatorio(670),aleatorio(450)],[aleatorio(670),aleatorio(450)],
	[aleatorio(670),aleatorio(450)],[aleatorio(670),aleatorio(450)]];
var posport = [[aleatorio(670),aleatorio(430)],[aleatorio(670),aleatorio(430)],[aleatorio(670),aleatorio(430)],[aleatorio(670),aleatorio(430)]];

$(document).ready(inicio);
$(document).keydown(capturaTeclado);
var PageName;

function inicio(){
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contexto.drawImage(buffer, 0, 0);
	run();		
}

function aleatorio(tope){
	return Math.floor((Math.random() * tope) + 20);
} 

function capturaTeclado(event){
	if(event.keyCode==39){//derecha
	x=x+5;
	arriba=-1;
	abajo=-1;
	izquierda=-1;
	derecha=derecha+1;
	if(derecha==3){
		derecha=1;
	}

}
if(event.keyCode==37){//izquierda
	x=x-5;
	arriba=-1;
	abajo=-1;
	derecha=-1;
	izquierda=izquierda+1;
	if(izquierda==3){
		izquierda=1;
	}

}
if(event.which==38){//arriba
	y=y-5;
	abajo=-1;
	izquierda=-1;
	derecha=-1;
	arriba=arriba+1;
	if(arriba==3){
		arriba=1;
	}
}
if(event.which==40){//abajo
	y=y+5;
	arriba=-1;
	izquierda=-1;
	derecha=-1;
	abajo=abajo+1;
	if(abajo==3){
		abajo=1;
	}
}
	if(y>=450)
			y=450;
		else if(y<=-3)
			y=-3;
		if(x>=670)
			x=670;
		else if(x<=-3)
			x=-3;
}

function Personaje(){
	var imagen;
	var imagenexplosion;
	imagenexplosion=$('#explosion')[0];
	if(abajo==-1 && arriba==-1 && derecha==-1 && izquierda==-1){
		imagen=$('#abajo1')[0];	
	}else{
		if(derecha==0){
			imagen=$('#derecha1')[0];
		}else{
			if(derecha==1){
				imagen=$('#derecha2')[0];
			}else{
				if(derecha==2){
					imagen=$('#derecha3')[0];
				}
			} 
		}
		if(izquierda==0){
			imagen=$('#izquierda1')[0];
		}else{
			if(izquierda==1){
				imagen=$('#izquierda2')[0];
			}else{
				if(izquierda==2){
					imagen=$('#izquierda3')[0];
				}
			} 
		}
		if(arriba==0){
			imagen=$('#arriba1')[0];
		}else{
			if(arriba==1){
				imagen=$('#arriba2')[0];
			}else{
				if(arriba==2){
					imagen=$('#arriba3')[0];
				}
			} 
		}
		if(abajo==0){
			imagen=$('#abajo1')[0];
		}else{
			if(abajo==1){
				imagen=$('#abajo2')[0];
			}else{
				if(abajo==2){
					imagen=$('#abajo3')[0];
				}
			} 
		}
	}
	
	this.dibujar = function(ctx,i){
		if(i==0){
			ctx.drawImage(imagen, x, y);
			ctx.restore();
		}else{if(i==1){
				ctx.drawImage(imagenexplosion,x-15,y-15);
				ctx.restore();
			}
		}
	}
	
	this.teletransportarse = function(xx,yy){
		var distancia=0;
		distancia=Math.sqrt( Math.pow( (xx-x), 2)+Math.pow( (yy-y),2));
		if(distancia>20)
		   return false;
		else
		   return true;	
	}
	
	this.colision = function(xx,yy){
		var distancia=0;
		distancia=Math.sqrt( Math.pow( (xx-x), 2)+Math.pow( (yy-y),2));
		if(distancia>10)
		   return false;
		else
		   return true;	
	}
}

function Mina(){
	this.img = $("#mina")[0];			
	this.dibujar = function(ctx, x1, y1){
		var img = this.img;
		ctx.save();
		ctx.translate(x1,y1);
		ctx.drawImage(img,-img.width/2,-img.height/2);
		ctx.restore();
	}
}

function Portal(){
	this.img = $("#portal")[0];			
	this.dibujar = function(ctx, x1, y1){
		var img = this.img;
		ctx.save();
		ctx.translate(x1,y1);
		ctx.drawImage(img,-img.width/2,-img.height/2);
		ctx.restore();
	}
}

function run(){ 
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "BLACK"; 
	if(vida > 0){  		
		var personaje = new Personaje();
		
		var objmina = [new Mina(),new Mina(),new Mina(),new Mina(),new Mina(),new Mina(),
						new Mina(),new Mina(),new Mina(),new Mina()]; 
						
		var portales = [new Portal(),new Portal(),new Portal(),new Portal()]; 
		contextoBuffer.clearRect(0,0,700,500);

		contextoBuffer.font = "bold 25px sans-serif";
		contextoBuffer.fillText("vida = "+vida, 25, 470);
		contextoBuffer.fillText("puntos = "+parseInt(puntuacion), 530, 470);
		personaje.dibujar(contextoBuffer,0);
		for(i=0;i<10;i++){
			
			objmina[i].dibujar(contextoBuffer,minas[i][0],minas[i][1]);
			if(personaje.colision(minas[i][0]-30,minas[i][1]-30)){
				minas[i][0]=aleatorio(670);
				minas[i][1]=aleatorio(450);
				vida=vida-5;
				personaje.dibujar(contextoBuffer,1);
			}
		}
		for(i=0;i<4;i++){
			
			portales[i].dibujar(contextoBuffer,posport[i][0],posport[i][1]);
			if(personaje.teletransportarse(posport[i][0],posport[i][1]-35)){
				puntuacion++;
				x=aleatorio(670);
				y=aleatorio(450);
				personaje.dibujar(contextoBuffer,0);
			}
		}
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",10);
		
	}else{	
		contextoBuffer.clearRect(0,0,700,500);
		contextoBuffer.font = "bold 50px sans-serif";
		
		contextoBuffer.fillText("Fin ", 180, 200);
		contextoBuffer.fillText(parseInt(puntuacion)+" pts", 250, 250);
		contextoBuffer.fillText(parseInt(puntuacion)+" pts", 250, 250);
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		enviarDatos(puntuacion);
	}
}

function enviarDatos(puntaje) {
	$.ajax({
		type: 'POST',
		url: 'Calaveras/enviar',
		data: {
			'puntaje': puntaje,
		}
	})
}

