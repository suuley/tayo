  const user = await User.findOne({'secretToken': secretToken });
    if(!user) {
				req.flash('error', 'waa la waayey recorkaaga');
				res.redirect('/users/verify');
				return;
			}
       user.active = true;
			 user.secretToken = '';
			 user.save();
