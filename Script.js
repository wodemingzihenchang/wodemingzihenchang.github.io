<script type="text/javascript">
function elementDisplay(objid)
{
    var obj=document.getElementById(objid);
    if(obj.style.visibility !='hidden')
        {obj.style.visibility='hidden';}
    else{obj.style.visibility='visible';}
}</script>

<div onclick="elementDisplay('shishi')">点击这里</div>
    
<div id="shishi" style="background-color:#000000;width:100px; left:100px; height:100px; position:absolute; "></div>