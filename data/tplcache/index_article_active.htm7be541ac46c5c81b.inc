<?php
$z[0]=Array("global","",236,264);
$z[0][4]=array();
$z[0][4]['name']="cfg_soft_lang";
$z[1]=Array("field","",277,296);
$z[1][4]=array();
$z[1][4]['name']="title";
$z[2]=Array("global","",297,323);
$z[2][4]=array();
$z[2][4]['name']="cfg_webname";
$z[3]=Array("field","",364,393);
$z[3][4]=array();
$z[3][4]['name']="keywords";
$z[4]=Array("field","",433,491);
$z[4][4]=array();
$z[4][4]['name']="description";
$z[4][4]['function']="html2text(@me)";
$z[5]=Array("global","",533,565);
$z[5][4]=array();
$z[5][4]['name']="cfg_templets_skin";
$z[6]=Array("global","",834,866);
$z[6][4]=array();
$z[6][4]['name']="cfg_templets_skin";
$z[7]=Array("global","",1068,1100);
$z[7][4]=array();
$z[7][4]['name']="cfg_templets_skin";
$z[8]=Array("global","",1174,1206);
$z[8][4]=array();
$z[8][4]['name']="cfg_templets_skin";
$z[9]=Array("global","",1280,1312);
$z[9][4]=array();
$z[9][4]['name']="cfg_templets_skin";
$z[10]=Array("global","",1370,1402);
$z[10][4]=array();
$z[10][4]['name']="cfg_templets_skin";
$z[11]=Array("global","",1466,1498);
$z[11][4]=array();
$z[11][4]['name']="cfg_templets_skin";
$z[12]=Array("field","\$ID = @me; \$sql = \"SELECT * FROM `dede_arctype` WHERE id=\$ID\";\$query = mysql_query(\$sql);\$row=mysql_fetch_array(\$query); \$relID = \"\$row[reid]\"; if(\$relID == 0) {@me = \$row[arcpic];}else{\$sql = \"SELECT `arcpic` FROM `dede_arctype` WHERE id=\$relID\";\$query = mysql_query(\$sql);\$row=mysql_fetch_array(\$query); @me = \$row[arcpic];}",1977,2355);
$z[12][4]=array();
$z[12][4]['name']="typeid";
$z[12][4]['runphp']="yes";
$z[13]=Array("include","",2369,2404);
$z[13][4]=array();
$z[13][4]['filename']="head.htm";
$z[14]=Array("global","",2539,2571);
$z[14][4]=array();
$z[14][4]['name']="cfg_templets_skin";
$z[15]=Array("field","",2664,2693);
$z[15][4]=array();
$z[15][4]['name']="position";
$z[16]=Array("include","",2715,2749);
$z[16][4]=array();
$z[16][4]['filename']="nav.htm";
$z[17]=Array("global","",3108,3140);
$z[17][4]=array();
$z[17][4]['name']="cfg_templets_skin";
$z[18]=Array("global","",3341,3373);
$z[18][4]=array();
$z[18][4]['name']="cfg_templets_skin";
$z[19]=Array("global","",3574,3606);
$z[19][4]=array();
$z[19][4]['name']="cfg_templets_skin";
$z[20]=Array("list","\r\n                        <li class=\"e_show\">\r\n                            <a href='[field:arcurl/]'>\r\n                                <img src='[field:picname/]'></a>\r\n                            <div class=\"right\">\r\n                                <a href='[field:arcurl/]'>\r\n                                    <h3>[field:title/]</h3></a>\r\n                                <p>\r\n                                </p>\r\n                            </div>\r\n                        </li>\r\n						",3910,4461);
$z[20][4]=array();
$z[20][4]['row']="999";
$z[20][4]['pagesize']="4";
$z[20][4]['titlelen']="80";
$z[21]=Array("global","",4679,4711);
$z[21][4]=array();
$z[21][4]['name']="cfg_templets_skin";
$z[22]=Array("pagelist","",5737,5773);
$z[22][4]=array();
$z[22][4]['listitem']="pageno,";
$z[23]=Array("include","",5821,5861);
$z[23][4]=array();
$z[23][4]['filename']="rightlist.htm";
$z[24]=Array("include","",5895,5931);
$z[24][4]=array();
$z[24][4]['filename']="right.htm";
$z[25]=Array("include","",6402,6439);
$z[25][4]=array();
$z[25][4]['filename']="footer.htm";

?>