function loadCity(local){
  document.getElementById("cidade").innerHTML = "Previsão Surf " + local;
  console.log(local);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cidade(this);
    }
  };
  //http://servicos.cptec.inpe.br/XML/cidade/851/todos/tempos/ondas.xml   
 //pega o codigo da cidade escolhida
  xhttp.open("GET", "http://servicos.cptec.inpe.br/XML/listaCidades?city="+local, true);
  xhttp.send();
}


function cidade(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("cidade");
  for (i = 0; i <x.length; i++) { 
  var nome =   x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
  }
 //envia o codigo da cidade para função loadDoc (que irá retornar previsão de ondas)
  loadDoc(nome);
}


function loadDoc(idCidade) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  //variavel cids contém o código da cidade
  xhttp.open("GET", "http://servicos.cptec.inpe.br/XML/cidade/"+idCidade+"/todos/tempos/ondas.xml", true);
  xhttp.send();
}



function myFunction(xml) {
  let dias = [];
  let altura = [];
  let agitacao = [];
  let direcao = [];
  let vento = [];
  let ventoDirecao = [];
  var i;
  var xmlDoc = xml.responseXML;

  var x = xmlDoc.getElementsByTagName("previsao");
  for (i = 0; i <x.length; i++) { 
   dias.push(x[i].getElementsByTagName("dia")[0].childNodes[0].nodeValue);
   altura.push(x[i].getElementsByTagName("altura")[0].childNodes[0].nodeValue);
   agitacao.push(x[i].getElementsByTagName("agitacao")[0].childNodes[0].nodeValue);
   direcao.push(x[i].getElementsByTagName("direcao")[0].childNodes[0].nodeValue);
   vento.push(x[i].getElementsByTagName("vento")[0].childNodes[0].nodeValue);
   ventoDirecao.push(x[i].getElementsByTagName("vento_dir")[0].childNodes[0].nodeValue);
  
  }
  //document.getElementById("demo").innerHTML = table;
  //função para editar a string e pegar apenas o dia e a hora
  diasFormatado = editaDias(dias);
  grafico(diasFormatado,altura);
  agt(agitacao);
  dir(direcao);
  ventoForca(vento);
  ventoDir(ventoDirecao);
  
  console.log(agitacao[0]);
}

function editaDias(dias){
  var diasOk = [];
    for(var i = 0; i < dias.length;i++)
       diasOk.push(dias[i].slice(0, 2) + " - " + dias[i].slice(10, 14));
          return diasOk;
          }




//PEGAR DIA DA SEMANA
function diaDaSemana(){
  var dias = [];
  var semana = ["Dom", "Seg", "Ter", "Quar", "Quin", "Sex", "Sáb"];
  var d = new Date();
     
  var cont = d.getDay();
  var contFor =  0;

  for(var i= 0;  i<6; i++){
      dias.push(semana[cont]);
      if(semana[cont] == "Sáb" && dias.length < 6){
        dias.push(semana[contFor]);
        contFor++;}
          if(dias.length < 6 && contFor > 0){
            dias.push(semana[contFor]);
            contFor++;
          }
          cont++;
         }
   
  
   

   return dias;
}



function grafico(dias,altura){

//traz um array com os dias da semana 'dom','seg'...
var dia = diaDaSemana();


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
type: 'line',
data: {
    labels: 
            [ dia[0] + " " + dias[2],dias[5].slice(6,10),

              dia[1] + " " + dias[10], dias[13].slice(6,10),

              dia[2] + " " + dias[18], dias[21].slice(6,10),

              dia[3] + " " + dias[26], dias[29].slice(6,10),

              dia[4] + " " + dias[34], dias[37].slice(6,10),
    ],
       datasets: [{
        label: 'Metro',
        data: [altura[2], altura[5], altura[10], altura[13],  altura[18], altura[21],altura[26], altura[29], altura[34], altura[37]],
        backgroundColor: [
            
            'rgba(54, 162, 235, 0.2)',
            
        ],
        borderColor: [
          
            'rgba(54, 162, 235, 1)',
          
        ],
        borderWidth: 1
    }]
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
});

}

function agt(agitacao){
var dia = diaDaSemana();    
document.getElementById('agitacao').innerHTML = "<b>Agitação </b><br>" +  dia[0] + ": "  + agitacao[2] + " - " + dia[1] + ": "+ agitacao[10]+ " - " + dia[2]+ " : " + agitacao[18]+ " - " + dia[3]+ " : " + agitacao[26]+ " - " + dia[4]+ " : " + agitacao[34];
}

//usar este array abaixo para pegar todos parametros e enviar para o modal, uma função para resolver isso
//  $noticia[$cont] = array($row['id'],$row['nome'],$row['email'],$row['foto'],$row['nome_cid'],$row['data']);
function dir(direcao){
  var dia = diaDaSemana();    
  document.getElementById('direcao').innerHTML = "<b>Direção </b><br>" +  dia[0] + ": "  + direcao[2] + " - " + dia[1] + ": "+ direcao[10]+ " - " + dia[2]+ " : " + direcao[18]+ " - " + dia[3]+ " : " + direcao[26]+ " - " + dia[4]+ " : " + direcao[34];
  
}

function direcaoModal(dir){

// lado = dir(direcao[0]);
console.log('teste retorno dados '+dir[0]);
}

function ventoForca(vento){
var dia = diaDaSemana();    
document.getElementById("vento").innerHTML = "<b>Força Vento </b><br>" +  dia[0] + ": "  + vento[2] + " - " + dia[1] + ": "+ vento[10]+ " - " + dia[2]+ " : " + vento[18]+ " - " + dia[3]+ " : " + vento[26]+ " - " + dia[4]+ " : " + vento[34];
}


function ventoDir(ventoDirecao){
  var dia = diaDaSemana();    
document.getElementById("ventoDirecao").innerHTML = "<b>Direção Vento</b><br>" +  dia[0] + ": " + ventoDirecao[2] + " - " +  dia[1] + ": " + ventoDirecao[10]+ " - " +  dia[2] + " : " + ventoDirecao[18]+ " - "+  dia[3] + " : "  + ventoDirecao[26] + " - " + dia[4] + " : " +ventoDirecao[34];
}
