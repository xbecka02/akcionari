<?php
    header('Content-type: text/html;charset=UTF-8');

    // get POST values
    if( isset($_POST["action"]) )       { $action = $_POST["action"]; }
    else                                { $action = "null"; }
    if( isset($_POST["id"]) )           { $id = $_POST["id"]; }
    else                                { $id = "null"; }
    if( isset($_POST["jmeno"]) )        { $jmeno = $_POST["jmeno"]; }
    else                                { $jmeno = "null"; }
    if( isset($_POST["rodne_c"]) )      { $rodne_c = $_POST["rodne_c"]; }
    else                                { $rodne_c = "null"; }
    if( isset($_POST["adresa"]) )       { $adresa = $_POST["adresa"]; }
    else                                { $adresa = "null"; }
    if( isset($_POST["akcie"]) )        { $akcie = $_POST["akcie"]; }
    else                                { $akcie = "null"; }
    if( isset($_POST["v_1tis"]) )       { $v_1tis = $_POST["v_1tis"]; }
    else                                { $v_1tis = "null"; }
    if( isset($_POST["v_10tis"]) )      { $v_10tis = $_POST["v_10tis"]; }
    else                                { $v_10tis = "null"; }
    if( isset($_POST["v_100tis"]) )     { $v_100tis = $_POST["v_100tis"]; }
    else                                { $v_100tis = "null"; }
    if( isset($_POST["byvaly"]) )       { $byvaly = $_POST["byvaly"]; }
    else                                { $byvaly = "null"; }

    // connect to DB 'akcie'
    $database = @mysql_connect('localhost', 'root', '');
    if (!$database) die('nelze se pripojit '.mysql_error());
    if (!@mysql_select_db('akcie', $database)) die('database neni dostupna '.mysql_error());
    mysql_query("SET NAMES 'utf8'");

    // TISKNUTI JEDNOTLIVYCH RADKU TABULKY

    if( $action == "get_body_all" ) {
        $query = "SELECT * FROM `akcie` WHERE 1";
        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }

        $i = 0;
        while( $row = mysql_fetch_assoc($result) ) {
            $res[] = array( "1" => $row['id'], "2" => $row['jmeno'], "3" => $row['rodne_c'], "4" => $row['adresa'],
                            "5" => $row['akcie'], "6" => $row['1tis'],
                            "7" => $row['10tis'], "8" => $row['100tis'], "9" => $row['byvaly']);
            $i = $i + 1;
        }

        echo json_encode( $res );
        exit;
    }
    if( $action == "get_body_ex" ) {
        $query = "SELECT * FROM `akcie` WHERE byvaly=1";
        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }

        $i = 0;
        while( $row = mysql_fetch_assoc($result) ) {
            $res[] = array(   "1" => $row['id'], "2" => $row['jmeno'], "3" => $row['rodne_c'], "4" => $row['adresa'],
                              "5" => $row['akcie'], "6" => $row['1tis'],
                               "7" => $row['10tis'], "8" => $row['100tis'], "9" => $row['byvaly']);
            $i = $i + 1;
        }

        echo json_encode( $res );
        exit;
    }
    if( $action == "get_body_current" ) {
        $query = "SELECT * FROM `akcie` WHERE byvaly=0";
        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }

        $i = 0;
        while( $row = mysql_fetch_assoc($result) ) {
            $res[] = array(   "1" => $row['id'], "2" => $row['jmeno'], "3" => $row['rodne_c'], "4" => $row['adresa'],
                              "5" => $row['akcie'], "6" => $row['1tis'],
                               "7" => $row['10tis'], "8" => $row['100tis'], "9" => $row['byvaly']);
            $i = $i + 1;
        }

        echo json_encode( $res );
        exit;
    }

    // SCITANI JEDNOTLIVYCH RADKY SLOUPCU

    if( $action == "add_columns_all" ) {
        $query = "SELECT `akcie`, `1tis`, `10tis`, `100tis` FROM `akcie` WHERE 1";
        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }

        $i = 0;
        $sum_akcie = 0;
        $sum_1tis = 0;
        $sum_10tis = 0;
        $sum_100tis = 0;
        while( $row = mysql_fetch_assoc($result) ) {
            $sum_akcie = $sum_akcie + $row['akcie'];

            $Tserie = explode(",",$row['1tis']);
            for($k = 0; $k < count($Tserie); $k++){
                $Tserie_h = explode("-",$Tserie[$k]);
                $sum_1tis = $sum_1tis + (floatval($Tserie_h[1]) - floatval($Tserie_h[0]));
            }

            $Dserie = explode(",",$row['10tis']);
            for($k = 0; $k < count($Dserie); $k++){
                $Dserie_h = explode("-",$Dserie[$k]);
                $sum_10tis = $sum_10tis + (floatval($Dserie_h[1]) - floatval($Dserie_h[0]));
            }

            $Sserie = explode(",",$row['100tis']);
            for($k = 0; $k < count($Sserie); $k++){
                $Sserie_h = explode("-",$Sserie[$k]);
                $sum_100tis = $sum_100tis + (floatval($Sserie_h[1]) - floatval($Sserie_h[0]));
            }

            $i = $i + 1;
        }

        $res_added = array(     "0" => $i,
                                "1" => $sum_akcie,
                                "2" => $sum_1tis,
                                "3" => $sum_10tis,
                                "4" => $sum_100tis);

        echo json_encode( $res_added );
        exit;
    }
    if( $action == "add_columns_ex" ) {
        $query = "SELECT `akcie`, `1tis`, `10tis`, `100tis` FROM `akcie` WHERE byvaly=1";
        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }

        $i = 0;
        $sum_akcie = 0;
        $sum_1tis = 0;
        $sum_10tis = 0;
        $sum_100tis = 0;
        while( $row = mysql_fetch_assoc($result) ) {
            $sum_akcie = $sum_akcie + $row['akcie'];

            $Tserie = explode(",",$row['1tis']);
            for($k = 0; $k < count($Tserie); $k++){
                $Tserie_h = explode("-",$Tserie[$k]);
                $sum_1tis = $sum_1tis + (floatval($Tserie_h[1]) - floatval($Tserie_h[0]));
            }

            $Dserie = explode(",",$row['10tis']);
            for($k = 0; $k < count($Dserie); $k++){
                $Dserie_h = explode("-",$Dserie[$k]);
                $sum_10tis = $sum_10tis + (floatval($Dserie_h[1]) - floatval($Dserie_h[0]));
            }

            $Sserie = explode(",",$row['100tis']);
            for($k = 0; $k < count($Sserie); $k++){
                $Sserie_h = explode("-",$Sserie[$k]);
                $sum_100tis = $sum_100tis + (floatval($Sserie_h[1]) - floatval($Sserie_h[0]));
            }

            $i = $i + 1;
        }

        $res_added = array(     "0" => $i,
                                "1" => $sum_akcie,
                                "2" => $sum_1tis,
                                "3" => $sum_10tis,
                                "4" => $sum_100tis);

        echo json_encode( $res_added );
        exit;
    }
    if( $action == "add_columns_current" ) {
        $query = "SELECT `akcie`, `1tis`, `10tis`, `100tis` FROM `akcie` WHERE byvaly=0";
        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }

        $i = 0;
        $sum_akcie = 0;
        $sum_1tis = 0;
        $sum_10tis = 0;
        $sum_100tis = 0;
        while( $row = mysql_fetch_assoc($result) ) {
            $sum_akcie = $sum_akcie + $row['akcie'];

            $Tserie = explode(",",$row['1tis']);
            for($k = 0; $k < count($Tserie); $k++){
                $Tserie_h = explode("-",$Tserie[$k]);
                $sum_1tis = $sum_1tis + (floatval($Tserie_h[1]) - floatval($Tserie_h[0]));
            }

            $Dserie = explode(",",$row['10tis']);
            for($k = 0; $k < count($Dserie); $k++){
                $Dserie_h = explode("-",$Dserie[$k]);
                $sum_10tis = $sum_10tis + (floatval($Dserie_h[1]) - floatval($Dserie_h[0]));
            }

            $Sserie = explode(",",$row['100tis']);
            for($k = 0; $k < count($Sserie); $k++){
                $Sserie_h = explode("-",$Sserie[$k]);
                $sum_100tis = $sum_100tis + (floatval($Sserie_h[1]) - floatval($Sserie_h[0]));
            }

            $i = $i + 1;
        }

        $res_added = array(     "0" => $i,
                                "1" => $sum_akcie,
                                "2" => $sum_1tis,
                                "3" => $sum_10tis,
                                "4" => $sum_100tis);

        echo json_encode( $res_added );
        exit;
    }

    if( $action == "update" ) {
        $added = 0;
        $newAkcieVal = 0;
        $sum_1tis = 0;
        $sum_10tis = 0;
        $sum_100tis = 0;
        $sum_1tisH = 0;
        $sum_10tisH = 0;
        $sum_100tisH = 0;

        if($v_1tis !== "null" || $v_10tis !== "null" || $v_100tis !== "") {

            $query = "SELECT `akcie`, `1tis`, `10tis`, `100tis` FROM `akcie` WHERE id='$id'";
            $result = mysql_query($query);

            if (!$result) {
                $message = 'Invalid query: ' . mysql_error() . "\n";
                $message .= 'Whole query: ' . $query;
                die($message);
            }

            while ($row = mysql_fetch_assoc($result)) {
                $Tserie = explode(",", $row['1tis']);
                for ($k = 0; $k < count($Tserie); $k++) {
                    $Tserie_h = explode("-", $Tserie[$k]);
                    $sum_1tis = $sum_1tis + (floatval($Tserie_h[1]) - floatval($Tserie_h[0]));
                }

                $Dserie = explode(",", $row['10tis']);
                for ($k = 0; $k < count($Dserie); $k++) {
                    $Dserie_h = explode("-", $Dserie[$k]);
                    $sum_10tis = $sum_10tis + (floatval($Dserie_h[1]) - floatval($Dserie_h[0]));
                }

                $Sserie = explode(",", $row['100tis']);
                for ($k = 0; $k < count($Sserie); $k++) {
                    $Sserie_h = explode("-", $Sserie[$k]);
                    $sum_100tis = $sum_100tis + (floatval($Sserie_h[1]) - floatval($Sserie_h[0]));
                }
            }

            if ($v_1tis !== "null") {
                $Tserie = explode(",", $v_1tis);
                for ($k = 0; $k < count($Tserie); $k++) {
                    $Tserie_h = explode("-", $Tserie[$k]);
                    $sum_1tisH = $sum_1tisH + (floatval($Tserie_h[1]) - floatval($Tserie_h[0]));
                }
                $newAkcieVal = $newAkcieVal + $sum_1tisH * 1000;
            } else {
                $newAkcieVal = $newAkcieVal + $sum_1tis * 1000;
            }

            if ($v_10tis !== "null") {
                $Dserie = explode(",", $v_10tis);
                for ($k = 0; $k < count($Dserie); $k++) {
                    $Dserie_h = explode("-", $Dserie[$k]);
                    $sum_10tisH = $sum_10tisH + (floatval($Dserie_h[1]) - floatval($Dserie_h[0]));
                }
                $newAkcieVal = $newAkcieVal + $sum_10tisH * 10000;
            } else {
                $newAkcieVal = $newAkcieVal + $sum_10tis * 10000;
            }

            if ($v_100tis !== "null") {
                $Sserie = explode(",", $v_100tis);
                for ($k = 0; $k < count($Sserie); $k++) {
                    $Sserie_h = explode("-", $Sserie[$k]);
                    $sum_100tisH = $sum_100tisH + (floatval($Sserie_h[1]) - floatval($Sserie_h[0]));
                }
                $newAkcieVal = $newAkcieVal + $sum_100tisH * 100000;
            } else {
                $newAkcieVal = $newAkcieVal + $sum_100tis * 100000;
            }
            $akcie = $newAkcieVal;
        }

        $query = "UPDATE `akcie` SET";
        if( $jmeno !== "null" )     {if($added > 0) {$query = $query.",";} $query = $query." jmeno='$jmeno'"; $added = $added + 1;}
        if( $rodne_c !== "null" )   {if($added > 0) {$query = $query.",";} $query = $query." rodne_c='$rodne_c'"; $added = $added + 1;}
        if( $adresa !== "null" )    {if($added > 0) {$query = $query.",";} $query = $query." adresa='$adresa'"; $added = $added + 1;}
        if( $akcie !== "null" )     {if($added > 0) {$query = $query.",";} $query = $query." akcie='$akcie'"; $added = $added + 1;}
        if( $v_1tis !== "null" )    {if($added > 0) {$query = $query.",";} $query = $query." 1tis='$v_1tis'"; $added = $added + 1;}
        if( $v_10tis !== "null" )   {if($added > 0) {$query = $query.",";} $query = $query." 10tis='$v_10tis'"; $added = $added + 1;}
        if( $v_100tis !== "null" )  {if($added > 0) {$query = $query.",";} $query = $query." 100tis='$v_100tis'"; $added = $added + 1;}
        if( $byvaly !== "null" )    {if($added > 0) {$query = $query.",";} $query = $query." byvaly='$byvaly'"; $added = $added + 1;}
        if( $id !== "null" )        {$query = $query." WHERE id='$id'";}

        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }
        else {
            $output = "Aktualizovan akcionar s id == ".$id;
            echo json_encode( $output );
            exit;
        }
    }

    if( $action == "save" ) {
        $query =  "INSERT INTO `akcie`(`jmeno`, `rodne_c`, `adresa`, `akcie`, `1tis`, `10tis`, `100tis`, `byvaly`)".
        "VALUES ('$jmeno','$rodne_c','$adresa','$akcie','$v_1tis','$v_10tis','$v_100tis','$byvaly')";

        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }
        else {
            $output = "Ulozen akcionar ".$jmeno;
            echo json_encode( $output );
            exit;
        }
    }

    if( $action == "delete" ) {
        if( $id !== "null" )        {$query = "DELETE FROM `akcie` WHERE id='$id'";}

        $result = mysql_query($query);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }
        else {
            $output = "Smazan akcionar s ID == ".$id;
            echo json_encode( $output );
            exit;
        }
    }
?>