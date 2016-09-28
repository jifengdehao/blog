var ModelUser=require('../model/user');
//console.log(ModelUser);
module.exports=function(app){
	
	app.get('/',function(req,res,next){
		//res.send('这是我导出去！！');
		  res.render('index', { title: '首页' });
	});
	app.get('/reg',function(req,res,next){
		//res.send('注册');	  
		res.render('reg', { title: '注册' });
	});
	app.get('/login',function(req,res,next){
		//res.send('登录');		
		res.render('login', { title: '登录' });
	});
	app.post("/login",function(req,res,next){
		var postData={
			name:req.body.name
		}
		ModelUser.findOne(postData,function(error,data){
			if(error){ console.log(error);}
			
			if(data){
				if(data.password==req.body.password){
					res.send("登录成功");
				}else{
					res.send("密码错误");
				}
			}else{
				res.send("没有此用户");
			}
		})
		//res.send(postData);
	});
	
	
	app.get('/logout',function(req,res,next){
		res.send('登出');	  
	});
	
	app.post("/reg",function(req,res,next){
	
		var postData={
			name:req.body.name,
			password:req.body.password
		}
		ModelUser.findOne({name:req.body.name},function(err,data){
			if(err){
				console.log(err);
			}
			if(data){
				res.send("用户已注册！");
			}else{
				ModelUser.create(postData,function(error,data){
					if(error){
						console.log(error);
					}
					console.log(data);
					res.send(data);
				})
				
			}
		});
		
	})
	
}
