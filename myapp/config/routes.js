var ModelUser=require('../model/user');
var ModelBlog=require('../model/blog');




module.exports=function(app){
	
	//中间件
	app.use(function(req,res,next){
		var user=req.session.user;
		if(user){
			app.locals.user=user;
		}else{
			app.locals.user=user;
		}
		console.log(user);
		next();
	});
	
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
				    req.session.user=data;
				    
					res.redirect("/user/"+data._id);
					
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
		delete req.session.user;
		res.redirect('/');  
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
					res.session.user=data;
					
					res.send(data);
				})
				
			}
		});
		
	});
	
	
	app.get('/user/:_id',function(req,res,next){
		
		var getData={
			_id:req.param("_id")
		}
		ModelUser.findById(getData,function(error,data){
			if(error) console.log(error);		
			//console.log(data);
			if(data){
				res.render('user',{
					title:data.name +'的个人资料',
					view:data
				});
			}else{
				res.send('查询不到你的资料');
			}
		});
	
		//res.send('用户中心正在开发')
	});
	
	//博客添加内容和标题
	app.get('/add',function(req,res,next){
		res.render('add',{
			title:"发表"
		});
	});
	app.post('/add',function(req,res,next){
		var postData={
			title:req.body.title,
			content:req.body.content
		}
		console.log(postData);
		
		ModelBlog.create(postData,function(err,data){
			if(err) console.log(err);
			//res.send(data);
			res.redirect('/view/'+data._id);
		});
		//res.send('发表成功');
	});
	
	app.get('/view',function(req,res,next){
		ModelBlog.find({},function(err,data){
		   //若没有向find传递参数，默认的是显示所有文档
		   if(err) console.log(err);
		   if(data){
		   	    res.send(data);
		   }
		});
	});
	app.get('/view/:_id',function(req,res,next){
		var getData={
			_id:req.param("_id")
		}
		
		ModelBlog.findById(getData,function(err,data){
			if(err) cosnole.log(err);
			if(data){
				res.render('view',{
					title:data.title,
					content:data.content
				});
			}else{
				res.send('不存在');
			}
		});
		
		
		
	});
	
	
}
