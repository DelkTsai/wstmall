function getCommunitys(obj){
	var vid = $(obj).attr("id");
	
	$("#scommunitys").find("li").removeClass("searched");
	$(obj).addClass("searched");
	var params = {};
	params.areaId = vid;
	var html = [];
	$.post(Think.U('Home/Communitys/queryByList'),params,function(data,textStatus){
	    html.push('<li class="searched">全部</li>');
		var json = WST.toJson(data);
		if(json.status=='1' && json.list.length>0){
			var opts = null;
			for(var i=0;i<json.list.length;i++){
				opts = json.list[i];
				html.push("<li id="+opts.communityId+">"+opts.communityName+"</li>")
				
			}
		}
		$('#psareas').html(html.join(''));
   });
	
}

function tohide(obj,id){
		
	if($("#"+id).height()<=28){
		$("#"+id).height('auto');
		$("#"+id).css("overflow","");
		$("#bs").val(1)
		$("#"+id+"-tp").html("&nbsp;隐藏&nbsp;");
	}else{
		$("#"+id).height(28);
		$("#"+id).css("overflow","hidden");
		$("#bs").val(0)
		$("#"+id+"-tp").html("&nbsp;显示&nbsp;");
	}
}

function queryGoods(obj,mark){
	var params = {};
	params.c1Id = $("#c1Id").val();
	params.c2Id = $("#c2Id").val();
	params.c3Id = $("#c3Id").val();
	params.bs = $("#bs").val();
	params.mark = mark;
	if(mark==8){
		var sj = $("#sj").val();
		if(sj==2){
			$("#sj").val(1);
			$("#msort").val(8);
		}else{
			$("#sj").val(2);
			$("#msort").val(9);
		}		
	}else{
		$("#sj").val(0);
		$("#msort").val(mark);
	}	
	params.msort = $("#msort").val();
	params.sj = $("#sj").val();
	
	if(mark==1){
		var areaId3 = $(obj).attr("data");
		params.areaId3 = areaId3;
	}else if(mark==2){
		var areaId3 = $("#wst-areas").find(".searched").attr("data");
		var communityId = $(obj).attr("data");
		communityId = communityId?communityId:'';
		params.areaId3 = areaId3;
		params.communityId = communityId;
	}else if(mark==3){
		var areaId3 = $("#wst-areas").find(".searched").attr("data");
		var communityId = $("#wst-communitys").find(".searched").attr("data");
		var brandId = $(obj).attr("data");
		communityId = communityId?communityId:'';
		params.areaId3 = areaId3;
		params.communityId = communityId;
		params.brandId = brandId;
	}else if(mark==4){
		var areaId3 = $("#wst-areas").find(".searched").attr("data");
		var communityId = $("#wst-communitys").find(".searched").attr("data");
		var brandId = $("#wst-brand").find(".searched").attr("data");
		var prices = $(obj).attr("data");
		
		params.areaId3 = areaId3;
		params.communityId = communityId;
		params.brandId = brandId;
		params.prices = prices;
		
	}else if(mark==5){
		var areaId3 = $("#wst-areas").find(".searched").attr("data");
		var communityId = $("#wst-communitys").find(".searched").attr("data");
		var brandId = $("#wst-brand").find(".searched").attr("data");
		var prices = $("#wst-price").find(".searched").attr("data");
		var shopId = $(obj).attr("data");
		communityId = communityId?communityId:'';

		params.areaId3 = areaId3;
		params.communityId = communityId;
		params.brandId = brandId;
		params.prices = prices;
		
	}else{
		var areaId3 = $("#wst-areas").find(".searched").attr("data");
		var communityId = $("#wst-communitys").find(".searched").attr("data");
		var brandId = $("#wst-brand").find(".searched").attr("data");
		if(mark==12){
			var prices = $("#sprice").val()+"_"+$("#eprice").val();
		}else{
			var prices = $("#wst-price").find(".searched").attr("data");
		}
		
		var shopId = $("#wst-shop").attr("data");
		communityId = communityId?communityId:'';
		
		params.mark = mark;
		params.areaId3 = areaId3;
		params.communityId = communityId;
		params.brandId = brandId;
		params.prices = prices;
	}
	
	var keyword = $.trim($("#keyword").val());
	if(keyword!=""){
		params.keyWords = keyword;
	}
	
	params.wstModel = "Home";
	params.wstControl = "Goods";
	params.wstAction = "getGoodsList";

	jQuery.post(Think.U('Home/Base/getURL') ,params,function(data) {
		var json = WST.toJson(data);
		window.location = json.url;
	});
	
}

/**
 * 加入购物车
 */
function addCart(goodsId,type,goodsThums){
	var params = {};
	params.goodsId = goodsId;
	params.gcount = parseInt($("#buy-num").val(),10);
	params.rnd = Math.random();
	params.goodsAttrId = $('#shopGoodsPrice_'+goodsId).attr('dataId');
	$("#flyItem img").attr("src",domainURL  +"/"+ goodsThums)
	jQuery.post(Think.U('Home/Cart/addToCartAjax') ,params,function(data) {
		if(type==1){
			location.href= Think.U('Home/Cart/toCart');
		}else{
			//layer.msg("添加成功!",1,1);
		}
	});
}
//修改商品购买数量
function changebuynum(flag){
	var num = parseInt($("#buy-num").val(),10);
	var num = num?num:1;
	if(flag==1){
		if(num>1)num = num-1;
	}else if(flag==2){
		num = num+1;
	}
	var maxVal = parseInt($("#buy-num").attr('maxVal'),10);
	if(maxVal<=num)num=maxVal;
	$("#buy-num").val(num);
}

function getAppraisesPage(pcurr){

	var params = {}; 
	var goodsId = $.trim($("#goodsId").val());
	params.goodsId = goodsId;	
	params.pcurr = pcurr;
	//加载商品评价
	jQuery.post( Think.U('Home/Goods/getGoodsappraises') ,params,function(data) {
		var json = WST.toJson(data);
		var html = new Array();		    	
		for(var j=0;j<json.root.length;j++){
		    var appraises = json.root[j];
		    	
		    html.push('<tr height="75" style="border:1px dotted #eeeeee;">');
			    html.push('<td width="150" style="padding-left:6px;"><div>'+appraises.userName+'</div></td>');
			    html.push('<td width="*"><div>'+appraises.content+'</div></td>');
			    html.push('<td width="180">');
			    html.push('<div>商品评分：');
				for(var i=0;i<appraises.goodsScore;i++){
					html.push('<img src="'+domainURL +'/Apps/Home/View/default/images/icon_score_yes.png"/>');
				}
				html.push('</div>');
				html.push('<div>时效评分：');
				for(var i=0;i<appraises.timeScore;i++){
					html.push('<img src="'+domainURL +'/Apps/Home/View/default/images/icon_score_yes.png"/>');
				}
				html.push('</div>');
				html.push('<div>服务评分：');
				for(var i=0;i<appraises.serviceScore;i++){
					html.push('<img src="'+domainURL +'/Apps/Home/View/default/images/icon_score_yes.png"/>');
				}
				html.push('</div>');
				html.push('</td>');
				
		    html.push('</tr>');
		    	
		}
		 
		if(json.root.length>0){
		    $("#appraiseTab").html(html.join(""));
		}else{
		 	$("#appraiseTab").html("<tr><td><div style='font-size:15px;text-align:center;'>没有评价信息</div></td></tr>");
		}
	});
	
}
//获取属性价格
function getPriceAttrInfo(id){
	var goodsId = $("#goodsId").val();
	jQuery.post( Think.U('Home/Goods/getPriceAttrInfo') ,{goodsId:goodsId,id:id},function(data) {
		var json = WST.toJson(data);
		if(json.id){
			$('#shopGoodsPrice_'+goodsId).html("￥"+json.attrPrice);
			var buyNum = $("#buy-num").val();
			$("#buy-num").attr('maxVal',json.attrStock);
			if(buyNum>json.attrStock){
				$("#buy-num").val(json.attrStock);
			}
			$('#shopGoodsPrice_'+goodsId).attr('dataId',id);
		}
	});
}
function checkStock(obj){
	$(obj).addClass('wst-goods-attrs-on').siblings().removeClass('wst-goods-attrs-on');
	getPriceAttrInfo($(obj).attr('dataId'));
}



