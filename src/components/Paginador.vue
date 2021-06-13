<template>
    <div>
        <section class="paginacion">
			<ul>
                <li><a style="background-color: #94700a;color: white;" class="back" href="#">{{ $t('Back')}}</a></li>
				<li><a href="pagina1.html">1</a></li>
				<li><a href="pagina2.html">2</a></li>
				<li><a href="pagina3.html" class="active">3</a></li>
				<li><a href="pagina4.html">4</a></li>
				<li><a href="pagina5.html">5</a></li>
                <li><a style="background-color: #94700a;color: white;" class="next" href="#">{{$t('Next')}}</a></li>
			</ul>
		</section>
    </div>
</template>
<style>

.paginacion {
	margin:20px 0;
}
 
.paginacion ul {
	list-style:none;
	text-align: center;
}
 
.paginacion ul li {
	display:inline-block;

}
.back{
    border-radius: 5px 0px 0px 5px;
    background-color: #94700a;
    color: white;
}

.next{
    border-radius: 0px 5px 5px 0px;
        background-color: #94700a;
    color: white;
}
 
.paginacion ul li a {
	display:block;
	padding:6px 24px;
	color:black;
	background:#fff;
	text-decoration: none;
    border:1px solid #94700a;
}
 
.paginacion ul li a:hover {
	background:#94700a;
    color: white;
}
 
.paginacion ul li .active {
	background:#94700a;
	font-weight:bold;
    color: white;
    border:1px solid #94700a;
}

/* Smartphones (portrait & landscape) */
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) {
 .paginacion ul li a {
    display: block;
    padding: 6px 12px;
    color: black;
    background: #fff;
    text-decoration: none;
    border: 1px solid #94700a;
}
}





 
</style>