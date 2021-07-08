    commentBlog(req, res) {

      const comment = {
        comment: req.body.comment,
        author: req.params.id
      }

      Comment.create(comment, (error, comment) =>  {
        if (error) {
          console.log(error);
        } else {
          Blog.findById(req.params.id, (error, blog) => {
            blog.comments.push(comment);
            console.log(comment);
            blog.save((error, savedBlog) => {
              if (error) {
                console.log(error);
              } else{
              res.redirect('/blogs/' + blog._id);
            }
        })
         })
        }
      })
      },