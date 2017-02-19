/**
 * Created by bimbo on 17.06.2016.
 */

// -- PHP action codes --
//
// action   - 1 --> print rows
//          - 2 --> add columns


//  **********************************************
//  **********************************************
// naplnovani tabulky daty o akcionarich
// - fillTableAll()         - vsichni
// - fillTableEx()          - byvaly
// - fillTableCurrent()     - soucasni


//  **********************************************
//  soucasni akcionari
function fillTableAll(){
    console.log("fillTableAll");
    $.ajax({
        url:"server.php",
        method: "POST",
        data:{action: "get_body_all"},
        success:
            function( response_rows_ ){
                var response_rows = JSON.parse( response_rows_ );
                console.log("response_rows:", response_rows);
                for( var i = 0; i < response_rows.length; i++ ) {
                    // byvale akcionare odlisime cervenou barvou
                    if(response_rows[i][9] == 1){
                        console.log("byvaly");
                        $("#example > tbody").append("<tr><td class='id' style='text-align:center; color: darkred;'>" + response_rows[i][1] +
                            "</td><td class='name' style='text-align:center; color: darkred;'>" + response_rows[i][2] +
                            "</td><td class='rodne_c' style='text-align:center; color: darkred;'>" + response_rows[i][3] +
                            "</td><td class='adresa' style='text-align:center; color: darkred;'>" + response_rows[i][4] +
                            "</td><td class='akcie' style='text-align:center; color: darkred;'>" + response_rows[i][5] +
                            "</td><td class='1tis' style='text-align:center; color: darkred;'>" + response_rows[i][6] +
                            "</td><td class='10tis' style='text-align:center; color: darkred;'>" + response_rows[i][7] +
                            "</td><td class='100tis' style='text-align:center; color: darkred;'>" + response_rows[i][8] +
                            "</td></tr>");
                    }
                    // soucasni akcionari maji klasickou barvu
                    else{
                        $("#example > tbody").append("<tr><td class='id' style='text-align:center;'>" + response_rows[i][1] +
                            "</td><td class='name' style='text-align:center;'>" + response_rows[i][2] +
                            "</td><td class='rodne_c' style='text-align:center;'>" + response_rows[i][3] +
                            "</td><td class='adresa' style='text-align:center;'>" + response_rows[i][4] +
                            "</td><td class='akcie' style='text-align:center;'>" + response_rows[i][5] +
                            "</td><td class='1tis' style='text-align:center;'>" + response_rows[i][6] +
                            "</td><td class='10tis' style='text-align:center;'>" + response_rows[i][7] +
                            "</td><td class='100tis' style='text-align:center;'>" + response_rows[i][8] +
                            "</td></tr>");
                    }
                }
                console.log("-> add_columns_all");
                add_columns("add_columns_all");
            }
    });
}

//  **********************************************
//  funkce pro vypis byvalych zamestnancu, vola se z index.html za pomoci ulozeneho stavu v COOKIES
function fillTableEx(){
    console.log("fillTableEx");
    $.ajax({
        url:"server.php",
        method: "POST",
        data:{action: "get_body_ex"},
        success:
            function( response_rows_ ){
                var response_rows = JSON.parse( response_rows_ );
                for( var i = 0; i < response_rows.length; i++ ) {
                    // vypis byvalych akcionaru
                    $("#example > tbody").append("<tr><td class='id' style='text-align:center; color: darkred;'>" + response_rows[i][1] +
                        "</td><td class='name' style='text-align:center; color: darkred;'>" + response_rows[i][2] +
                        "</td><td class='rodne_c' style='text-align:center; color: darkred;'>" + response_rows[i][3] +
                        "</td><td class='adresa' style='text-align:center; color: darkred;'>" + response_rows[i][4] +
                        "</td><td class='akcie' style='text-align:center; color: darkred;'>" + response_rows[i][5] +
                        "</td><td class='1tis' style='text-align:center; color: darkred;'>" + response_rows[i][6] +
                        "</td><td class='10tis' style='text-align:center; color: darkred;'>" + response_rows[i][7] +
                        "</td><td class='100tis' style='text-align:center; color: darkred;'>" + response_rows[i][8] +
                        "</td></tr>");
                }
                console.log("-> add_columns_ex");
                add_columns("add_columns_ex");
            }
    });
}
//  **********************************************
//  soucasni akcionari
function fillTableCurrent(){
    console.log("fillTableCurrent");
    $.ajax({
        url:"server.php",
        method: "POST",
        data:{action: "get_body_current"},
        success:
            function( response_rows_ ){
                var response_rows = JSON.parse( response_rows_ );
                for( var i = 0; i < response_rows.length; i++ ) {
                    // soucasni akcionari maji klasickou barvu
                    $("#example > tbody").append("<tr><td class='id' style='text-align:center;'>" + response_rows[i][1] +
                        "</td><td class='name' style='text-align:center;'>" + response_rows[i][2] +
                        "</td><td class='rodne_c' style='text-align:center;'>" + response_rows[i][3] +
                        "</td><td class='adresa' style='text-align:center;'>" + response_rows[i][4] +
                        "</td><td class='akcie' style='text-align:center;'>" + response_rows[i][5] +
                        "</td><td class='1tis' style='text-align:center;'>" + response_rows[i][6] +
                        "</td><td class='10tis' style='text-align:center;'>" + response_rows[i][7] +
                        "</td><td class='100tis' style='text-align:center;'>" + response_rows[i][8] +
                        "</td></tr>");
                }
                console.log("-> add_columns_current");
                add_columns("add_columns_current");
            }
    });
}

//  **********************************************
//  Soucet hodnot poli
function add_columns( variant ){
    console.log("add_columns");
    $.ajax({
        url:"server.php",
        method: "POST",
        data:{action: variant},
        success:
            function( response_added_ ){
                var response_added = JSON.parse( response_added_ );
                console.log("response_added: ", response_added);

                $("#example tfoot").append("<tr><td style='text-align:center;'><b>" + response_added[0] +
                    "</b></td><td><b>-" +
                    "</b></td><td><b>-" +
                    "</b></td><td><b>-" +
                    "</b></td><td style='text-align:center;'><b>" + response_added[1] +
                    "</b></td><td style='text-align:center;'><b>" + response_added[2] +
                    "</b></td><td style='text-align:center;'><b>" + response_added[3] +
                    "</b></td><td style='text-align:center;'><b>" + response_added[4] +
                    "</b></td></tr>");

                $('#example').DataTable({
                    "scrollY":        "500px",
                    "scrollCollapse": true,
                    "paging":         false
                });
            }
    });
}

$( document ).ready(function() {
//  **********************************************
// reakce na praci s akcionari
    // - pridani noveho
    // - aktualizace udaju
    // - smazani akcionare

    // document.getElementById("save").onclick = function () {
    saveFunction = function () {
        var nominalniHodnota = 0;
        var akcie = 0;

        if( $('#ID').val() == "" )      var ID = "null";
        else                            var ID = $('#ID').val();
        if( $('#jmeno').val() == "" )   var jmeno = "null";
        else                            var jmeno = $('#jmeno').val();
        if( $('#rodne_c').val() == "" ) var rodne_c = "null";
        else                            var rodne_c = $('#rodne_c').val();
        if( $('#adresa').val() == "" )  var adresa = "null";
        else                            var adresa = $('#adresa').val();
        if( $('#v_tis').val() == "" )   var v_tis = "null";
        else                            var v_tis = $('#v_tis').val();
        if( $('#v_10tis').val() == "" ) var v_10tis = "null";
        else                            var v_10tis = $('#v_10tis').val();
        if( $('#v_100tis').val() == "" )var v_100tis = "null";
        else                            var v_100tis = $('#v_100tis').val();

        if( ID != "null" ) {
            alert('Polozka ID musi byt pro ulozeni akcionare prazdna!');
        }
        else {

            // prepocitani jednotlivych serii na nominalni hodnotu akcii
            var allVTis = v_tis.split(",");
            console.log("allVTis: ", allVTis);
            for(var k = 0; k < allVTis.length; k++){
                var res1tis = allVTis[k].split("-");
                nominalniHodnota = nominalniHodnota + 1000*(res1tis[1] - res1tis[0]);
                console.log("res1tis: ", res1tis, ", nominalniHodnota: ", nominalniHodnota);
            }

            var allV10Tis = v_10tis.split(",");
            console.log("allV10Tis: ", allV10Tis);
            for(var k = 0; k < allV10Tis.length; k++){
                var res10tis = allV10Tis[k].split("-");
                nominalniHodnota = nominalniHodnota + 10000*(res10tis[1] - res10tis[0]);
                console.log("res10tis: ", res10tis, ", nominalniHodnota: ", nominalniHodnota);
            }

            var allV100Tis = v_100tis.split(",");
            console.log("allV100Tis: ", allV100Tis);
            for(var k = 0; k < allVTis.length; k++){
                var res100tis = allV100Tis[k].split("-");
                nominalniHodnota = nominalniHodnota + 100000*(res100tis[1] - res100tis[0]);
                console.log("res100tis: ", res100tis, ", nominalniHodnota: ", nominalniHodnota);
            }
            akcie = nominalniHodnota;

            $.ajax({
                url:"server.php",
                method: "POST",
                data:{  id:ID, jmeno:jmeno, rodne_c:rodne_c, adresa:adresa,
                    akcie:akcie, v_1tis:v_tis, v_10tis:v_10tis, v_100tis:v_100tis, byvaly:byvalyZamestnanec,
                    action:"save"},
                success:
                    function( answer ){
                        alert(JSON.parse( answer ));
                        location.reload();
                    }
            });
        }
    };

    // document.getElementById("update").onclick = function () {
    updateFunction = function () {
        if( $('#ID').val() == "" )      var ID = "null";
        else                            var ID = $('#ID').val();
        if( $('#jmeno').val() == "" )   var jmeno = "null";
        else                            var jmeno = $('#jmeno').val();
        if( $('#rodne_c').val() == "" ) var rodne_c = "null";
        else                            var rodne_c = $('#rodne_c').val();
        if( $('#adresa').val() == "" )  var adresa = "null";
        else                            var adresa = $('#adresa').val();
        if( $('#v_tis').val() == "" )   var v_tis = "null";
        else                            var v_tis = $('#v_tis').val();
        if( $('#v_10tis').val() == "" ) var v_10tis = "null";
        else                            var v_10tis = $('#v_10tis').val();
        if( $('#v_100tis').val() == "" )var v_100tis = "null";
        else                            var v_100tis = $('#v_100tis').val();

        if( ID == "null" ) {
            alert("Pro zmenu zadejte ID akcionare!");
        }
        else {
            $.ajax({
                url:"server.php",
                method: "POST",
                data:{  id:ID, jmeno:jmeno, rodne_c:rodne_c, adresa:adresa,
                    akcie:"null", v_1tis:v_tis, v_10tis:v_10tis, v_100tis:v_100tis,
                    byvaly:byvalyZamestnanec, action:"update"},
                success:
                    function( answer ){
                        alert(JSON.parse( answer ));
                        location.reload();
                    }
            });
        }
    };

    document.getElementById("delete").onclick = function () {
        if( $('#ID').val() == "" )      var ID = "null";
        else                            var ID = $('#ID').val();
        if( $('#jmeno').val() == "" )   var jmeno = "null";
        else                            var jmeno = $('#jmeno').val();
        if( $('#rodne_c').val() == "" ) var rodne_c = "null";
        else                            var rodne_c = $('#rodne_c').val();
        if( $('#adresa').val() == "" )  var adresa = "null";
        else                            var adresa = $('#adresa').val();
        if( $('#v_tis').val() == "" )   var v_tis = "null";
        else                            var v_tis = $('#v_tis').val();
        if( $('#v_10tis').val() == "" ) var v_10tis = "null";
        else                            var v_10tis = $('#v_10tis').val();
        if( $('#v_100tis').val() == "" )var v_100tis = "null";
        else                            var v_100tis = $('#v_100tis').val();

        if( ID == "null" ) {
            alert("Pro smazani zadejte ID akcionare!");
        }
        else {
            $.ajax({
                url:"server.php",
                method: "POST",
                data:{  id:ID, jmeno:jmeno, rodne_c:rodne_c, adresa:adresa,
                        v_1tis:v_tis, v_10tis:v_10tis, v_100tis:v_100tis,
                        action:"delete"},
                success:
                    function( answer ){
                        alert(JSON.parse( answer ));
                        location.reload();
                    }
            });
        }
    };

//  **********************************************
//  menu pro vyber akcionaru zobrazenych v tabulce
    document.getElementById("all-acionars").onclick = function(){
        console.log("all acionars");
        document.cookie="state=all";
        var select_view = getCookie("state");
        location.reload();
    };

    document.getElementById("current-acionars").onclick = function(){
        console.log("current acionars");
        document.cookie="state=current";
        var select_view = getCookie("state");
        location.reload();
    };

    document.getElementById("ex-acionars").onclick = function(){
        console.log("ex acionars");
        document.cookie="state=ex";
        var select_view = getCookie("state");
        location.reload();
    };

    document.getElementById("pdf").onclick = function(){
        console.log("PDF button clicked");
        GetCellValuesPDF();
    };

    document.getElementById("xls").onclick = function(){
        console.log("XLS button clicked");
        $('#example').tableExport({type:'excel',escape:'false'});
    };

    document.getElementById("letter").onclick = function(){
        console.log("LETTER button clicked");
        GetCellValuesObalka();
    };
});


function GetCellValuesPDF() {
    var table = document.getElementById('example');

    var bdy = new Array();
    // bdy[0] = ['Jméno','Rodné číslo','Adresa','Akcie','Rozmezí','v tis.','v 10tis','ve 100tis.'];
    for(var y = 1; y < (table.rows.length - 1); y++) {
        bdy[y-1] = new Array();
        for(var x = 1; x < table.rows[y].cells.length; x++) {
            bdy[y-1][x-1] = table.rows[y].cells[x].innerHTML;
        }
    }

    var docDefinition = {
        content: [
            { text: 'Tabulka akcionářů', style: 'header' }, {
                style: 'tableHeader',
                table: {
                    widths: ['*', '*', '*', '*', 40, 40, 40],
                    body: [
                            ['Jméno', 'Rodné číslo', 'Adresa', 'Nominál. hodnota',
                             'T série', 'D série', 'S série']
                    ]
                }
            }, {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*', '*', 40, 40, 40],
                    body: bdy
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableExample: {
                margin: [0, 0, 0, 0],
                italics: true,
                fontSize: 10,
                color: 'gray'
            },
            tableHeader: {
                margin: [0, 0, 0, 0],
                bold: true,
                fontSize: 10,
                color: 'black'
            }
        },
        defaultStyle: {
            alignment: 'justify'
        }
    };
    var currTime = new Date().getTime() / 1000;
    var pdfName = parseInt(currTime)+"-akcionari.pdf";
    pdfMake.createPdf(docDefinition).download(pdfName);
}

function GetCellValuesObalka() {
    var table = document.getElementById('example');
    var usersAddr = new Array();
    var bdy = new Array();
    // bdy[0] = ['Jméno','Rodné číslo','Adresa','Akcie','Rozmezí','v tis.','v 10tis','ve 100tis.'];
    for(var y = 1; y < (table.rows.length - 1); y++) {
        bdy[y-1] = new Array();
        bdy[y-1][0] = table.rows[y].cells[1].innerHTML;
        bdy[y-1][1] = table.rows[y].cells[3].innerHTML;
        usersAddr[y-1] = bdy[y-1][0] + "\n" + bdy[y-1][1];
    }

    console.log("bdy: ", bdy);
    console.log("usersAddr: ", usersAddr);

    var docDefinition = {
        pageSize: 'A5',
        pageOrientation: 'landscape',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 40, 60, 40, 60 ],
        content: usersAddr.map(function(item) {
                return [{text: 'Líšnická a.s.\nLíšnice 204\n561 84, Líšnice\nIČ: 25922921',style: 'header'}, { text: item, style: 'header2', pageBreak: 'after'}]
            }),
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'left',
                margin: [0,-30,0,0]
            },
            header2: {
                fontSize: 14,
                bold: true,
                alignment: 'left',
                margin: [320,150,0,0]
            },
            subheader: {
                fontSize: 14
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15,
            }
        }
    };
    var currTime = new Date().getTime() / 1000;
    var pdfName = parseInt(currTime)+"-obalky.pdf";
    pdfMake.createPdf(docDefinition).download(pdfName);
}

// prace s PDF
function test(){
    console.log("test function");
    var docDefinition = {
        content: [
            { text: 'Tabulka akcionářů', style: 'header' },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*', '*'],
                    body: [
                        // HEADERS
                        [
                            {text: 'HEADER1', bold: true, color: 'black', fontSize: 12},
                            {text: 'HEADER2', bold: true, color: 'black', fontSize: 12},
                            {text: 'HEADER3', bold: true, color: 'black', fontSize: 12},
                            {text: 'HEADER4', bold: true, color: 'black', fontSize: 12}
                        ],
                        // BODY
                        [
                            'fixed-width cells have exactly the specified width',
                            'fixed-width cells have exactly the specified width',
                            'fixed-width cells have exactly the specified width',
                            'fixed-width cells have exactly the specified width'
                        ]
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableExample: {
                margin: [0, 5, 0, 15],
                italics: true,
                fontSize: 10,
                color: 'gray'
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
    };

    pdfMake.createPdf(docDefinition).download('optionalName.pdf');
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};