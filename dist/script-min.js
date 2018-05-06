function generateTooltip(t){return"<h4>"+t.title+"</h4><p>Responses: <strong>"+t.responses+"</strong>"+(t.percentage?"<br>Percentage: <strong>"+(100*t.percentage).toFixed(1)+"%</strong>":"")+"</p>"}function generateTooltipMultiline(t){var e="",a="";t.responses=t.responses.map(function(e,a){return{data:e,color:t.colors[a]}}),t.responses.sort(function(t,e){return e.data-t.data});for(var s=0;s<t.responses.length;s++)e+="<div class = 'bubble' style = 'background:"+t.responses[s].color+"'></div> <span>"+t.responses[s].data+"</span><br>",a+="<div class = 'bubble' style = 'background:"+t.responses[s].color+"'></div> <span>"+(100*t.responses[s].data/t.total).toFixed(1)+"%</span><br>";return"<h4>"+t.title+"</h4><p>Responses:</p>"+e+"<p>Percentage:</p>"+a}$(document).ready(function(){$("#sidebar a").on("click",function(t){if(""!==this.hash){t.preventDefault();var e=this.hash;$("html, body").animate({scrollTop:$(e).offset().top},800,function(){window.location.hash=e})}}),$(document).scroll(function(){$(document).width()>900&&($(document).scrollTop()+60>$("#sections").offset().top?($("#sidebar").css("position","fixed"),$("#sidebar").css("top","40px")):($("#sidebar").css("position","absolute"),$("#sidebar").css("top","80px")))}),$(window).resize(function(){$(document).width()>900?$(document).scrollTop()+60>$("#sections").offset().top?($("#sidebar").css("position","fixed"),$("#sidebar").css("top","40px")):($("#sidebar").css("position","absolute"),$("#sidebar").css("top","80px")):($("#sidebar").css("position","relative"),$("#sidebar").css("top","0px"))})});var dataForBarCharts=[],totalForBarCharts=[];function drawBarChart(t,e,a){var s,n,r,o,l=20,i=20,d=50,c=50,p={top:20,right:20,bottom:50,left:70},h=t.dataset.accent,u=parseInt(t.dataset.height)-l-d,f=t.dataset.x,m=t.dataset.y,g=d3.select(t.firstChild),b=d3.select("#sections").node().offsetWidth-c-i,y=t.className.split(" ")[1];if("leftmargin"in t.dataset&&(p.left=parseInt(t.dataset.leftmargin)),d3.select(t).select("svg").selectAll("*").remove(),d3.select(t).select(".bar-label").remove(),o=d3.select(t).select("svg").attr("width",b+p.left+p.right).attr("height",u+p.top+p.bottom).append("g").attr("transform","translate("+p.left+","+p.top+")"),"barchart-horizontal"==y)b=d3.select("#sections").node().offsetWidth-p.left-p.right,n=d3.scaleLinear().range([0,b]),r=d3.scaleBand().range([u,0]).padding(.2),n.domain([0,d3.max(e,function(t){return t.y})]),r.domain(e.map(function(t){return t.label})),o.selectAll(".bar").data(e).enter().append("rect").attr("class","bar").attr("x",1).attr("height",r.bandwidth()).style("fill",h).attr("y",function(t){return r(t.label)}).attr("width",function(t){return n(t.y)});else if("barchart-grouped"==y){n=d3.scaleBand().rangeRound([0,b]).paddingInner(.1);var v=d3.scaleBand().padding(.05);r=d3.scaleLinear().rangeRound([u,0]);for(var x=[],w=0;w<e[0].y.length;w++)x.push(w);n.domain(e.map(function(t){return t.label})),v.domain(x).rangeRound([0,n.bandwidth()]),r.domain([0,d3.max(e,function(t){return d3.max(x,function(e){return t.y[e]})})]).nice(),o.append("g").selectAll("g").data(e).enter().append("g").attr("transform",function(t){return"translate("+n(t.label)+",0)"}).selectAll("rect").data(function(t){return x.map(function(e){return{key:e,value:t.y[e]}})}).enter().append("rect").attr("x",function(t){return v(t.key)}).attr("y",function(t){return r(t.value)}).attr("width",v.bandwidth()).attr("height",function(t){return u-r(t.value)}).attr("fill",function(t,e){return d3.rgb(d3.color(h).brighter(e))}),o.append("div").attr("class","bar-label").attr("width","100%").selectAll("p").data(t.dataset.labels.split(",")).enter().append("p").html(function(t,e){return"<div class = 'bubble' style = 'background:"+d3.rgb(d3.color(h).brighter(e))+"'></div>"+t})}else if(n=d3.scaleBand().range([0,b]).paddingInner(.2),r=d3.scaleLinear().range([u,0]),n.domain(e.map(function(t){return t.label})),"barchart-stacked"==y){r.domain([0,d3.max(e,function(t){return"number"==typeof t.y?t:t.y.reduce(function(t,e){return t+e},0)})]).nice();var A=0;o.append("g").selectAll("g").data(d3.stack().keys([0,1,2])(e)).enter().append("g").attr("fill",function(t,e){return d3.rgb(d3.color(h).darker(.4*e))}).selectAll("rect").data(function(t){return t}).enter().append("rect").attr("x",function(t){return n(t.data.label)}).attr("y",function(t,a){return A==e[0].y.length&&(A=0),r((0==A?0:t.data.y[A-1])+t.data.y[A++])}).attr("height",function(t,a){return A==e[0].y.length&&(A=0),u-r(t.data.y[A++])}).attr("width",n.bandwidth()),d3.select(t).append("div").attr("class","bar-label").attr("width","100%").selectAll("p").data(t.dataset.labels.split(",")).enter().append("p").html(function(t,e){return"<div class = 'bubble' style = 'background:"+d3.rgb(d3.color(h).darker(.4*e))+"'></div>"+t})}else r.domain([0,d3.max(e,function(t){return t.y})]),o.selectAll(".bar").data(e).enter().append("rect").attr("class","bar").attr("x",function(t){return n(t.label)}).attr("width",n.bandwidth()).style("fill",h).attr("y",function(t){return r(t.y)}).attr("height",function(t){return u-r(t.y)});o.selectAll(".bar").on("mouseover",function(t,e){s=generateTooltip({title:t.label,responses:t.y,percentage:t.y/a}),g.classed("hidden",!1).html(s),"barchart-horizontal"==y?g.style("left",n(t.y)+p.left+12+"px").style("top",r(t.label)-r.bandwidth()/2+p.top+"px"):g.style("left",n(t.label)+(n.bandwidth()-g.node().offsetWidth)/4+c+"px").style("top",r(t.y)-Math.round(g.node().offsetHeight)+l-12+"px")}).on("mouseout",function(t){var e=d3.event.toElement;e&&e.parentNode.parentNode!=this.parentNode&&e.parentNode!=this.parentNode&&e!=this.parentNode&&g.classed("hidden",!0)}),o.append("g").attr("class","xAxis").attr("transform","translate(0,"+u+")").call(d3.axisBottom(n)),o.append("g").attr("class","y axis").call(d3.axisLeft(r)),o.append("text").attr("transform","rotate(-90)").attr("y",-1*("barchart-horizontal"==y?p.left:c)).attr("x",0-u/2).attr("dy","1em").style("text-anchor","middle").style("font-family","source_sans_pro").style("font-weight","bold").text("barchart-horizontal"==y?f:m),o.append("text").attr("transform","translate("+b/2+" ,"+(u+l+20)+")").style("text-anchor","middle").style("font-family","source_sans_pro").style("font-weight","bold").text("barchart-horizontal"==y?m:f),o.select(".xAxis").selectAll("text").style("font-family","source_sans_pro").style("font-size","12px")}var barCharts=d3.selectAll(".barchart").each(function(){var t=this;$.ajax({url:this.dataset.url,success:function(e){var a=0,s=[];e.split("\n").forEach(function(t){var e=t.split(","),n=e.slice(1);e[0]&&(a+=parseInt(e[1]),s.push({y:n.length>1?n.map(function(t){return parseInt(t)}):parseInt(e[1]),label:e[0]}))}),d3.select(t).append("svg"),dataForBarCharts.push(s),totalForBarCharts.push(a),drawBarChart(t,s,a)},dataType:"text"})}),margin={top:20,right:20,bottom:50,left:50},dataForGraphs=[],totalForGraphs=[],bisectors=[],colorsForGraphs=[],numLinesGraphs=[];function drawGraph(t,e,a,s,n,r,o,l,i,d,c,p,h,u){for(var f,m,g=d3.scalePoint().rangeRound([0,s]).padding(.1),b=d3.scaleLinear().rangeRound([n,0]),y=[],v=0;v<p;v++)m=d3.line().x(function(t){return g(t.x)}).y(function(t){return b(t.y[v])}),y.push(m);t.select("svg").selectAll("*").remove();var x=t.select("svg").attr("width",s+margin.left+margin.right).attr("height",n+margin.top+margin.bottom).on("mousemove",function(){var t=g.invert(d3.mouse(this)[0]),s=l(e,t,1),n=e[s-1],r=e[s];if(n&&r){var i=t-n.x>r.x-t?r:n;f=p>1?generateTooltipMultiline({title:i.x,responses:i.y,colors:h,total:a}):generateTooltip({title:i.x,responses:i.y,percentage:i.y/a}),o.classed("hidden",!1).html(f),o.style("left",g(i.x)+margin.left-Math.round(o.node().offsetWidth/2)+"px").style("top",b(d3.max(i.y))-Math.round(o.node().offsetHeight)-12+margin.top+"px")}}).on("mouseout",function(t){var e=d3.event.toElement;e&&e.parentNode.parentNode!=this.parentNode&&e.parentNode!=this.parentNode&&e!=this.parentNode&&o.classed("hidden",!0)}).append("g").attr("transform","translate("+margin.left+","+margin.top+")");g.domain(e.map(function(t){return""+t.x})),b.domain([0,d3.max(e,function(t){return d3.max(t.y)})]);for(v=0;v<p;v++)if("false"==c&&x.append("path").data([e]).attr("class","line").style("stroke",h[v]).style("stroke-width","2px").style("fill","none").attr("d",y[v]),"true"==u){var w=d3.area().x(function(t){return g(t.x)}).y0(function(t){return 0==v?n:b(t.y[v-1])}).y1(function(t){return b(t.y[v])});x.append("path").data([e]).attr("fill",h[v]).style("opacity","0.5").style("z-index","20").attr("d",w)}for(v=0;v<p;v++)x.selectAll(".dot-"+v).data(e).enter().append("circle").attr("class","dot-"+v).style("fill",h[v]).attr("cx",function(t){return g(t.x)}).attr("cy",function(t){return b(t.y[v])}).attr("r",5);x.append("g").style("font-family","source_sans_pro").attr("transform","translate(0,"+n+")").call(d3.axisBottom(g)),x.append("g").style("font-family","source_sans_pro").call(d3.axisLeft(b)),x.append("text").attr("transform","rotate(-90)").attr("y",0-margin.left).attr("x",0-n/2).attr("dy","1em").style("text-anchor","middle").style("font-family","source_sans_pro").style("font-weight","bold").text(d),x.append("text").attr("transform","translate("+s/2+" ,"+(n+margin.top+20)+")").style("text-anchor","middle").style("font-family","source_sans_pro").style("font-weight","bold").text(i)}d3.selectAll(".line_chart").each(function(){for(var t=d3.color(this.dataset.accent),e=d3.select(this),a=this,s=this.dataset.csv,n=this.dataset.x,r=this.dataset.y,o=d3.select(this.firstChild),l=this.dataset.lines,i=[],d=0,c=[],p=0;p<l;p++)c.push(d3.color(t.darker(p)));$.ajax({url:s,success:function(s){s.split("\n").map(function(t){var e=t.split(",");e[0]&&(d+=parseInt(e[1]),i.push({x:e[0],y:e.slice(1).map(function(t){return parseInt(t)})}))});var p=d3.bisector(function(t){return t.x}).right;dataForGraphs.push(i),totalForGraphs.push(d),bisectors.push(p),numLinesGraphs.push(l),colorsForGraphs.push(c);var h=d3.select("#sections").node().offsetWidth-margin.left-margin.right,u=parseInt(a.dataset.height)-margin.top-margin.bottom;if(e.append("svg"),drawGraph(e,i,d,h,u,t,o,p,n,r,a.dataset.scatter,l,c,a.dataset.shade),l>1){var f=a.dataset.labels.split(",");d3.select(a).append("div").attr("class","line-label").attr("width","100%").selectAll("p").data(c).enter().append("p").html(function(t,e){return"<div class = 'bubble' style = 'background:"+t+"'></div> "+f[e]})}},dataType:"text"})}),d3.selectAll(".map").each(function(){var t=0,e=["Discontinuous","Northeast","Southeast","Southwest","West","Midwest","International"],a=d3.color(this.dataset.accent).brighter(1),s=this.dataset.responses.split(",").map(function(a,s){return t+=parseInt(a),{responses:parseInt(a),name:e[s]}}),n=s.slice().sort(function(t,e){return t.responses-e.responses});s=s.map(function(t,e){return{responses:t.responses,name:t.name,color:d3.color(a.darker(.4*n.indexOf(t)))}});var r,o=this,l=d3.select(this.firstChild);d3.svg(this.dataset.url).then(function(e){var n=e.documentElement;d3.select(o).node().appendChild(n),d3.select(n).selectAll("*").data(s).style("fill",function(t,e){return d3.rgb(t.color)}).on("mouseover",function(e,s){d3.select(this).style("fill",d3.rgb(a.brighter(.3))),r=generateTooltip({title:e.name,responses:e.responses,percentage:e.responses/t}),l.classed("hidden",!1).html(r)}).on("mousemove",function(t){var e=d3.mouse(o);l.style("left",e[0]-Math.round(l.node().offsetWidth/2)+"px").style("top",e[1]-Math.round(l.node().offsetHeight)-10+"px")}).on("mouseout",function(t){d3.select(this).style("fill",d3.rgb(t.color)),l.classed("hidden",!0)})})});var multipane=d3.selectAll(".multipane").each(function(){var t=this.dataset.labels.split(","),e=this.id;d3.select(this).insert("div",":first-child").attr("class","multipane-labels").html(function(a){for(var s="",n=0;n<t.length;n++)s+="<a "+(0==n?"class = 'selected'":"")+" onclick = 'switchPane("+n+',"'+e+"\", this)'>"+t[n]+"</a>";return s});for(var a=this.children,s=2;s<a.length;s++)d3.select(a[s]).classed("hidden",!0)});function switchPane(t,e,a){d3.select("#"+e).select(".multipane-labels").selectAll("*").each(function(e,a){a==t?d3.select(this).classed("selected",!0):d3.select(this).classed("selected",!1)}),d3.selectAll("#"+e+">div").each(function(e,a){a>0&&(a-1==t?d3.select(this).classed("hidden",!1):d3.select(this).classed("hidden",!0))})}var resizeId,percentageSliders=d3.selectAll(".percentage-slider").each(function(){var t=parseInt(this.dataset.yes),e=parseInt(this.dataset.no),a=generateTooltip({title:"Yes",responses:t,percentage:t/(t+e)}),s=generateTooltip({title:"No",responses:e,percentage:e/(t+e)}),n=d3.select(this.firstChild),r=parseInt(d3.select(this.children[1]).node().style.width.replace("%","")),o=parseInt(d3.select(this.children[2]).node().style.width.replace("%",""));d3.select(this.children[1]).on("mouseover",function(t){n.classed("hidden",!1).html(a).style("left","calc("+Math.round(r/2)+"% - "+Math.round(n.node().offsetWidth/2)+"px)").style("top","-"+(Math.round(n.node().offsetHeight)+10)+"px")}).on("mouseout",function(t){n.classed("hidden",!0)}),d3.select(this.children[2]).on("mouseover",function(t){n.classed("hidden",!1).html(s).style("left","calc("+Math.round(r+o/2)+"% - "+Math.round(n.node().offsetWidth/2)+"px)").style("top","-"+(Math.round(n.node().offsetHeight)+10)+"px")}).on("mouseout",function(t){n.classed("hidden",!0)})}),pieCharts=d3.selectAll(".pie").each(function(){var t,e,a=this.dataset.responses.split(","),s=this.dataset.labels.split(","),n=d3.color(this.dataset.accent).brighter(1),r=0,o=a.map(function(t,e){return r+=parseInt(t),0!=e&&(n=d3.color(n.darker())),{label:s[e],value:parseInt(t),color:d3.rgb(n)}}),l=(d3.scaleOrdinal(d3.schemeCategory20c),d3.pie().value(function(t){return t.value})),i=d3.arc().outerRadius(150).innerRadius(75),d=d3.select(this.firstChild),c=this;d3.select(this).append("svg").attr("width","100%").attr("height",300).append("g").attr("transform","translate(150,150)").selectAll("path").data(l(o)).enter().append("path").attr("fill",function(t,e){return t.data.color}).attr("stroke","white").attr("d",i).on("mouseover",function(e,a){t=generateTooltip({title:e.data.label,responses:e.value,percentage:e.value/r}),d.classed("hidden",!1).html(t)}).on("mousemove",function(t){e=d3.mouse(c),d.style("left",e[0]-Math.round(d.node().offsetWidth/2)+"px").style("top",e[1]-Math.round(d.node().offsetHeight)-12+"px")}).on("mouseout",function(t){d.classed("hidden",!0)});d3.select(this).append("div").attr("class","pie-label").attr("width","100%").selectAll("p").data(o).enter().append("p").html(function(t,e){return"<div class = 'bubble' style = 'background:"+t.color+"'></div>"+t.label})});d3.select(window).on("resize",function(){resizeId=setTimeout(function(){d3.selectAll(".line_chart").each(function(t,e){var a=d3.select(this),s=d3.select("#sections").node().offsetWidth-margin.left-margin.right,n=parseInt(this.dataset.height)-margin.top-margin.bottom;drawGraph(a,dataForGraphs[e],totalForGraphs[e],s,n,this.dataset.accent,d3.select(this.firstChild),bisectors[e],this.dataset.x,this.dataset.y,this.dataset.scatter,numLinesGraphs[e],colorsForGraphs[e],this.dataset.shade)}),d3.selectAll(".barchart").each(function(t,e){drawBarChart(this,dataForBarCharts[e],totalForBarCharts[e])})},500)});