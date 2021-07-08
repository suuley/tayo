const mongoose = require('mongoose');



const commentSchema = mongoose.Schema({
    content: { type: String,
               required: true 
        },
    userId: { type: mongoose.Schema.Types.ObjectId,
              ref: "User", 
              required: true 
            },
    articleId: { type: mongoose.Schema.Types.ObjectId,
                 ref: "Article", 
                 required: true 
                },
});

const Comment = module.exports = mongoose.model('Comment', commentSchema);
